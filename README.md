# Jurnal PKL Digital

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android-1192E8?logo=capacitor)](https://capacitorjs.com/)
[![Build Android APK](https://github.com/Navrayze404/Frontend-WebApp-Jurnal-PKL/actions/workflows/build-apk.yml/badge.svg)](https://github.com/Navrayze404/Frontend-WebApp-Jurnal-PKL/actions)

**Jurnal PKL Digital** adalah aplikasi laporan kegiatan Praktik Kerja Lapangan (PKL) berbasis Web & Android (APK Native) yang dirancang dengan antarmuka modern, responsif, dan terintegrasi langsung dengan **Google Drive** melalui **Google Apps Script** sebagai backend serverless.

---

## Fitur Utama

- **Dokumentasi Laporan**: Ambil foto kegiatan langsung dari Kamera HP atau Galeri.
- **Kompresi Otomatis**: Mengompresi ukuran gambar sebelum diunggah agar hemat kuota dan proses cepat.
- **Organisasi Google Drive**: Hasil unggahan foto dan catatan kegiatan tersimpan otomatis secara rapi berdasar struktur folder bulan & minggu.
- **UI/UX Modern (Dark Emerald)**: Mengusung tema Dark Emerald dengan gaya glassmorphism, sudut rounded-3xl, dan tata letak ringkas yang dioptimalkan untuk perangkat mobile.
- **Full-Screen Immersive (Android)**: Pengalaman layaknya aplikasi Android native tanpa gangguan status bar.
- **Otomatisasi Release CI/CD**: Terintegrasi dengan GitHub Actions untuk kompilasi otomatis file .apk setiap kali ada pembaruan kode.

---

## Stack Teknologi

- **Frontend**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Mobile Runtime**: [Capacitor](https://capacitorjs.com/) (Android Core, Status Bar Plugin)
- **Backend**: [Google Apps Script (GAS)](https://script.google.com/)
- **Storage**: [Google Drive API](https://www.google.com/drive/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

---

## Jalankan secara Lokal

### Prasyarat
- **Node.js** v22+
- **npm** v10+


### 1. Clone Repository
```bash
git clone [https://github.com/Navrayze404/Frontend-WebApp-Jurnal-PKL.git](https://github.com/Navrayze404/Frontend-WebApp-Jurnal-PKL.git)
cd Frontend-WebApp-Jurnal-PKL
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Mode Developer
```bash
npm run dev
```

### 4. Buka browser di 
http://localhost:5173

#
## Build APK Android (Lokal)
Jika kamu ingin melakukan kompilasi file .apk di komputer lokal.
### 1. Build React web app
```bash
npm run build
```

### 2. Sinkronisasi ke platform Android Capacitor
```bash
npx cap sync android
```

### 3. Kompilasi ke Debug APK via Gradle CLI
```bash
cd android
.\gradlew assembleDebug
```

### 4. File APK hasil build berada di: 
```bash
android/app/build/outputs/apk/debug/app-debug.apk
```

#
## Panduan Setup Backend (Google Apps Script)

### 1. Buka https://script.google.com dan buat project baru.
### 2. Salin Code.gs dari dalam aplikasi (menu Panduan Setup) atau repo https://github.com/Navrayze404/Backend-WebApp-Jurnal-PKL.
### 3. Simpan dan klik Deploy -> New deployment.
### 4. Pilih Web app:
 - Execute as: Me
 - Who has access: Anyone
### 5. Salin URL Web App (.../exec) lalu masukkan ke dalam form awal aplikasi.
#
## Unduh Aplikasi (.APK)
Kamu dapat mengunduh versi .apk terbaru yang telah di-compile secara otomatis oleh GitHub Actions