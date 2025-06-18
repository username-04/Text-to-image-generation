import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const HistoryPanel: React.FC = () => {
  const { history, clearHistory } = useStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Generation History
        </h2>
        <button
          onClick={clearHistory}
          className="text-red-400 hover:text-red-300 flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white/5 rounded-lg p-3">
            <img
              src={item.imageUrl}
              alt={item.prompt}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-300 line-clamp-2">{item.prompt}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};