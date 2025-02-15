'use client'

import { useState, useEffect } from 'react'
import { getTrackDetails } from '@/utils/SpotifyTrackDetail'

interface CardControlsProps {
  onGenerate?: (trackId: string) => void;
}

export default function CardControls({ onGenerate }: CardControlsProps) {
  const defaultTrackId = '1EuDCf2GwB4DsCeGrmtPZQ'
  const [trackId, setTrackId] = useState(defaultTrackId)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    console.log('CardControls: Setting up p5SketchReady listener');
    
    const handleP5Ready = () => {
      console.log('CardControls: P5Sketch is ready, initiating handleGenerate');
      handleGenerate();
    };

    window.addEventListener('p5SketchReady', handleP5Ready);

    return () => {
      window.removeEventListener('p5SketchReady', handleP5Ready);
    };
  }, []);

  const handleGenerate = async () => {
    try {
      setIsLoading(true)
      console.log('CardControls: Fetching track details for ID:', trackId);
      const details = await getTrackDetails(trackId);
      
      console.log('CardControls: Dispatching event with details:', details);
      window.dispatchEvent(new CustomEvent('updateTrackDetails', {
        detail: {
          name: details.name,
          artists: details.artists
        }
      }));

      if (onGenerate) {
        onGenerate(trackId);
        console.log('CardControls: onGenerate called with track ID:', trackId);
      }
    } catch (error) {
      console.error('Error getting track details:', error);
    } finally {
      setIsLoading(false)
      console.log('CardControls: Setting isLoading to false')
    }
  }

  const handleSaveToFire = () => {
    console.log('CardControls: Handling save to Firebase')
    setIsSaving(true)
    // Trigger sketch save
    window.dispatchEvent(new CustomEvent('saveSketch'));
    console.log('CardControls: Save sketch event dispatched')
    
    // Dummy delay for now
    setTimeout(() => {
      console.log('Saved to Firebase!')
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="bg-[#FF0000] p-8 rounded-lg  w-96">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 font-sans">Music Visualizer</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="trackId" className="block text-sm font-medium text-gray-700 mb-2">
            Spotify Track ID
          </label>
          <input
            type="text"
            id="trackId"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
            placeholder="Enter Spotify track ID..."
          />
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`w-full bg-pink-500 text-white py-2 px-4 rounded-md transition-colors duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
          }`}
        >
          {isLoading ? 'Loading...' : 'Generate'}
        </button>

        <button
          onClick={handleSaveToFire}
          disabled={isSaving}
          className={`w-full bg-orange-500 text-white py-2 px-4 rounded-md transition-colors duration-200 ${
            isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save to Fire'}
        </button>
      </div>
    </div>
  )
} 