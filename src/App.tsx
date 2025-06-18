import React, { useState } from 'react';
import { ImageIcon, Loader2, Wand2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { AdvancedSettings } from './components/AdvancedSettings';
import { StylePresets } from './components/StylePresets';
import { HistoryPanel } from './components/HistoryPanel';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { settings, addToHistory } = useStore();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: settings.cfgScale,
          height: settings.height,
          width: settings.width,
          steps: settings.steps,
          samples: 1
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const imageBase64 = data.artifacts[0].base64;
        const imageUrl = `data:image/png;base64,${imageBase64}`;
        
        addToHistory({
          id: crypto.randomUUID(),
          prompt,
          imageUrl,
          timestamp: Date.now(),
          settings: { ...settings }
        });

        toast.success('Image generated successfully!');
      } else {
        toast.error(data.message || 'Failed to generate image');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (presetPrompt: string) => {
    setPrompt(presetPrompt + prompt);
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-emerald-900 to-teal-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8" />
            AI Image Generator
          </h1>
          <p className="text-gray-200">Transform your ideas into stunning images with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-white/10"
              onKeyPress={(e) => e.key === 'Enter' && generateImage()}
            />
            <button
              onClick={generateImage}
              disabled={loading}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>
          </div>

          <StylePresets onSelect={handlePresetSelect} />
          <AdvancedSettings />
        </div>

        <HistoryPanel />

        <footer className="text-center mt-8">
          
        </footer>
      </div>
      
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;