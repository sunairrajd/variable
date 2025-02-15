"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import '../styles/Home.module.css'
import { getAlbum } from '@/utils/spotifyApi'
import CardControls from '@/components/CardControls'



import dynamic from 'next/dynamic'




const Scene= dynamic(() => import ('@/components/Scene'), {ssr: false})

export default function Home () {

  const handleGenerate = (trackId: string) => {
    // Handle generate button click
    console.log('Generate clicked with track ID:', trackId)
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="absolute z-10">
        <p className="font-sans text-black">This is sans</p>
        <p className="font-stevie text-black">This is stevie GROTESK sans</p>
        <p className="font-roc text-black">This is GROTESK roc sans</p>
        <p className="font-ff text-black">This is FF REAL TEXT PRO sans</p>
        <CardControls onGenerate={handleGenerate} />
        {/* <ImageUpload /> */}
      </div>
      <div className="w-full h-screen">
        <Scene />
      </div>
    </main>
  )













}
// async function fetchAlbumData() {
//   try {
//     const albumData = await getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
//     console.log('Album data:', albumData);
//     // albumData will contain all album information including:
//     // - name
//     // - artists
//     // - tracks
//     // - images
//     // - release date
//     // etc.
//   } catch (error) {
//     console.error('Failed to fetch album:', error);
//   }
// }

// fetchAlbumData();

