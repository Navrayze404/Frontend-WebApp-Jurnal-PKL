import { useState, useEffect, useCallback } from 'react';
import { DateInfo, UploadResult } from '../../../types';
import { getDateInfo } from '../utils/dateHelper';
import { compressImage } from '../utils/imageCompressor';

const STORAGE_KEY = 'pklScriptUrl';

export const useJournal = () => {
  const [scriptUrl, setScriptUrlState] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(null);
  const [compressedBase64, setCompressedBase64] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateInfo, setDateInfo] = useState<DateInfo>(getDateInfo());
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setScriptUrlState(saved);
  }, []);

  const saveScriptUrl = useCallback((url: string) => {
    localStorage.setItem(STORAGE_KEY, url);
    setScriptUrlState(url);
  }, []);

  const clearScriptUrl = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setScriptUrlState('');
  }, []);

  const handleProcessFile = async (file: File | Blob, customName = 'foto-jurnal.jpg') => {
    if ('size' in file && file.size > 8 * 1024 * 1024) {
      throw new Error('Ukuran file maksimal 8MB.');
    }
    setIsLoading(true);
    try {
      const { blob, base64 } = await compressImage(file);
      if (base64.length > 2600000) {
        throw new Error('Ukuran foto terlalu besar setelah dikompres. Coba pilih foto lain.');
      }
      
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const newPreview = URL.createObjectURL(blob);

      setSelectedFile({ name: customName, size: blob.size });
      setCompressedBase64(base64);
      setPreviewUrl(newPreview);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPhotoState = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setCompressedBase64('');
    setPreviewUrl('');
    setDescription('');
  }, [previewUrl]);

  const uploadJournal = async () => {
    if (!scriptUrl) throw new Error('URL Google Apps Script belum diatur.');
    if (!compressedBase64) throw new Error('Silakan pilih atau ambil foto terlebih dahulu.');

    setIsLoading(true);
    const now = new Date();
    const info = getDateInfo(now);
    setDateInfo(info);

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foto: compressedBase64,
          deskripsi: description.trim(),
          timestamp: now.toISOString(),
        }),
      });

      const res: UploadResult = {
        success: true,
        message: 'Data telah dikirim ke Google Apps Script.',
        fileName: info.fileName,
        folderPath: info.folderPath,
      };
      setUploadResult(res);
      return res;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan saat upload.';
      const res: UploadResult = {
        success: false,
        message: 'Upload gagal',
        error: errorMsg,
      };
      setUploadResult(res);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scriptUrl,
    saveScriptUrl,
    clearScriptUrl,
    selectedFile,
    previewUrl,
    description,
    setDescription,
    isLoading,
    dateInfo,
    uploadResult,
    setUploadResult,
    handleProcessFile,
    resetPhotoState,
    uploadJournal,
  };
};