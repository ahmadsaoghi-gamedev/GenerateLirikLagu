import React from 'react';
import { instruments } from '../data/instruments';

interface InstrumentPickerProps {
  selectedInstruments: string[];
  setSelectedInstruments: (instruments: string[]) => void;
  darkMode: boolean;
}

const InstrumentPicker: React.FC<InstrumentPickerProps> = ({
  selectedInstruments,
  setSelectedInstruments,
  darkMode
}) => {
  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(
      selectedInstruments.includes(instrument)
        ? selectedInstruments.filter(i => i !== instrument)
        : [...selectedInstruments, instrument]
    );
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Select Instruments
      </h2>
      
      {Object.entries(instruments).map(([category, instrumentList]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 capitalize">
            {category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {instrumentList.map((instrument) => (
              <label
                key={instrument.name}
                className={`flex items-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedInstruments.includes(instrument.name)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedInstruments.includes(instrument.name)}
                  onChange={() => toggleInstrument(instrument.name)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{instrument.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {instrument.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentPicker;