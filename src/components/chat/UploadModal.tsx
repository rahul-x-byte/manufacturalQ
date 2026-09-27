import React from 'react';
import { useChat } from '../../context/useChat';
import { X, FileText, Upload, BookOpen, Clock } from 'lucide-react';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, setUploadModalOpen } = useChat();

  if (!isUploadModalOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[80] animate-fadeIn"
        onClick={() => setUploadModalOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="bg-brand-surface rounded-2xl shadow-2xl w-full max-w-md animate-slideInUp border border-brand-border">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-cardSubtle border border-brand-border text-brand-dark flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-brand-text">Upload Technical Document</h2>
                <p className="text-xs text-brand-textMuted">Add a PDF to your knowledge base</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setUploadModalOpen(false)}
              className="p-1.5 text-brand-textMuted hover:text-brand-dark hover:bg-brand-cardHover rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {/* Temporary upload option */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-cardSubtle">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-cardSubtle text-brand-dark flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-brand-text">Upload for this conversation</h3>
                  <p className="text-xs text-brand-textMuted mt-1 leading-relaxed">
                    Use this document only for the current conversation. It will not be added to the permanent knowledge base.
                  </p>
                </div>
              </div>
            </div>

            {/* Permanent upload option */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-cardSubtle">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-success/10 text-brand-success flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-brand-text">Add to Knowledge Base</h3>
                  <p className="text-xs text-brand-textMuted mt-1 leading-relaxed">
                    Add this document to the ManufacturaIQ knowledge base for permanent retrieval across all conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* Coming soon notice */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-warning/10 border border-brand-warning/20">
              <Clock className="w-5 h-5 text-brand-warning shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-warning">Document upload coming soon</p>
                <p className="text-[11px] text-brand-warning/80 mt-0.5">
                  Permanent knowledge-base ingestion is scheduled for the next backend milestone. Session-scoped attachments in the chat input bar are active now.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 p-5 border-t border-brand-border">
            <button
              type="button"
              onClick={() => setUploadModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-brand-textMuted hover:text-brand-dark hover:bg-brand-cardHover transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
