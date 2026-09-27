import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Settings } from 'lucide-react';
import { useChat } from '../../context/useChat';

export const Header: React.FC = () => {
  const { setSettingsOpen } = useChat();

  return (
    <header className="h-14 bg-brand-surface border-b border-brand-border px-4 md:px-6 flex items-center justify-between shrink-0 select-none z-30">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-brand-cardSubtle border border-brand-border text-brand-dark flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Cpu className="w-4.5 h-4.5 text-brand-dark" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-brand-text tracking-tight leading-tight">
              Manufactura<span className="text-brand-accentText">IQ</span>
            </span>
            <span className="text-[10px] text-brand-textSubtle leading-tight hidden sm:block">
              Manufacturing Engineering Copilot
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="p-2 text-brand-textMuted hover:text-brand-dark hover:bg-brand-cardHover rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
