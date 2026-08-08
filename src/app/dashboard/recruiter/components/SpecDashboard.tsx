'use client';

import React, { useTransition } from 'react';

export interface VettedCandidate {
  id: string;
  name: string;
  score: number;
  personaAlignment: 'Tech Lead' | 'Engineering Manager' | 'Lead Recruiter' | 'VP of Engineering';
  status: 'hired' | 'rejected' | 'pending';
  techStack: string[];
}

interface SpecDashboardProps {
  candidates: VettedCandidate[];
  isLoading: boolean;
  onRefresh: () => void;
  onSelectCandidate: (id: string) => void;
}

export default function SpecDashboard({
  candidates,
  isLoading,
  onRefresh,
  onSelectCandidate
}: SpecDashboardProps) {
  const [isPending, startTransition] = useTransition();

  const handleRefreshClick = () => {
    startTransition(() => {
      onRefresh();
    });
  };

  if (isLoading) {
    return (
      <div 
        role="status" 
        aria-label="Loading candidate rankings" 
        className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl text-slate-100 animate-pulse"
      >
        <div className="h-7 bg-slate-800 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-slate-800/60 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section 
      aria-label="Candidate Rankings & War Room" 
      className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl text-slate-100 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-200">HIREVIUM War Room</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time candidate vetting scores and automated verdicts</p>
        </div>
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={isPending}
          className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-slate-100 rounded-lg transition-all duration-300 active:scale-95 disabled:bg-slate-800 disabled:text-slate-500 cursor-pointer"
        >
          {isPending ? 'Syncing...' : 'Sync Scores'}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {candidates.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg text-slate-400">
            No candidates matched the active search filters.
          </div>
        ) : (
          candidates.map((c) => {
            const statusColors = {
              hired: 'bg-green-500/10 border-green-500/30 text-green-400',
              rejected: 'bg-red-500/10 border-red-500/30 text-red-400',
              pending: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            };

            return (
              <div 
                key={c.id} 
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg hover:border-slate-700/80 transition-all duration-200 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-950 border border-indigo-500/30 rounded-lg flex items-center justify-center font-bold text-indigo-400 shadow-inner">
                    {c.score}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{c.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Aligned Persona: <span className="text-indigo-400">{c.personaAlignment}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded border ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectCandidate(c.id)}
                    className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    View Twin
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
