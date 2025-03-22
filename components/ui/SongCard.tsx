'use client'


import * as React from "react"
import { useRef } from "react"
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
// import { IoShuffle } from "react-icons/io5";
// import { SongContext } from '@/app/make/page'
// import { useContext, useState } from 'react';
import MusicBottom from '@/components/MusicBottom';
import Image from 'next/image';

// Define the type for the MusicBottom component instance
interface MusicBottomRef {
  openSheet: () => void;
}

interface SongCardProps {
  title: string
  artist: string
  image: string | null
}

export default function SongCard({ 
  title = "Unknown Title", 
  artist = "Unknown Artist", 
  image = null 
}: SongCardProps) {
  // Properly type the ref
  const musicBottomRef = useRef<MusicBottomRef>(null);

  const handleChangeClick = () => {
    if (musicBottomRef.current) {
      musicBottomRef.current.openSheet();
    }
  };

  // Use React.CSSProperties type for the style object
  const iconStyle: React.CSSProperties = {
    position: 'absolute' as const, // Use 'as const' to specify the exact type
    top: 0,
    right: 0,
    width: '24px',
    height: '24px',
    color: 'gray',
    left: '-3px',
  };

  // Use a default image if image is null
  const imageUrl = image || '/art.png';

  // Ensure all text values have defaults before any operations
  const safeTitle = title || "Unknown Title";
  const safeArtist = artist || "Unknown Artist";

  return (
    <div className="max-w-sm rounded-md inline-block border border-blue-200 bg-blue-50 p-5 mx-4 flex items-center">
      <div className="relative">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image 
            src={imageUrl} 
            alt={`${title} cover`} 
            fill
            className="object-cover rounded-sm"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              // Fallback if image fails to load
              const target = e.currentTarget;
              target.src = '/artpng';
            }}
          />
        </div>
        <span style={iconStyle}>
          <MusicalNoteIcon className="w-5 h-5 text-gray-100 bg-blue-500 p-1 rounded-full" />
        </span>
      </div>
      <div className="flex-1" style={{ width: '180px' }}>
        <div className="text-md text-gray-800 geist-400">{safeTitle}</div>
        <p className="text-gray-600 text-sm">{safeArtist}</p>
      </div>
      <button
        onClick={handleChangeClick}
        className="text-sm text-blue-500 hover:text-blue-900 geist-600"
      >
        Change
      </button>

      {/* @ts-expect-error - Ignoring type error for now */}
      <MusicBottom ref={musicBottomRef} />
    </div>
  )
}