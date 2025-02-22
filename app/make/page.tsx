"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, createContext, useContext } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import '../../styles/Home.module.css' // Adjusted import path
import { getAlbum } from '@/utils/spotifyApi'
import CardControls from '@/components/CardControls'
import dynamic from 'next/dynamic'
import StepWizard from '@/components/StepWizard'
import { GeistSans } from 'geist/font/sans';
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Scene from '@/components/Scene'
import P5Sketch from '@/components/P5Sketch'


export const RenderInfoContext = createContext();

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimized = () => {
    setIsMinimized((prev) => !prev)
  }

  const [renderInfo, setRenderInfo] = useState({
    trackId: null,
    trackName: 'test',
    trackArtists: 'testartist',
    artWork: null,
  });
  
  const handleGenerate = (trackId: string) => {
    // Handle generate button click
    console.log('Generate clicked with track ID:', trackId)
  }

  return (
 
    <RenderInfoContext.Provider value={{ renderInfo, setRenderInfo }}>
      <div className="flex flex-col min-h-screen w-full bg-white">
        <header className="bg-none p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
          <img src="/var.svg" alt="Logo" className="h-4" />
          <Button variant="default" onClick={() => console.log('Done clicked')}>Done</Button>
        </header>
        <div className="flex-1 flex flex-col">
          <div
            className="three-container relative p-0 transition-all duration-300 ease-in-out"
            style={{
              height: `calc(100vh - 4rem - ${isMinimized ? '3rem' : '11.5rem'})`,
              width: '100%',
            }}
          >
            <Scene />
          </div>
          <StepWizard isMinimized={isMinimized} toggleMinimized={toggleMinimized} />
        </div>
      </div>
    </RenderInfoContext.Provider>
    
  )
}