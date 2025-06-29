import React from 'react';
import { Music, Moon, Sun, Globe } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: 'english' | 'indonesian';
  setLanguage: (lang: 'english' | 'indonesian') => void;
  tabs: Array<{ id: string; label: string; icon: React.ComponentType<any> }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  setDarkMode,
  language,
  setLanguage,
  tabs, 
  activeTab, 
  setActiveTab 
}) => {
  const titles = {
    english: {
      title: 'Suno AI Generator',
      subtitle: 'Advanced Music Creation Assistant'
    },
    indonesian: {
      title: 'Generator Suno AI',
      subtitle: 'Asisten Kreasi Musik Canggih'
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {titles[language].title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {titles[language].subtitle}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('english')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  language === 'english' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                }`}
              >
                🇺🇸 EN
              </button>
              <button
                onClick={() => setLanguage('indonesian')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  language === 'indonesian' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                }`}
              >
                🇮🇩 ID
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;