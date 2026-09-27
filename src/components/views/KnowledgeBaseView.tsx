import React, { useState } from 'react';
import { useChat } from '../../context/useChat';
import {
  BookOpen,
  Search,
  FileText,
  Plus,
  ArrowLeft,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../layout/Breadcrumbs';

export const KnowledgeBaseView: React.FC = () => {
  const { pdfLibrary } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = pdfLibrary.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.manufacturer && doc.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent overflow-y-auto">
      <div className="p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <Breadcrumbs items={[{ label: 'Copilot Chat', to: '/' }, { label: 'Knowledge Base', to: '/knowledge-base' }]} />
            <div className="flex items-center gap-2 mb-1">
              <Link
                to="/"
                className="text-xs text-brand-accentText hover:underline flex items-center gap-1 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Copilot Chat</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-brand-text tracking-tight flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-cardSubtle border border-brand-border text-brand-dark flex items-center justify-center shrink-0">
                <BookOpen className="w-4.5 h-4.5 text-brand-dark" />
              </div>
              <span>Knowledge Base</span>
            </h1>
            <p className="text-sm text-brand-textMuted mt-1">
              Manufacturing documents available for retrieval
            </p>
          </div>

          <div className="relative group">
            <button
              type="button"
              disabled
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cardSubtle border border-brand-border text-brand-textSubtle cursor-not-allowed opacity-80 shadow-sm"
              title="Permanent ingestion pipeline will be enabled in STEP 17C"
            >
              <Plus className="w-4 h-4 text-brand-textSubtle" />
              <span className="text-xs font-semibold">Add PDF</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-surface text-brand-textMuted border border-brand-border">
                Coming next
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-brand-textSubtle absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by title or manufacturer..."
              className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text placeholder-brand-textSubtle focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 shadow-sm"
            />
          </div>
        </div>

        {/* Document cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-brand-surface border border-brand-border rounded-xl p-5 shadow-card hover:shadow-cardHover hover:border-brand-accent/30 transition-all group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-11 rounded-xl bg-brand-error/10 border border-brand-error/20 text-brand-error flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-brand-text truncate group-hover:text-brand-accentText transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-brand-textMuted mt-0.5">
                    {doc.manufacturer} • {doc.documentType}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-brand-textMuted mb-4">
                <span>{doc.pageCount} pages</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-success/10 border border-brand-success/20 text-brand-success text-[11px] font-medium">
                  <CheckCircle className="w-3 h-3 text-brand-success" />
                  <span>Indexed</span>
                </span>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-brand-cardSubtle border border-brand-border text-brand-textMuted hover:text-brand-accentText hover:border-brand-accent/30 hover:bg-brand-accentLight text-xs font-medium transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Document</span>
              </button>
            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-xl bg-brand-cardSubtle border border-brand-border flex items-center justify-center mx-auto text-brand-textSubtle mb-3">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-brand-text">No documents found</p>
            <p className="text-xs text-brand-textMuted mt-1">Try adjusting your search terms.</p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-brand-accentLight border border-brand-accent/20 text-xs text-brand-textMuted space-y-1">
          <p className="font-semibold text-brand-accentText">Grounding Protocol Notice</p>
          <p>
            The ManufacturaIQ DocumentAgent retrieves chunks with deterministic identity provenance across 2,173 indexed corpus pages in Qdrant. Document scores represent retrieval similarity, not subjective truth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
