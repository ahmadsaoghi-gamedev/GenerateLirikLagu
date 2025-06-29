import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdvancedSettingsProps {
  settings: {
    styleReference: string;
    productionStyle: string;
    language: string;
    effects: string[];
  };
  setSettings: (settings: any) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  darkMode: boolean;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  setSettings,
  selectedTheme,
  setSelectedTheme,
  darkMode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const productionStyles = ['Vintage', 'Modern', 'Lo-fi', 'Hi-fi', 'Raw', 'Polished'];
  const languages = ['English', 'Indonesian', 'Spanish', 'French', 'Mixed'];
  const effects = ['Auto-tune', 'Distortion', 'Echo', 'Chorus', 'Reverb', 'Compression'];
  const themes = [
    { id: 'love', label: 'Love & Romance', icon: '💕' },
    { id: 'motivation', label: 'Motivation', icon: '🚀' },
    { id: 'rebellion', label: 'Rebellion', icon: '🔥' },
    { id: 'nostalgia', label: 'Nostalgia', icon: '🌅' },
    { id: 'party', label: 'Party & Fun', icon: '🎉' },
    { id: 'sadness', label: 'Sadness', icon: '😢' },
    { id: 'adventure', label: 'Adventure', icon: '🗺️' },
    { id: 'peace', label: 'Peace & Calm', icon: '🕊️' }
  ];

  const toggleEffect = (effect: string) => {
    const newEffects = settings.effects.includes(effect)
      ? settings.effects.filter(e => e !== effect)
      : [...settings.effects, effect];
    setSettings({ ...settings, effects: newEffects });
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Advanced Settings
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Lyric Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Lyric Theme
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTheme === theme.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="text-lg mb-1">{theme.icon}</div>
                  <div className="text-xs">{theme.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style Reference (Similar to...)
            </label>
            <input
              type="text"
              value={settings.styleReference}
              onChange={(e) => setSettings({ ...settings, styleReference: e.target.value })}
              placeholder="e.g., Taylor Swift, The Beatles, Daft Punk"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Production Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Production Style
            </label>
            <div className="flex flex-wrap gap-2">
              {productionStyles.map(style => (
                <button
                  key={style}
                  onClick={() => setSettings({ ...settings, productionStyle: style })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    settings.productionStyle === style
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Effects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Audio Effects
            </label>
            <div className="flex flex-wrap gap-2">
              {effects.map(effect => (
                <button
                  key={effect}
                  onClick={() => toggleEffect(effect)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    settings.effects.includes(effect)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;