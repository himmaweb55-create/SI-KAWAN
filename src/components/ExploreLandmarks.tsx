import React, { useState } from 'react';
import { Globe2, MapPin, Sparkles, Compass, Eye, Search } from 'lucide-react';
import { CuratedLandmark } from '../types';

interface ExploreLandmarksProps {
  landmarks: CuratedLandmark[];
  onSelectLandmark: (landmark: CuratedLandmark) => void;
}

export const ExploreLandmarks: React.FC<ExploreLandmarksProps> = ({
  landmarks,
  onSelectLandmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filtered = landmarks.filter((lm) => {
    const matchesSearch =
      lm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.style.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by monument, city, country..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Globe2 className="w-4 h-4 text-teal-400" />
          <span>Curated Heritage Index ({filtered.length})</span>
        </div>
      </div>

      {/* Grid of Famous City Landmarks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lm) => (
          <div
            key={lm.id}
            className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-teal-400/60 transition-all duration-300 shadow-xl flex flex-col"
          >
            {/* Image Box */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={lm.imageUrl}
                alt={lm.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-teal-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-teal-400" />
                <span>{lm.city}, {lm.country}</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-[11px] font-mono text-amber-300 font-semibold mb-0.5">
                  {lm.tagline}
                </div>
                <h3 className="font-display font-bold text-lg text-white leading-tight">
                  {lm.name}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Era:</span>
                  <span className="text-slate-200">{lm.era}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Style:</span>
                  <span className="text-teal-400">{lm.style}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">GPS:</span>
                  <span className="text-slate-400">{lm.coords.lat}°N, {lm.coords.lng}°E</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectLandmark(lm)}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-display font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 group-hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4" />
                <span>Scan & Launch AR Tour Clip</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
