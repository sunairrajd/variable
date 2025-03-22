// "use client"

// import p5 from 'p5';
// import { CanvasTexture } from 'three';
// import { uploadImageToFirebase } from './ImageUpload';
// import React, { useEffect, useRef, useContext } from 'react';
// import { RenderInfoContext } from '@/app/make/page';
// import { useState } from 'react';

// interface RenderInfo {
//   trackId: string | null;
//   trackName: string;
//   trackArtists: string;
//   artWork: string | null;
//   customName: string;
//   step?: number;
// }

// export class P5TextureCreator {
//   private canvas: HTMLCanvasElement | null = null;
//   private texture: CanvasTexture | null = null;
//   private p5Instance: p5.p5InstanceExtensions | null = null;
//   private isSaving: boolean = false;
//   private isReady: boolean = false;
//   private readyCallback: (() => void) | null = null;

//   constructor(private renderInfo: RenderInfo) {
//     console.log('P5Sketch: Constructor called with renderInfo:', renderInfo);
    
//     // Check if event listeners are already added
//     if (!window['p5TextureCreatorListenersAdded']) {
//       window['p5TextureCreatorListenersAdded'] = true;

//       // Listen for save request
//       window.addEventListener('saveSketch', (() => {
//         console.log('P5Sketch: Save request received');
//         this.saveSketch();
//       }) as EventListener);

//       // Add listener for renderInfo updates
//       window.addEventListener('updateRenderInfo', ((event: CustomEvent) => {
//         console.log('P5Sketch: Received new renderInfo:', event.detail);
//         this.renderInfo = event.detail;
//         if (this.p5Instance) {
//           this.p5Instance.redraw();
//         }
//       }) as EventListener);

//       console.log('P5Sketch: Event listeners added');
//     }

//     // Dispatch event when P5Sketch is ready
//     window.dispatchEvent(new CustomEvent('p5SketchReady'));
//     console.log('P5Sketch: Ready event dispatched');

//     new p5((p: p5.p5InstanceExtensions) => {
//       this.p5Instance = p;
      
//       p.setup = () => {
//         const canvas = p.createCanvas(1024, 1024);
//         canvas.hide();
//         this.canvas = canvas.elt;
//         this.texture = new CanvasTexture(this.canvas);
//         p.colorMode(p.RGB, 255, 255, 255, 1);
//         p.noLoop();  // Stop continuous looping
//         p.draw(); // Force initial draw
//         this.isReady = true;
//         if (this.readyCallback) {
//           this.readyCallback();
//         }
//       };

//       p.draw = () => {
//         p.clear();
//         p.blendMode(p.BLEND);
        
//         // Draw base rectangle
//         p.noStroke();
//         p.fill(255, 0, 0, 0);
//         p.rect(675,553,209,263)
//         p.rect(170, 553, 209, 263);

//         // Add text for track name and artist
//         p.fill('#FA569D');
//         p.textSize(16);
//         p.textAlign(p.CENTER, p.CENTER);
        
//         const textX = 170 + 209/2;
//         console.log('Track Name:', this.renderInfo.trackName);
//         console.log('Track Artists:', this.renderInfo.trackArtists);
//         p.text(this.renderInfo.trackName, textX, 200);
//         p.text(this.renderInfo.trackArtists, textX, 240);
//         p.text(this.renderInfo.customName, 779, 208);
//         p.text(this.renderInfo.step, 779, 230);

//         // Calculate center of rectangle for flower
//         const centerX = 170 + 209/2;
//         const centerY = 208 + 263/2;
        
//         // Draw flower
//         // Center circle
//         p.fill('#FA569D');  // Darker red for center
//         p.circle(centerX, centerY, 40);
        
//         // Petals
//         p.fill('#FA569D');  // Changed to orange-red for better multiply effect
//         const petalSize = 35;
//         const petalDistance = 30;
        
//         // Draw 6 petals in a circle
//         for (let angle = 0; angle < 360; angle += 60) {
//           const xOffset = petalDistance * Math.cos(p.radians(angle));
//           const yOffset = petalDistance * Math.sin(p.radians(angle));
//           p.circle(centerX + xOffset, centerY + yOffset, petalSize);
//         }

//         // Reset blend mode to normal for future drawings
//         p.blendMode(p.BLEND);

//         if (this.texture) {
//           this.texture.needsUpdate = true;
//         }
//       };
//     });
//   }

//   private async saveSketch(): Promise<void> {
//     if (this.p5Instance && this.canvas) {
//       try {
//         // Force a redraw to ensure latest state
//         this.p5Instance.redraw();
        
//         // Convert canvas to blob
//         const blob = await new Promise<Blob>((resolve, reject) => {
//           this.canvas?.toBlob((blob) => {
//             if (blob) resolve(blob);
//             else reject(new Error('Failed to create blob'));
//           }, 'image/png');
//         });

//         // Upload to Firebase
//         const url = await uploadImageToFirebase(blob);
//         console.log('Successfully saved and uploaded sketch:', url);

//       } catch (error) {
//         console.error('Failed to save or upload sketch:', error);
//       }
//     }
//   }

//   // Public method to trigger save
//   public save(): void {
//     this.saveSketch();
//   }

//   getTexture(): CanvasTexture | null {
//     return this.texture;
//   }

//   // Add new method to check if texture is ready
//   public waitForReady(): Promise<void> {
//     if (this.isReady) {
//       return Promise.resolve();
//     }
//     return new Promise((resolve) => {
//       this.readyCallback = resolve;
//     });
//   }
// }

// // Functional component to use the class
// const P5Sketch: React.FC = () => {
//   const contextValue = useContext(RenderInfoContext);
//   console.log("Context Value in P5Sketch:", contextValue);
//   const renderInfo = contextValue?.renderInfo || {};
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [textureCreator, setTextureCreator] = useState<P5TextureCreator | null>(null);

//   useEffect(() => {
//     console.log("Full renderInfo object:", renderInfo);
//     // Create the texture creator only once
//     if (!textureCreator) {
//       const creator = new P5TextureCreator(renderInfo);
//       setTextureCreator(creator);
//     } else {
//       // Update the existing texture creator when renderInfo changes
//       window.dispatchEvent(new CustomEvent('updateRenderInfo', { detail: renderInfo }));
//     }
//   }, [renderInfo, textureCreator]);

//   return <div ref={canvasRef}></div>;
// };

// export default P5Sketch;

// // Example usage