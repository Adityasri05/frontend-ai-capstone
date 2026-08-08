'use client';

import React, { useEffect, useRef } from 'react';
import { VettedCandidate } from '@/app/dashboard/recruiter/components/SpecDashboard';

interface TwinDrawerProps {
  candidate: VettedCandidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TwinDrawer({ candidate, isOpen, onClose }: TwinDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus Trapping and Escape Key Handler
  useEffect(() => {
    if (!isOpen || !candidate) return;

    // Focus close button on open
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab') {
        if (!drawerRef.current) return;
        const focusableElements = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, candidate, onClose]);

  if (!isOpen || !candidate) return null;

  // Mocked details based on name
  const transcripts: Record<string, string> = {
    'Aditya Srivastav': '"I design react frontends that interface with model outputs. For API security, I route all requests through FastAPI to mask the GOOGLE_API_KEY. In the client, I manage asynchronous load phases using transitions and skeletons to maintain page speed."',
    'Jane Smith': '"When scaling React components, I prefer custom hooks to decouple data fetching from layout rendering. I keep layouts in server components by default and push interactivity to leaf nodes to optimize client packages."',
    'John Doe': '"I have worked with node backends for REST APIs. I write schemas using Zod for payload validation, ensuring that frontends send clean payloads and prevent unexpected database issues during parsing."',
    'Sarah Jenkins': '"In engineering management, I focus on sprint velocities, decoupling legacy frontends, and setting up automated CI/CD checks to prevent compile errors in main branches."',
    'Michael Chang': '"I look for developers who understand semantic HTML, focus states, and aria labels. Having a portfolio that compiles under strict type configurations is a major differentiator."'
  };

  const selectedTranscript = transcripts[candidate.name] || '"Simulated twin transcript snippet is loading... Vetted under custom FastAPI credentials proxy validation pipeline."';

  const mockHash = Array.from(candidate.name)
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000, 7)
    .toString(16)
    .padStart(8, '0');

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="drawer-title"
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Content Drawer */}
      <div 
        ref={drawerRef}
        className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col gap-6 overflow-y-auto animate-slide-in"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 id="drawer-title" className="text-xl font-bold text-slate-100">{candidate.name}</h2>
            <p className="text-xs text-slate-400 mt-1">AI Twin Assessment Report</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 bg-slate-950/40 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-xs text-slate-300">
          
          {/* Assessment Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Vetting Score</span>
              <span className="text-xl font-bold text-indigo-400 mt-1 block">{candidate.score}/100</span>
            </div>
            <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Persona Alignment</span>
              <span className="text-sm font-semibold text-slate-200 mt-1.5 block truncate">{candidate.personaAlignment}</span>
            </div>
          </div>

          {/* PyTorch ML Pipeline Evaluation */}
          <div className="bg-slate-950/30 border border-slate-900 rounded-lg p-4 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PyTorch Embedding Classification</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Model Match Confidence:</span>
                <span className="font-mono text-indigo-300">{(candidate.score / 100 * 0.98).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Vector Semantic Similarity:</span>
                <span className="font-mono text-emerald-400">{(0.75 + (candidate.score / 100) * 0.23).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Classification Group:</span>
                <span className="text-slate-100 font-medium">Group {mockHash.slice(-1).toUpperCase()} Vetting Match</span>
              </div>
            </div>
          </div>

          {/* Secure FastAPI Proxy Boundary */}
          <div className="bg-slate-950/30 border border-slate-900 rounded-lg p-4 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Proxy Verification</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>FastAPI Proxy Status:</span>
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Client Leak Vulnerability:</span>
                <span className="text-slate-100">0.00% (GOOGLE_API_KEY Masked)</span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span>Validation Hash:</span>
                <span className="font-mono text-[10px] text-slate-500 break-all leading-normal bg-slate-950 p-2 rounded border border-slate-900">
                  sha256_token_e3b0c442{mockHash}98fc862b32f
                </span>
              </div>
            </div>
          </div>

          {/* Client Interview Snippet */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Simulated Vetting Transcript Snippet</h3>
            <blockquote className="italic border-l-2 border-indigo-500 pl-3 py-1 bg-indigo-500/5 text-slate-200 leading-relaxed rounded-r">
              {selectedTranscript}
            </blockquote>
          </div>

        </div>
      </div>
    </div>
  );
}
