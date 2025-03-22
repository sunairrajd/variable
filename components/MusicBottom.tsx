"use client"

import React, { useEffect, useState, forwardRef, useContext, useImperativeHandle } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
  // import {SheetTrigger} from "@/components/ui/sheet"
  import { Input } from "@/components/ui/input"
import SongSearchCard from './ui/SongSearchCard';
// import { SpotifySearch } from '@/utils/SpotifySearch';
import { searchTrack } from '@/utils/SpotifySearch';
import { RenderInfoContext } from '@/app/contexts/RenderInfoContext';

// Define an interface for the API response track data
interface ApiTrack {
  id?: string;
  name?: string;
  artists?: Array<{ name: string }>;
  albumArt?: string[];
}

// Define an interface for the track data
interface Track {
  id: string | null;
  title: string;
  artist: string;
  image: string;
}

// Define the ref type
export interface MusicBottomRef {
  openSheet: () => void;
}

// Remove the unused empty interface
// interface MusicBottomProps {
// }

// Use React.ForwardRefRenderFunction with proper typing
const MusicBottom = forwardRef<MusicBottomRef, Record<string, never>>((props, ref) => {
  const [side, setSide] = useState<"bottom" | "right">("bottom");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Track[]>([]); // State to store search results
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to control the sheet open/close
  const { setRenderInfo } = useContext(RenderInfoContext); // Consume context

  useEffect(() => {
    const handleResize = () => {
      setSide(window.innerWidth > 768 ? "right" : "bottom");
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 1) { // Start searching when query length is greater than 2
      setError(null); // Reset error state
      try {
        const results = await searchTrack(query);
        console.log('API Results:', results); // Log the entire results object for debugging
        
        // Assuming 'results' is an array of track objects
        const formattedResults: Track[] = results.map((track: ApiTrack) => {
          console.log('Processing track:', track); // Log each track for debugging
          
          // Extract artist name safely
          let artistName = 'Unknown Artist';
          if (track.artists && Array.isArray(track.artists) && track.artists.length > 0) {
            // Check if artists is an array of strings or objects
            if (typeof track.artists[0] === 'string') {
              artistName = track.artists[0];
            } else if (typeof track.artists[0] === 'object' && track.artists[0] && 'name' in track.artists[0]) {
              artistName = track.artists[0].name;
            }
          }
          
          // Extract image URL safely
          let imageUrl = '';
          if (track.albumArt && Array.isArray(track.albumArt) && track.albumArt.length > 0) {
            imageUrl = track.albumArt[0];
          } else if (track.albumArt && typeof track.albumArt === 'string') {
            imageUrl = track.albumArt;
          }
          
          console.log('Extracted data:', {
            id: track.id || null,
            title: track.name || 'Unknown Title',
            artist: artistName,
            image: imageUrl
          });
          
          return {
            id: track.id || null,
            title: track.name || 'Unknown Title',
            artist: artistName,
            image: imageUrl
          };
        });
        
        console.log('Formatted results:', formattedResults);
        setSearchResults(formattedResults); // Update state with formatted results
      } catch (error: unknown) {
        console.error('Error searching for track:', error);
        setError('Failed to fetch search results. Please try again.');
        setSearchResults([]); // Clear results on error
      }
    } else {
      setSearchResults([]); // Clear results if query is too short
    }
  };

  // Expose the openSheet method to the parent component
  useImperativeHandle(ref, () => ({
    openSheet: () => {
      setIsOpen(true);
    }
  }));

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={side} style={{ backgroundColor: 'white' }}>
          <SheetHeader>
            <SheetTitle>Search for a Song</SheetTitle>
            <Input 
              type="search" 
              placeholder="Search for a song" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SheetDescription>
            </SheetDescription>
            <div>
              {searchResults.length > 0 ? (
                <div className="search-results">
                  {searchResults.map((track, index) => (
                    <SongSearchCard 
                      key={track.id || index}
                      title={track.title || "Unknown Title"} 
                      artist={track.artist || "Unknown Artist"} 
                      image={track.image || null} 
                      onSelect={() => {
                        console.log("SongSearchCard clicked");
                        // Update only the track-related fields while preserving other values
                        setRenderInfo(prevInfo => ({
                          ...prevInfo, // Keep all existing values
                          trackId: track.id || '', 
                          trackName: track.title || "Unknown Title",
                          trackArtists: track.artist || "Unknown Artist",
                          artWork: track.image || '', 
                        }));

                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>No results found.</p>
              )}
            </div>
            {error && <p className="error-message">{error}</p>}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
});

// Add display name for better debugging
MusicBottom.displayName = 'MusicBottom';

export default MusicBottom;
