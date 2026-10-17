import React, { useState } from 'react';
import { NotebookTabs, Settings, Link2 } from 'lucide-react';
import { DateInfo } from '../types';

interface HeaderProps {
  dateInfo: DateInfo;
  onChangeUrl: () => void;
}

export const Header: React.FC<HeaderProps> = ({ dateInfo, onChangeUrl }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-3 z-30 mb-6 mx-auto w-full max-w-md px-4 animate-nav-down">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-[#0c1612]/90 text-emerald-400 shadow-xl backdrop-blur-md">
          <NotebookTabs className="h-5 w-5" />
        </div>

        <div className="flex h-12 flex-1 items-center min-w-0 rounded-full border border-emerald-900/40 bg-[#0c1612]/90 px-4 shadow-xl backdrop-blur-md">
          <div className="flex flex-col min-w-0 leading-tight">
            <h1 className="text-xs font-bold text-zinc-100 truncate sm:text-sm">
              Jurnal PKL Digital
            </h1>
            <p className="text-[10px] text-zinc-400 truncate">
              {dateInfo.formattedDate}
            </p>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-900/40 bg-[#0c1612]/90 text-emerald-400 shadow-xl backdrop-blur-md transition hover:bg-zinc-800 active:scale-95"
            aria-label="Pengaturan"
          >
            <Settings className="h-5 w-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-14 z-40 w-52 rounded-2xl border border-emerald-900/40 bg-[#0c1612] p-1.5 shadow-2xl backdrop-blur-xl animate-modal-in">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onChangeUrl();
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10"
              >
                <Link2 className="h-4 w-4" /> Ganti URL Apps Script
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};