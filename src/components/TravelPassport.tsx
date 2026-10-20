import React, { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Calendar, 
  Compass, 
  Sparkles, 
  Trash2, 
  Eye, 
  Share2, 
  Download, 
  Award,
  Globe2,
  Stamp
} from 'lucide-react';
import { PassportEntry } from '../types';

interface TravelPassportProps {
  entries: PassportEntry[];
  onSelectEntry: (entry: PassportEntry) => void;
  onDeleteEntry: (id: string) => void;
  onExploreMore: () => void;
}

export const TravelPassport: React.FC<TravelPassportProps> = ({
  entries,
  onSelectEntry,
  onDeleteEntry,
  onExploreMore,
}) => {
  const [selectedPostcard, setSelectedPostcard] = useState<PassportEntry | null>(null);

  // Compute statistics
  const totalLandmarks = entries.length;
  const uniqueCities = new Set(entries.map((e) => e.landmark.city)).size;
  const uniqueCountries = new Set(entries.map((e) => e.landmark.country)).size;

  return (
    <div className="space-y-6">
      {/* Passport Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="font-mono text-xs uppercase text-teal-400 font-bold tracking-wider">
                Official AR Tourist Ledger
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
              My World Heritage Passport
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
              Every city photo recognized by Gemini is immortalized here with verified grounded history, architectural notes, and narrated voice audio.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-center min-w-[80px]">
              <div className="font-display font-bold text-xl text-teal-300">{totalLandmarks}</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Landmarks</div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-center min-w-[80px]">
              <div className="font-display font-bold text-xl text-amber-300">{uniqueCities}</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Cities</div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-center min-w-[80px]">
              <div className="font-display font-bold text-xl text-emerald-300">{uniqueCountries}</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Countries</div>
            </div>
          </div>
        </div>

        {/* Decorative background grid */}
        <div className="absolute inset-0 ar-grid-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Empty State */}
      {entries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Globe2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-200">
              Your Passport is Empty
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
              Snap a city photo with your camera or explore curated world landmarks to stamp your first heritage discovery!
            </p>
          </div>
          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20"
          >
            Snap or Select a Landmark Now
          </button>
        </div>
      ) : (
        /* Grid of Passport Stamps */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Photo & Stamp Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={entry.photoUrl}
                  alt={entry.landmark.landmarkName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Digital Heritage Stamp badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400/90 text-slate-950 font-mono text-[10px] font-bold flex items-center gap-1 shadow-lg transform rotate-2">
                  <Stamp className="w-3 h-3" />
                  <span>VERIFIED HERITAGE</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <div className="font-mono text-[10px] text-teal-300 uppercase tracking-wide">
                    {entry.landmark.city}, {entry.landmark.country}
                  </div>
                  <h3 className="font-display font-bold text-base text-white leading-tight">
                    {entry.landmark.landmarkName}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {entry.landmark.summary}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {new Date(entry.scannedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-teal-400 font-semibold">
                    {entry.landmark.architecturalStyle}
                  </span>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSelectEntry(entry)}
                    className="flex-1 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open AR Clip</span>
                  </button>

                  <button
                    onClick={() => setSelectedPostcard(entry)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Generate Digital Postcard"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove from Passport"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Digital Postcard Modal */}
      {selectedPostcard && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedPostcard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-mono"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AuraLens Commemorative Travel Postcard</span>
            </div>

            {/* Postcard Canvas Preview */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-4 rounded-2xl border-2 border-dashed border-teal-500/40 space-y-4">
              <div className="relative rounded-xl overflow-hidden h-52">
                <img
                  src={selectedPostcard.photoUrl}
                  alt={selectedPostcard.landmark.landmarkName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-mono text-[9px] font-extrabold uppercase shadow">
                  POSTE AÉRIENNE • HERITAGE
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">
                    {selectedPostcard.landmark.landmarkName}
                  </h3>
                  <div className="text-xs text-teal-300 font-mono">
                    {selectedPostcard.landmark.city}, {selectedPostcard.landmark.country}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed italic pt-1">
                    "{selectedPostcard.landmark.summary}"
                  </p>
                </div>

                {/* Circular Stamp */}
                <div className="w-16 h-16 rounded-full border-2 border-teal-400/80 p-1 flex items-center justify-center text-center shrink-0 text-teal-300 font-mono text-[8px] transform -rotate-12">
                  <div className="border border-teal-400/40 rounded-full w-full h-full flex flex-col items-center justify-center">
                    <span>AURALENS</span>
                    <span className="font-bold text-[9px] text-amber-300">2026</span>
                    <span>VISITED</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>GPS: {selectedPostcard.landmark.coordinates.lat.toFixed(3)}°, {selectedPostcard.landmark.coordinates.lng.toFixed(3)}°</span>
                <span>AI Vision: Gemini 4 Argon</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert('Postcard image ready for saving! You can capture screenshot or print this keepsake.');
                  setSelectedPostcard(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Save Postcard Keepsake</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
