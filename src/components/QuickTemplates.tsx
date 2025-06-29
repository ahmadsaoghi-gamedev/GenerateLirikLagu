import React from 'react';
import { Play, Zap } from 'lucide-react';

interface QuickTemplatesProps {
  onApplyTemplate: (template: any) => void;
  darkMode: boolean;
}

const QuickTemplates: React.FC<QuickTemplatesProps> = ({ onApplyTemplate, darkMode }) => {
  const quickTemplates = [
    {
      id: 'youtube-bg',
      name: "YouTube Background",
      icon: '📺',
      description: "Non-distracting ambient music perfect for content",
      prompt: "Create ambient instrumental background music, non-distracting, peaceful and inspiring at 80-100 BPM. Use piano, soft strings, and light percussion. No vocals. Perfect for content creation, talking over music. 2-3 minutes duration.",
      settings: {
        genres: ['Ambient'],
        moods: ['Peaceful', 'Soft'],
        tempo: 90,
        instruments: ['Piano', 'Violin', 'Synthesizer'],
        vocalStyle: { gender: 'Instrumental', character: 'Smooth' },
        duration: '3min',
        mode: 'instrumental' as const,
        songStructure: ['Intro', 'Main Theme', 'Variation', 'Outro']
      }
    },
    {
      id: 'podcast-intro',
      name: "Podcast Intro",
      icon: '🎙️',
      description: "30-second energetic intro for podcasts",
      prompt: "Create an energetic 30-second podcast intro with modern electronic elements. Upbeat tempo at 120 BPM, motivational and professional mood. Include synthesizer, drums, and optional voice tag space.",
      settings: {
        genres: ['Electronic', 'Pop'],
        moods: ['Upbeat', 'Motivational'],
        tempo: 120,
        instruments: ['Synthesizer', 'Drums'],
        vocalStyle: { gender: 'Instrumental', character: 'Powerful' },
        duration: '30s',
        mode: 'instrumental' as const,
        songStructure: ['Hook', 'Build', 'Climax', 'Tag']
      }
    },
    {
      id: 'workout',
      name: "Workout Music",
      icon: '💪',
      description: "High-energy music for exercise",
      prompt: "Create high-energy workout music at 140 BPM with driving electronic beats. Motivational and powerful mood with heavy bass, energetic synths, and rhythmic percussion.",
      settings: {
        genres: ['EDM', 'Electronic'],
        moods: ['Energetic', 'Powerful'],
        tempo: 140,
        instruments: ['Electronic Beats', 'Synthesizer', 'Bass Guitar'],
        vocalStyle: { gender: 'Instrumental', character: 'Powerful' },
        duration: '4min',
        mode: 'instrumental' as const,
        songStructure: ['Intro', 'Build', 'Drop', 'Break', 'Drop', 'Outro']
      }
    },
    {
      id: 'meditation',
      name: "Meditation",
      icon: '🧘',
      description: "Calming music for relaxation",
      prompt: "Create peaceful meditation music at 60 BPM featuring soft piano, gentle strings, and nature sounds. Deeply relaxing and meditative with slow, flowing melodies.",
      settings: {
        genres: ['Ambient', 'Classical'],
        moods: ['Peaceful', 'Meditative'],
        tempo: 60,
        instruments: ['Piano', 'Violin', 'Synthesizer'],
        vocalStyle: { gender: 'Instrumental', character: 'Soft' },
        duration: '4min',
        mode: 'instrumental' as const,
        songStructure: ['Gentle Intro', 'Main Theme', 'Variation', 'Fade Out']
      }
    }
  ];

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quick Templates
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickTemplates.map(template => (
          <div
            key={template.id}
            className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{template.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{template.description}</p>
              </div>
            </div>
            <button
              onClick={() => onApplyTemplate(template)}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              <Play className="w-4 h-4" />
              <span>Use Template</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTemplates;