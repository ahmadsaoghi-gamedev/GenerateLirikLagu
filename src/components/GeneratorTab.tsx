import React, { useState, useEffect } from 'react';
import GenreSelector from './GenreSelector';
import MoodSelector from './MoodSelector';
import InstrumentPicker from './InstrumentPicker';
import TechnicalControls from './TechnicalControls';
import StructureBuilder from './StructureBuilder';
import PromptPreview from './PromptPreview';
import AdvancedSettings from './AdvancedSettings';
import ModeSelector from './ModeSelector';
import QuickTemplates from './QuickTemplates';
import SunoGuide from './SunoGuide';
import { generateSmartPrompt } from '../utils/promptGenerator';
import { PromptData } from '../App';

interface GeneratorTabProps {
  onSavePrompt: (prompt: PromptData) => void;
  darkMode: boolean;
}

const GeneratorTab: React.FC<GeneratorTabProps> = ({ onSavePrompt, darkMode }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [tempo, setTempo] = useState(120);
  const [duration, setDuration] = useState('2min');
  const [keySignature, setKeySignature] = useState('C Major');
  const [vocalStyle, setVocalStyle] = useState({
    gender: 'Female',
    character: 'Smooth'
  });
  const [songStructure, setSongStructure] = useState<string[]>([
    'Intro', 'Verse', 'Chorus', 'Verse', 'Chorus', 'Bridge', 'Chorus', 'Outro'
  ]);
  const [advancedSettings, setAdvancedSettings] = useState({
    styleReference: '',
    productionStyle: 'Modern',
    language: 'English',
    effects: [] as string[]
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generationMode, setGenerationMode] = useState<'full' | 'instrumental' | 'lyrics' | 'custom'>('full');
  const [selectedTheme, setSelectedTheme] = useState('love');

  useEffect(() => {
    const prompt = generateSmartPrompt({
      mode: generationMode,
      genres: selectedGenres,
      moods: selectedMoods,
      instruments: selectedInstruments,
      tempo,
      duration,
      keySignature,
      vocalStyle,
      songStructure,
      advancedSettings,
      theme: selectedTheme
    });
    setGeneratedPrompt(prompt);
  }, [
    generationMode, selectedGenres, selectedMoods, selectedInstruments, tempo, 
    duration, keySignature, vocalStyle, songStructure, advancedSettings, selectedTheme
  ]);

  const handleSavePrompt = () => {
    const promptData: PromptData = {
      id: Date.now().toString(),
      prompt: generatedPrompt,
      genres: selectedGenres,
      moods: selectedMoods,
      tempo,
      instruments: selectedInstruments,
      vocalStyle,
      duration,
      keySignature,
      songStructure,
      timestamp: Date.now(),
      favorite: false
    };
    onSavePrompt(promptData);
  };

  const applyTemplate = (template: any) => {
    setSelectedGenres(template.settings.genres || []);
    setSelectedMoods(template.settings.moods || []);
    setSelectedInstruments(template.settings.instruments || []);
    setTempo(template.settings.tempo || 120);
    setDuration(template.settings.duration || '2min');
    setVocalStyle(template.settings.vocalStyle || { gender: 'Female', character: 'Smooth' });
    setSongStructure(template.settings.songStructure || ['Intro', 'Verse', 'Chorus', 'Outro']);
    setGenerationMode(template.settings.mode || 'full');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <SunoGuide darkMode={darkMode} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Controls */}
        <div className="lg:col-span-2 space-y-6">
          <ModeSelector
            selectedMode={generationMode}
            setSelectedMode={setGenerationMode}
            darkMode={darkMode}
          />
          
          <QuickTemplates
            onApplyTemplate={applyTemplate}
            darkMode={darkMode}
          />
          
          <GenreSelector
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            darkMode={darkMode}
          />
          
          <MoodSelector
            selectedMoods={selectedMoods}
            setSelectedMoods={setSelectedMoods}
            darkMode={darkMode}
          />
          
          <TechnicalControls
            tempo={tempo}
            setTempo={setTempo}
            duration={duration}
            setDuration={setDuration}
            keySignature={keySignature}
            setKeySignature={setKeySignature}
            vocalStyle={vocalStyle}
            setVocalStyle={setVocalStyle}
            darkMode={darkMode}
          />
          
          <InstrumentPicker
            selectedInstruments={selectedInstruments}
            setSelectedInstruments={setSelectedInstruments}
            darkMode={darkMode}
          />
          
          <StructureBuilder
            songStructure={songStructure}
            setSongStructure={setSongStructure}
            darkMode={darkMode}
          />
          
          <AdvancedSettings
            settings={advancedSettings}
            setSettings={setAdvancedSettings}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            darkMode={darkMode}
          />
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <PromptPreview
              prompt={generatedPrompt}
              setPrompt={setGeneratedPrompt}
              onSave={handleSavePrompt}
              generationMode={generationMode}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorTab;