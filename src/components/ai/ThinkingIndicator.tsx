'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Clock } from 'lucide-react';

interface ThinkingIndicatorProps {
  label?: string;
  isSlow?: boolean;
}

export default function ThinkingIndicator({ label }: ThinkingIndicatorProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const PHASES = [
    label || 'AI Interviewer is analyzing your response...',
    'Evaluating technical architecture & trade-offs...',
    'Formulating adaptive technical qualification response...',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setPhaseIndex(1), 2500);
    const timer2 = setTimeout(() => setPhaseIndex(2), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const isLatePhase = phaseIndex > 0;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex items-start gap-3.5 max-w-2xl animate-fade-in my-2"
    >
      {/* Bot Avatar Icon */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shadow-sm">
        <Bot className="w-4 h-4 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
      </div>

      {/* Bubble Container */}
      <div className="flex flex-col gap-1.5 bg-brand-card/90 border border-brand-border/80 px-4 py-3 rounded-2xl rounded-tl-sm backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
          <Sparkles className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none text-brand-primary/80" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-wide uppercase">AI Interviewer</span>
          {isLatePhase && (
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-500 font-mono font-normal">
              <Clock className="w-3 h-3" />
              In-depth Analysis
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-brand-muted">
          <span className="transition-opacity duration-200">{PHASES[phaseIndex]}</span>
          <span className="inline-flex gap-1 items-center ml-1" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-bounce motion-reduce:animate-none" />
          </span>
        </div>
      </div>
    </div>
  );
}
