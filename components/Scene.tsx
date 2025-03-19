'use client'

import { Canvas } from "@react-three/fiber"
import Model from './Model'
import P5Sketch from './P5Sketch'
import { Suspense, useRef } from "react"
import { Environment, OrbitControls, Grid, AxesHelper } from "@react-three/drei"
import ColorSelector from './ui/colorSelector'

function HDREnvironment() {
  return <Environment files="./arcing.hdr" /> // Ensure the path is correct
}

export default function Scene({ currentStep }: { currentStep: number }) {
  const cameraRef = useRef<any>(null)

  // Define camera positions based on the current step
  const cameraPositions = [
    [0, 0, 0.5], // Position for step 0
    [1, 1, 1],   // Position for step 1
    [2, 2, 2],   // Position for step 2
    [0, 2, 2],   // New position for step 2 (change as needed)
  ];


  

  return (
    <div style={{ height: '100%', width: '100%' }}>


      <Canvas
        style={{ background: '#f6f6f6', height: '100%', width: '100%' }}
        camera={{
          ref: cameraRef,
          position: cameraPositions[currentStep] || cameraPositions[0], // Default to step 0 if out of bounds
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={4} />
        <directionalLight position={[-5, -5, 5]} intensity={3} />
       
        <Suspense fallback={null}>
          <Model position={[1, 0.06, 3]} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          minDistance={0.2}
          maxDistance={20}
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  )
}


// <Grid
// args={[100, 100]}
// cellSize={0.3}
// cellThickness={1}
// cellColor="#f6f6f6"
// sectionSize={30}
// sectionColor="#f6f6f6"
// position={[0, -0.3, 0]}
// />
// <axesHelper args={[10]} />