import { getAccessToken } from './spotify';


export async function searchTrack(query) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const searchData = await response.json();
    const tracks = searchData.tracks.items.slice(0, 10); // Get the first 10 results
    return tracks.map(track => ({
      name: track.name,
      id: track.id,
      artists: track.artists.map(artist => artist.name),
      album: track.album.name,
      duration: track.duration_ms,
      popularity: track.popularity,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify,
      albumArt: track.album.images[0]?.url
    }));
  } catch (error) {
    console.error('Error searching for track:', error);
    throw error;
  }
} 