import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Info } from 'lucide-react';

interface SunoGuideProps {
  darkMode: boolean;
}

const SunoGuide: React.FC<SunoGuideProps> = ({ darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-700/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">
              🎵 How to Use in Suno AI
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              Step-by-step guide for perfect results
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Quick Steps:</h4>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Copy the generated prompt below</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Go to <a href="https://suno.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">Suno.ai</a> and create new song</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Paste prompt in the description field</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>Click Generate and wait for your song!</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Pro Tips:</h4>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Use Custom Mode for full control</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Add [genre] tags at the beginning</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Be specific about mood and tempo</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Include instrument details for better results</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Example Suno Format:</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 text-sm font-mono text-gray-600 dark:text-gray-400">
              [pop, acoustic] Create a heartfelt love song with gentle acoustic guitar and soft female vocals. Tempo around 80 BPM in C major. Romantic and emotional mood.
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://suno.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Suno AI</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SunoGuide;