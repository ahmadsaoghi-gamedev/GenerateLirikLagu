import React, { useState } from 'react';
import { Copy, Save, RefreshCw, Check, Download, Share2, FileText } from 'lucide-react';
import { enhancePrompt } from '../utils/aiEnhancer';

interface PromptPreviewProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSave: () => void;
  generationMode: string;
  darkMode: boolean;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({
  prompt,
  setPrompt,
  onSave,
  generationMode,
  darkMode
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const optimizePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsOptimizing(true);
    
    try {
      // Use the AI enhancer to optimize the prompt
      const optimizedPrompt = await enhancePrompt(prompt, {
        language: 'english',
        category: 'general',
        optimization: 'advanced'
      });
      
      setPrompt(optimizedPrompt);
    } catch (error) {
      console.error('Optimization failed:', error);
      
      // Fallback to local optimization
      let optimized = prompt
        .replace(/\s+/g, ' ')
        .replace(/,\s*,/g, ',')
        .replace(/\s+\./g, '.')
        .replace(/\band\s+and\b/g, 'and')
        .replace(/\bthe\s+the\b/g, 'the')
        .trim();
      
      // Add production quality notes if missing
      if (!optimized.includes('production') && !optimized.includes('quality')) {
        optimized += ' High-quality production with professional mixing and mastering.';
      }
      
      // Ensure genre tags are at the beginning
      const genreTagMatch = optimized.match(/\[([^\]]+)\]/);
      if (genreTagMatch) {
        const tags = genreTagMatch[0];
        optimized = optimized.replace(tags, '').trim();
        optimized = tags + ' ' + optimized;
      }
      
      // Add tempo if missing
      if (!optimized.includes('BPM') && !optimized.includes('tempo')) {
        optimized += ' Appropriate tempo and rhythm.';
      }
      
      setPrompt(optimized);
    }
    
    setIsOptimizing(false);
  };

  const exportPrompt = (format: 'txt' | 'json') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `suno-prompt-${timestamp}.${format}`;
    
    let content = '';
    if (format === 'txt') {
      content = prompt;
    } else {
      content = JSON.stringify({
        prompt,
        generationMode,
        timestamp: new Date().toISOString()
      }, null, 2);
    }
    
    const blob = new Blob([content], { type: format === 'txt' ? 'text/plain' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sharePrompt = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Suno AI Prompt',
          text: prompt,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Generated Prompt
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {prompt.length} chars
          </span>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            generationMode === 'full' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
            generationMode === 'instrumental' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
            generationMode === 'lyrics' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
            'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
          }`}>
            {generationMode}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={8}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm"
          placeholder="Your generated prompt will appear here..."
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save'}</span>
        </button>

        <button
          onClick={optimizePrompt}
          disabled={isOptimizing || !prompt.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOptimizing ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Optimizing...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>AI Optimize</span>
            </>
          )}
        </button>

        <div className="flex space-x-1">
          <button
            onClick={() => exportPrompt('txt')}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
            title="Export as TXT"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => exportPrompt('json')}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
            title="Export as JSON"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={sharePrompt}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
            title="Share Prompt"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
            💡 Suno AI Tips:
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Add [genre] tags at the beginning for better results</li>
            <li>• Be specific about tempo and mood</li>
            <li>• Include instrument details for richer sound</li>
            <li>• Use "similar to [artist]" for style references</li>
            <li>• Click "AI Optimize" to enhance your prompt automatically</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
            ✨ Optimization Score: {Math.min(100, Math.floor(prompt.length / 2))}%
          </h3>
          <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.floor(prompt.length / 2))}%` }}
            ></div>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">
            {isOptimizing ? 'Optimizing with AI...' : 'Use AI Optimize for better results'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptPreview;