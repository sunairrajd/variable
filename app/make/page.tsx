"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, createContext, useContext, useEffect } from 'react'
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
import ColorSelector from '@/components/ui/colorSelector';



export const RenderInfoContext = createContext();
  


export default function Home() {








  const [isMinimized, setIsMinimized] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const toggleMinimized = () => {
    setIsMinimized((prev) => !prev)
  }

  const [renderInfo, setRenderInfo] = useState({
    trackId: 'dd',
    trackName: 'test',
    customName1:'myname1',
    customName2:'myname2',
    trackArtists: 'tdestartist',
    trypar: 'rr',
   artWork: null,
    step: '10',
    tshirtColor:'black',
    tshirtColorHex:'#000000',
    
  });
  
  console.log('renderInfo in page:', renderInfo);
  useEffect(() => {
    const event = new CustomEvent('renderInfoUpdated', { detail: renderInfo });
    window.dispatchEvent(event);
  }, [renderInfo]);

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


            <Scene currentStep={renderInfo.step} />
          </div>
          <StepWizard 
            isMinimized={isMinimized} 
            toggleMinimized={toggleMinimized} 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </RenderInfoContext.Provider>
    
  )
}