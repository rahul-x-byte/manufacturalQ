import React, { useState } from 'react';
import { useChat } from '../../context/useChat';
import {
  X,
  RefreshCw,
  Cpu,
  LogOut,
  Monitor,
  Bell,
  Layers,
  FileText,
  UploadCloud,
  ChevronRight,
  Lock,
} from 'lucide-react';

type SettingsTab = 'general' | 'sources';

export const SettingsPanel: React.FC = () => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    connectionStatus,
    checkBackendHealth,
    activeCitations,
    selectedCitationNumber,
    setSelectedCitation,
  } = useChat();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  if (!isSettingsOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[80] animate-fadeIn"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Panel */}
      <aside className="fixed top-0 right-0 z-[90] h-full w-80 sm:w-[360px] bg-brand-surface border-l border-brand-border flex flex-col shadow-drawer animate-slideInRight">
        {/* Header */}
        <div className="p-4 pb-0 border-b border-brand-border">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-brand-text">Settings</h2>
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="p-1.5 text-brand-textMuted hover:text-brand-dark hover:bg-brand-cardHover rounded-lg transition-colors"
              title="Close Settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`px-3 py-2 rounded-t-lg text-xs font-medium transition-colors ${
                activeTab === 'general'
                  ? 'text-brand-dark border-b-2 border-brand-accent bg-brand-cardSubtle'
                  : 'text-brand-textMuted hover:text-brand-dark'
              }`}
            >
              General
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-2 rounded-t-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'sources'
                  ? 'text-brand-dark border-b-2 border-brand-accent bg-brand-cardSubtle'
                  : 'text-brand-textMuted hover:text-brand-dark'
              }`}
            >
              <span>Sources & Evidence</span>
              {activeCitations.length > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-brand-accentLight text-brand-accentText font-semibold">
                  {activeCitations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activeTab === 'general' ? (
            <>
              {/* General */}
              <section>
                <h3 className="text-[11px] font-semibold text-brand-textSubtle uppercase tracking-wider mb-3">
                  General
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-brand-cardSubtle border border-brand-border">
                    <div className="flex items-center gap-2.5">
                      <Monitor className="w-4 h-4 text-brand-textSubtle" />
                      <span className="text-xs font-medium text-brand-text">Theme</span>
                    </div>
                    <span className="text-xs text-brand-textMuted">Light</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-brand-cardSubtle border border-brand-border">
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-brand-textSubtle" />
                      <span className="text-xs font-medium text-brand-text">Notifications</span>
                    </div>
                    <span className="text-xs text-brand-textMuted">Default</span>
                  </div>
                </div>
              </section>

              {/* Connection Status */}
              <section>
                <h3 className="text-[11px] font-semibold text-brand-textSubtle uppercase tracking-wider mb-3">
                  Connection Status
                </h3>
                <div className="p-4 rounded-lg bg-brand-cardSubtle border border-brand-border space-y-3">
                  <div className="flex items-center gap-2">
                    {connectionStatus === 'online' ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-success"></span>
                        <span className="text-sm font-medium text-brand-text">Online</span>
                      </>
                    ) : connectionStatus === 'offline' ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-error"></span>
                        <span className="text-sm font-medium text-brand-text">Offline</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-warning animate-pulse"></span>
                        <span className="text-sm font-medium text-brand-text">Checking...</span>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={checkBackendHealth}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-brand-card border border-brand-border text-brand-text hover:bg-brand-cardHover text-xs font-medium transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Recheck</span>
                  </button>
                </div>
              </section>

              {/* Account */}
              <section>
                <h3 className="text-[11px] font-semibold text-brand-textSubtle uppercase tracking-wider mb-3">
                  Account
                </h3>
                <div className="p-4 rounded-lg bg-brand-cardSubtle border border-brand-border space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-card border border-brand-border text-brand-dark font-semibold text-sm flex items-center justify-center">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-text">John Doe</p>
                      <p className="text-xs text-brand-textMuted">Manufacturing Engineer</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-brand-error/10 border border-brand-error/20 text-brand-error hover:bg-brand-error/20 text-xs font-medium transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </section>

              {/* About */}
              <section>
                <h3 className="text-[11px] font-semibold text-brand-textSubtle uppercase tracking-wider mb-3">
                  About
                </h3>
                <div className="p-4 rounded-lg bg-brand-cardSubtle border border-brand-border">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-card border border-brand-border text-brand-dark flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-text">
                        Manufactura<span className="text-brand-accentText">IQ</span>
                      </p>
                      <p className="text-[10px] text-brand-textMuted">Manufacturing Engineering Copilot</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-textMuted leading-relaxed">
                    Evidence-Grounded Engineering AI
                  </p>
                  <p className="text-[10px] text-brand-textSubtle mt-2">
                    Design • Production • Quality • Maintenance
                  </p>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Sources & Evidence */}
              <section>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-cardSubtle border border-brand-border text-brand-dark flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-text flex items-center gap-2">
                      <span>Sources & Evidence</span>
                      {activeCitations.length > 0 && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-accentLight text-brand-accentText font-semibold">
                          {activeCitations.length}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-brand-textMuted mt-0.5 leading-snug">
                      Grounded sources and referenced documents.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeCitations.length === 0 ? (
                    <div className="py-12 text-center px-4 rounded-xl bg-brand-cardSubtle border border-brand-border">
                      <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center mx-auto text-brand-textSubtle mb-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-brand-text">No citations in current view</p>
                      <p className="text-[11px] text-brand-textMuted mt-1">
                        Grounded sources and referenced page numbers will appear here during chat responses.
                      </p>
                    </div>
                  ) : (
                    activeCitations.map((citation) => {
                      const isSelected = selectedCitationNumber === citation.citation_number;
                      return (
                        <div
                          key={citation.citation_number}
                          id={`source-card-${citation.citation_number}`}
                          onClick={() =>
                            setSelectedCitation(isSelected ? null : citation.citation_number)
                          }
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                            isSelected
                              ? 'bg-brand-accentLight border-brand-accent shadow-card'
                              : 'bg-brand-card border-brand-border hover:border-brand-accent/30 hover:shadow-card'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-brand-error/10 border border-brand-error/20 text-brand-error flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="text-xs font-semibold text-brand-text truncate group-hover:text-brand-accentText transition-colors">
                                  {citation.document_title}
                                </h4>
                                {citation.page_number && (
                                  <span className="text-[11px] font-semibold text-brand-accentText bg-brand-accentLight px-1.5 py-0.5 rounded shrink-0">
                                    Page {citation.page_number}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1.5 text-xs text-brand-textMuted leading-relaxed line-clamp-3">
                                {citation.snippet}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-brand-borderLight flex items-center justify-between text-[11px] text-brand-textMuted">
                            <span className="inline-flex items-center gap-1 font-mono text-brand-accentText font-semibold">
                              Citation [{citation.citation_number}]
                            </span>
                            {citation.section && (
                              <span className="truncate max-w-[180px] text-brand-textSubtle text-[10px]">
                                {citation.section}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              {/* Bottom Action */}
              <section>
                <div
                  className="p-3.5 rounded-xl bg-brand-card border border-brand-border relative overflow-hidden group cursor-not-allowed select-none opacity-85 hover:opacity-100 transition-all shadow-sm"
                  title="Backend document ingestion API (POST /api/documents) is coming next in STEP 17C."
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-brand-cardSubtle border border-brand-border text-brand-dark flex items-center justify-center shrink-0">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-brand-text">
                            Add PDF to database
                          </h4>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-cardSubtle text-brand-textMuted border border-brand-border">
                            Coming next
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-textSubtle truncate mt-0.5">
                          Upload a new document to your knowledge base.
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-textSubtle shrink-0" />
                  </div>
                  <div className="mt-2 pt-2 border-t border-brand-borderLight flex items-center gap-1.5 text-[10px] text-brand-textMuted">
                    <Lock className="w-3 h-3 text-brand-textSubtle shrink-0" />
                    <span>Permanent ingestion endpoint disabled until backend ships</span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default SettingsPanel;
