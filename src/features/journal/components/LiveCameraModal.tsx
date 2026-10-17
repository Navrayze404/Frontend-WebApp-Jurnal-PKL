import React from 'react';
import { Camera, SwitchCamera, X } from 'lucide-react';

interface LiveCameraModalProps {
  isOpen: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onCapture: () => void;
  onSwitchCamera: () => void;
  onClose: () => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({
  isOpen,
  videoRef,
  onCapture,
  onSwitchCamera,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-zinc-950/80 p-5 shadow-[0_16px_50px_0_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Kamera Live Jurnal</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-zinc-300 transition hover:bg-white/20 hover:text-white active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-4 rounded-xl border border-white/25" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={onCapture}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-400 font-bold text-zinc-950 transition hover:bg-emerald-300 active:scale-[0.98]"
          >
            <Camera className="h-4 w-4" /> Ambil Foto
          </button>
          <button
            onClick={onSwitchCamera}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98]"
          >
            <SwitchCamera className="h-4 w-4" /> Ganti Kamera
          </button>
        </div>
      </div>
    </div>
  );
};