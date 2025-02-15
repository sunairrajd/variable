// ... existing imports ...
import { P5TextureCreator } from './components/P5Sketch';

export function Model() {
  // ... existing code ...

  // Create P5 texture instance
  const p5Texture = new P5TextureCreator(1024, 1024);
  
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