import React, { useState } from 'react';
import { NotebookTabs, HelpCircle, ShieldCheck, Link2 } from 'lucide-react';
import { isValidAppsScriptUrl } from '../../journal/utils/dateHelper';

interface SetupFormProps {
  onSaveUrl: (url: string) => void;
  onOpenGuide: () => void;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onSaveUrl, onOpenGuide }) => {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();

    if (!trimmed) {
      setError('URL Google Apps Script tidak boleh kosong.');
      return;
    }

    if (!isValidAppsScriptUrl(trimmed)) {
      setError('Gunakan Web App URL yang berakhiran /exec.');
      return;
    }

    setError('');
    onSaveUrl(trimmed);
  };

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating Top Navbar */}
      <nav className="fixed top-3 inset-x-0 z-30 mx-auto w-full max-w-md px-4 animate-nav-down">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-zinc-900/90 text-emerald-400 shadow-xl backdrop-blur-md">
            <NotebookTabs className="h-5 w-5" />
          </div>

          <div className="flex h-12 flex-1 items-center min-w-0 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 shadow-xl backdrop-blur-md">
            <div className="flex flex-col min-w-0 leading-tight">
              <h1 className="text-xs font-bold text-zinc-100 truncate sm:text-sm">
                Jurnal PKL Digital
              </h1>
              <p className="text-[10px] text-zinc-400 truncate">
                Laporan Kegiatan Praktik Kerja Lapangan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenGuide}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/90 text-emerald-400 shadow-xl backdrop-blur-md transition hover:bg-zinc-800 hover:text-emerald-300 active:scale-95"
            title="Panduan Setup"
            aria-label="Panduan Setup"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Minimalist Card Form */}
      <div className="w-full max-w-md rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 shadow-2xl backdrop-blur-xl animate-modal-in">
        <h2 className="mb-4 text-base font-semibold text-zinc-100">Masuk</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="scriptUrl" className="block mb-1.5 text-xs font-medium text-zinc-300">
              URL Web App
            </label>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Link2 className="h-4 w-4" />
              </div>
              <input
                id="scriptUrl"
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (error) setError('');
                }}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 pl-10 pr-3.5 py-3 text-xs text-zinc-100 placeholder-zinc-600 transition focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
              />
            </div>

            {error && <p className="mt-2 text-xs font-medium text-rose-400">{error}</p>}
          </div>

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-2xl bg-emerald-500 font-semibold text-zinc-950 text-xs transition hover:bg-emerald-400 active:scale-[0.98]"
          >
            <span>Lanjutkan</span>
          </button>
        </form>

        <div className="mt-5 flex items-center gap-2 border-t border-zinc-800/60 pt-3.5 text-[11px] text-zinc-400">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Foto disimpan aman di Google Drive akun Anda sendiri.</span>
        </div>
      </div>
    </div>
  );
};