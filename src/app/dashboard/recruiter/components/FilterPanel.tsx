'use client';

import React, { useState, useEffect } from 'react';

export interface FilterState {
  minScore: number;
  maxScore: number;
  selectedTech: string[];
  personaAlignment: 'Tech Lead' | 'Engineering Manager' | 'Lead Recruiter' | 'VP of Engineering' | 'All';
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const AVAILABLE_TECH = ['React', 'Next.js', 'Node.js', 'Python', 'PyTorch'];

export default function FilterPanel({ onFilterChange, initialFilters }: FilterPanelProps) {
  const [minScore, setMinScore] = useState<number>(initialFilters.minScore);
  const [maxScore, setMaxScore] = useState<number>(initialFilters.maxScore);
  const [selectedTech, setSelectedTech] = useState<string[]>(initialFilters.selectedTech);
  const [persona, setPersona] = useState<FilterState['personaAlignment']>(initialFilters.personaAlignment);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Score Validation boundaries
  useEffect(() => {
    if (minScore < 0 || minScore > 100 || maxScore < 0 || maxScore > 100) {
      setValidationError('Scores must be between 0 and 100.');
    } else if (minScore > maxScore) {
      setValidationError('Min score cannot exceed max score.');
    } else {
      setValidationError(null);
    }
  }, [minScore, maxScore]);

  const handleTechChange = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleApply = () => {
    if (validationError) return;
    onFilterChange({
      minScore,
      maxScore,
      selectedTech,
      personaAlignment: persona
    });
  };

  const handleReset = () => {
    const defaults: FilterState = {
      minScore: 0,
      maxScore: 100,
      selectedTech: [],
      personaAlignment: 'All'
    };
    setMinScore(defaults.minScore);
    setMaxScore(defaults.maxScore);
    setSelectedTech(defaults.selectedTech);
    setPersona(defaults.personaAlignment);
    setValidationError(null);
    onFilterChange(defaults);
  };

  return (
    <section 
      role="search" 
      aria-label="Candidate Filter Panel"
      className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl text-slate-100 transition-all duration-300"
    >
      <h2 className="text-xl font-bold text-slate-200 mb-6">Filter Candidates</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Score Inputs Group */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-slate-300">Vetting Score Range</span>
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="min-score-input" className="text-xs text-slate-400">Min</label>
              <input
                id="min-score-input"
                type="number"
                min={0}
                max={100}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="max-score-input" className="text-xs text-slate-400">Max</label>
              <input
                id="max-score-input"
                type="number"
                min={0}
                max={100}
                value={maxScore}
                onChange={(e) => setMaxScore(Number(e.target.value))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
              />
            </div>
          </div>
          {validationError && (
            <span className="text-xs text-red-400 mt-1" role="alert">{validationError}</span>
          )}
        </div>

        {/* Tech Stack Selection */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-slate-300">Tech Stack</span>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TECH.map(tech => {
              const isChecked = selectedTech.includes(tech);
              const inputId = `tech-checkbox-${tech.toLowerCase()}`;
              return (
                <label 
                  key={tech} 
                  htmlFor={inputId}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 ${
                    isChecked 
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleTechChange(tech)}
                    className="sr-only"
                  />
                  {tech}
                </label>
              );
            })}
          </div>
        </div>

        {/* Persona Alignment Dropdown */}
        <div className="flex flex-col gap-3">
          <label htmlFor="persona-select" className="text-sm font-semibold text-slate-300">Persona Alignment</label>
          <select
            id="persona-select"
            value={persona}
            onChange={(e) => setPersona(e.target.value as FilterState['personaAlignment'])}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
          >
            <option value="All">All Personas</option>
            <option value="Tech Lead">Technical Lead</option>
            <option value="Engineering Manager">Engineering Manager</option>
            <option value="Lead Recruiter">Lead Recruiter</option>
            <option value="VP of Engineering">VP of Engineering</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 border-t border-slate-800/80 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-950/40 border border-slate-850 hover:bg-slate-950/80 rounded-lg transition-all duration-300 active:scale-95 cursor-pointer"
        >
          Reset Filters
        </button>
        <button
          type="button"
          onClick={handleApply}
          disabled={!!validationError}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 active:scale-95 cursor-pointer ${
            validationError 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-transparent' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-slate-100 shadow-md shadow-indigo-600/10'
          }`}
        >
          Apply Filters
        </button>
      </div>
    </section>
  );
}
