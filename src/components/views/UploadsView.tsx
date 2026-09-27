import React from 'react';
import {
  UploadCloud,
  FileCheck2,
  ArrowLeft,
  AlertCircle,
  Clock,
  Layers,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../layout/Breadcrumbs';
import ChaoticOrbitLoader from '../chat/ChaoticOrbitLoader';

const INGESTION_HISTORY = [
  {
    id: 'doc-1',
    title: 'Haas Mill Operator Manual.pdf',
    status: 'indexed',
    pages: 384,
    chunks: 392,
    uploaded: 'Feb 12, 2024',
  },
  {
    id: 'doc-2',
    title: 'OSHA Lockout Tagout.pdf',
    status: 'indexed',
    pages: 42,
    chunks: 45,
    uploaded: 'Jan 18, 2024',
  },
  {
    id: 'doc-3',
    title: 'SINUMERIK 828D Manual.pdf',
    status: 'indexed',
    pages: 612,
    chunks: 628,
    uploaded: 'Jan 10, 2024',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'indexed':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-success/10 border border-brand-success/20 text-brand-success text-[11px] font-medium">
          <CheckCircle className="w-3 h-3 text-brand-success" />
          <span>Indexed</span>
        </span>
      );
    case 'processing':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-accentLight border border-brand-accent/20 text-brand-accentText text-[11px] font-medium">
          <ChaoticOrbitLoader size={12} />
          <span>Processing</span>
        </span>
      );
    case 'uploading':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-warning/10 border border-brand-warning/20 text-brand-warning text-[11px] font-medium">
          <UploadCloud className="w-3 h-3 text-brand-warning" />
          <span>Uploading</span>
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-error/10 border border-brand-error/20 text-brand-error text-[11px] font-medium">
          <XCircle className="w-3 h-3 text-brand-error" />
          <span>Failed</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-cardSubtle border border-brand-border text-brand-textMuted text-[11px] font-medium">
          <Clock className="w-3 h-3 text-brand-textSubtle" />
          <span>Unknown</span>
        </span>
      );
  }
};

export const UploadsView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-transparent overflow-y-auto">
      <div className="p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6">
        <div className="pb-6 border-b border-brand-border">
          <Breadcrumbs items={[{ label: 'Copilot Chat', to: '/' }, { label: 'Document Ingestion Pipeline', to: '/uploads' }]} />
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
              <UploadCloud className="w-4.5 h-4.5 text-brand-dark" />
            </div>
            <span>Document Ingestion Pipeline</span>
          </h1>
          <p className="text-sm text-brand-textMuted mt-1">
            Monitor the document ingestion pipeline — PDF parsing, text chunking, embeddings, and vector storage.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-brand-warning/10 border border-brand-warning/20 text-brand-warning text-xs flex items-start gap-3 shadow-card">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Ingestion API Status: STEP 17C Pipeline In Progress</p>
            <p className="text-brand-warning/90 leading-relaxed">
              Dynamic multi-part PDF upload endpoints (<code className="bg-brand-warning/15 px-1 py-0.5 rounded font-mono text-[11px]">POST /api/documents</code>) are scheduled for the next backend milestone. In this initial pass (STEP 17A), the permanent upload action remains disabled to prevent mock hallucination. Session-scoped attachments in the chat input bar are active.
            </p>
          </div>
        </div>

        {/* Ingestion Pipeline Steps */}
        <div className="bg-brand-surface border border-brand-border rounded-xl p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-brand-text flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-cardSubtle text-brand-dark flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-brand-dark" />
            </div>
            <span>Standard Ingestion Protocol (STEP 05 - STEP 06)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-brand-cardSubtle border border-brand-success/20 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-text">1. Extract</span>
                <div className="w-5 h-5 rounded-md bg-brand-success/10 text-brand-success flex items-center justify-center">
                  <FileCheck2 className="w-3.5 h-3.5 text-brand-success" />
                </div>
              </div>
              <p className="text-[11px] text-brand-textMuted">
                PDF text, candidate headings, and page boundaries extracted.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-cardSubtle border border-brand-success/20 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-text">2. Chunk</span>
                <div className="w-5 h-5 rounded-md bg-brand-success/10 text-brand-success flex items-center justify-center">
                  <FileCheck2 className="w-3.5 h-3.5 text-brand-success" />
                </div>
              </div>
              <p className="text-[11px] text-brand-textMuted">
                Hierarchical parent-child chunking preserving section provenance.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-cardSubtle border border-brand-success/20 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-text">3. Embed</span>
                <div className="w-5 h-5 rounded-md bg-brand-success/10 text-brand-success flex items-center justify-center">
                  <FileCheck2 className="w-3.5 h-3.5 text-brand-success" />
                </div>
              </div>
              <p className="text-[11px] text-brand-textMuted">
                BGE Small dense embedding generation per document chunk.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-cardSubtle border border-brand-accent/20 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-text">4. Qdrant Store</span>
                <div className="w-5 h-5 rounded-md bg-brand-accentLight text-brand-accentText flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-brand-accentText" />
                </div>
              </div>
              <p className="text-[11px] text-brand-textMuted">
                Vector collection with payload metadata and single-client lock.
              </p>
            </div>
          </div>
        </div>

        {/* Ingestion History Table */}
        <div className="bg-brand-surface border border-brand-border rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-brand-border">
            <h3 className="text-sm font-semibold text-brand-text">
              Ingestion History
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-brand-cardSubtle">
                  <th className="text-left font-semibold text-brand-textMuted uppercase tracking-wider px-4 py-3">Document</th>
                  <th className="text-left font-semibold text-brand-textMuted uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left font-semibold text-brand-textMuted uppercase tracking-wider px-4 py-3">Pages</th>
                  <th className="text-left font-semibold text-brand-textMuted uppercase tracking-wider px-4 py-3">Chunks</th>
                  <th className="text-left font-semibold text-brand-textMuted uppercase tracking-wider px-4 py-3">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-borderLight">
                {INGESTION_HISTORY.map((doc) => (
                  <tr key={doc.id} className="hover:bg-brand-cardHover transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-brand-error/10 border border-brand-error/20 text-brand-error flex items-center justify-center shrink-0">
                          <FileCheck2 className="w-3 h-3" />
                        </div>
                        <span className="font-medium text-brand-text truncate">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-4 py-3 text-brand-textMuted font-mono">{doc.pages}</td>
                    <td className="px-4 py-3 text-brand-textMuted font-mono">{doc.chunks}</td>
                    <td className="px-4 py-3 text-brand-textSubtle">{doc.uploaded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadsView;
