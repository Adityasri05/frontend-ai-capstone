'use client';

import React from 'react';
import { Loader2, Sparkles, Cpu, Layers, MessageSquareText } from 'lucide-react';
import type { ScoreCandidateInput } from '@/lib/ai/tools/scoreCandidate';

interface ToolInputStateProps {
  state: 'input-streaming' | 'input-available';
  input?: Partial<ScoreCandidateInput>;
}

export default function ToolInputState({ state, input }: ToolInputStateProps) {
  const isStreaming = state === 'input-streaming';

  return (
    <div
      role="status"
      aria-live="polite"
      className="my-3 rounded-2xl border border-brand-primary/30 bg-brand-card/90 p-4 shadow-sm backdrop-blur-md transition-all duration-200 animate-in fade-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-primary">
            <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">
              {isStreaming ? 'Preparing Candidate Analysis' : 'Candidate Assessment in Progress'}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {isStreaming
                ? 'Synthesizing interview responses & code architecture...'
                : `Target Role: ${input?.targetRole || 'Senior Frontend / AI Engineer'}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 py-1 text-[10px] font-mono font-semibold text-brand-primary border border-brand-primary/20">
          <Loader2 className="h-3 w-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          <span>{isStreaming ? 'STREAMING' : 'ANALYZING'}</span>
        </div>
      </div>

      {/* Body: Criteria Dimension Tags */}
      <div className="mt-3 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-brand-border/60 bg-background/60 px-3 py-2 text-[11px]">
            <Cpu className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" aria-hidden="true" />
            <div className="truncate">
              <span className="font-semibold text-foreground">Technical Depth</span>
              <p className="text-[10px] text-muted-foreground">React 19, Next.js, AI SDK</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-brand-border/60 bg-background/60 px-3 py-2 text-[11px]">
            <Layers className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
            <div className="truncate">
              <span className="font-semibold text-foreground">Problem Solving</span>
              <p className="text-[10px] text-muted-foreground">Architecture & Trade-offs</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-brand-border/60 bg-background/60 px-3 py-2 text-[11px]">
            <MessageSquareText className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
            <div className="truncate">
              <span className="font-semibold text-foreground">Communication</span>
              <p className="text-[10px] text-muted-foreground">Clarity & Decomposition</p>
            </div>
          </div>
        </div>

        {/* Progress Bar / Pulse */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-brand-border/60">
          <div
            className={`h-full rounded-full bg-gradient-to-r from-brand-primary to-indigo-500 transition-all duration-500 ${
              isStreaming ? 'w-1/3 animate-pulse' : 'w-4/5'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
