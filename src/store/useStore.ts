import { create } from 'zustand';
import { ImageGeneration, GenerationSettings } from '../types';

interface Store {
  history: ImageGeneration[];
  addToHistory: (generation: ImageGeneration) => void;
  clearHistory: () => void;
  settings: GenerationSettings;
  updateSettings: (settings: Partial<GenerationSettings>) => void;
}

const defaultSettings: GenerationSettings = {
  cfgScale: 7,
  steps: 30,
  width: 1024,
  height: 1024,
};

export const useStore = create<Store>((set) => ({
  history: [],
  settings: defaultSettings,
  addToHistory: (generation) => 
    set((state) => ({ 
      history: [generation, ...state.history].slice(0, 10)
    })),
  clearHistory: () => set({ history: [] }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    })),
}));