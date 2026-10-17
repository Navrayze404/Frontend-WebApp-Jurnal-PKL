import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoadingOverlay } from './components/LoadingOverlay';
import { SetupForm } from './features/setup/components/SetupForm';
import { GuideModal } from './features/setup/components/GuideModal';
import { CameraView } from './features/journal/components/CameraView';
import { JournalForm } from './features/journal/components/JournalForm';
import { LiveCameraModal } from './features/journal/components/LiveCameraModal';
import { ResultModal } from './features/journal/components/ResultModal';
import { useJournal } from './features/journal/hooks/useJournal';
import { useCamera } from './features/journal/hooks/useCamera';

export default function App() {
  const {
    scriptUrl,
    saveScriptUrl,
    clearScriptUrl,
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
  } = useJournal();

  const camera = useCamera();
  const [showGuide, setShowGuide] = useState(false);

  const handleCaptureLive = async () => {
    try {
      const blob = await camera.capturePhoto();
      await handleProcessFile(blob, 'foto-kamera-jurnal.jpg');
      camera.stopCamera();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal mengambil foto dari kamera.');
    }
  };

  if (!scriptUrl) {
  return (
    <main className="h-dvh w-full overflow-hidden bg-zinc-950">
      <SetupForm onSaveUrl={saveScriptUrl} onOpenGuide={() => setShowGuide(true)} />
      <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </main>
  );
}

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
      <Header dateInfo={dateInfo} onChangeUrl={clearScriptUrl} />

      <main className="mx-auto max-w-4xl px-4 pb-12">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <CameraView
            previewUrl={previewUrl}
            onOpenLiveCamera={() => camera.startCamera().catch((err) => alert(err.message))}
            onSelectGalleryFile={(file) => handleProcessFile(file, file.name)}
          />

          <JournalForm
            hasPhoto={Boolean(previewUrl)}
            description={description}
            onChangeDescription={setDescription}
            onSubmit={uploadJournal}
            onResetPhoto={resetPhotoState}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Modals */}
      <LoadingOverlay isLoading={isLoading} />
      <LiveCameraModal
        isOpen={camera.isOpen}
        videoRef={camera.videoRef}
        onCapture={handleCaptureLive}
        onSwitchCamera={camera.switchCamera}
        onClose={camera.stopCamera}
      />
      <ResultModal
        result={uploadResult}
        onClose={() => setUploadResult(null)}
        onResetAndTakeAgain={() => {
          setUploadResult(null);
          resetPhotoState();
        }}
      />
      <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}