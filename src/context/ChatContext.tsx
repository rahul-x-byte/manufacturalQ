import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import type {
  ChatMessage,
  ConnectionStatus,
  ConversationSummary,
  EvidenceCitation,
  IndexedDocument,
  QueryRequest,
  SessionAttachment,
  UiTransportState,
} from '../types/contracts';
import apiClient from '../services/apiClient';
import {
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_PDF_LIBRARY,
} from '../services/mockData';
import { ChatContext } from './chatContextDef';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transportState, setTransportState] = useState<UiTransportState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');

  const [conversations, setConversations] = useState<ConversationSummary[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  const initialCitations = INITIAL_MESSAGES.find(m => m.citations && m.citations.length > 0)?.citations || [];
  const [activeCitations, setActiveCitations] = useState<EvidenceCitation[]>(initialCitations);
  const [selectedCitationNumber, setSelectedCitationNumber] = useState<number | null>(null);

  const [sessionAttachment, setSessionAttachment] = useState<SessionAttachment | null>(null);
  const [pdfLibrary] = useState<IndexedDocument[]>(INITIAL_PDF_LIBRARY);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const checkBackendHealth = useCallback(async () => {
    try {
      const status = await apiClient.checkConnection();
      setConnectionStatus(status);
    } catch {
      setConnectionStatus('offline');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    apiClient.checkConnection().then((status) => {
      if (isMounted) setConnectionStatus(status);
    }).catch(() => {
      if (isMounted) setConnectionStatus('offline');
    });

    const interval = setInterval(() => {
      apiClient.checkConnection().then((status) => {
        if (isMounted) setConnectionStatus(status);
      }).catch(() => {
        if (isMounted) setConnectionStatus('offline');
      });
    }, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const startNewChat = useCallback(() => {
    const newId = `conv-${Date.now()}`;
    const newSummary: ConversationSummary = {
      id: newId,
      title: 'New Conversation',
      dateGroup: 'Today',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations(prev => [newSummary, ...prev]);
    setActiveConversationId(newId);
    setMessages([]);
    setActiveCitations([]);
    setSelectedCitationNumber(null);
    setSessionAttachment(null);
    setTransportState('idle');
    setErrorMessage(null);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setSelectedCitationNumber(null);
    setErrorMessage(null);

    if (id === 'conv-1') {
      setMessages(INITIAL_MESSAGES);
      setActiveCitations(INITIAL_MESSAGES[1].citations || []);
    } else {
      const target = conversations.find(c => c.id === id);
      setMessages([
        {
          id: `msg-${id}-user`,
          sender: 'user',
          text: target?.title || 'Engineering query',
          timestamp: target?.timestamp || 'Just now',
        },
        {
          id: `msg-${id}-asst`,
          sender: 'assistant',
          text: `Previous session record for: **${target?.title}**.\n\nRetrieved engineering specifications and documentation are archived in the session log. Ask a follow-up question below to resume active analysis.`,
          timestamp: target?.timestamp || 'Just now',
          status: 'pass',
          citations: INITIAL_MESSAGES[1].citations || [],
        },
      ]);
      setActiveCitations(INITIAL_MESSAGES[1].citations || []);
    }
  }, [conversations]);

  const attachSessionFile = useCallback(async (file: File) => {
    setTransportState('uploading');
    setErrorMessage(null);
    try {
      const attachment = await apiClient.attachPdfToSession(file);
      setSessionAttachment(attachment);
      setTransportState('idle');
    } catch (err) {
      setErrorMessage((err as Error).message || 'Failed to attach PDF');
      setTransportState('error');
    }
  }, []);

  const removeSessionFile = useCallback(() => {
    setSessionAttachment(null);
  }, []);

  const sendMessage = useCallback(async (queryText: string) => {
    if (!queryText.trim() && !sessionAttachment) return;

    const trimmedQuery = queryText.trim() || `Analyze attached document: ${sessionAttachment?.name}`;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: trimmedQuery,
      timestamp: userTimestamp,
      attachmentName: sessionAttachment?.name,
    };

    setMessages(prev => [...prev, userMessage]);
    setTransportState('submitting');
    setErrorMessage(null);

    setConversations(prev =>
      prev.map(c =>
        c.id === activeConversationId && c.title === 'New Conversation'
          ? { ...c, title: trimmedQuery.slice(0, 36) + (trimmedQuery.length > 36 ? '...' : '') }
          : c
      )
    );

    try {
      const payload: QueryRequest = {
        query: trimmedQuery,
        session_id: activeConversationId,
        session_attachment: sessionAttachment
          ? {
              filename: sessionAttachment.name,
              file_size_bytes: sessionAttachment.size,
              mime_type: 'application/pdf',
            }
          : null,
      };

      const result = await apiClient.submitQuery(payload);

      const asstTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-asst`,
        sender: 'assistant',
        text: result.answer,
        timestamp: asstTimestamp,
        status: result.status,
        citations: result.citations,
        reasoning: result.reasoning,
        evidenceBundle: result.evidence_bundle,
        reviewReasons: result.review?.reasons,
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (result.citations && result.citations.length > 0) {
        setActiveCitations(result.citations);
      }
      setTransportState('success');
      setTimeout(() => setTransportState('idle'), 1200);
    } catch (err) {
      setErrorMessage((err as Error).message || 'Failed to execute query');
      setTransportState('error');
    }
  }, [activeConversationId, sessionAttachment]);

  return (
    <ChatContext.Provider
      value={{
        transportState,
        errorMessage,
        connectionStatus,
        conversations,
        activeConversationId,
        messages,
        activeCitations,
        selectedCitationNumber,
        sessionAttachment,
        pdfLibrary,
        isMobileSidebarOpen,
        isSettingsOpen,
        isUploadModalOpen,
        sendMessage,
        startNewChat,
        selectConversation,
        setSelectedCitation: setSelectedCitationNumber,
        attachSessionFile,
        removeSessionFile,
        checkBackendHealth,
        setIsMobileSidebarOpen,
        setSettingsOpen: setIsSettingsOpen,
        setUploadModalOpen: setIsUploadModalOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
