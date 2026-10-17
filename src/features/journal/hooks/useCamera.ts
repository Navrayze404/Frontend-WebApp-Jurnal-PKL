import { useState, useRef, useCallback } from 'react';

export const useCamera = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsOpen(false);
  }, []);

  const startCamera = useCallback(async (facing: 'user' | 'environment' = facingMode) => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 960 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsOpen(true);
    } catch {
      stopCamera();
      throw new Error('Kamera tidak bisa dibuka. Pastikan izin kamera aktif dan menggunakan HTTPS.');
    }
  }, [facingMode, stopCamera]);

  const switchCamera = useCallback(() => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  }, [facingMode, startCamera]);

  const capturePhoto = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current;
      if (!video || !video.videoWidth) {
        return reject(new Error('Kamera belum siap.'));
      }

      const max = 900;
      let w = video.videoWidth;
      let h = video.videoHeight;

      if (w > h && w > max) {
        h = Math.round((h * max) / w);
        w = max;
      } else if (h > max) {
        w = Math.round((w * max) / h);
        h = max;
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { alpha: false });

      if (!ctx) return reject(new Error('Canvas gagal diinisialisasi.'));

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(video, 0, 0, w, h);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Gagal mengambil frame foto dari kamera.'));
      }, 'image/jpeg', 0.78);
    });
  }, []);

  return {
    isOpen,
    videoRef,
    startCamera,
    stopCamera,
    switchCamera,
    capturePhoto,
  };
};