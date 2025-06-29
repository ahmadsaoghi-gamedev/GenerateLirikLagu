import React, { useState } from 'react';
import { FileText, Copy, Check, Download, RefreshCw, Play } from 'lucide-react';
import { PromptData } from '../App';

interface LyricGeneratorProps {
  onSavePrompt: (prompt: PromptData) => void;
  language: 'english' | 'indonesian';
  darkMode: boolean;
}

const LyricGenerator: React.FC<LyricGeneratorProps> = ({ 
  onSavePrompt, 
  language, 
  darkMode 
}) => {
  const [userPreferences, setUserPreferences] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    theme: '',
    lyricLanguage: '',
    vocalArrangement: '',
    singerVoiceType: '',
    singerVoiceAge: '',
    musicGenre: '',
    mood: ''
  });
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const translations = {
    english: {
      title: 'Lyric Generator',
      subtitle: 'Create compelling lyrics with AI-powered creativity',
      userPreferences: 'User Preferences',
      preferencesPlaceholder: 'What is your preference? Tell us a little about the lyrics you want to create.',
      preferencesExample: 'I want to create a viral TikTok remix song with a Sundanese dj koplo feel.',
      promptSuggestions: 'Simple Prompt Suggestions',
      creativeElements: 'Creative Element Options (Optional)',
      outputFormat: 'Output Format',
      generateBtn: 'Generate Lyrics',
      generating: 'Generating...',
      copyBtn: 'Copy',
      copied: 'Copied!',
      saveBtn: 'Save to History',
      result: 'Generated Lyrics',
      options: {
        theme: 'Song Theme',
        lyricLanguage: 'Lyric Language',
        vocalArrangement: 'Vocal Arrangement',
        singerVoiceType: 'Singer Voice Type',
        singerVoiceAge: 'Singer Voice Age',
        musicGenre: 'Music Genre',
        mood: 'Mood'
      }
    },
    indonesian: {
      title: 'Generator Lirik',
      subtitle: 'Buat lirik yang menarik dengan kreativitas bertenaga AI',
      userPreferences: 'Preferensi Pengguna',
      preferencesPlaceholder: 'Apa preferensi Anda? Ceritakan sedikit tentang lirik yang ingin Anda buat.',
      preferencesExample: 'Saya ingin membuat lagu remix viral TikTok dengan nuansa dj koplo Sunda.',
      promptSuggestions: 'Saran Prompt Sederhana',
      creativeElements: 'Opsi Elemen Kreatif (Opsional)',
      outputFormat: 'Format Output',
      generateBtn: 'Generate Lirik',
      generating: 'Menggenerate...',
      copyBtn: 'Salin',
      copied: 'Tersalin!',
      saveBtn: 'Simpan ke Riwayat',
      result: 'Lirik yang Dihasilkan',
      options: {
        theme: 'Tema Lagu',
        lyricLanguage: 'Bahasa Lirik',
        vocalArrangement: 'Aransemen Vokal',
        singerVoiceType: 'Tipe Suara Penyanyi',
        singerVoiceAge: 'Usia Suara Penyanyi',
        musicGenre: 'Genre Musik',
        mood: 'Mood'
      }
    }
  };

  const promptSuggestions = [
    {
      id: 'sundanese-koplo',
      label: language === 'indonesian' ? 'Lagu Dj Koplo Sunda' : 'Sundanese Dj Koplo Song',
      prompt: language === 'indonesian' 
        ? 'Buat lirik lagu dj koplo Sunda yang energik dan menghibur untuk acara hajatan'
        : 'Create energetic and entertaining Sundanese dj koplo song lyrics for celebration events'
    },
    {
      id: 'tiktok-viral',
      label: language === 'indonesian' ? 'Lagu Remix Viral TikTok' : 'TikTok Viral Remix Song',
      prompt: language === 'indonesian'
        ? 'Buat lirik lagu remix yang catchy dan viral untuk TikTok dengan beat yang energik'
        : 'Create catchy and viral remix song lyrics for TikTok with energetic beats'
    },
    {
      id: 'dangdut-modern',
      label: language === 'indonesian' ? 'Dangdut Modern' : 'Modern Dangdut',
      prompt: language === 'indonesian'
        ? 'Buat lirik dangdut modern yang menggabungkan tradisi dengan sentuhan kontemporer'
        : 'Create modern dangdut lyrics that combine tradition with contemporary touch'
    },
    {
      id: 'pop-indonesia',
      label: language === 'indonesian' ? 'Pop Indonesia' : 'Indonesian Pop',
      prompt: language === 'indonesian'
        ? 'Buat lirik pop Indonesia yang romantis dan mudah diingat'
        : 'Create romantic and memorable Indonesian pop lyrics'
    },
    {
      id: 'hip-hop-indo',
      label: language === 'indonesian' ? 'Hip-Hop Indonesia' : 'Indonesian Hip-Hop',
      prompt: language === 'indonesian'
        ? 'Buat lirik hip-hop Indonesia yang kuat dengan pesan sosial'
        : 'Create powerful Indonesian hip-hop lyrics with social message'
    }
  ];

  const creativeOptions = {
    theme: ['Sad', 'Happy', 'Love', 'Friendship', 'Heartbreak', 'Comedy', 'Fantasy', 'Adventure', 'Social Issues', 'Spirit', 'History', 'Motivation', 'Party', 'Nostalgia'],
    lyricLanguage: ['Indonesian', 'Sundanese', 'Javanese', 'Batak', 'Minang', 'Malaysian', 'English', 'Italian', 'Spanish', 'Mandarin'],
    vocalArrangement: ['Solo', 'Duet', 'A Capella', 'Harmony', 'Call and Response', 'Choir', 'Rap Verse', 'Spoken Word'],
    singerVoiceType: ['Female', 'Male', 'Children', 'Mixed'],
    singerVoiceAge: ['5 years', '12 years', '15 years', '23 years', '30 years', '45 years', '60+ years'],
    musicGenre: ['Rock', 'Hip Hop', 'Remix', 'Electronic EDM', 'House Techno', 'Jazz', 'Blues', 'Random', 'Pop', 'Dangdut', 'Keroncong', 'Reggae'],
    mood: ['Joyful', 'Reflective', 'Angry', 'Serene', 'Melancholic', 'Energetic', 'Romantic', 'Mysterious', 'Uplifting', 'Dramatic']
  };

  const lyricStructures = [
    '[Verse 1]',
    '[Pre-Chorus]',
    '[Chorus]',
    '[Guitar Solo]',
    '[Verse 2]',
    '[Pre-Chorus]',
    '[Chorus]',
    '[Bridge]',
    '[Pre-Chorus]',
    '[Chorus]',
    '[Outro]',
    '[End]'
  ];

  const t = translations[language];

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const applySuggestion = (suggestion: any) => {
    setUserPreferences(suggestion.prompt);
  };

  const generateLyrics = () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const theme = selectedOptions.theme || 'Love';
      const lyricLang = selectedOptions.lyricLanguage || 'Indonesian';
      const genre = selectedOptions.musicGenre || 'Pop';
      const mood = selectedOptions.mood || 'Joyful';
      
      // Generate lyrics based on preferences and options
      const generatedContent = generateLyricContent(theme, lyricLang, genre, mood, userPreferences);
      
      setGeneratedLyrics(generatedContent);
      setIsGenerating(false);
    }, 3000);
  };

  const generateLyricContent = (theme: string, lyricLang: string, genre: string, mood: string, preferences: string) => {
    // Sample lyric generation based on parameters
    const lyricDatabase = {
      indonesian: {
        love: {
          verse: [
            "Di bawah sinar rembulan malam\nKau datang membawa kedamaian\nHati yang dulu penuh luka\nKini berbunga karena cinta",
            "Setiap detik bersamamu\nRasa bahagia mengalir\nTidak ada yang bisa ganti\nKeindahan cinta sejati"
          ],
          chorus: [
            "Kau adalah segalanya\nDalam hidup yang fana\nBersamamu aku kuat\nMenghadapi dunia",
            "Cinta ini takkan pudar\nMeski badai menghadang\nKau dan aku selamanya\nTuk bersama mengarungi"
          ]
        },
        happy: {
          verse: [
            "Pagi cerah menyapa dunia\nSemangat baru mengalir deras\nTak ada yang bisa hentikan\nLangkah kaki menuju mimpi",
            "Senyuman tulus dari hati\nMembawa cahaya di jiwa\nHari ini penuh harapan\nEsok lebih indah lagi"
          ],
          chorus: [
            "Hidup ini indah sekali\nJika kita mau bersyukur\nSetiap hari adalah anugerah\nYang patut kita rayakan",
            "Bernyanyilah dengan gembira\nRayakan setiap momen\nKebahagiaan ada di hati\nJangan pernah menyerah"
          ]
        }
      },
      sundanese: {
        love: {
          verse: [
            "Di handapeun cahaya bulan\nAnjeun datang mawa karapihan\nHaté nu tadina pinuh tatu\nAyeuna mekar ku asih",
            "Unggal detik sareng anjeun\nRasa bagja ngalir\nTeu aya nu bisa ngaganti\nKaéndahan asih sajati"
          ],
          chorus: [
            "Anjeun téh sagalana\nDina hirup nu fana\nBareng anjeun abdi kuat\nNyanghareupan dunya",
            "Asih ieu moal luntur\nSanajan ribut ngahalangan\nAnjeun jeung abdi salamina\nPikeun babarengan ngalayar"
          ]
        }
      }
    };

    const selectedLang = lyricLang.toLowerCase();
    const selectedTheme = theme.toLowerCase();
    
    let lyrics = '';
    
    // Generate structured lyrics
    lyricStructures.forEach((section, index) => {
      lyrics += section + '\n';
      
      if (section.includes('Verse')) {
        const verseContent = lyricDatabase[selectedLang]?.[selectedTheme]?.verse?.[0] || 
                           lyricDatabase.indonesian.love.verse[0];
        lyrics += verseContent + '\n\n';
      } else if (section.includes('Chorus')) {
        const chorusContent = lyricDatabase[selectedLang]?.[selectedTheme]?.chorus?.[0] || 
                            lyricDatabase.indonesian.love.chorus[0];
        lyrics += chorusContent + '\n\n';
      } else if (section.includes('Bridge')) {
        lyrics += generateBridge(selectedTheme, selectedLang) + '\n\n';
      } else if (section.includes('Solo')) {
        lyrics += '(Instrumental Solo)\n\n';
      } else if (section.includes('Pre-Chorus')) {
        lyrics += generatePreChorus(selectedTheme, selectedLang) + '\n\n';
      } else if (section.includes('Outro')) {
        lyrics += generateOutro(selectedTheme, selectedLang) + '\n\n';
      } else {
        lyrics += '\n';
      }
    });

    // Add metadata
    const metadata = `
**Generated Lyrics**

**User Preferences:** ${preferences || 'Creative exploration'}

**Song Details:**
• **Theme:** ${theme}
• **Language:** ${lyricLang}
• **Genre:** ${genre}
• **Mood:** ${mood}
• **Vocal Arrangement:** ${selectedOptions.vocalArrangement || 'Solo'}
• **Singer Type:** ${selectedOptions.singerVoiceType || 'Mixed'}
• **Singer Age:** ${selectedOptions.singerVoiceAge || 'Adult'}

**Lyrics:**

${lyrics}

**Suno AI Prompt:**
[${genre.toLowerCase()}, ${lyricLang.toLowerCase()}] Create a ${mood.toLowerCase()} ${theme.toLowerCase()} song with ${selectedOptions.vocalArrangement?.toLowerCase() || 'solo'} ${selectedOptions.singerVoiceType?.toLowerCase() || 'mixed'} vocals. Use the provided lyrics with ${genre.toLowerCase()} style production.
    `;

    return metadata.trim();
  };

  const generateBridge = (theme: string, lang: string) => {
    const bridges = {
      love: {
        indonesian: "Ketika dunia terasa dingin dan gelap\nKau adalah api di hatiku\nTidak ada yang bisa memisahkan\nCinta yang kita miliki",
        sundanese: "Nalika dunya karasa tiis tur poék\nAnjeun téh seuneu di haté abdi\nTeu aya nu bisa misahkeun\nAsih nu urang gaduh"
      },
      happy: {
        indonesian: "Setiap rintangan yang menghadang\nHanya membuat kita lebih kuat\nBersama kita bisa melewati\nApapun yang terjadi",
        sundanese: "Unggal halangan nu ngahalangan\nNgan ngajadikeun urang leuwih kuat\nBareng urang bisa ngaliwatan\nNaon waé nu kajadian"
      }
    };
    
    return bridges[theme]?.[lang] || bridges.love.indonesian;
  };

  const generatePreChorus = (theme: string, lang: string) => {
    const preChorus = {
      love: {
        indonesian: "Dan aku tahu\nIni bukan mimpi\nKau nyata di sini\nBersamaku",
        sundanese: "Jeung abdi terang\nIeu lain impian\nAnjeun nyata di dieu\nBareng abdi"
      },
      happy: {
        indonesian: "Rasakan semangat\nYang mengalir dalam jiwa\nHari ini milik kita\nUntuk bersinar",
        sundanese: "Rarasakeun sumanget\nNu ngalir dina jiwa\nPoé ieu milik urang\nPikeun bersinar"
      }
    };
    
    return preChorus[theme]?.[lang] || preChorus.love.indonesian;
  };

  const generateOutro = (theme: string, lang: string) => {
    const outros = {
      love: {
        indonesian: "Selamanya... selamanya...\nCinta kita abadi\nSelamanya... selamanya...",
        sundanese: "Salamina... salamina...\nAsih urang abadi\nSalamina... salamina..."
      },
      happy: {
        indonesian: "Terus bernyanyi... terus bersinar...\nHidup ini indah\nTerus bernyanyi...",
        sundanese: "Terus nyanyi... terus bersinar...\nHirup ieu geulis\nTerus nyanyi..."
      }
    };
    
    return outros[theme]?.[lang] || outros.love.indonesian;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const saveToHistory = () => {
    const promptData: PromptData = {
      id: Date.now().toString(),
      prompt: generatedLyrics,
      genres: [selectedOptions.musicGenre || 'Pop'],
      moods: [selectedOptions.mood || 'Joyful'],
      tempo: 120,
      instruments: [],
      vocalStyle: { 
        gender: selectedOptions.singerVoiceType || 'Mixed', 
        character: selectedOptions.vocalArrangement || 'Solo' 
      },
      duration: '3min',
      keySignature: 'C Major',
      songStructure: lyricStructures,
      timestamp: Date.now(),
      favorite: false,
      language: language,
      category: 'lyrics'
    };
    onSavePrompt(promptData);
  };

  const exportToFile = (format: 'txt' | 'docx') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `lyrics-${timestamp}.${format}`;
    
    if (format === 'txt') {
      const blob = new Blob([generatedLyrics], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
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

          {/* Prompt Suggestions */}
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.promptSuggestions}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {promptSuggestions.map(suggestion => (
                <button
                  key={suggestion.id}
                  onClick={() => applySuggestion(suggestion)}
                  className="p-4 text-left bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg border border-purple-200 dark:border-purple-700 hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 transition-all"
                >
                  <div className="font-medium text-purple-800 dark:text-purple-200">
                    {suggestion.label}
                  </div>
                </button>
              ))}
            </div>
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
                  <select
                    value={selectedOptions[key]}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">{language === 'indonesian' ? 'Pilih...' : 'Select...'}</option>
                    {creativeOptions[key]?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Output Format */}
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.outputFormat}
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {lyricStructures.map((structure, index) => (
                  <div key={index}>{structure}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Generate & Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Generate Button */}
            <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
              <button
                onClick={generateLyrics}
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
                    <FileText className="w-5 h-5" />
                    <span>{t.generateBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {generatedLyrics && (
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.result}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={saveToHistory}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                    {generatedLyrics}
                  </pre>
                </div>

                {/* Export Options */}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => exportToFile('txt')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export TXT</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyricGenerator;