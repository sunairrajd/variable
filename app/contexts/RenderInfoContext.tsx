"use client"
import { createContext } from 'react';

// Define the type for renderInfo
export interface RenderInfo {
  trackId: string;
  trackName: string;
  customName1: string;
  customName2: string;
  trackArtists: string;
  trypar: string;
  artWork: string | null;
  step: number;
  tshirtColor: string;
  tshirtColorHex: string;
}

// Provide safe default values for all properties
export const defaultRenderInfo: RenderInfo = {
  trackId: '',
  trackName: '',
  customName1: '',
  customName2: '',
  trackArtists: '',
  trypar: '',
  artWork: null,
  step: 1,
  tshirtColor: 'black',
  tshirtColorHex: '#000000',
};

export const RenderInfoContext = createContext<{
  renderInfo: RenderInfo;
  setRenderInfo: React.Dispatch<React.SetStateAction<RenderInfo>>;
}>({
  renderInfo: defaultRenderInfo,
  setRenderInfo: () => {}, // No-op function as default
}); 