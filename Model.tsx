// ... existing imports ...
import { P5TextureCreator } from './components/P5Sketch';
import { RenderInfo } from '@/app/contexts/RenderInfoContext';

// Define a type for the props
interface ModelProps {
  [key: string]: any; // This allows any props to be passed
  // You can also define specific props if you know them:
  // position?: [number, number, number];
  // scale?: [number, number, number];
  // rotation?: [number, number, number];
}

export function Model(props: ModelProps) {
  // ... existing code ...

  // Create P5 texture instance with a RenderInfo object
  const renderInfo: RenderInfo = {
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
  
  const p5Texture = new P5TextureCreator(renderInfo);
  
  return (
    <group {...props} dispose={null}>
      // ... other meshes ...
      <mesh
        // ... other mesh properties ...
        material-map={p5Texture.getTexture()}
        name="testt"
      >
        <meshStandardMaterial />
      </mesh>
      // ... other meshes ...
    </group>
  );
}