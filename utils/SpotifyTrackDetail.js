import { getAccessToken } from './spotify';

export async function getTrackDetails(trackId) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const trackData = await response.json();
    return {
      name: trackData.name,
      artists: trackData.artists.map(artist => artist.name),
      album: trackData.album.name,
      duration: trackData.duration_ms,
      popularity: trackData.popularity,
      previewUrl: trackData.preview_url,
      spotifyUrl: trackData.external_urls.spotify,
      albumArt: trackData.album.images[0]?.url
    };
  } catch (error) {
    console.error('Error fetching track details:', error);
    throw error;
  }
} 