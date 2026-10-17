import React from 'react';
import { CheckCircle2, AlertTriangle, Camera, X } from 'lucide-react';
import { UploadResult } from '../../../types';

interface ResultModalProps {
  result: UploadResult | null;
  onClose: () => void;
  onResetAndTakeAgain: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  onClose,
  onResetAndTakeAgain,
}) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-zinc-950/80 p-6 text-center shadow-[0_16px_50px_0_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white ${
            result.success ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="h-8 w-8" />
          ) : (
            <AlertTriangle className="h-8 w-8" />
          )}
        </div>

        <h2 className="text-lg font-bold text-white">
          {result.success ? 'Foto Berhasil Disimpan' : 'Upload Gagal'}
        </h2>
        <p className="mt-1 text-xs text-zinc-300/80">{result.message}</p>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-xs text-zinc-300/90 space-y-2 backdrop-blur-md">
          {result.success ? (
            <>
              <div>
                <strong className="text-zinc-400 block text-[10px] font-semibold">NAMA FILE:</strong>
                <span className="font-mono text-emerald-300">{result.fileName}</span>
              </div>
              <div>
                <strong className="text-zinc-400 block text-[10px] font-semibold">FOLDER GOOGLE DRIVE:</strong>
                <span className="font-mono text-emerald-300">{result.folderPath}</span>
              </div>
            </>
          ) : (
            <div>
              <strong className="text-zinc-400 block text-[10px] font-semibold">PESAN ERROR:</strong>
              <span className="font-mono text-rose-400">{result.error}</span>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2">
          {result.success && (
            <button
              onClick={onResetAndTakeAgain}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 font-bold text-zinc-950 transition hover:bg-emerald-300 active:scale-[0.98]"
            >
              <Camera className="h-4 w-4" /> Ambil Foto Lagi
            </button>
          )}
          <button
            onClick={onClose}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] text-xs font-semibold text-zinc-300 backdrop-blur-md transition hover:bg-white/15 hover:text-white active:scale-[0.98]"
          >
            <X className="h-4 w-4" /> Tutup
          </button>
        </div>
      </div>
    </div>
  );
};