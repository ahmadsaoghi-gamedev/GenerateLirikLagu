import React from 'react';
import { GripVertical, Plus, X } from 'lucide-react';

interface StructureBuilderProps {
  songStructure: string[];
  setSongStructure: (structure: string[]) => void;
  darkMode: boolean;
}

const StructureBuilder: React.FC<StructureBuilderProps> = ({
  songStructure,
  setSongStructure,
  darkMode
}) => {
  const sections = ['Intro', 'Verse', 'Chorus', 'Bridge', 'Solo', 'Outro', 'Pre-Chorus', 'Post-Chorus'];

  const addSection = (section: string) => {
    setSongStructure([...songStructure, section]);
  };

  const removeSection = (index: number) => {
    setSongStructure(songStructure.filter((_, i) => i !== index));
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newStructure = [...songStructure];
    const [movedSection] = newStructure.splice(fromIndex, 1);
    newStructure.splice(toIndex, 0, movedSection);
    setSongStructure(newStructure);
  };

  const resetToDefault = () => {
    setSongStructure(['Intro', 'Verse', 'Chorus', 'Verse', 'Chorus', 'Bridge', 'Chorus', 'Outro']);
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Song Structure
        </h2>
        <button
          onClick={resetToDefault}
          className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Reset to Default
        </button>
      </div>

      {/* Current Structure */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Current Structure
        </h3>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          {songStructure.map((section, index) => (
            <div
              key={`${section}-${index}`}
              className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {section}
              </span>
              <button
                onClick={() => removeSection(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Available Sections */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Add Sections
        </h3>
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => addSection(section)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>{section}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Structure Preview */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Structure Preview:
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {songStructure.join(' → ') || 'No structure defined'}
        </p>
      </div>
    </div>
  );
};

export default StructureBuilder;