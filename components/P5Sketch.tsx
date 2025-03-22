"use client"

import p5 from 'p5';
import { CanvasTexture } from 'three';
// import { uploadImageToFirebase } from './ImageUpload';
import React, { useEffect, useContext, useRef, useMemo } from 'react';
// import {useRef} from 'react';
import { RenderInfoContext } from '@/app/contexts/RenderInfoContext';
import { useState } from 'react';
import { saveDesign } from '@/services/saveDesign';

// Extend the Window interface to include our custom property
declare global {
  interface Window {
    p5TextureCreatorListenersAdded?: boolean;
  }
}

interface RenderInfo {
  trackId: string | null;
  trackName: string;
  trackArtists: string;
  // artWork: string | null;
  customName1: string | null;
  customName2: string | null;
  step?: number;
  trypar: string | null;
  tshirtColor: string | null;
  tshirtColorHex: string | null;
  customName?: string | null;
}

// Define a type for the p5 sketch function parameter
interface P5SketchFunctions {
  setup: () => void;
  draw: () => void;
  createCanvas: (width: number, height: number) => { elt: HTMLCanvasElement; hide: () => void };
  colorMode: (mode: Record<string, unknown>, max1: number, max2: number, max3: number, max4: number) => void;
  noLoop: () => void;
  redraw: () => void;
  clear: () => void;
  blendMode: (mode: Record<string, unknown>) => void;
  noStroke: () => void;
  fill: (r: number | string, g?: number, b?: number, a?: number) => void;
  rect: (x: number, y: number, w: number, h: number) => void;
  textSize: (size: number) => void;
  textAlign: (horizAlign: Record<string, unknown>, vertAlign: Record<string, unknown>) => void;
  text: (str: string | null, x: number, y: number) => void;
  circle: (x: number, y: number, d: number) => void;
  radians: (degrees: number) => number;
  RGB: Record<string, unknown>;
  BLEND: Record<string, unknown>;
  CENTER: Record<string, unknown>;
}

export class P5TextureCreator {
  private canvas: HTMLCanvasElement | null = null;
  private texture: CanvasTexture | null = null;
  private p5Instance: p5 | null = null;
  private isSaving: boolean = false;
  private isReady: boolean = false;
  private readyCallback: (() => void) | null = null;

  constructor(private renderInfo: RenderInfo) {
    console.log('P5Sketch: Constructor called with renderInfo:', renderInfo);
    
    // Check if event listeners are already added
    if (!window.p5TextureCreatorListenersAdded) {
      window.p5TextureCreatorListenersAdded = true;

      // Listen for save request
      window.addEventListener('saveSketch', (() => {
        console.log('P5Sketch: Save request received');
        this.saveSketch();
      }) as EventListener);

      // Add listener for renderInfo updates
      window.addEventListener('renderInfoUpdated', ((event: CustomEvent<RenderInfo>) => {
        console.log('P5Sketch: Received new renderInfo (FULL):', JSON.stringify(event.detail));
        this.renderInfo = event.detail;
        if (this.p5Instance) {
          this.p5Instance.redraw();
        }
      }) as EventListener);

      console.log('P5Sketch: Event listeners added');
    }

    // Dispatch event when P5Sketch is ready
    window.dispatchEvent(new CustomEvent('p5SketchReady'));
    console.log('P5Sketch: Ready event dispatched');

    // Use a more specific type instead of any
    new p5((p: P5SketchFunctions) => {
      this.p5Instance = p as unknown as p5;
      
      p.setup = () => {
        const canvas = p.createCanvas(1024, 1024);
        canvas.hide();
        this.canvas = canvas.elt;
        this.texture = new CanvasTexture(this.canvas);
        p.colorMode(p.RGB, 255, 255, 255, 1);
        p.noLoop();  // Stop continuous looping
        p.draw(); // Force initial draw
        this.isReady = true;
        if (this.readyCallback) {
          this.readyCallback();
        }
      };

      p.draw = () => {
        p.clear();
        p.blendMode(p.BLEND);
        
        // Safeguard all potential string values before operations
        const safeTrackName = this.renderInfo.trackName || "";
        const safeTrackArtists = this.renderInfo.trackArtists || "";
        const safeCustomName1 = this.renderInfo.customName1 || "";
        const safeCustomName2 = this.renderInfo.customName2 || "";
        
        // Draw base rectangle
        p.noStroke();
        p.fill(255, 0, 0, 0);
        p.rect(675, 553, 209, 263);
        p.rect(170, 553, 209, 263);

        // Add text for track name and artist
        p.fill('#FA569D');
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        
        const textX = 170 + 209/2;
        console.log('Track Name:', safeTrackName);
        console.log('Track Artists:', safeTrackArtists);
        console.log('customName:', this.renderInfo.customName);
        p.text(safeTrackName, textX, 200);
        p.text(safeTrackArtists, textX, 240);
        p.text(safeCustomName1, 779, 208);
        p.text(safeCustomName2, 779, 230);


        // Calculate center of rectangle for flower
        const centerX = 170 + 209/2;
        const centerY = 208 + 263/2;
        
        // Draw flower
        // Center circle
        p.fill('#FA569D');  // Darker red for center
        p.circle(centerX, centerY, 40);
        
        // Petals
        p.fill('#FA569D');  // Changed to orange-red for better multiply effect
        const petalSize = 35;
        const petalDistance = 30;
        
        // Draw 6 petals in a circle
        for (let angle = 0; angle < 360; angle += 60) {
          const xOffset = petalDistance * Math.cos(p.radians(angle));
          const yOffset = petalDistance * Math.sin(p.radians(angle));
          p.circle(centerX + xOffset, centerY + yOffset, petalSize);
        }

        // Reset blend mode to normal for future drawings
        p.blendMode(p.BLEND);

        if (this.texture) {
          this.texture.needsUpdate = true;
        }
      };
    });
  }

  private async saveSketch(): Promise<void> {
    if (this.p5Instance && this.canvas) {
      try {
        // Force a redraw to ensure latest state
        this.p5Instance.redraw();
        
        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve, reject) => {
          this.canvas?.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          }, 'image/png');
        });

        // Save design to Firestore and Storage
        const { designId, shareableUrl } = await saveDesign(blob, this.renderInfo);
        console.log('Successfully saved design with ID:', designId);
        console.log('Shareable URL:', shareableUrl);
        
      } catch (error: unknown) {
        console.error('Failed to save design:', error instanceof Error ? error.message : String(error));
      }
    }
  }

  // Public method to trigger save
  public save(): void {
    this.saveSketch();
  }

  getTexture(): CanvasTexture | null {
    return this.texture;
  }

  // Add new method to check if texture is ready
  public waitForReady(): Promise<void> {
    if (this.isReady) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.readyCallback = resolve;
    });
  }
}

// Functional component to use the class
const P5Sketch: React.FC = () => {
  const contextValue = useContext(RenderInfoContext);
  console.log("Context Value in P5Sketch:", contextValue);
  
  // Use useMemo to memoize the renderInfo object
  const renderInfo = useMemo(() => {
    return contextValue?.renderInfo || {
      trackId: null,
      trackName: '',
      trackArtists: '',
      // artWork: null,
      customName1: null,
      customName2: null,
      trypar: null,
      tshirtColor: null,
      tshirtColorHex: null
    };
  }, [contextValue?.renderInfo]);
  
  console.log("RenderInfo before creating P5TextureCreator:", JSON.stringify(renderInfo));

  const [textureCreator, setTextureCreator] = useState<P5TextureCreator | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Full renderInfo object:", JSON.stringify(renderInfo));
    // Create the texture creator only once
    if (!textureCreator) {
      const creator = new P5TextureCreator(renderInfo);
      setTextureCreator(creator);
    } else {
      // Update the existing texture creator when renderInfo changes
      window.dispatchEvent(new CustomEvent('renderInfoUpdated', { detail: renderInfo }));
    }
  }, [renderInfo, textureCreator]);

  return <div ref={canvasRef}></div>;
};

export default P5Sketch;

// Example usage