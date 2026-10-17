import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

interface CameraViewProps {
  previewUrl: string;
  onOpenLiveCamera: () => void;
  onSelectGalleryFile: (file: File) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  previewUrl,
  onOpenLiveCamera,
  onSelectGalleryFile,
}) => {
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelectGalleryFile(file);
      e.target.value = '';
    }
  };

  return (
    <div className="rounded-3xl border border-emerald-900/40 bg-[#0c1612] p-4 shadow-xl transition-all">
      <div className="relative min-h-[280px] w-full overflow-hidden rounded-2xl border border-dashed border-emerald-900/50 bg-zinc-950/60 sm:min-h-[380px]">
        {previewUrl ? (
          <div className="relative h-full w-full">
            <img
              src={previewUrl}
              alt="Preview Foto Jurnal"
              className="h-full w-full max-h-[450px] object-cover"
            />
            {/* Status Badge saat foto sudah siap */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-zinc-950/80 px-3 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-md shadow-lg">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Foto Siap</span>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center p-6 text-center sm:min-h-[380px]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-zinc-100">Dokumentasi Laporan</p>
            <p className="mt-1 max-w-[220px] text-xs text-zinc-400">
              Ambil foto kegiatan PKL hari ini langsung dari kamera atau galeri.
            </p>
          </div>
        )}
      </div>

      {/* Sembunyikan tombol input jika foto sudah dipilih */}
      {!previewUrl && (
        <div className="mt-4 grid grid-cols-2 gap-2.5 animate-modal-in">
          <button
            type="button"
            onClick={onOpenLiveCamera}
            className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 text-xs font-semibold text-zinc-100 transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            <Camera className="h-4 w-4 text-emerald-400" /> Ambil Foto
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 text-xs font-semibold text-zinc-100 transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            <ImageIcon className="h-4 w-4 text-blue-400" /> Buka Galeri
          </button>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};