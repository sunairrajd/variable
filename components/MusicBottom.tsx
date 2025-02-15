 import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Input } from "@/components/ui/input"
import SongSearchCard from './ui/SongSearchCard';
import { SpotifySearch, searchTrack } from '@/utils/SpotifySearch';

// Define an interface for the track data
interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
}

const MusicBottom = () => {
  const [side, setSide] = useState<"bottom" | "right">("bottom");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]); // State to store search results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const results = await searchTrack(query);
        console.log(results); // Log the raw results before formatting
        // Assuming 'results' is an array of track objects
        const formattedResults: Track[] = results.map(track => ({
          id: track.id,
          title: track.name,
          artist: (track.artists && track.artists.length > 0) ? track.artists[0]: 'Unknown Artist', // Check if artists array is defined and has elements
          image: (track.albumArt && track.albumArt && track.albumArt.length > 0) ? track.albumArt : '', // Check if album images are defined and have elements
        }));
        setSearchResults(formattedResults); // Update state with formatted results
        console.log(formattedResults);
      } catch (error) {
        console.error('Error searching for track:', error);
        setError('Failed to fetch search results. Please try again.'); // Set error message
        setSearchResults([]); // Clear results on error
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]); // Clear results if query is too short
    }
  };

  return (
    <Sheet className='bg-white'>
      <SheetTrigger> it</SheetTrigger>
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
                {searchResults.map(track => (
                  <SongSearchCard 
                    key={track.id}
                    title={track.title} 
                    artist={track.artist} 
                    image={track.image} 
                  />
                ))}
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MusicBottom;