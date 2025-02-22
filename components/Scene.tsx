'use client'

import { Canvas } from "@react-three/fiber"
import Model from './Model'
import P5Sketch from './P5Sketch'
import { Suspense, useRef } from "react"
import { Environment, OrbitControls, Grid, AxesHelper } from "@react-three/drei"

function HDREnvironment() {
  return <Environment files="./arcing.hdr" /> // Ensure the path is correct
}

export default function Scene() {
  const cameraRef = useRef<any>(null)

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas
        style={{ background: '#f6f6f6', height: '100%', width: '100%', }}
        camera={{
          ref: cameraRef,
          position: [0, 0, 0.5],
          fov: 75,
          near: 0.1,
          far: 1000
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