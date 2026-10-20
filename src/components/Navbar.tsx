import React from 'react';
import { Camera, Compass, BookOpen, Globe2, Sparkles, Volume2, Search, Info } from 'lucide-react';

interface NavbarProps {
  activeTab: 'scanner' | 'tour' | 'passport' | 'explore';
  setActiveTab: (tab: 'scanner' | 'tour' | 'passport' | 'explore') => void;
  savedCount: number;
  hasActiveLandmark: boolean;
  onOpenInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  hasActiveLandmark,
  onOpenInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('scanner')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[2px] shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-teal-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200 bg-clip-text text-transparent">
                AuraLens
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-400 border border-teal-500/30">
                AR Tour
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              City Photo Recognition • Grounded History • AR Narration
            </p>
          </div>
        </div>

        {/* AI Tech Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px] text-slate-400">Vision:</span>
            <span className="font-semibold text-amber-300">Gemini 4 Argon</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-[11px] text-slate-400">Live Search:</span>
            <span className="font-semibold text-blue-300">Gemini 3.8 Flash</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] text-slate-400">Audio:</span>
            <span className="font-semibold text-emerald-300">Gemini 3.8 TTS</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'scanner'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Snap Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('tour')}
            disabled={!hasActiveLandmark}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'tour'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : hasActiveLandmark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                : 'text-slate-600 cursor-not-allowed opacity-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AR Tour</span>
            {hasActiveLandmark && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'passport'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Passport</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-mono font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'explore'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span className="hidden md:inline">Landmarks</span>
          </button>

          <button
            onClick={onOpenInfo}
            title="App Intelligence Architecture"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors ml-1"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
