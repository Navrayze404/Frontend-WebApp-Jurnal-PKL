import React, { useState, useEffect } from 'react';
import { BookOpenCheck, Check, Clipboard, Download, ShieldCheck, X } from 'lucide-react';
import { appsScriptCode } from '../../../lib/appsScriptCode';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 180);
  };

  if (!shouldRender) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(appsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([appsScriptCode], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${
        isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl border border-zinc-800 bg-[#0c1612] p-5 shadow-2xl text-zinc-100 ${
          isClosing ? 'animate-modal-out' : 'animate-modal-in'
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <BookOpenCheck className="h-4.5 w-4.5" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-100">Panduan Setup Backend</h2>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          <p className="text-zinc-400 leading-relaxed">
            Pasang script di bawah ke project Google Apps Script milikmu sendiri.
          </p>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">Code.gs</span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 text-[11px] font-medium text-emerald-400 transition hover:bg-zinc-800 active:scale-95"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 text-[11px] font-medium text-zinc-300 transition hover:bg-zinc-800 active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <pre className="max-h-36 overflow-y-auto font-mono text-[11px] text-emerald-400/90 leading-relaxed">
              {appsScriptCode}
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-zinc-300">Langkah Install:</h3>
            <ol className="space-y-1.5 text-zinc-400 list-decimal pl-4 leading-relaxed">
              <li>Buka <code className="text-zinc-200">script.google.com</code> lalu buat project baru.</li>
              <li>Paste kode <code className="text-zinc-200">Code.gs</code> di atas, lalu simpan.</li>
              <li>Klik <b>Deploy → New deployment</b>, pilih <b>Web app</b>.</li>
              <li>Set <i>Execute as:</i> <b>Me</b> dan <i>Who has access:</i> <b>Anyone</b>.</li>
              <li>Salin URL Web App berakhiran <code className="text-emerald-400">/exec</code> lalu paste di aplikasi ini.</li>
            </ol>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-2.5 text-[11px] text-zinc-400">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Foto dikirim langsung ke Google Drive akun Google milikmu.</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <button
            onClick={handleClose}
            className="flex h-10 w-full items-center justify-center rounded-2xl bg-emerald-500 font-semibold text-zinc-950 text-xs transition hover:bg-emerald-400 active:scale-[0.98]"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};