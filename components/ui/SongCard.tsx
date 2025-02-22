import * as React from "react"
import { useRef } from "react"
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import { IoShuffle } from "react-icons/io5";
import { SongContext } from '@/app/make/page'
import { useContext, useState } from 'react';
import MusicBottom from '@/components/MusicBottom';

interface SongCardProps {
  title: string
  artist: string
  image: string
  onChange: () => void
}

export default function SongCard({ title, artist, image, onChange }: SongCardProps) {
  const musicBottomRef = useRef(null);

  const handleChangeClick = () => {
    if (musicBottomRef.current) {
      musicBottomRef.current.openSheet();
    }
  };

  const iconStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '24px',
    height: '24px',
    color: 'gray',
    left:'-3px',
  };


  return (
    <div className="max-w-sm rounded-md inline-block border border-blue-200 bg-blue-50 p-5 mx-4 flex items-center">
      <div className="relative">
        <img className="w-12 h-12 object-cover rounded-xs mr-6" src={image} alt={`${title} album artwork`} />
        <span style={iconStyle}>
          <MusicalNoteIcon className="w-5 h-5 text-gray-100 bg-blue-500 p-1 rounded-full" />
        </span>
      </div>
      <div className="flex-1" style={{ width: '180px' }}>
        <div className="text-md text-gray-800 geist-400">{title}</div>
        <p className="text-gray-600 text-sm">{artist}</p>
      </div>
      <button
        onClick={handleChangeClick}
        className="text-sm text-blue-500 hover:text-blue-900 geist-600"
      >
        Change
      </button>

      <MusicBottom ref={musicBottomRef} />
    </div>
  )
}