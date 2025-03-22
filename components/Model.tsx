"use client"

import React, { useEffect, useRef, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';

import { useContext } from 'react';
import { Group, MeshLambertMaterial, RepeatWrapping, DoubleSide, Object3D, Mesh } from 'three';
// import { MeshStandardMaterial, TextureLoader } from 'three';
// import { useLoader } from '@react-three/fiber';
import { P5TextureCreator } from './P5Sketch';
import { RenderInfoContext, RenderInfo } from '@/app/contexts/RenderInfoContext';
// import { Vector3 } from 'three';

interface ModelProps {
  position?: [number, number, number];
}

const MODEL_PATH = "/frontnback.glb"

const Model = ({ position = [0, 0, 0] }: ModelProps) => {
  const { renderInfo } = useContext(RenderInfoContext);  // Get renderInfo from context
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  
  
 
  // Create P5 texture in a ref so it persists
  const p5TextureRef = useRef<P5TextureCreator | null>(null);
  
  useEffect(() => {
    // Create the P5 texture creator with renderInfo from context
    const info: RenderInfo = {
      trackId: '',
      trackName: '',
      trackArtists: '',
      artWork: null,
      customName1: '',
      customName2: '',
      step: 1,
      trypar: '',
      tshirtColor: 'black',
      tshirtColorHex: '#000000',
    };
    
    const textureCreator = new P5TextureCreator(info);
    p5TextureRef.current = textureCreator;

    // Wait for texture to be ready before applying it
    textureCreator.waitForReady().then(() => {
      console.log('P5 texture is ready');
      // Force a re-render to apply texture
      scene?.traverse((child: Object3D) => {
        if (child instanceof Mesh && child.material?.name === 'testt') {
          const texture = textureCreator.getTexture();
          if (texture) {
            console.log('Applying ready texture to mesh');
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.flipY = false;
            
            texture.offset.set(0, 0);
            texture.repeat.set(1, 1);
            texture.center.set(0.5, 0.5);
            texture.rotation = 0;
            
            child.material = new MeshLambertMaterial({
              map: texture,
              transparent: true,
              side: DoubleSide,
            });
            child.material.needsUpdate = true;
          }
        }
      });
    });
    
    return () => {
      // Cleanup texture to prevent memory leaks
      p5TextureRef.current?.getTexture()?.dispose();
      p5TextureRef.current = null;
    };
  }, [renderInfo]);

  // Wrap applyColor in useCallback to prevent it from changing on every render
  const applyColor = useCallback((color: string, materialName: string = 'testt') => {
    scene?.traverse((child: Object3D) => {
      if (
        child instanceof Mesh && 
        child.material && 
        child.material.name === materialName && 
        child.material.color
      ) {
        try {
          child.material.color.set(color);
          child.material.needsUpdate = true;
        } catch (error) {
          console.warn(`Failed to apply color ${color} to material ${materialName}`, error);
        }
      }
    });
  }, [scene]); // Add scene as a dependency

  // Add a useEffect to apply tshirtColorHex from renderInfo
  useEffect(() => {
    if (!renderInfo || !scene) return;

    // Apply the tshirtColorHex to the material
    if (renderInfo.tshirtColorHex) {
      applyColor(renderInfo.tshirtColorHex, 'lambert1.001');
    } else {
      applyColor('#000000', 'lambert1.001'); // Default color if not specified
    }
    
  }, [renderInfo, scene, applyColor]);

  // Keep these other color applications as they were
  applyColor('#d3d3ff', 'Cotton_Canvas_FRONT_1498.006');
  applyColor('#00FF00', 'testt');
  applyColor('#0000FF', 'backside2');
  // applyColor('#00FF00', 'backside');  // Apply green color to material named 'back'
  
  


  useEffect(() => {
    return () => {
      // Cleanup GLTF resources
      useGLTF.preload(MODEL_PATH);
    };
  }, [scene]); // Add scene to the dependency array

  return (
    <group ref={group} position={position}>
      <primitive object={scene} />
    </group>
  )
}

export default Model;