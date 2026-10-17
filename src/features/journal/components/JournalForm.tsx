import React from 'react';
import { UploadCloud, RefreshCw, ShieldCheck } from 'lucide-react';

interface JournalFormProps {
  hasPhoto: boolean;
  description: string;
  onChangeDescription: (desc: string) => void;
  onSubmit: () => void;
  onResetPhoto: () => void;
  isLoading: boolean;
}

export const JournalForm: React.FC<JournalFormProps> = ({
  hasPhoto,
  description,
  onChangeDescription,
  onSubmit,
  onResetPhoto,
  isLoading,
}) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-900/40 bg-[#0c1612] p-4 shadow-xl">
      {!hasPhoto ? (
        <div className="flex h-full min-h-[160px] flex-col items-center justify-center text-center">
          <p className="text-xs text-zinc-500">
            Form deskripsi akan aktif secara otomatis setelah foto dipilih.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-300">
            <span>Catatan Kegiatan</span>
            <span className={description.length >= 180 ? 'text-amber-400' : 'text-zinc-500'}>
              {description.length}/200
            </span>
          </div>

          <textarea
            maxLength={200}
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Tuliskan ringkasan kegiatan PKL hari ini..."
            className="min-h-[110px] w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 text-xs text-zinc-100 placeholder-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/60 sm:min-h-[140px] sm:text-sm"
          />

          <div className="mt-1 flex flex-col gap-2">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50"
            >
              <UploadCloud className="h-4 w-4" /> Simpan ke Google Drive
            </button>
            <button
              type="button"
              onClick={onResetPhoto}
              disabled={isLoading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-transparent text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 active:scale-[0.98]"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Ganti Gambar
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-emerald-900/30 pt-3 text-[11px] text-zinc-400">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
        <span>Terkompresi otomatis & aman langsung ke Drive.</span>
      </div>
    </div>
  );
};