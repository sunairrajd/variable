import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useContext } from 'react';
import { Group, MeshLambertMaterial, MeshStandardMaterial, TextureLoader, RepeatWrapping, DoubleSide } from 'three';
import { useLoader } from '@react-three/fiber';
import { P5TextureCreator } from './P5Sketch';
import { RenderInfoContext } from '@/app/make/page';


const MODEL_PATH = "/shirt2.glb"

const Model = () => {
  const { renderInfo } = useContext(RenderInfoContext);  // Get renderInfo from context
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  
  
 
  // Create P5 texture in a ref so it persists
  const p5TextureRef = useRef<P5TextureCreator | null>(null);
  
  useEffect(() => {
    // Create the P5 texture creator with renderInfo from context
    const info = {
      trackId: renderInfo.trackId,
      trackName: renderInfo.trackName,
      trackArtists: renderInfo.trackArtists,
      artWork: renderInfo.artWork
    };
    p5TextureRef.current = new P5TextureCreator(info);
    
    return () => {
      // Cleanup texture to prevent memory leaks
      p5TextureRef.current?.getTexture()?.dispose();
      p5TextureRef.current = null;
    };
  }, [renderInfo]);

  useEffect(() => {
    scene?.traverse((child: any) => {
      if (child.isMesh && child.material?.name === 'testt') {
        const texture = p5TextureRef.current?.getTexture();
        if (texture) {
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

    // Set the position of the model
    if (scene) {
      scene.position.set(0, 0.06,0);
    }
  }, [scene]);





  const applyColor = (color: string, materialName: string = 'testt') => {
    scene?.traverse((child: any) => {
      if (
        child.isMesh && 
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
  };

  applyColor('#d3d3ff', 'lambert1.001');
  applyColor('#d3d3ff', 'Cotton_Canvas_FRONT_1498.006');
  applyColor('#FF0000', 'testt');
  
  


  useEffect(() => {
    return () => {
      // Cleanup GLTF resources
      useGLTF.preload(MODEL_PATH);
    };
  }, []);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

export default Model;