import React, { useState } from 'react';
import { Search, Heart, Trash2, Copy, Star, Filter } from 'lucide-react';
import { PromptData } from '../App';

interface HistoryTabProps {
  history: PromptData[];
  onToggleFavorite: (id: string) => void;
  onDeleteItem: (id: string) => void;
  language: 'english' | 'indonesian';
  darkMode: boolean;
}

const HistoryTab: React.FC<HistoryTabProps> = ({
  history,
  onToggleFavorite,
  onDeleteItem,
  language,
  darkMode
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'english' | 'indonesian'>('all');

  const translations = {
    english: {
      title: 'Prompt History',
      subtitle: 'Your saved prompts and favorites',
      searchPlaceholder: 'Search prompts...',
      all: 'All',
      favorites: 'Favorites',
      english: 'English',
      indonesian: 'Indonesian',
      noPrompts: 'No prompts found',
      tryAdjusting: 'Try adjusting your search terms',
      startCreating: 'Start creating prompts to see them here',
      copy: 'Copy',
      delete: 'Delete'
    },
    indonesian: {
      title: 'Riwayat Prompt',
      subtitle: 'Prompt tersimpan dan favorit Anda',
      searchPlaceholder: 'Cari prompt...',
      all: 'Semua',
      favorites: 'Favorit',
      english: 'Inggris',
      indonesian: 'Indonesia',
      noPrompts: 'Tidak ada prompt ditemukan',
      tryAdjusting: 'Coba sesuaikan kata kunci pencarian',
      startCreating: 'Mulai buat prompt untuk melihatnya di sini',
      copy: 'Salin',
      delete: 'Hapus'
    }
  };

  const t = translations[language];

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.genres.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    if (filter === 'favorites') matchesFilter = item.favorite;
    else if (filter === 'english') matchesFilter = item.language === 'english';
    else if (filter === 'indonesian') matchesFilter = item.language === 'indonesian';
    
    return matchesSearch && matchesFilter;
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(language === 'indonesian' ? 'id-ID' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageFlag = (lang: string) => {
    return lang === 'indonesian' ? '🇮🇩' : '🇺🇸';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t.subtitle}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.all} ({history.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              filter === 'favorites'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.favorites} ({history.filter(h => h.favorite).length})
          </button>
          <button
            onClick={() => setFilter('english')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              filter === 'english'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🇺🇸 {t.english}
          </button>
          <button
            onClick={() => setFilter('indonesian')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              filter === 'indonesian'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🇮🇩 {t.indonesian}
          </button>
        </div>
      </div>

      {/* History Items */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t.noPrompts}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? t.tryAdjusting : t.startCreating}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getLanguageFlag(item.language)}</span>
                    {item.category && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {item.genres.slice(0, 3).map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                      {item.genres.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{item.genres.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.favorite
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.favorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(item.prompt)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title={t.copy}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    title={t.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.prompt}
                </p>
              </div>

              {/* Show both versions if available */}
              {item.promptId && item.promptId !== item.prompt && (
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span>{item.language === 'english' ? '🇮🇩' : '🇺🇸'}</span>
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      {item.language === 'english' ? 'Indonesian Version' : 'English Version'}
                    </span>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    {item.promptId}
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Tempo: {item.tempo} BPM</span>
                <span>•</span>
                <span>Duration: {item.duration}</span>
                <span>•</span>
                <span>Key: {item.keySignature}</span>
                <span>•</span>
                <span>Vocals: {item.vocalStyle.gender} {item.vocalStyle.character}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTab;