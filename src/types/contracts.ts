/**
 * ManufacturaIQ Core Types and Contracts
 * Aligned with backend STEP 04 - STEP 16 contracts.
 */

// Transport/UI lifecycle state owned by frontend
export type UiTransportState = 'idle' | 'uploading' | 'submitting' | 'success' | 'error';

// Business status returned by backend (never computed client-side)
export type BusinessStatus = 'needs_clarification' | 'pass' | 'human_review';

// Backend Health/Ready status
export type ConnectionStatus = 'online' | 'offline' | 'checking';

/**
 * Contract: QueryRequest (sent to POST /api/query)
 */
export interface QueryRequest {
  query: string;
  query_id?: string;
  session_id?: string;
  session_attachment?: {
    filename: string;
    file_size_bytes?: number;
    mime_type?: string;
  } | null;
  machine_id?: string | null;
  product_id?: string | null;
  metadata?: Record<string, unknown>;
}

/**
 * Provenance for retrieved evidence
 */
export interface EvidenceProvenance {
  source_dataset?: string;
  source_file?: string;
  document_title?: string;
  page_number?: number;
  section_title?: string;
  chunk_id?: string;
  record_id?: string;
  domain?: string;
}

/**
 * Contract: Evidence item retrieved by agents
 */
export interface Evidence {
  evidence_id: string;
  evidence_type: 'DOCUMENT' | 'MAINTENANCE' | 'QUALITY' | 'PRODUCTION' | string;
  summary: string;
  provenance: EvidenceProvenance;
  raw_snippet?: string;
  score?: number;
}

/**
 * Citation linking an inline [1] to an evidence item
 */
export interface EvidenceCitation {
  citation_number: number;
  evidence_id: string;
  document_title: string;
  page_number?: number;
  snippet: string;
  section?: string;
}

/**
 * Structured manufacturing reasoning sections from Gemini
 */
export interface ReasoningSections {
  observations?: string[];
  possible_causes?: string[];
  recommended_checks?: string[];
  missing_information?: string[];
  final_analysis?: string;
}

/**
 * Review decision from Jev review gate
 */
export interface ReviewDecision {
  status: BusinessStatus;
  reasons?: string[];
  flagged_items?: string[];
  requires_human_approval?: boolean;
}

/**
 * Agent Result / Query Result returned by POST /api/query
 */
export interface AgentResult {
  query_id: string;
  answer: string;
  status: BusinessStatus;
  citations: EvidenceCitation[];
  evidence_bundle?: Evidence[];
  reasoning?: ReasoningSections;
  review?: ReviewDecision;
  created_at?: string;
}

/**
 * Temporary session-attached PDF metadata
 */
export interface SessionAttachment {
  file: File;
  name: string;
  size: number;
  uploadedAt: Date;
}

/**
 * Chat Message Model for UI rendering
 */
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  status?: BusinessStatus;
  citations?: EvidenceCitation[];
  reasoning?: ReasoningSections;
  evidenceBundle?: Evidence[];
  reviewReasons?: string[];
  attachmentName?: string;
}

/**
 * Conversation representation in Sidebar
 */
export interface ConversationSummary {
  id: string;
  title: string;
  dateGroup: 'Today' | 'Yesterday' | 'Older';
  timestamp: string;
  lastMessageSnippet?: string;
}

/**
 * Document in Knowledge Base / PDF Library
 */
export interface IndexedDocument {
  id: string;
  title: string;
  filename: string;
  sizeBytes: number;
  sizeFormatted: string;
  dateAdded: string;
  pageCount: number;
  manufacturer?: string;
  documentType?: string;
  isIndexed: boolean;
}
