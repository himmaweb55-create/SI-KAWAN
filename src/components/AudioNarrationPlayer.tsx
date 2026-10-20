import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Download, 
  Mic, 
  Radio, 
  Sliders,
  Check,
  RefreshCw
} from 'lucide-react';
import { AudioNarration } from '../types';

interface AudioNarrationPlayerProps {
  narrationScript: string;
  initialAudio?: AudioNarration | null;
  landmarkName: string;
  city: string;
  onRegenerateVoice: (voiceName: string, style: string) => Promise<void>;
  isGeneratingVoice: boolean;
}

const PREBUILT_VOICES = [
  { id: 'Puck', label: 'Puck', desc: 'Enthusiastic & Bright Adventurer' },
  { id: 'Kore', label: 'Kore', desc: 'Warm, Articulate Culturalist' },
  { id: 'Fenrir', label: 'Fenrir', desc: 'Deep, Grand Historian' },
  { id: 'Zephyr', label: 'Zephyr', desc: 'Contemporary City Explorer' },
  { id: 'Charon', label: 'Charon', desc: 'Mysterious & Dramatic Storyteller' },
];

const NARRATION_STYLES = [
  { id: 'Enthusiastic, vivid cultural tour guide', label: 'Immersive Tour Docent' },
  { id: 'Dramatic architectural historian with awe-inspiring cadence', label: 'Epic Monumental' },
  { id: 'Intriguing storyteller sharing ancient secrets and local lore', label: 'Myths & Mysteries' },
  { id: 'Crisp, witty modern travel vlogger', label: 'Casual & Vibrant' },
];

export const AudioNarrationPlayer: React.FC<AudioNarrationPlayerProps> = ({
  narrationScript,
  initialAudio,
  landmarkName,
  city,
  onRegenerateVoice,
  isGeneratingVoice,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(initialAudio?.voice || 'Puck');
  const [selectedStyle, setSelectedStyle] = useState(NARRATION_STYLES[0].id);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioBlobUrlRef = useRef<string | null>(null);

  // Clean and prepare audio source from base64 WAV
  useEffect(() => {
    if (initialAudio?.audioData) {
      if (audioBlobUrlRef.current) {
        URL.revokeObjectURL(audioBlobUrlRef.current);
      }
      try {
        const byteCharacters = atob(initialAudio.audioData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: initialAudio.mimeType || 'audio/wav' });
        const url = URL.createObjectURL(blob);
        audioBlobUrlRef.current = url;

        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.load();
        }
      } catch (e) {
        console.warn('Failed to parse base64 audio:', e);
      }
    }

    return () => {
      if (audioBlobUrlRef.current) {
        URL.revokeObjectURL(audioBlobUrlRef.current);
      }
    };
  }, [initialAudio]);

  const togglePlay = () => {
    if (!audioRef.current && !initialAudio?.audioData) {
      // Fallback: browser speech synthesis if no pre-rendered audio
      if ('speechSynthesis' in window) {
        if (isPlaying) {
          window.speechSynthesis.cancel();
          setIsPlaying(false);
        } else {
          const utterance = new SpeechSynthesisUtterance(narrationScript.replace(/<[^>]*>/g, ''));
          utterance.rate = 1.0;
          utterance.onend = () => setIsPlaying(false);
          window.speechSynthesis.speak(utterance);
          setIsPlaying(true);
        }
      }
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Audio play error:', err));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDownloadWav = () => {
    if (!audioBlobUrlRef.current) return;
    const a = document.createElement('a');
    a.href = audioBlobUrlRef.current;
    a.download = `${landmarkName.replace(/\s+/g, '_')}_AR_Narration.wav`;
    a.click();
  };

  // Format time (0:00)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Split script into sentences for subtitles teleprompter
  const sentences = narrationScript
    .replace(/<breath>/g, '...')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  // Active sentence index based on current playback progress
  const activeSentenceIndex = Math.min(
    Math.floor((currentTime / (duration || 30)) * sentences.length),
    sentences.length - 1
  );

  return (
    <div className="bg-slate-900/90 rounded-3xl p-5 md:p-6 border border-slate-800 shadow-xl space-y-5">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onLoadedMetadata={() => {
          if (audioRef.current?.duration) {
            setDuration(audioRef.current.duration);
          }
        }}
      />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-base text-slate-100">
                AR Narrated Audio Guide
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                Gemini 3.8 Flash TTS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Voice: <span className="text-teal-300 font-semibold">{selectedVoice}</span> • {landmarkName}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              showVoiceSettings
                ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Voice Studio</span>
          </button>

          {audioBlobUrlRef.current && (
            <button
              onClick={handleDownloadWav}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Download AR Audio Clip (.wav)"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Voice Customizer Drawer */}
      {showVoiceSettings && (
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">
                Select Tour Guide Voice:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {PREBUILT_VOICES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVoice(v.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all ${
                      selectedVoice === v.id
                        ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{v.label}</div>
                      <div className="text-[10px] text-slate-400">{v.desc}</div>
                    </div>
                    {selectedVoice === v.id && <Check className="w-3.5 h-3.5 text-teal-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">
                Narration Tone / Persona:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {NARRATION_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all ${
                      selectedStyle === s.id
                        ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-medium">{s.label}</span>
                    {selectedStyle === s.id && <Check className="w-3.5 h-3.5 text-teal-400" />}
                  </button>
                ))}
              </div>

              {/* Regenerate Voice Button */}
              <button
                onClick={() => onRegenerateVoice(selectedVoice, selectedStyle)}
                disabled={isGeneratingVoice}
                className="mt-3 w-full py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingVoice ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Voice...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Apply Voice & Regenerate Clip</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animated Waveform Visualizer */}
      <div className="h-14 bg-slate-950/80 rounded-2xl border border-slate-800/80 flex items-center justify-center gap-1.5 px-4 overflow-hidden relative">
        {Array.from({ length: 36 }).map((_, i) => {
          // Dynamic bar heights
          const baseHeight = ((Math.sin(i * 0.4) + 1) / 2) * 28 + 6;
          const activeHeight = isPlaying
            ? Math.max(8, (Math.sin(i * 0.5 + currentTime * 8) + 1) * 20 + 8)
            : baseHeight;

          return (
            <div
              key={i}
              style={{ height: `${activeHeight}px` }}
              className={`w-1 rounded-full transition-all duration-100 ${
                isPlaying
                  ? 'bg-gradient-to-t from-teal-500 to-amber-400'
                  : 'bg-slate-700/60'
              }`}
            />
          );
        })}

        {/* Live Audio Mode Indicator */}
        <div className="absolute right-3 top-2 flex items-center gap-1 text-[9px] font-mono text-slate-500">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying ? 'bg-amber-400 animate-ping' : 'bg-slate-600'
            }`}
          />
          <span>24kHz WAV</span>
        </div>
      </div>

      {/* Audio Scrubbing Bar & Controls */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={duration || 30}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
        />

        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  setCurrentTime(0);
                }
              }}
              className="hover:text-slate-200 transition-colors"
              title="Restart"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center font-bold transition-transform hover:scale-105 active:scale-95 shadow-md shadow-teal-500/30"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="hover:text-slate-200 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Synchronized Subtitles / Teleprompter */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase text-teal-400 font-semibold tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Teleprompter / Live Script</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          {sentences.map((sentence, idx) => (
            <span
              key={idx}
              className={`transition-colors duration-200 mr-1.5 ${
                idx === activeSentenceIndex && isPlaying
                  ? 'text-amber-300 font-medium bg-amber-400/10 px-1 py-0.5 rounded'
                  : 'text-slate-300'
              }`}
            >
              {sentence}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
