import React from 'react';
import { Music, Sparkles, Target, Zap, Globe, Brain } from 'lucide-react';

interface AboutTabProps {
  language: 'english' | 'indonesian';
  darkMode: boolean;
}

const AboutTab: React.FC<AboutTabProps> = ({ language, darkMode }) => {
  const translations = {
    english: {
      title: 'About Advanced Suno AI Generator',
      subtitle: 'AI-powered template system for creating optimized music prompts with dual language support',
      features: {
        title: 'Key Features',
        items: [
          {
            icon: <Brain className="w-6 h-6" />,
            title: "AI Enhancement",
            description: "Smart prompt optimization using Gemini AI and OpenRouter"
          },
          {
            icon: <Globe className="w-6 h-6" />,
            title: "Dual Language",
            description: "Full English and Indonesian language support"
          },
          {
            icon: <Target className="w-6 h-6" />,
            title: "Specialized Templates",
            description: "Curated templates for relaxation, Indonesian music, and commercial use"
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: "Template-First Design",
            description: "Focus on proven templates for consistent, high-quality results"
          }
        ]
      },
      howItWorks: {
        title: 'How It Works',
        steps: [
          {
            number: 1,
            title: 'Choose Template Category',
            description: 'Select from relaxation, Indonesian music, international, or commercial'
          },
          {
            number: 2,
            title: 'Pick Specialized Template',
            description: 'Choose from expertly crafted templates for your specific use case'
          },
          {
            number: 3,
            title: 'AI Enhancement',
            description: 'Our AI optimizes the prompt for better Suno AI results'
          },
          {
            number: 4,
            title: 'Dual Language Output',
            description: 'Get optimized prompts in both English and Indonesian'
          }
        ]
      },
      categories: {
        title: 'Template Categories',
        items: [
          {
            title: 'Relaxation & Nature',
            description: 'Sleep music, rain sounds, bamboo gardens, forest ambience',
            icon: '🧘'
          },
          {
            title: 'Indonesian Music',
            description: 'Dangdut koplo, Indonesian hip-hop, DJ remixes, modern keroncong',
            icon: '🇮🇩'
          },
          {
            title: 'International Genres',
            description: 'Lo-fi hip hop, synthwave, and global music styles',
            icon: '🌍'
          },
          {
            title: 'Commercial & Business',
            description: 'Corporate presentations, commercial jingles, professional background music',
            icon: '💼'
          }
        ]
      },
      tips: {
        title: 'Pro Tips for Best Results',
        items: [
          'Use the AI enhancement feature for optimized prompts',
          'Try both English and Indonesian versions in Suno',
          'Specialized templates give more consistent results',
          'Save your favorites for quick access later'
        ]
      }
    },
    indonesian: {
      title: 'Tentang Generator Suno AI Canggih',
      subtitle: 'Sistem template bertenaga AI untuk membuat prompt musik yang dioptimalkan dengan dukungan dua bahasa',
      features: {
        title: 'Fitur Utama',
        items: [
          {
            icon: <Brain className="w-6 h-6" />,
            title: "Peningkatan AI",
            description: "Optimasi prompt cerdas menggunakan Gemini AI dan OpenRouter"
          },
          {
            icon: <Globe className="w-6 h-6" />,
            title: "Dua Bahasa",
            description: "Dukungan penuh bahasa Inggris dan Indonesia"
          },
          {
            icon: <Target className="w-6 h-6" />,
            title: "Template Khusus",
            description: "Template terpilih untuk relaksasi, musik Indonesia, dan penggunaan komersial"
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: "Desain Template-First",
            description: "Fokus pada template terbukti untuk hasil berkualitas tinggi yang konsisten"
          }
        ]
      },
      howItWorks: {
        title: 'Cara Kerja',
        steps: [
          {
            number: 1,
            title: 'Pilih Kategori Template',
            description: 'Pilih dari relaksasi, musik Indonesia, internasional, atau komersial'
          },
          {
            number: 2,
            title: 'Pilih Template Khusus',
            description: 'Pilih dari template yang dibuat ahli untuk kasus penggunaan spesifik Anda'
          },
          {
            number: 3,
            title: 'Peningkatan AI',
            description: 'AI kami mengoptimalkan prompt untuk hasil Suno AI yang lebih baik'
          },
          {
            number: 4,
            title: 'Output Dua Bahasa',
            description: 'Dapatkan prompt yang dioptimalkan dalam bahasa Inggris dan Indonesia'
          }
        ]
      },
      categories: {
        title: 'Kategori Template',
        items: [
          {
            title: 'Relaksasi & Alam',
            description: 'Musik tidur, suara hujan, taman bambu, suasana hutan',
            icon: '🧘'
          },
          {
            title: 'Musik Indonesia',
            description: 'Dangdut koplo, hip-hop Indonesia, remix DJ, keroncong modern',
            icon: '🇮🇩'
          },
          {
            title: 'Genre Internasional',
            description: 'Lo-fi hip hop, synthwave, dan gaya musik global',
            icon: '🌍'
          },
          {
            title: 'Komersial & Bisnis',
            description: 'Presentasi korporat, jingle komersial, musik latar profesional',
            icon: '💼'
          }
        ]
      },
      tips: {
        title: 'Tips Pro untuk Hasil Terbaik',
        items: [
          'Gunakan fitur peningkatan AI untuk prompt yang dioptimalkan',
          'Coba versi bahasa Inggris dan Indonesia di Suno',
          'Template khusus memberikan hasil yang lebih konsisten',
          'Simpan favorit Anda untuk akses cepat nanti'
        ]
      }
    }
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.features.items.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t.howItWorks.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Template Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t.categories.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.categories.items.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t.tips.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.tips.items.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;