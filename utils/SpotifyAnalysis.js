import { getAccessToken } from './spotify';

export async function getAudioAnalysis(trackId) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const analysis = await response.json();
    return analysis;
  } catch (error) {
    console.error('Error fetching audio analysis:', error);
    throw error;
  }
} 