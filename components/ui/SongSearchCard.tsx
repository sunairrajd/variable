'use client'

import React, { useState } from 'react';
import Image from 'next/image';

export interface SongSearchCardProps {
  title: string;
  artist: string;
  image: string | null;
  onSelect?: () => void;
}

// Helper function to validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    // Empty catch block without a parameter
    return false;
  }
};

const SongSearchCard: React.FC<SongSearchCardProps> = ({ 
  title = 'Unknown Title', 
  artist = 'Unknown Artist', 
  image = null, 
  onSelect 
}) => {
  // Validate the image URL
  const validImage = image && isValidUrl(image) ? image : null;
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="song-search-card block flex my-2 p-4 border items-center shadow-sm rounded-sm cursor-pointer" 
         onClick={onSelect}>
      
      {validImage && !imgError ? (
        <div className="w-12 h-12 mr-4 relative">
          <Image 
            src={validImage} 
            alt={`${title} cover`} 
            fill
            className="object-cover rounded-sm"
            placeholder="empty"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="w-12 h-12 mr-4 bg-gray-200 flex items-center justify-center rounded-sm">
          <span className="text-xs text-gray-500">No Image</span>
        </div>
      )}
      
      <div className="inline-block justify-center">
        <h3 className="text-sm text-gray-700 font-medium">{title}</h3>
        <p className="text-sm text-gray-700">{artist}</p>
      </div>
    </div>
  );
};

export default SongSearchCard;
