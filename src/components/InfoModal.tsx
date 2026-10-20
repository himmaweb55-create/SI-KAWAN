import React from 'react';
import { Sparkles, Search, Volume2, Compass, Layers, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-mono"
        >
          ✕
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
            <Compass className="w-4 h-4 text-teal-400 animate-spin-slow" />
            <span>AuraLens Engine Architecture</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            How AuraLens Photo Tourism Works
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            AuraLens transforms any city smartphone photo into an interactive, spatial Augmented Reality narrated documentary.
          </p>
        </div>

        {/* 3 Core Engines */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-display font-semibold text-sm text-slate-100">
                  1. Visual Landmark Recognition
                </h4>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold">
                  Gemini 4 Argon
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Processes photo pixels to identify monuments, cathedrals, temples, or towers. Maps exact architectural coordinates, style, construction era, and 3D AR anchor points for hotspots.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-blue-500/30 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-display font-semibold text-sm text-slate-100">
                  2. Live Historical Grounding
                </h4>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 font-bold">
                  Gemini 3.8 Flash + googleSearch
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cross-references the identified landmark against the live web via Google Search Grounding to pull recent archaeological discoveries, up-to-date restoration updates, visitor advice, and source citations.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-display font-semibold text-sm text-slate-100">
                  3. Cinematic AR Audio Narration
                </h4>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold">
                  Gemini 3.8 Flash TTS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Synthesizes a 24kHz WAV spoken audio tour clip with expressive pacing, breath cues, and customizable voice personas (Puck, Kore, Fenrir, Zephyr, Charon) synced with a live teleprompter.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
        >
          Got it, let's explore!
        </button>
      </div>
    </div>
  );
};
