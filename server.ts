import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Support base64 image uploads up to 30mb
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Server-side Gemini initialization with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Curated demo landmarks with high-res licensed Unsplash travel photos for instant 1-click testing
const CURATED_LANDMARKS = [
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    city: 'Paris',
    country: 'France',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80',
    tagline: 'Iron Lady of the Champ de Mars',
    era: '1889 (Exposition Universelle)',
    style: 'Puddle-iron Lattice Tower',
    coords: { lat: 48.8584, lng: 2.2945 },
  },
  {
    id: 'colosseum',
    name: 'The Colosseum',
    city: 'Rome',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
    tagline: 'Monumental Flavian Amphitheatre',
    era: '70–80 AD',
    style: 'Imperial Roman Architecture',
    coords: { lat: 41.8902, lng: 12.4922 },
  },
  {
    id: 'sagrada-familia',
    name: 'Basílica de la Sagrada Família',
    city: 'Barcelona',
    country: 'Spain',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=400&q=80',
    tagline: "Antoni Gaudí's Living Masterpiece",
    era: '1882 – Present',
    style: 'Catalan Modernisme & Gothic Revival',
    coords: { lat: 41.4036, lng: 2.1744 },
  },
  {
    id: 'big-ben',
    name: 'Big Ben & Palace of Westminster',
    city: 'London',
    country: 'United Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=400&q=80',
    tagline: 'The Great Bell and Elizabeth Tower',
    era: '1859',
    style: 'Perpendicular Gothic Revival',
    coords: { lat: 51.5007, lng: -0.1246 },
  },
  {
    id: 'senso-ji',
    name: 'Sensō-ji Temple',
    city: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    tagline: "Tokyo's Oldest Buddhist Sanctuary",
    era: '645 AD',
    style: 'Classical Edo Buddhist Temple',
    coords: { lat: 35.7148, lng: 139.7967 },
  },
  {
    id: 'borobudur',
    name: 'Borobudur Temple Compounds',
    city: 'Magelang / Central Java',
    country: 'Indonesia',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=400&q=80',
    tagline: 'World’s Largest Buddhist Monument',
    era: '8th–9th Century (Sailendra Dynasty)',
    style: 'Javanese Buddhist Step Pyramid',
    coords: { lat: -7.6079, lng: 110.2038 },
  },
];

// Endpoint: Curated Landmarks List
app.get('/api/curated-landmarks', (_req, res) => {
  res.json({ landmarks: CURATED_LANDMARKS });
});

// Helper to sanitize base64 string
function cleanBase64(dataUrl: string): { mimeType: string; data: string } {
  const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1], data: match[2] };
  }
  return { mimeType: 'image/jpeg', data: dataUrl };
}

// Endpoint 1: Landmark Recognition using gemini-4-argon (with fallback to gemini-3.8-flash)
app.post('/api/recognize-landmark', async (req, res) => {
  try {
    const { imageBase64, userHint, locationHint } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    const { mimeType, data } = cleanBase64(imageBase64);

    const promptText = `
You are an expert architectural historian, city scout, and AR computer vision system for travel.
Analyze this urban/city photo carefully.
Identify the primary landmark, historical monument, notable building, or cityscape feature shown in the image.

Respond ONLY with valid, parseable JSON (no markdown formatting, no code fencing, pure JSON).
The JSON object must have this exact structure:
{
  "landmarkName": "Primary canonical name of the landmark",
  "alternativeNames": ["Local name", "Colloquial name", "Native script name if applicable"],
  "city": "City where it is located",
  "country": "Country where it is located",
  "coordinates": { "lat": 48.8584, "lng": 2.2945 },
  "confidence": 98,
  "architecturalStyle": "e.g., Gothic Revival, Romanesque, Brutalist, Baroque, Modernist",
  "builtEra": "e.g., 1889, 70-80 AD, 1931",
  "summary": "2-3 engaging sentences introducing this landmark and why tourists travel from across the earth to see it.",
  "visualFeatures": ["Identifying visual feature 1", "Identifying visual feature 2", "Identifying visual feature 3"],
  "arHotspots": [
    {
      "id": "spot-1",
      "title": "Feature title (e.g., Lantern Spire / Archway / Relief Carvings)",
      "category": "Architecture | Engineering | Secret Detail | Symbolism",
      "xPercent": 50,
      "yPercent": 25,
      "description": "Fascinating detail about this specific part of the landmark.",
      "funFact": "Quick bite-sized trivia about this section."
    },
    {
      "id": "spot-2",
      "title": "Second architectural anchor",
      "category": "Architecture",
      "xPercent": 35,
      "yPercent": 60,
      "description": "Key structural detail or historic element.",
      "funFact": "Interesting trivia."
    },
    {
      "id": "spot-3",
      "title": "Third architectural anchor",
      "category": "History",
      "xPercent": 65,
      "yPercent": 75,
      "description": "Historic context or foundation detail.",
      "funFact": "Interesting trivia."
    }
  ],
  "historicalEras": [
    {
      "eraName": "Original Construction",
      "yearSpan": "e.g., 1887–1889",
      "description": "How the site looked when scaffolding rose and first stones were laid.",
      "filterColor": "#f59e0b"
    },
    {
      "eraName": "Golden Historical Age",
      "yearSpan": "e.g., 1900–1945",
      "description": "The era of world fairs, historic milestones, and wartime events.",
      "filterColor": "#38bdf8"
    },
    {
      "eraName": "Modern Preservation",
      "yearSpan": "Present Day",
      "description": "Today's vibrant UNESCO site and ongoing preservation efforts.",
      "filterColor": "#10b981"
    }
  ]
}

Context notes: ${userHint ? `User note: ${userHint}.` : ''} ${locationHint ? `Nearby GPS: ${locationHint}.` : ''}
If the landmark cannot be recognized with certainty, make the best educated identification based on architectural style and urban setting, and set confidence accordingly.
`;

    let rawResponseText = '';
    let usedModel = 'gemini-4-argon';

    try {
      // First attempt with gemini-4-argon as strictly instructed
      const response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      });
      rawResponseText = response.text || '';
    } catch (argonError: any) {
      console.warn('gemini-4-argon attempt encountered error, falling back to gemini-3.8-flash:', argonError?.message);
      usedModel = 'gemini-3.8-flash';
      // Graceful fallback to gemini-3.8-flash
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      });
      rawResponseText = fallbackResponse.text || '';
    }

    // Clean JSON response (strip markdown wrappers if any)
    const cleanedJsonStr = rawResponseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsedData = JSON.parse(cleanedJsonStr);
    parsedData.modelUsed = usedModel;

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/recognize-landmark:', error);
    return res.status(500).json({
      error: 'Failed to recognize landmark',
      details: error?.message || 'Unknown recognition error',
    });
  }
});

// Endpoint 2: Fetch Live History via Google Search Grounding with gemini-3.8-flash
app.post('/api/search-history', async (req, res) => {
  try {
    const { landmarkName, city, country, customFocus } = req.body;
    if (!landmarkName) {
      return res.status(400).json({ error: 'landmarkName is required' });
    }

    const searchQuery = `Latest historical facts, architecture, visitor tips, renovations, and true stories about ${landmarkName} in ${city || ''} ${country || ''}`;

    const promptText = `
You are a master cultural docent and travel investigator using real-time Google Search.
Research the landmark: "${landmarkName}" located in ${city || 'the city'}, ${country || ''}.
${customFocus ? `Special focus requested: ${customFocus}` : ''}

Use Google Search grounding to find the most accurate, up-to-date information, including:
1. Deep Historical Chronicle: The founding story, architect/patron, political or cultural backdrop, key transformations across centuries.
2. Architectural & Engineering Feats: Materials used, revolutionary techniques, structural dimensions, aesthetic symbolism.
3. Hidden Mysteries & Little-Known Secrets: Curious tales, myths, secret chambers, lost elements, or legendary figures associated with it.
4. Current Visitor Insights (Up-to-Date): Recent restorations, current viewing guidelines, optimal times/photo spots.
5. AR Narration Voice Script:
   Create a vivid, breathtaking 120-word spoken audio tour narration script suitable for an Augmented Reality experience as the traveler stands before this monument.
   Write it in first/second person ("Look up at the towering arches...", "As you stand here today...").
   Include natural vocal punctuation and cues (like <breath>, brief dramatic pauses ...) to make it feel cinematic, immersive, and human.

Format your response as valid, parseable JSON with this structure:
{
  "historicalChronicle": "Thorough 2-3 paragraph historical overview based on grounded search results.",
  "architecturalFeats": [
    "Feat 1 with specific facts/measurements",
    "Feat 2 with details",
    "Feat 3 with details"
  ],
  "hiddenSecrets": [
    "Mystery or hidden detail 1",
    "Mystery or hidden detail 2",
    "Mystery or hidden detail 3"
  ],
  "visitorGuide": {
    "optimalTime": "Best time of day or lighting angle for photos",
    "recentUpdates": "Recent conservation, exhibitions, or ticket tips",
    "mustNoticeAngle": "Specific vantage point travelers often miss"
  },
  "arNarrationScript": "The 120-word cinematic spoken narration script for AR voice playback with immersive sensory descriptions."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const responseText = response.text || '';
    const cleanedJsonStr = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let historyData: any = {};
    try {
      historyData = JSON.parse(cleanedJsonStr);
    } catch {
      // Fallback if model returned unstructured markdown despite JSON instruction
      historyData = {
        historicalChronicle: responseText,
        architecturalFeats: ['Monumental engineering excellence', 'Unique cultural heritage design'],
        hiddenSecrets: ['Centuries of preserved folklore and architectural legacy'],
        visitorGuide: {
          optimalTime: 'Golden hour just before sunset',
          recentUpdates: 'Open to the public with verified digital ticketing',
          mustNoticeAngle: 'Observe the perimeter foundations for vintage stonework',
        },
        arNarrationScript: `Welcome to ${landmarkName}. <breath> Look up at its storied silhouette against the sky. For generations, travelers have stood where you stand right now, witnessing history cast in stone and spirit. Take a moment to absorb the energy of this timeless place.`,
      };
    }

    // Extract Grounding Chunks & Sources from Google Search Grounding Metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources: Array<{ title: string; uri: string }> = [];

    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        webSources.push({
          title: chunk.web.title || chunk.web.uri,
          uri: chunk.web.uri,
        });
      }
    }

    const searchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [searchQuery];

    return res.json({
      ...historyData,
      sources: webSources,
      searchQueries,
      modelUsed: 'gemini-3.8-flash (Search Grounding)',
    });
  } catch (error: any) {
    console.error('Error in /api/search-history:', error);
    return res.status(500).json({
      error: 'Failed to retrieve grounded history',
      details: error?.message || 'Search grounding error',
    });
  }
});

// Endpoint 3: Generate AR Narration Audio using gemini-3.8-flash-tts
app.post('/api/generate-narration-tts', async (req, res) => {
  try {
    const { script, voiceName, style } = req.body;
    if (!script) {
      return res.status(400).json({ error: 'script is required' });
    }

    // Voice options: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
    const selectedVoice = voiceName || 'Puck';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: script,
              speechMetadata: {
                speaker: 'TourGuide',
                style: style || 'Enthusiastic, vivid cultural tour guide and historian',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    // Unary default returns a complete WAV file in inlineData.data (audio/wav, 24kHz mono 16-bit)
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error('No audio data generated by gemini-3.8-flash-tts');
    }

    return res.json({
      audioData: base64Audio,
      mimeType: 'audio/wav',
      voice: selectedVoice,
      modelUsed: 'gemini-3.8-flash-tts',
    });
  } catch (error: any) {
    console.warn('Error with gemini-3.8-flash-tts:', error?.message);
    return res.status(500).json({
      error: 'TTS generation failed',
      details: error?.message,
      fallbackSuggestion: 'client-speech-synthesis',
    });
  }
});

// Vite middleware mounting for dev mode or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AuraLens server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
