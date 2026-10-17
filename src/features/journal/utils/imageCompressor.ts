export interface CompressedImage {
  blob: Blob;
  base64: string;
}

export const compressImage = (file: File | Blob, maxDimension = 1200): Promise<CompressedImage> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width: w, height: h } = img;

      if (w > h && w > maxDimension) {
        h = Math.round((h * maxDimension) / w);
        w = maxDimension;
      } else if (h > maxDimension) {
        w = Math.round((w * maxDimension) / h);
        h = maxDimension;
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { alpha: false });

      if (!ctx) {
        reject(new Error('Canvas 2D tidak didukung browser ini.'));
        return;
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Gagal mengompresi gambar.'));
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            const resultStr = reader.result as string;
            const base64 = resultStr.split(',')[1] || '';
            resolve({ blob, base64 });
          };
          reader.onerror = () => reject(new Error('Gagal membaca data base64.'));
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        0.78
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('File yang dipilih bukan gambar yang valid.'));
    };

    img.src = url;
  });
};