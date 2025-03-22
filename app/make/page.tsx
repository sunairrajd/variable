"use client"
// import * as THREE from 'three'
// import { createRoot } from 'react-dom/client'
// import { useState, useEffect } from 'react'
import React from 'react'
// import React, { useRef, useContext} from 'react'
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import '../../styles/Home.module.css' // Adjusted import path
// import { getAlbum } from '@/utils/spotifyApi'
// import CardControls from '@/components/CardControls'
// import { default as dynamicImport } from 'next/dynamic'
// import StepWizard from '@/components/StepWizard'
// import { GeistSans } from 'geist/font/sans';
// import { Button } from "@/components/ui/button"
// import { buttonVariants } from "@/components/ui/button"
// import Scene from '@/components/Scene'
// import P5Sketch from '@/components/P5Sketch'
// import ColorSelector from '@/components/ui/colorSelector';
// import { RenderInfoContext, RenderInfo } from '@/app/contexts/RenderInfoContext'
// import Image from 'next/image'

// Correct order: imports first, then exports
import { default as DynamicImport } from 'next/dynamic' // Renamed the import

// This tells Next.js to skip static generation for this page
export const dynamic = 'force-dynamic'

// Use the renamed import
const MakeClient = DynamicImport(() => import('./client'), { 
  ssr: false, // Critical: Disable SSR for the client component
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
})

export default function MakePage() {
  // This simple server component avoids prerendering client-side code
  return <MakeClient />
}

