import { getAccessToken } from './spotify';

export async function getAlbum(albumId) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const album = await response.json();
    return album;
  } catch (error) {
    console.error('Error fetching album:', error);
    throw error;
  }
} 