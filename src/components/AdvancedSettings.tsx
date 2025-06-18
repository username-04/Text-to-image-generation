import React from 'react';
import { Settings, Sliders } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AdvancedSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
      >
        <Settings className="w-4 h-4" />
        Advanced Settings
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-white/5 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between text-sm mb-2">
                <span>CFG Scale: {settings.cfgScale}</span>
                <Sliders className="w-4 h-4" />
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={settings.cfgScale}
                onChange={(e) => updateSettings({ cfgScale: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-sm mb-2">
                <span>Steps: {settings.steps}</span>
                <Sliders className="w-4 h-4" />
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={settings.steps}
                onChange={(e) => updateSettings({ steps: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-2 block">Width</label>
                <select
                  value={settings.width}
                  onChange={(e) => updateSettings({ width: Number(e.target.value) })}
                  className="w-full bg-white/10 rounded-lg p-2 text-sm"
                >
                  <option value="512">512px</option>
                  <option value="768">768px</option>
                  <option value="1024">1024px</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-2 block">Height</label>
                <select
                  value={settings.height}
                  onChange={(e) => updateSettings({ height: Number(e.target.value) })}
                  className="w-full bg-white/10 rounded-lg p-2 text-sm"
                >
                  <option value="512">512px</option>
                  <option value="768">768px</option>
                  <option value="1024">1024px</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};