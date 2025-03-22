// "use client"

// import { Group, Mesh, MeshLambertMaterial, ClampToEdgeWrapping, DoubleSide, TextureLoader, Object3D } from 'three';
// import { useGLTF } from '@react-three/drei';
// import { useRef, useEffect } from 'react';
// import { useLoader } from '@react-three/fiber';

// const MODEL_PATH = "/shirt2.glb"

// const ImageModel = () => {
//   const group = useRef<Group>(null);
//   const { scene } = useGLTF(MODEL_PATH);
//   const dogeTexture = useLoader(TextureLoader, '/red.png');
  
//   useEffect(() => {
//     scene?.traverse((child: Object3D) => {
//       if (child instanceof Mesh && child.material && 'name' in child.material && child.material.name === 'testt') {
//         if (dogeTexture) {
//           dogeTexture.wrapS = dogeTexture.wrapT = ClampToEdgeWrapping;
          
//           dogeTexture.center.set(0.5, 0.5);
//           dogeTexture.offset.set(0, 0);
//           dogeTexture.repeat.set(1, 1);
//           dogeTexture.rotation = 0;
          
//           const newMaterial = new MeshLambertMaterial({
//             map: dogeTexture,
//             transparent: true,
//             side: DoubleSide,
//           });
          
//           newMaterial.needsUpdate = true;
//           child.material = newMaterial;
//         }
//       }
//     });
//   }, [scene, dogeTexture]);



//   const applyColor = (color: string, materialName: string = 'lambert1.001') => {
//     scene?.traverse((child: Object3D) => {
//       if (
//         child instanceof Mesh && 
//         child.material && 
//         'name' in child.material &&
//         child.material.name === materialName && 
//         'color' in child.material
//       ) {
//         try {
//           child.material.color.set(color);
//           child.material.needsUpdate = true;
//         } catch (error) {
//           console.warn(`Failed to apply color ${color} to material ${materialName}`, error);
//         }
//       }
//     });
//   };

//   applyColor('blue', 'lambert1.001');



//   return (
//     <group ref={group}>
//       <primitive object={scene} />
//     </group>
//   );
// };

// export default ImageModel;