import React, { useState, useEffect } from 'react';
import { Music, Settings, History, Info, Moon, Sun, Globe, Wand2, FileText } from 'lucide-react';
import Header from './components/Header';
import TemplateSelector from './components/TemplateSelector';
import GeneratorTab from './components/GeneratorTab';
import HistoryTab from './components/HistoryTab';
import AboutTab from './components/AboutTab';
import SongStyleGenerator from './components/SongStyleGenerator';
import LyricGenerator from './components/LyricGenerator';
import Footer from './components/Footer';
import { loadFromStorage, saveToStorage } from './utils/storage';

type Tab = 'templates' | 'generator' | 'history' | 'about' | 'songstyle' | 'lyrics';
type Language = 'english' | 'indonesian';

export interface PromptData {
  id: string;
  prompt: string;
  promptId?: string; // Indonesian version
  genres: string[];
  moods: string[];
  tempo: number;
  instruments: string[];
  vocalStyle: {
    gender: string;
    character: string;
  };
  duration: string;
  keySignature: string;
  songStructure: string[];
  timestamp: number;
  favorite: boolean;
  language: Language;
  category?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('templates');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('english');
  const [history, setHistory] = useState<PromptData[]>([]);

  useEffect(() => {
    const savedHistory = loadFromStorage('promptHistory');
    const savedTheme = loadFromStorage('darkMode');
    const savedLanguage = loadFromStorage('language');
    
    if (savedHistory) setHistory(savedHistory);
    if (savedTheme) setDarkMode(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    saveToStorage('promptHistory', history);
  }, [history]);

  useEffect(() => {
    saveToStorage('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    saveToStorage('language', language);
  }, [language]);

  const addToHistory = (promptData: PromptData) => {
    setHistory(prev => [promptData, ...prev.slice(0, 49)]); // Keep last 50
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  };

  const deleteFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const translations = {
    english: {
      tabs: {
        templates: 'Templates',
        generator: 'Generator', 
        songstyle: 'Song Style',
        lyrics: 'Lyric Generator',
        history: 'History',
        about: 'About'
      }
    },
    indonesian: {
      tabs: {
        templates: 'Template',
        generator: 'Generator',
        songstyle: 'Gaya Lagu',
        lyrics: 'Generator Lirik',
        history: 'Riwayat', 
        about: 'Tentang'
      }
    }
  };

  const tabs = [
    { id: 'templates', label: translations[language].tabs.templates, icon: Settings },
    { id: 'generator', label: translations[language].tabs.generator, icon: Music },
    { id: 'songstyle', label: translations[language].tabs.songstyle, icon: Wand2 },
    { id: 'lyrics', label: translations[language].tabs.lyrics, icon: FileText },
    { id: 'history', label: translations[language].tabs.history, icon: History },
    { id: 'about', label: translations[language].tabs.about, icon: Info }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'
    }`}>
      <div className="min-h-screen dark:bg-gray-900">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'templates' && (
            <TemplateSelector 
              onSavePrompt={addToHistory}
              language={language}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'generator' && (
            <GeneratorTab 
              onSavePrompt={addToHistory}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'songstyle' && (
            <SongStyleGenerator 
              onSavePrompt={addToHistory}
              language={language}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'lyrics' && (
            <LyricGenerator 
              onSavePrompt={addToHistory}
              language={language}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'history' && (
            <HistoryTab 
              history={history}
              onToggleFavorite={toggleFavorite}
              onDeleteItem={deleteFromHistory}
              language={language}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'about' && <AboutTab language={language} darkMode={darkMode} />}
        </main>

        <Footer language={language} darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;