import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Menyimpan ke Google Drive...',
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="w-full max-w-xs rounded-3xl border border-white/15 bg-zinc-950/80 p-6 text-center shadow-[0_16px_50px_0_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-emerald-400" />
        <p className="text-sm font-bold text-white">{message}</p>
        <small className="mt-1 block text-[11px] text-zinc-300/70">
          Mohon tunggu, foto sedang dikompresi & dikirim.
        </small>
      </div>
    </div>
  );
};