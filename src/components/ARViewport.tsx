import React, { useState, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Layers, 
  Info, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Volume2, 
  History, 
  Crosshair, 
  Eye,
  Sliders,
  Share2,
  BookmarkCheck,
  Check
} from 'lucide-react';
import { LandmarkRecognition, GroundedHistory, ARHotspot } from '../types';

interface ARViewportProps {
  photoUrl: string;
  landmark: LandmarkRecognition;
  history: GroundedHistory;
  onPlayNarration: () => void;
  isPlayingAudio: boolean;
  onSaveToPassport: () => void;
  isSaved: boolean;
}

export const ARViewport: React.FC<ARViewportProps> = ({
  photoUrl,
  landmark,
  history,
  onPlayNarration,
  isPlayingAudio,
  onSaveToPassport,
  isSaved,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<ARHotspot | null>(
    landmark.arHotspots?.[0] || null
  );
  const [showHUD, setShowHUD] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt Effect on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 8, // degrees
      y: -y * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullScreen(false);
    }
  };

  // Era filter styles
  const eras = landmark.historicalEras || [
    { eraName: 'Modern Era', yearSpan: 'Present Day', description: 'Contemporary status', filterColor: '#10b981' },
    { eraName: 'Industrial Age', yearSpan: 'Late 19th Century', description: 'Early photographs & engineering', filterColor: '#f59e0b' },
    { eraName: 'Architectural Blueprint', yearSpan: 'Inception', description: 'Drafting plans & structural foundation', filterColor: '#38bdf8' },
  ];

  const currentEra = eras[activeEraIndex] || eras[0];

  return (
    <div className="space-y-4">
      {/* Viewport Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all duration-300 ${
          isFullScreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[540px] md:h-[580px]'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Tilting Visual Plane */}
        <div
          className="relative w-full h-full transition-transform duration-150 ease-out"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isFullScreen ? 1 : 1.02})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main Landmark Photo */}
          <img
            src={photoUrl}
            alt={landmark.landmarkName}
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter:
                activeEraIndex === 0
                  ? 'none'
                  : activeEraIndex === 1
                  ? 'sepia(0.65) contrast(1.15) brightness(0.95)'
                  : 'hue-rotate(180deg) invert(0.85) contrast(1.4) saturate(1.2)',
            }}
          />

          {/* Era Filter FX Layer */}
          {activeEraIndex === 1 && (
            <div className="absolute inset-0 bg-amber-950/20 mix-blend-color pointer-events-none" />
          )}
          {activeEraIndex === 2 && (
            <div className="absolute inset-0 bg-cyan-950/40 mix-blend-difference pointer-events-none ar-grid-overlay" />
          )}

          {/* AR Wireframe Laser / Scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />
          {showHUD && (
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent pointer-events-none animate-scanline" />
          )}

          {/* Interactive AR Hotspot Pins */}
          {showHotspots &&
            landmark.arHotspots?.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`,
                    transform: 'translate(-50%, -50%) translateZ(30px)',
                  }}
                  className="absolute z-20 group"
                >
                  <button
                    onClick={() => setSelectedHotspot(spot)}
                    className={`relative p-2 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 scale-125 shadow-lg shadow-amber-400/50'
                        : 'bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-400/60 hover:scale-110 hover:border-amber-300'
                    }`}
                  >
                    {/* Pulsing Radar Ring */}
                    <span className="absolute inset-0 rounded-full border border-teal-400 animate-radar pointer-events-none" />
                    <Crosshair className="w-4 h-4" />
                  </button>

                  {/* Hotspot Label Pill */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tight whitespace-nowrap pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-950/90 text-teal-300 border border-teal-500/30 opacity-90 group-hover:opacity-100'
                    }`}
                  >
                    {spot.title}
                  </div>
                </div>
              );
            })}
        </div>

        {/* HUD Elements (Glassmorphic AR Overlays) */}
        {showHUD && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 z-30">
            {/* Top Bar HUD */}
            <div className="flex items-start justify-between gap-3 pointer-events-auto">
              {/* Landmark Identification Badge */}
              <div className="bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 max-w-sm shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold tracking-wider">
                    RECOGNIZED: {landmark.confidence}% CONFIDENCE
                  </span>
                </div>
                <h2 className="font-display font-bold text-lg text-white leading-tight">
                  {landmark.landmarkName}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-teal-300">
                    <MapPin className="w-3 h-3" />
                    {landmark.city}, {landmark.country}
                  </span>
                  <span>•</span>
                  <span>{landmark.builtEra}</span>
                </div>
              </div>

              {/* Top Right Controls & Sensor Readout */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onPlayNarration}
                    className={`px-3.5 py-1.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all shadow-lg ${
                      isPlayingAudio
                        ? 'bg-amber-400 text-slate-950 font-bold animate-pulse'
                        : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold shadow-teal-500/20'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlayingAudio ? 'Narration Playing...' : 'Play AR Clip'}</span>
                  </button>

                  <button
                    onClick={onSaveToPassport}
                    className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-all ${
                      isSaved
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                    title={isSaved ? 'Saved in Passport' : 'Save to Travel Passport'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleFullScreen}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-slate-300 transition-all"
                    title="Toggle Fullscreen View"
                  >
                    {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Spatial Sensor Tag */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 font-mono text-[11px] text-slate-400">
                  <Compass className="w-3 h-3 text-teal-400 animate-spin-slow" />
                  <span>GPS: {landmark.coordinates.lat.toFixed(4)}°N, {landmark.coordinates.lng.toFixed(4)}°E</span>
                </div>
              </div>
            </div>

            {/* Bottom HUD: Selected Hotspot Hologram & Time Travel Eras */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 pointer-events-auto">
              {/* Selected Hotspot Holographic Card */}
              {selectedHotspot && (
                <div className="w-full md:max-w-md bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-teal-500/40 shadow-2xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-amber-300 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                      {selectedHotspot.category}
                    </span>
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="text-slate-400 hover:text-white text-xs font-mono"
                    >
                      Close ✕
                    </button>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-slate-100">
                    {selectedHotspot.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {selectedHotspot.description}
                  </p>
                  {selectedHotspot.funFact && (
                    <div className="mt-2 text-[11px] text-teal-300/90 font-mono bg-teal-950/40 border border-teal-500/20 p-2 rounded-lg flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{selectedHotspot.funFact}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Time Travel Historical Eras Bar */}
              <div className="bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 flex items-center gap-1.5 self-end shrink-0 shadow-xl">
                <div className="flex items-center gap-1 px-2 text-[11px] font-mono text-slate-400">
                  <History className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">AR Lens:</span>
                </div>
                {eras.map((era, idx) => (
                  <button
                    key={era.eraName}
                    onClick={() => setActiveEraIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      activeEraIndex === idx
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {era.eraName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Viewport Floating Settings Button */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-full border border-slate-800 text-[11px] font-mono text-slate-400">
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                showHotspots ? 'text-teal-300 font-semibold' : 'text-slate-500'
              }`}
            >
              Pins {showHotspots ? 'ON' : 'OFF'}
            </button>
            <span>•</span>
            <button
              onClick={() => setShowHUD(!showHUD)}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                showHUD ? 'text-teal-300 font-semibold' : 'text-slate-500'
              }`}
            >
              HUD {showHUD ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
