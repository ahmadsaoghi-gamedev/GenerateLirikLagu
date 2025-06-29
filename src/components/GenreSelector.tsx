import React from 'react';
import { genres } from '../data/genres';

interface GenreSelectorProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  darkMode: boolean;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ 
  selectedGenres, 
  setSelectedGenres, 
  darkMode 
}) => {
  const toggleGenre = (genre: string) => {
    setSelectedGenres(
      selectedGenres.includes(genre)
        ? selectedGenres.filter(g => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Select Genres
      </h2>
      
      {Object.entries(genres).map(([category, genreList]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 capitalize">
            {category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {genreList.map((genre) => (
              <button
                key={genre.name}
                onClick={() => toggleGenre(genre.name)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                  selectedGenres.includes(genre.name)
                    ? 'border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-lg">{genre.icon}</span>
                  <span>{genre.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreSelector;