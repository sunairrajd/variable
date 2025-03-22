'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import '../../styles/Home.module.css'
import StepWizard from '@/components/StepWizard'
import { Button } from "@/components/ui/button"
import { RenderInfoContext, RenderInfo } from '@/app/contexts/RenderInfoContext'
import Image from 'next/image'

// Dynamically import Scene with no SSR
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function MakeClient() {
  const [isMinimized, setIsMinimized] = useState(false)
  const toggleMinimized = () => {
    setIsMinimized((prev) => !prev)
  }

  const [renderInfo, setRenderInfo] = useState<RenderInfo>({
    trackId: '',
    trackName: '',
    customName1: '',
    customName2: '',
    trackArtists: '',
    trypar: '',
    artWork: null,
    step: 1,
    tshirtColor: 'black',
    tshirtColorHex: '#000000',
  });
  
  console.log('renderInfo in page:', renderInfo);
  
  useEffect(() => {
    // This code now only runs in the browser
    const event = new CustomEvent('renderInfoUpdated', { detail: renderInfo });
    window.dispatchEvent(event);
  }, [renderInfo]);

  const [shareableUrl, setShareableUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleDesignSaved = (event: CustomEvent) => {
      setShareableUrl(event.detail.shareableUrl);
    };
    
    window.addEventListener('designSaved', handleDesignSaved as EventListener);
    
    return () => {
      window.removeEventListener('designSaved', handleDesignSaved as EventListener);
    };
  }, []);

  const generateShareableUrl = () => {
    const trackId = renderInfo.trackId || '';
    const trackName = renderInfo.trackName || '';
    const trackArtists = renderInfo.trackArtists || '';
    const customName1 = renderInfo.customName1 || '';
    const customName2 = renderInfo.customName2 || '';
    const tshirtColor = renderInfo.tshirtColor || 'black';
    
    return `/saved?tid=${encodeURIComponent(trackId)}&tn=${encodeURIComponent(trackName)}&ta=${encodeURIComponent(trackArtists)}&cn1=${encodeURIComponent(customName1)}&cn2=${encodeURIComponent(customName2)}&tc=${encodeURIComponent(tshirtColor)}`;
  };

  return (
    <RenderInfoContext.Provider value={{ renderInfo, setRenderInfo }}>
      <div className="flex flex-col min-h-screen w-full bg-white">
        <header className="bg-none p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
          <Image src="/var.svg" alt="Logo" width={100} height={16} className="h-4" />
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              window.dispatchEvent(new CustomEvent('saveSketch'));
              console.log('Save clicked - dispatched saveSketch event');
            }}>Save</Button>
            <Button variant="default" onClick={() => console.log('Done clicked')}>Done</Button>
          </div>
        </header>
        <div className="flex-1 flex flex-col">
          <div
            className="three-container relative p-0 transition-all duration-300 ease-in-out"
            style={{
              height: `calc(100vh - 4rem - ${isMinimized ? '3rem' : '11.5rem'})`,
              width: '100%',
            }}
          >
            <Scene currentStep={Number(renderInfo.step)} />
          </div>
          <StepWizard 
            isMinimized={isMinimized} 
            toggleMinimized={toggleMinimized} 
          />
          {shareableUrl && (
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + shareableUrl);
              }}
            >
              Copy Share Link
            </Button>
          )}
        </div>
      </div>
    </RenderInfoContext.Provider>
  )
}
