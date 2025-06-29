import React from 'react';

interface TechnicalControlsProps {
  tempo: number;
  setTempo: (tempo: number) => void;
  duration: string;
  setDuration: (duration: string) => void;
  keySignature: string;
  setKeySignature: (key: string) => void;
  vocalStyle: {
    gender: string;
    character: string;
  };
  setVocalStyle: (style: { gender: string; character: string }) => void;
  darkMode: boolean;
}

const TechnicalControls: React.FC<TechnicalControlsProps> = ({
  tempo,
  setTempo,
  duration,
  setDuration,
  keySignature,
  setKeySignature,
  vocalStyle,
  setVocalStyle,
  darkMode
}) => {
  const getTempoLabel = (bpm: number) => {
    if (bpm < 80) return 'Slow';
    if (bpm < 120) return 'Medium';
    if (bpm < 150) return 'Fast';
    return 'Very Fast';
  };

  const durations = ['30s', '1min', '2min', '3min', '4min'];
  const keys = [
    'C Major', 'D Major', 'E Major', 'F Major', 'G Major', 'A Major', 'B Major',
    'C Minor', 'D Minor', 'E Minor', 'F Minor', 'G Minor', 'A Minor', 'B Minor'
  ];
  const genders = ['Male', 'Female', 'Duet', 'Choir', 'Instrumental'];
  const characters = ['Smooth', 'Raw', 'Powerful', 'Soft', 'Auto-tuned'];

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Technical Controls
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tempo Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tempo: {tempo} BPM ({getTempoLabel(tempo)})
          </label>
          <input
            type="range"
            min="60"
            max="180"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>60</span>
            <span>120</span>
            <span>180</span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
          >
            {durations.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Key Signature */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Signature
          </label>
          <select
            value={keySignature}
            onChange={(e) => setKeySignature(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
          >
            {keys.map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        {/* Vocal Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vocal Gender
          </label>
          <select
            value={vocalStyle.gender}
            onChange={(e) => setVocalStyle({ ...vocalStyle, gender: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
          >
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Vocal Character */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vocal Character
          </label>
          <div className="flex flex-wrap gap-2">
            {characters.map(character => (
              <button
                key={character}
                onClick={() => setVocalStyle({ ...vocalStyle, character })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  vocalStyle.character === character
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {character}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalControls;