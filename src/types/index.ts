export interface ARHotspot {
  id: string;
  title: string;
  category: string;
  xPercent: number; // 0-100
  yPercent: number; // 0-100
  description: string;
  funFact: string;
}

export interface HistoricalEra {
  eraName: string;
  yearSpan: string;
  description: string;
  filterColor: string;
}

export interface LandmarkRecognition {
  landmarkName: string;
  alternativeNames: string[];
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  confidence: number;
  architecturalStyle: string;
  builtEra: string;
  summary: string;
  visualFeatures: string[];
  arHotspots: ARHotspot[];
  historicalEras: HistoricalEra[];
  modelUsed?: string;
}

export interface GroundedSource {
  title: string;
  uri: string;
}

export interface VisitorGuide {
  optimalTime: string;
  recentUpdates: string;
  mustNoticeAngle: string;
}

export interface GroundedHistory {
  historicalChronicle: string;
  architecturalFeats: string[];
  hiddenSecrets: string[];
  visitorGuide: VisitorGuide;
  arNarrationScript: string;
  sources: GroundedSource[];
  searchQueries: string[];
  modelUsed?: string;
}

export interface AudioNarration {
  audioData: string; // Base64 WAV
  mimeType: string;
  voice: string;
  modelUsed: string;
}

export interface CuratedLandmark {
  id: string;
  name: string;
  city: string;
  country: string;
  imageUrl: string;
  thumbnail: string;
  tagline: string;
  era: string;
  style: string;
  coords: { lat: number; lng: number };
}

export interface PassportEntry {
  id: string;
  scannedAt: string;
  landmark: LandmarkRecognition;
  history: GroundedHistory;
  photoUrl: string;
  audioNarration?: AudioNarration;
}
