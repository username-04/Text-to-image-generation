import React from 'react';
import { Palette } from 'lucide-react';
import { StylePreset } from '../types';
import { useStore } from '../store/useStore';

const presets: StylePreset[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic style with natural lighting and details',
    preset: 'Create a photorealistic image with natural lighting and detailed textures: ',
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style with vibrant colors',
    preset: 'Create an anime-style illustration with vibrant colors and characteristic anime features: ',
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical and ethereal fantasy art style',
    preset: 'Create a magical fantasy artwork with ethereal lighting and mystical elements: ',
  },
];

export const StylePresets: React.FC<{ onSelect: (preset: string) => void }> = ({ onSelect }) => {
  return (
    <div className="mt-4">
      <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
        <Palette className="w-4 h-4" />
        Style Presets
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.preset)}
            className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-left transition-colors"
          >
            <h4 className="text-sm font-medium">{preset.name}</h4>
            <p className="text-xs text-gray-400 mt-1">{preset.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};