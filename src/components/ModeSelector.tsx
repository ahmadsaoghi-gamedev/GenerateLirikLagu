import React from 'react';

interface ModeSelectorProps {
  selectedMode: 'full' | 'instrumental' | 'lyrics' | 'custom';
  setSelectedMode: (mode: 'full' | 'instrumental' | 'lyrics' | 'custom') => void;
  darkMode: boolean;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedMode,
  setSelectedMode,
  darkMode
}) => {
  const modes = [
    { 
      id: 'full' as const, 
      label: 'Complete Song', 
      icon: '🎼',
      description: 'Full song with vocals and instruments'
    },
    { 
      id: 'instrumental' as const, 
      label: 'Instrumental Only', 
      icon: '🎵',
      description: 'Music without vocals'
    },
    { 
      id: 'lyrics' as const, 
      label: 'With Lyrics', 
      icon: '🎤',
      description: 'Generated lyrics included'
    },
    { 
      id: 'custom' as const, 
      label: 'Custom Prompt', 
      icon: '⚙️',
      description: 'Advanced customization'
    }
  ];

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Generation Mode
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
              selectedMode === mode.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600'
            }`}
          >
            <div className="text-3xl mb-2">{mode.icon}</div>
            <div className="text-sm font-semibold mb-1">{mode.label}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{mode.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;