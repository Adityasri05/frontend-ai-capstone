'use client';

import React, { useState, useTransition } from 'react';
import FailedDashboard from '@/app/dashboard/recruiter/components/FailedDashboard';
import FilterPanel, { FilterState } from '@/app/dashboard/recruiter/components/FilterPanel';
import SpecDashboard, { VettedCandidate } from '@/app/dashboard/recruiter/components/SpecDashboard';
import TwinDrawer from '@/components/features/TwinDrawer';

const INITIAL_CANDIDATES: VettedCandidate[] = [
  { id: '1', name: 'Aditya Srivastav', score: 98, personaAlignment: 'Tech Lead', status: 'hired', techStack: ['React', 'Next.js', 'Node.js', 'Python', 'PyTorch'] },
  { id: '2', name: 'Jane Smith', score: 92, personaAlignment: 'VP of Engineering', status: 'hired', techStack: ['React', 'Next.js', 'Node.js'] },
  { id: '3', name: 'John Doe', score: 85, personaAlignment: 'VP of Engineering', status: 'pending', techStack: ['Node.js', 'Python'] },
  { id: '4', name: 'Sarah Jenkins', score: 78, personaAlignment: 'Engineering Manager', status: 'rejected', techStack: ['Python'] },
  { id: '5', name: 'Michael Chang', score: 89, personaAlignment: 'Lead Recruiter', status: 'pending', techStack: ['React', 'Node.js'] }
];

export default function HireviumCaseStudy() {
  const [candidates, setCandidates] = useState<VettedCandidate[]>(INITIAL_CANDIDATES);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    minScore: 0,
    maxScore: 100,
    selectedTech: [],
    personaAlignment: 'All'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isWorkspaceView, setIsWorkspaceView] = useState(true);
  
  // Drawer States
  const [selectedCandidate, setSelectedCandidate] = useState<VettedCandidate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter candidates based on current filter states
  const filteredCandidates = candidates.filter(c => {
    if (c.score < activeFilters.minScore || c.score > activeFilters.maxScore) return false;
    if (activeFilters.personaAlignment !== 'All' && c.personaAlignment !== activeFilters.personaAlignment) return false;
    if (activeFilters.selectedTech.length > 0) {
      const hasAllTech = activeFilters.selectedTech.every(tech => c.techStack.includes(tech));
      if (!hasAllTech) return false;
    }
    return true;
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
  };

  // Simulated React 19 Async Sync Scores handler
  const handleSyncScores = () => {
    return new Promise<void>((resolve) => {
      // Simulate network request delay
      setTimeout(() => {
        setCandidates(prev => prev.map(c => ({
          ...c,
          // Slightly shift scores to show sync animation
          score: Math.min(100, Math.max(60, c.score + (Math.random() > 0.5 ? 1 : -1)))
        })));
        resolve();
      }, 700);
    });
  };

  const handleSelectCandidate = (id: string) => {
    const candidate = candidates.find(c => c.id === id) || null;
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col gap-12">
      
      {/* Introduction Header */}
      <section className="flex flex-col gap-4" aria-labelledby="case-study-title">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Featured Case Study</span>
        <h1 id="case-study-title" className="text-3xl md:text-5xl font-extrabold text-slate-100">
          HIREVIUM: AI Hiring Operating System
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-3xl leading-relaxed mt-2">
          Technical vetting for recruiters is manual and slow. Traditional candidate assessments are repetitive, easily cheated, and fail to record candidate communication. I designed and implemented HIREVIUM's recruiter war room and twin assessment workspace, providing real-time evaluation logs and secure vector matching.
        </p>
      </section>

      {/* System Architecture Diagram */}
      <section className="border border-slate-900 bg-slate-950/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col gap-6" aria-labelledby="architecture-heading">
        <div>
          <h2 id="architecture-heading" className="text-lg sm:text-xl font-bold text-slate-200">System Architecture & Credentials Boundary</h2>
          <p className="text-xs text-slate-400 mt-1">How client-side interactions are secured via a FastAPI proxy server before sending prompts to Gemini.</p>
        </div>
        <div className="border border-slate-900 bg-slate-950 p-6 rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
          <pre>{`[Candidate Workspace UI] ──(Stream Responses)──> [FastAPI Routing Proxy]
                                                      │
                                                      ├── Verify Secure Token
                                                      ├── Load Server GOOGLE_API_KEY
                                                      │
                                                      ▼
[Recruiter War Room UI] <──(Score Logs)── [Gemini 2.5 Flash Lite SDK]`}</pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-300">FastAPI Security Proxy Pattern</h3>
            <p>
              Directing SDK calls through browser files exposes corporate billing details. Routing interactions through an asynchronous FastAPI proxy masks the Google API secrets on the server and provides verification hashes to the browser client.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-300">PyTorch Embeddings Matching</h3>
            <p>
              Transcripts from candidate responses are parsed into vector representations, allowing the recruiter dashboard to score candidate alignment similarity dynamically, rather than relying on keyword scanners.
            </p>
          </div>
        </div>
      </section>

      {/* Code Quality comparison & Workspace Vetting Toggle */}
      <section className="flex flex-col gap-6" aria-labelledby="simulator-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 id="simulator-heading" className="text-xl md:text-2xl font-bold text-slate-200">Recruiter Dashboard Workspace Demo</h2>
            <p className="text-xs text-slate-400 mt-1">Toggle between a poorly coded prototype and Aditya's production-ready accessible component.</p>
          </div>
          <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setIsWorkspaceView(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                !isWorkspaceView
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              Failed Dashboard Component
            </button>
            <button
              type="button"
              onClick={() => setIsWorkspaceView(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                isWorkspaceView
                  ? 'bg-indigo-600 text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Spec-Driven Dashboard (Aditya's)
            </button>
          </div>
        </div>

        {/* Live Workspace rendering area */}
        <div className="min-h-[400px]">
          {isWorkspaceView ? (
            <div className="flex flex-col gap-6">
              <FilterPanel onFilterChange={handleFilterChange} />
              <SpecDashboard
                candidates={filteredCandidates}
                isLoading={isLoading}
                onRefresh={handleSyncScores}
                onSelectCandidate={handleSelectCandidate}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/20 overflow-hidden">
              <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 text-[10px] text-red-400 font-mono flex items-center justify-between">
                <span>🔴 DEPRECATED COMPONENT (INLINE STYLES, NO KEYBOARD ACCESS)</span>
                <span>Failed V1 Prototype</span>
              </div>
              <FailedDashboard />
            </div>
          )}
        </div>
      </section>

      {/* Candidate Drawer Slide Component */}
      <TwinDrawer
        candidate={selectedCandidate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

    </div>
  );
}
