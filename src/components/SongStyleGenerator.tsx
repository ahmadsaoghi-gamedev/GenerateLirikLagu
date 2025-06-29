import React, { useState } from 'react';
import { Wand2, Copy, Check, Download, RefreshCw, Plus, X } from 'lucide-react';
import { PromptData } from '../App';

interface SongStyleGeneratorProps {
  onSavePrompt: (prompt: PromptData) => void;
  language: 'english' | 'indonesian';
  darkMode: boolean;
}

const SongStyleGenerator: React.FC<SongStyleGeneratorProps> = ({ 
  onSavePrompt, 
  language, 
  darkMode 
}) => {
  const [userPreferences, setUserPreferences] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    theme: 'RANDOM',
    melody: 'RANDOM',
    harmony: 'RANDOM',
    rhythm: 'RANDOM',
    structure: 'RANDOM',
    instrumentation: 'RANDOM',
    style: 'RANDOM',
    mood: 'RANDOM',
    language: 'RANDOM',
    dynamic: 'RANDOM',
    production: 'RANDOM',
    originality: 'RANDOM',
    vocalStyle: 'RANDOM'
  });
  const [customLanguages, setCustomLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [generatedStyle, setGeneratedStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const translations = {
    english: {
      title: 'Song Style Generator',
      subtitle: 'Create unique song styles with AI-powered customization',
      userPreferences: 'User Preferences',
      preferencesPlaceholder: 'What are your preferences? Tell us a little about the song you want to create.',
      preferencesExample: 'I want to create a DJ Remix song that is suitable for clubbing.',
      creativeElements: 'Creative Element Options (Optional)',
      generateBtn: 'Generate Song Style',
      generating: 'Generating...',
      copyBtn: 'Copy',
      copied: 'Copied!',
      saveBtn: 'Save to History',
      addLanguage: 'Add Custom Language',
      result: 'Generated Song Style',
      options: {
        theme: 'Theme Option',
        melody: 'Melody Option',
        harmony: 'Harmony Option',
        rhythm: 'Rhythm Option',
        structure: 'Structure/Form Option',
        instrumentation: 'Instrumentation Option',
        style: 'Style/Genre Option',
        mood: 'Mood Option',
        language: 'Language Option',
        dynamic: 'Dynamic Option',
        production: 'Production Option',
        originality: 'Originality and Creativity Option',
        vocalStyle: 'Vocal Style and Performance Option'
      }
    },
    indonesian: {
      title: 'Generator Gaya Lagu',
      subtitle: 'Buat gaya lagu unik dengan kustomisasi bertenaga AI',
      userPreferences: 'Preferensi Pengguna',
      preferencesPlaceholder: 'Apa preferensi Anda? Ceritakan sedikit tentang lagu yang ingin Anda buat.',
      preferencesExample: 'Saya ingin membuat lagu DJ Remix yang cocok untuk clubbing.',
      creativeElements: 'Opsi Elemen Kreatif (Opsional)',
      generateBtn: 'Generate Gaya Lagu',
      generating: 'Menggenerate...',
      copyBtn: 'Salin',
      copied: 'Tersalin!',
      saveBtn: 'Simpan ke Riwayat',
      addLanguage: 'Tambah Bahasa Custom',
      result: 'Gaya Lagu yang Dihasilkan',
      options: {
        theme: 'Opsi Tema',
        melody: 'Opsi Melodi',
        harmony: 'Opsi Harmoni',
        rhythm: 'Opsi Ritme',
        structure: 'Opsi Struktur/Bentuk',
        instrumentation: 'Opsi Instrumentasi',
        style: 'Opsi Gaya/Genre',
        mood: 'Opsi Mood',
        language: 'Opsi Bahasa',
        dynamic: 'Opsi Dinamik',
        production: 'Opsi Produksi',
        originality: 'Opsi Orisinalitas dan Kreativitas',
        vocalStyle: 'Opsi Gaya Vokal dan Performa'
      }
    }
  };

  const creativeOptions = {
    theme: ['Love & Romance', 'Adventure', 'Nostalgia', 'Rebellion', 'Spirituality', 'Party & Celebration', 'Heartbreak', 'Motivation', 'Mystery', 'Nature', 'RANDOM'],
    melody: ['Simple & Catchy', 'Complex & Intricate', 'Minimalist', 'Ornamental', 'Modal', 'Pentatonic', 'Chromatic', 'Folk-inspired', 'Jazz-influenced', 'Electronic', 'RANDOM'],
    harmony: ['Major Key', 'Minor Key', 'Modal', 'Jazz Harmony', 'Dissonant', 'Consonant', 'Extended Chords', 'Simple Triads', 'Quartal', 'Atonal', 'RANDOM'],
    rhythm: ['4/4 Standard', '3/4 Waltz', '6/8 Compound', '7/8 Odd Meter', 'Syncopated', 'Straight', 'Swing', 'Latin', 'Polyrhythmic', 'Free Time', 'RANDOM'],
    structure: ['Verse-Chorus', 'AABA', 'Through-composed', 'Rondo', 'Binary', 'Ternary', 'Verse-Bridge', 'Intro-Outro', 'Medley', 'Suite', 'RANDOM'],
    instrumentation: ['Full Orchestra', 'Rock Band', 'Electronic', 'Acoustic', 'Jazz Ensemble', 'String Quartet', 'Solo Piano', 'Choir', 'World Instruments', 'Hybrid', 'RANDOM'],
    style: ['Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Folk', 'R&B', 'Hip-Hop', 'Country', 'World Music', 'Fusion', 'RANDOM'],
    mood: ['Happy', 'Sad', 'Energetic', 'Calm', 'Mysterious', 'Romantic', 'Aggressive', 'Peaceful', 'Dramatic', 'Playful', 'RANDOM'],
    language: ['Bahasa Indonesia', 'English', 'Sundanese', 'Javanese', 'Batak', 'Minang', 'Mandarin', 'Japanese', 'Korean', 'Spanish', 'RANDOM'],
    dynamic: ['Soft & Gentle', 'Loud & Powerful', 'Dynamic Contrast', 'Crescendo Build', 'Sudden Changes', 'Consistent Level', 'Whisper to Scream', 'Ambient', 'Explosive', 'Subtle', 'RANDOM'],
    production: ['Lo-fi', 'Hi-fi', 'Vintage', 'Modern', 'Raw', 'Polished', 'Ambient', 'Compressed', 'Spacious', 'Intimate', 'RANDOM'],
    originality: ['Highly Original', 'Familiar with Twist', 'Traditional', 'Experimental', 'Fusion', 'Retro', 'Futuristic', 'Cross-genre', 'Minimalist', 'Maximalist', 'RANDOM'],
    vocalStyle: ['Powerful Belting', 'Soft Crooning', 'Rap/Spoken', 'Operatic', 'Folk Style', 'Auto-tuned', 'Harmony Rich', 'Solo', 'Call & Response', 'Instrumental', 'RANDOM']
  };

  const t = translations[language];

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const addCustomLanguage = () => {
    if (newLanguage.trim() && !customLanguages.includes(newLanguage.trim())) {
      setCustomLanguages(prev => [...prev, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeCustomLanguage = (lang: string) => {
    setCustomLanguages(prev => prev.filter(l => l !== lang));
  };

  const generateRandomOption = (options: string[]) => {
    const nonRandomOptions = options.filter(opt => opt !== 'RANDOM');
    return nonRandomOptions[Math.floor(Math.random() * nonRandomOptions.length)];
  };

  const generateSongStyle = () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const finalOptions = { ...selectedOptions };
      
      // Replace RANDOM with actual random selections
      Object.keys(finalOptions).forEach(key => {
        if (finalOptions[key] === 'RANDOM') {
          finalOptions[key] = generateRandomOption(creativeOptions[key] || ['Standard']);
        }
      });

      // Include custom languages in language selection
      if (finalOptions.language === 'RANDOM' && customLanguages.length > 0) {
        const allLanguages = [...creativeOptions.language.filter(l => l !== 'RANDOM'), ...customLanguages];
        finalOptions.language = allLanguages[Math.floor(Math.random() * allLanguages.length)];
      }

      // Generate comprehensive song style description
      const styleDescription = `
🎵 **Generated Song Style**

**User Vision:** ${userPreferences || 'Creative exploration'}

**Musical Elements:**
• **Theme:** ${finalOptions.theme}
• **Melody:** ${finalOptions.melody}
• **Harmony:** ${finalOptions.harmony}
• **Rhythm:** ${finalOptions.rhythm}
• **Structure:** ${finalOptions.structure}

**Production & Performance:**
• **Instrumentation:** ${finalOptions.instrumentation}
• **Style/Genre:** ${finalOptions.style}
• **Mood:** ${finalOptions.mood}
• **Language:** ${finalOptions.language}
• **Dynamics:** ${finalOptions.dynamic}

**Technical Specifications:**
• **Production Style:** ${finalOptions.production}
• **Originality Level:** ${finalOptions.originality}
• **Vocal Style:** ${finalOptions.vocalStyle}

**Suno AI Prompt:**
[${finalOptions.style.toLowerCase()}, ${finalOptions.mood.toLowerCase()}] Create a ${finalOptions.theme.toLowerCase()} song with ${finalOptions.melody.toLowerCase()} melody and ${finalOptions.harmony.toLowerCase()} harmony. Use ${finalOptions.instrumentation.toLowerCase()} with ${finalOptions.rhythm.toLowerCase()} rhythm. ${finalOptions.production.toLowerCase()} production style with ${finalOptions.vocalStyle.toLowerCase()} vocals in ${finalOptions.language}. ${finalOptions.dynamic.toLowerCase()} dynamics throughout.

**Creative Direction:**
This song style combines ${finalOptions.originality.toLowerCase()} creativity with ${finalOptions.mood.toLowerCase()} emotional expression. The ${finalOptions.structure.toLowerCase()} structure provides a solid foundation for the ${finalOptions.theme.toLowerCase()} theme, while the ${finalOptions.production.toLowerCase()} production enhances the overall sonic experience.
      `;

      setGeneratedStyle(styleDescription.trim());
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedStyle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const saveToHistory = () => {
    const promptData: PromptData = {
      id: Date.now().toString(),
      prompt: generatedStyle,
      genres: [selectedOptions.style],
      moods: [selectedOptions.mood],
      tempo: 120,
      instruments: [selectedOptions.instrumentation],
      vocalStyle: { gender: 'Mixed', character: selectedOptions.vocalStyle },
      duration: '3min',
      keySignature: 'C Major',
      songStructure: [selectedOptions.structure],
      timestamp: Date.now(),
      favorite: false,
      language: language,
      category: 'songstyle'
    };
    onSavePrompt(promptData);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Preferences */}
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.userPreferences}
            </h2>
            <textarea
              value={userPreferences}
              onChange={(e) => setUserPreferences(e.target.value)}
              placeholder={t.preferencesPlaceholder}
              className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 resize-none"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <strong>{language === 'indonesian' ? 'Contoh:' : 'Example:'}</strong> {t.preferencesExample}
            </p>
          </div>

          {/* Creative Elements */}
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t.creativeElements}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(t.options).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                  </label>
                  {key === 'language' ? (
                    <div className="space-y-2">
                      <select
                        value={selectedOptions[key]}
                        onChange={(e) => handleOptionChange(key, e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {[...creativeOptions[key], ...customLanguages].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      
                      {/* Custom Language Input */}
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder={t.addLanguage}
                          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        />
                        <button
                          onClick={addCustomLanguage}
                          className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Custom Languages List */}
                      {customLanguages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {customLanguages.map(lang => (
                            <span
                              key={lang}
                              className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                            >
                              <span>{lang}</span>
                              <button
                                onClick={() => removeCustomLanguage(lang)}
                                className="text-purple-500 hover:text-purple-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <select
                      value={selectedOptions[key]}
                      onChange={(e) => handleOptionChange(key, e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      {creativeOptions[key]?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>{language === 'indonesian' ? 'Catatan:' : 'Note:'}</strong> {language === 'indonesian' 
                  ? 'Semua elemen kreatif dapat dikombinasikan untuk menghasilkan gaya lagu yang unik. Jika tidak dipilih, akan menggunakan nilai default secara acak.'
                  : 'All creative elements can be combined to produce a unique song style. If not selected, random default values will be used.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Generate & Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Generate Button */}
            <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
              <button
                onClick={generateSongStyle}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-medium transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>{t.generating}</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>{t.generateBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {generatedStyle && (
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.result}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={saveToHistory}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                    {generatedStyle}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongStyleGenerator;