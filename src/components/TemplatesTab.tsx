import React from 'react';
import { templates } from '../data/templates';
import { Play, Heart, Download } from 'lucide-react';
import { PromptData } from '../App';

interface TemplatesTabProps {
  onSavePrompt: (prompt: PromptData) => void;
  darkMode: boolean;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({ onSavePrompt, darkMode }) => {
  const useTemplate = (template: any) => {
    const promptData: PromptData = {
      id: Date.now().toString(),
      prompt: template.prompt,
      genres: template.genres || [],
      moods: template.moods || [],
      tempo: template.tempo || 120,
      instruments: template.instruments || [],
      vocalStyle: template.vocalStyle || { gender: 'Female', character: 'Smooth' },
      duration: template.duration || '2min',
      keySignature: template.keySignature || 'C Major',
      songStructure: template.songStructure || ['Verse', 'Chorus', 'Verse', 'Chorus'],
      timestamp: Date.now(),
      favorite: false
    };
    onSavePrompt(promptData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Prompt Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ready-to-use templates for common music creation scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <span className="text-2xl">{template.icon}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {template.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              {template.description}
            </p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {template.prompt}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => useTemplate(template)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Use Template</span>
              </button>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesTab;