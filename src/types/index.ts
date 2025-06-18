export interface ImageGeneration {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  settings: GenerationSettings;
}

export interface GenerationSettings {
  cfgScale: number;
  steps: number;
  style?: string;
  width: number;
  height: number;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  preset: string;
}