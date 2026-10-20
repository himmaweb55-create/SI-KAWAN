import React from 'react';
import { 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Camera, 
  HelpCircle, 
  CheckCircle2, 
  Lightbulb, 
  Landmark, 
  Scroll
} from 'lucide-react';
import { GroundedHistory, LandmarkRecognition } from '../types';

interface GroundedHistoryViewProps {
  landmark: LandmarkRecognition;
  history: GroundedHistory;
}

export const GroundedHistoryView: React.FC<GroundedHistoryViewProps> = ({
  landmark,
  history,
}) => {
  return (
    <div className="space-y-6">
      {/* Search Grounding Credibility Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/40 border border-blue-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Search className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm text-slate-100">
                Google Search Grounded Intelligence
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold">
                Live Web Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Model: Gemini 3.8 Flash • {history.sources?.length || 0} Grounded Web Citations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Real-time facts & restorations</span>
        </div>
      </div>

      {/* Deep Historical Chronicle */}
      <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-lg text-slate-100">
            Historical Chronicle of {landmark.landmarkName}
          </h3>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {history.historicalChronicle}
        </div>

        {/* Visual architecture badges */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Architecture Tags:</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-teal-300">
            {landmark.architecturalStyle}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-amber-300">
            Era: {landmark.builtEra}
          </span>
          {landmark.alternativeNames?.slice(0, 2).map((alt) => (
            <span
              key={alt}
              className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300"
            >
              aka {alt}
            </span>
          ))}
        </div>
      </div>

      {/* Grid: Architectural Feats & Hidden Secrets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Architectural & Engineering Feats */}
        <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-teal-400" />
            <h4 className="font-display font-bold text-base text-slate-100">
              Engineering & Architectural Feats
            </h4>
          </div>

          <ul className="space-y-3">
            {history.architecturalFeats?.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hidden Mysteries & Folklore */}
        <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h4 className="font-display font-bold text-base text-slate-100">
              Hidden Secrets & Little-Known Lore
            </h4>
          </div>

          <ul className="space-y-3">
            {history.hiddenSecrets?.map((secret, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{secret}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modern Traveler Field Guide */}
      {history.visitorGuide && (
        <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h4 className="font-display font-bold text-base text-slate-100">
              Traveler Field Advice & Optimal Vantage Points
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block">
                Golden Hour & Lighting
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {history.visitorGuide.optimalTime}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-teal-400 uppercase font-semibold block">
                Unmissable Perspective
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {history.visitorGuide.mustNoticeAngle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block">
                Current Preservation & Access
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {history.visitorGuide.recentUpdates}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grounded Web Sources & Citations */}
      {history.sources && history.sources.length > 0 && (
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Grounded Google Search Sources ({history.sources.length})</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Live Web Evidence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {history.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 text-xs text-slate-300 hover:text-blue-300 transition-all group"
              >
                <span className="truncate pr-2 font-medium">
                  {source.title || source.uri}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
