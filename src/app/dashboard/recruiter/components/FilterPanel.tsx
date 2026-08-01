import React, { useState } from 'react';

export default function FilterPanel({ onFilterChange, initialFilters }) {
  const [minScore, setMinScore] = useState(initialFilters?.minScore || 0);
  const [maxScore, setMaxScore] = useState(initialFilters?.maxScore || 100);
  const [selectedTech, setSelectedTech] = useState(initialFilters?.selectedTech || []);
  const [persona, setPersona] = useState(initialFilters?.personaAlignment || 'All');

  const handleTechChange = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const apply = () => {
    // VAGUE: Passes filters directly without any value bounds or type casting
    onFilterChange({
      minScore,
      maxScore,
      selectedTech,
      personaAlignment: persona
    });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#1e293b', color: '#fff' }}>
      <h3>Filter Candidates</h3>
      
      <div>
        <span>Min Score:</span>
        <input 
          type="number" 
          value={minScore} 
          onChange={(e) => setMinScore(e.target.value)} 
        />
      </div>

      <div>
        <span>Max Score:</span>
        <input 
          type="number" 
          value={maxScore} 
          onChange={(e) => setMaxScore(e.target.value)} 
        />
      </div>

      <div>
        <span>Tech Stack:</span>
        {['React', 'Next.js', 'Node.js', 'Python', 'PyTorch'].map(tech => (
          <label key={tech} style={{ marginLeft: '10px' }}>
            <input 
              type="checkbox" 
              checked={selectedTech.includes(tech)}
              onChange={() => handleTechChange(tech)}
            />
            {tech}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        <span>Persona Alignment:</span>
        <select value={persona} onChange={(e) => setPersona(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech Lead">Tech Lead</option>
          <option value="Engineering Manager">Engineering Manager</option>
          <option value="Lead Recruiter">Lead Recruiter</option>
          <option value="VP of Engineering">VP of Engineering</option>
        </select>
      </div>

      <button onClick={apply} style={{ marginTop: '15px', padding: '5px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Apply Filters
      </button>
    </div>
  );
}
