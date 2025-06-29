import React from 'react';
import { moods } from '../data/moods';

interface MoodSelectorProps {
  selectedMoods: string[];
  setSelectedMoods: (moods: string[]) => void;
  darkMode: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  selectedMoods, 
  setSelectedMoods, 
  darkMode 
}) => {
  const toggleMood = (mood: string) => {
    setSelectedMoods(
      selectedMoods.includes(mood)
        ? selectedMoods.filter(m => m !== mood)
        : [...selectedMoods, mood]
    );
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Mood & Emotion
      </h2>
      
      {Object.entries(moods).map(([category, moodList]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 capitalize">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {moodList.map((mood) => (
              <button
                key={mood}
                onClick={() => toggleMood(mood)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedMoods.includes(mood)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;