import React, { useEffect, useState, forwardRef, useContext, useImperativeHandle } from 'react';
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
import { RenderInfoContext } from '@/app/make/page';

// Define an interface for the track data
interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
}

const MusicBottom = forwardRef((_, ref) => {
  const [side, setSide] = useState<"bottom" | "right">("bottom");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]); // State to store search results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); // State to control the sheet open/close
  const { setRenderInfo } = useContext(RenderInfoContext); // Consume context

  
    // Update the P5TextureCreator whenever renderInfo changes
    
  

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
        console.log(results); // Log the entire results object
        // Assuming 'results' is an array of track objects
        const formattedResults: Track[] = results.map(track => ({
          id: track.id,
          title: track.name,
          artist: (track.artists && track.artists.length > 0) ? track.artists[0]: 'Unknown Artist', // Check if artists array is defined and has elements
          image: (track.albumArt && track.albumArt && track.albumArt.length > 0) ? track.albumArt : '', // Check if album images are defined and have elements
        }));
        setSearchResults(formattedResults); // Update state with formatted results
        // console.log(formattedResults);
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

  // Use useImperativeHandle to expose a method to the parent
  useImperativeHandle(ref, () => ({
    openSheet: () => {
      setIsOpen(true); // Logic to open the sheet
    },
  }));

  return (
    <>
    
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* <SheetTrigger>
          Open Sheet
        </SheetTrigger> */}
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
                      title={track.title} 
                      artist={track.artist} 
                      image={track.image} 
                      onClick={() => {
                        console.log("SongSearchCard clicked");
                        const updatedInfo = {
                          trackId: track.id,
                          trackName: track.title,
                          trackArtists: track.artist,
                          artWork: track.image,
                        };
                        console.log(updatedInfo);
                        setRenderInfo(updatedInfo); // Update context

                        // Dispatch custom event to update P5Sketch
                        const event = new CustomEvent('updateRenderInfo', { detail: updatedInfo });
                        window.dispatchEvent(event);

                        setIsOpen(false);
                      }}
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
    </>
  );
});

export default MusicBottom;