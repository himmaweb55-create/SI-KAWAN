/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CameraCapture } from './components/CameraCapture';
import { ARViewport } from './components/ARViewport';
import { AudioNarrationPlayer } from './components/AudioNarrationPlayer';
import { GroundedHistoryView } from './components/GroundedHistoryView';
import { TravelPassport } from './components/TravelPassport';
import { ExploreLandmarks } from './components/ExploreLandmarks';
import { InfoModal } from './components/InfoModal';
import { 
  LandmarkRecognition, 
  GroundedHistory, 
  AudioNarration, 
  PassportEntry, 
  CuratedLandmark 
} from './types';
import { Sparkles, Compass, AlertCircle, RefreshCw, Layers } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'auralens_passport_entries';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'tour' | 'passport' | 'explore'>('scanner');
  const [curatedLandmarks, setCuratedLandmarks] = useState<CuratedLandmark[]>([]);
  
  // Active Tour Data
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [landmark, setLandmark] = useState<LandmarkRecognition | null>(null);
  const [history, setHistory] = useState<GroundedHistory | null>(null);
  const [audioNarration, setAudioNarration] = useState<AudioNarration | null>(null);

  // Loading & Progress States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Passport Collection
  const [passportEntries, setPassportEntries] = useState<PassportEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save passport to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(passportEntries));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [passportEntries]);

  // Load curated landmarks from server
  useEffect(() => {
    fetch('/api/curated-landmarks')
      .then((res) => res.json())
      .then((data) => {
        if (data.landmarks) {
          setCuratedLandmarks(data.landmarks);
        }
      })
      .catch((err) => console.warn('Failed to fetch curated landmarks:', err));
  }, []);

  // Main Recognition & Grounded Tour Generation Pipeline
  const handlePhotoSelected = async (imageBase64: string, hint?: string) => {
    try {
      setErrorMessage(null);
      setIsAnalyzing(true);
      setPhotoUrl(imageBase64);

      // Stage 1: Multimodal Landmark Detection using Gemini 4 Argon
      setAnalysisStep('1/3: Analyzing landmark features with Gemini 4 Argon...');
      const recognizeRes = await fetch('/api/recognize-landmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          userHint: hint,
        }),
      });

      if (!recognizeRes.ok) {
        const errJson = await recognizeRes.json().catch(() => ({}));
        throw new Error(errJson.details || errJson.error || 'Failed to recognize landmark in image');
      }

      const landmarkData: LandmarkRecognition = await recognizeRes.json();
      setLandmark(landmarkData);

      // Stage 2: Fetch Live History via Google Search Grounding with Gemini 3.8 Flash
      setAnalysisStep('2/3: Grounding historical facts with Google Search...');
      const historyRes = await fetch('/api/search-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landmarkName: landmarkData.landmarkName,
          city: landmarkData.city,
          country: landmarkData.country,
        }),
      });

      if (!historyRes.ok) {
        const errJson = await historyRes.json().catch(() => ({}));
        throw new Error(errJson.details || errJson.error || 'Failed to retrieve grounded history');
      }

      const historyData: GroundedHistory = await historyRes.json();
      setHistory(historyData);

      // Stage 3: Synthesize AR Narration Audio using Gemini 3.8 Flash TTS
      setAnalysisStep('3/3: Synthesizing AR tour audio with Gemini 3.8 Flash TTS...');
      let audioData: AudioNarration | null = null;
      try {
        const ttsRes = await fetch('/api/generate-narration-tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            script: historyData.arNarrationScript,
            voiceName: 'Puck',
          }),
        });

        if (ttsRes.ok) {
          audioData = await ttsRes.json();
          setAudioNarration(audioData);
        }
      } catch (audioErr) {
        console.warn('TTS step warning:', audioErr);
        // Continue even if server TTS had transient issue; UI provides browser speech fallback
      }

      // Automatically add to passport
      const newEntry: PassportEntry = {
        id: `entry-${Date.now()}`,
        scannedAt: new Date().toISOString(),
        landmark: landmarkData,
        history: historyData,
        photoUrl: imageBase64,
        audioNarration: audioData || undefined,
      };

      setPassportEntries((prev) => {
        // Prevent duplicate entries of the same landmark within the session
        const exists = prev.some((p) => p.landmark.landmarkName === landmarkData.landmarkName);
        if (exists) return prev;
        return [newEntry, ...prev];
      });

      // Switch to AR Tour View
      setActiveTab('tour');
    } catch (error: any) {
      console.error('Analysis pipeline error:', error);
      setErrorMessage(error?.message || 'Error analyzing photo. Please try another photo or angle.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  // Re-generate Voice in different persona
  const handleRegenerateVoice = async (voiceName: string, style: string) => {
    if (!history?.arNarrationScript) return;
    try {
      setIsGeneratingVoice(true);
      const res = await fetch('/api/generate-narration-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: history.arNarrationScript,
          voiceName,
          style,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate narration audio with selected voice');
      }

      const newAudio: AudioNarration = await res.json();
      setAudioNarration(newAudio);
    } catch (err: any) {
      console.warn('Voice generation error:', err);
      alert('Unable to generate custom voice right now. Using speech synthesis fallback.');
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  // Open existing passport entry
  const handleSelectPassportEntry = (entry: PassportEntry) => {
    setPhotoUrl(entry.photoUrl);
    setLandmark(entry.landmark);
    setHistory(entry.history);
    setAudioNarration(entry.audioNarration || null);
    setActiveTab('tour');
  };

  // Delete passport entry
  const handleDeletePassportEntry = (id: string) => {
    setPassportEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Select curated landmark from explore tab
  const handleSelectCuratedLandmark = (lm: CuratedLandmark) => {
    handlePhotoSelected(lm.imageUrl, `${lm.name}, ${lm.city}`);
  };

  const isCurrentSaved = Boolean(
    landmark &&
      passportEntries.some((e) => e.landmark.landmarkName === landmark.landmarkName)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={passportEntries.length}
        hasActiveLandmark={Boolean(landmark && history && photoUrl)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs md:text-sm flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-slate-400 hover:text-white font-mono text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab 1: Scanner / Camera */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Next-Gen AR City Exploration</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
                Snap Any Landmark. Unveil Its Secret History.
              </h1>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Aim your camera at any monument, bridge, tower, or temple. Gemini recognizes the architecture, searches real-time historical records, and narrations an immersive AR tour clip.
              </p>
            </div>

            <CameraCapture
              onPhotoSelected={handlePhotoSelected}
              curatedLandmarks={curatedLandmarks}
              isAnalyzing={isAnalyzing}
              analysisStep={analysisStep}
            />
          </div>
        )}

        {/* Tab 2: AR Tour Experience */}
        {activeTab === 'tour' && landmark && history && photoUrl && (
          <div className="space-y-8">
            {/* 1. AR Interactive Viewport */}
            <ARViewport
              photoUrl={photoUrl}
              landmark={landmark}
              history={history}
              onPlayNarration={() => setIsPlayingAudio(!isPlayingAudio)}
              isPlayingAudio={isPlayingAudio}
              onSaveToPassport={() => {
                if (!isCurrentSaved) {
                  setPassportEntries((prev) => [
                    {
                      id: `entry-${Date.now()}`,
                      scannedAt: new Date().toISOString(),
                      landmark,
                      history,
                      photoUrl,
                      audioNarration: audioNarration || undefined,
                    },
                    ...prev,
                  ]);
                }
              }}
              isSaved={isCurrentSaved}
            />

            {/* 2. Audio Narration Player & Voice Studio */}
            <AudioNarrationPlayer
              narrationScript={history.arNarrationScript}
              initialAudio={audioNarration}
              landmarkName={landmark.landmarkName}
              city={landmark.city}
              onRegenerateVoice={handleRegenerateVoice}
              isGeneratingVoice={isGeneratingVoice}
            />

            {/* 3. Deep Historical Chronicle & Search Grounded Insights */}
            <GroundedHistoryView
              landmark={landmark}
              history={history}
            />
          </div>
        )}

        {/* Tab 3: Travel Passport */}
        {activeTab === 'passport' && (
          <TravelPassport
            entries={passportEntries}
            onSelectEntry={handleSelectPassportEntry}
            onDeleteEntry={handleDeletePassportEntry}
            onExploreMore={() => setActiveTab('scanner')}
          />
        )}

        {/* Tab 4: Explore World Landmarks */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="max-w-2xl space-y-1">
              <h2 className="font-display font-bold text-2xl text-white">
                World Heritage & City Landmarks
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                Test AuraLens instantly across monumental capitals without leaving your browser.
              </p>
            </div>

            <ExploreLandmarks
              landmarks={curatedLandmarks}
              onSelectLandmark={handleSelectCuratedLandmark}
            />
          </div>
        )}
      </main>

      {/* Info Architecture Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AuraLens • AR Spatial Photo Tourism & Landmark Intelligence</span>
          <div className="flex items-center gap-4">
            <span className="text-teal-400">Gemini 4 Argon</span>
            <span>•</span>
            <span className="text-blue-400">Gemini 3.8 Flash (Search)</span>
            <span>•</span>
            <span className="text-emerald-400">Gemini 3.8 Flash TTS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
