import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  Compass, 
  Sliders, 
  Zap, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Crosshair
} from 'lucide-react';
import { CuratedLandmark } from '../types';

interface CameraCaptureProps {
  onPhotoSelected: (imageBase64: string, hint?: string) => void;
  curatedLandmarks: CuratedLandmark[];
  isAnalyzing: boolean;
  analysisStep: string;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onPhotoSelected,
  curatedLandmarks,
  isAnalyzing,
  analysisStep,
}) => {
  const [mode, setMode] = useState<'camera' | 'upload' | 'curated'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userHint, setUserHint] = useState('');
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize camera stream
  const startCamera = async (facing: 'environment' | 'user' = facingMode) => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access issue:', err);
      setCameraActive(false);
      setCameraError(
        'Unable to access camera or permission denied. You can still upload any photo or select from curated world landmarks below!'
      );
      // Fallback to upload mode if camera is unavailable
      setMode('upload');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (mode === 'camera' && !previewImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [mode, previewImage]);

  const toggleCameraFacing = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  // Capture frame from webcam video to base64
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the current video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPreviewImage(dataUrl);
    setSelectedDemoId(null);
    stopCamera();
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewImage(dataUrl);
      setSelectedDemoId(null);
    };
    reader.readAsDataURL(file);
  };

  // Handle picking curated demo landmark
  const handleSelectCurated = async (landmark: CuratedLandmark) => {
    setSelectedDemoId(landmark.id);
    try {
      // Fetch the image and convert to base64 for seamless Gemini processing
      const response = await fetch(landmark.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setPreviewImage(base64data);
        setUserHint(`${landmark.name}, ${landmark.city}`);
      };
      reader.readAsDataURL(blob);
    } catch {
      // If direct fetch is CORS restricted, pass the remote URL directly
      setPreviewImage(landmark.imageUrl);
      setUserHint(`${landmark.name}, ${landmark.city}`);
    }
  };

  const handleRetake = () => {
    setPreviewImage(null);
    setSelectedDemoId(null);
    if (mode === 'camera') {
      startCamera();
    }
  };

  const handleTriggerAnalysis = () => {
    if (!previewImage) return;
    onPhotoSelected(previewImage, userHint);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setPreviewImage(null);
              setMode('camera');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'camera'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>AR Live Camera</span>
          </button>

          <button
            onClick={() => {
              setPreviewImage(null);
              setMode('upload');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'upload'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => setMode('curated')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'curated'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>World Demos ({curatedLandmarks.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Multimodal Vision Ready</span>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[460px] flex items-center justify-center">
        {/* If Camera is active and no preview image yet */}
        {mode === 'camera' && !previewImage && (
          <div className="relative w-full h-[520px] bg-slate-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* AR Viewfinder Overlay */}
            <div className="absolute inset-0 pointer-events-none ar-grid-overlay flex flex-col justify-between p-6">
              {/* Top HUD */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-teal-500/30 text-teal-300 font-mono text-xs">
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>BEARING: 042° NNE</span>
                  <span className="text-slate-500">|</span>
                  <span>ALT: 48m</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 font-mono text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>TARGET LOCK ACTIVE</span>
                </div>
              </div>

              {/* Center AR Reticle & Brackets */}
              <div className="relative self-center w-72 h-72 border border-teal-500/40 rounded-2xl flex items-center justify-center">
                {/* Corner brackets */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-teal-400" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-teal-400" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-teal-400" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-teal-400" />

                {/* Laser scan line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-scanline" />

                {/* Reticle icon */}
                <Crosshair className="w-12 h-12 text-teal-400/50 animate-pulse" />
                <div className="absolute -bottom-7 text-[11px] font-mono text-teal-300/80 bg-slate-950/70 px-2 py-0.5 rounded">
                  FRAME MONUMENT IN CENTER
                </div>
              </div>

              {/* Bottom Instructions */}
              <div className="flex items-center justify-center">
                <span className="text-xs text-slate-400 font-mono bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
                  Aim at cathedral, tower, bridge, temple, or historic facade
                </span>
              </div>
            </div>

            {/* Bottom Camera Action Controls */}
            <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-6 z-20">
              <button
                type="button"
                onClick={toggleCameraFacing}
                title="Switch Camera (Front/Back)"
                className="p-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Shutter Capture Button */}
              <button
                type="button"
                onClick={capturePhoto}
                className="w-20 h-20 rounded-full border-4 border-teal-400/80 p-1 bg-slate-950/60 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal-500/30 group"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 group-hover:from-teal-400 group-hover:to-cyan-300 transition-colors flex items-center justify-center shadow-inner">
                  <Camera className="w-7 h-7 text-slate-950" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode('upload')}
                title="Switch to Photo Upload"
                className="p-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* If Camera has Error */}
        {mode === 'camera' && !cameraActive && !previewImage && cameraError && (
          <div className="p-8 text-center max-w-md">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-200 mb-2">
              Camera Access Optional
            </h3>
            <p className="text-sm text-slate-400 mb-6">{cameraError}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setMode('upload')}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-semibold text-sm hover:bg-teal-400 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload a Photo
              </button>
              <button
                onClick={() => setMode('curated')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-medium text-sm hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pick a World Landmark
              </button>
            </div>
          </div>
        )}

        {/* File Upload Mode */}
        {mode === 'upload' && !previewImage && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setPreviewImage(ev.target?.result as string);
                  setSelectedDemoId(null);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full h-[480px] p-8 border-2 border-dashed border-slate-700/80 hover:border-teal-400/60 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-900/40 group m-4"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-teal-500 transition-all shadow-xl">
                <Upload className="w-9 h-9 text-teal-400 group-hover:text-teal-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <h3 className="font-display font-semibold text-lg text-slate-100 mb-1">
              Drop City Photo or Click to Upload
            </h3>
            <p className="text-sm text-slate-400 max-w-sm text-center mb-5">
              Supports JPEG, PNG, WEBP of world monuments, temples, statues, towers, or urban plazas.
            </p>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
              <span>Full resolution analyzed via Gemini 4 Argon</span>
            </div>
          </div>
        )}

        {/* Curated World Landmarks Grid Mode */}
        {mode === 'curated' && !previewImage && (
          <div className="w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-base text-slate-200">
                  Select a World Landmark for Instant Tour
                </h3>
                <p className="text-xs text-slate-400">
                  Click any landmark to load high-resolution photo and initiate recognition
                </p>
              </div>
              <button
                onClick={() => setMode('camera')}
                className="text-xs text-teal-400 hover:text-teal-300 font-medium"
              >
                Back to Camera
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {curatedLandmarks.map((lm) => (
                <div
                  key={lm.id}
                  onClick={() => handleSelectCurated(lm)}
                  className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedDemoId === lm.id
                      ? 'border-teal-400 ring-2 ring-teal-400/40 shadow-lg'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="h-32 sm:h-36 overflow-hidden">
                    <img
                      src={lm.thumbnail}
                      alt={lm.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-3">
                    <span className="font-display font-semibold text-xs text-white leading-tight">
                      {lm.name}
                    </span>
                    <span className="text-[10px] text-teal-300 font-mono">
                      {lm.city}, {lm.country}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Preview Stage (Ready to Analyze) */}
        {previewImage && (
          <div className="relative w-full h-[520px] bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={previewImage}
              alt="Landmark preview"
              className="w-full h-full object-cover"
            />

            {/* Futuristic AR Scan Overlay preview */}
            <div className="absolute inset-0 bg-slate-950/20 ar-grid-overlay pointer-events-none" />

            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-teal-400 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-teal-400 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-teal-400 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-teal-400 pointer-events-none" />

            {/* Top Control Chips */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Image Ready for Analysis
              </span>

              <button
                onClick={handleRetake}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md hover:bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retake / New Photo
              </button>
            </div>

            {/* Bottom Analysis Trigger Bar */}
            <div className="absolute bottom-4 inset-x-4 z-20">
              <div className="bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
                {/* Optional Hint input */}
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={userHint}
                    onChange={(e) => setUserHint(e.target.value)}
                    disabled={isAnalyzing}
                    placeholder="Optional hint: e.g., 'Taken in Rome', or 'Near the old bridge'"
                    className="flex-1 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Main Action Button */}
                <button
                  type="button"
                  onClick={handleTriggerAnalysis}
                  disabled={isAnalyzing}
                  className={`w-full py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isAnalyzing
                      ? 'bg-slate-800 text-slate-400 cursor-wait'
                      : 'bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 text-slate-950 hover:opacity-95 hover:shadow-teal-500/25 hover:scale-[1.01]'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-teal-400" />
                      <span>{analysisStep || 'Analyzing Landmark with AI...'}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Scan Landmark & Build AR Narrated Clip</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Curated Thumbnails bar when not in preview */}
      {!previewImage && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">Quick test landmarks:</span>
            <button
              onClick={() => setMode('curated')}
              className="text-teal-400 hover:underline"
            >
              View all 6 demos →
            </button>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {curatedLandmarks.map((lm) => (
              <button
                key={lm.id}
                onClick={() => handleSelectCurated(lm)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 text-slate-300 hover:text-white transition-all shrink-0 text-xs group"
              >
                <img
                  src={lm.thumbnail}
                  alt={lm.name}
                  className="w-5 h-5 rounded-md object-cover"
                />
                <span className="font-medium">{lm.name}</span>
                <span className="text-[10px] text-slate-500">({lm.city})</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
