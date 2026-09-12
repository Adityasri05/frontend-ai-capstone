'use client';

import React from 'react';
import ToolInputState from './ToolInputState';
import CandidateScoreCard from './CandidateScoreCard';
import ToolErrorState from './ToolErrorState';
import type { ScoreCandidateInput, CandidateScoreResult } from '@/lib/ai/tools/scoreCandidate';

export type ToolLifecycleState = 'input-streaming' | 'input-available' | 'output-available' | 'output-error';

export interface ToolCallData {
  toolCallId: string;
  toolName: string;
  state: ToolLifecycleState;
  input?: Partial<ScoreCandidateInput>;
  result?: CandidateScoreResult;
  error?: string;
}

interface ToolCallCardProps {
  data: ToolCallData;
  onRetry?: () => void;
}

export default function ToolCallCard({ data, onRetry }: ToolCallCardProps) {
  const { state, input, result, error } = data;

  return (
    <div
      className="w-full transition-all duration-200 motion-reduce:transition-none"
      id={`tool-call-${data.toolCallId}`}
    >
      {state === 'input-streaming' && (
        <ToolInputState state="input-streaming" input={input} />
      )}

      {state === 'input-available' && (
        <ToolInputState state="input-available" input={input} />
      )}

      {state === 'output-available' && result && (
        <CandidateScoreCard result={result} />
      )}

      {state === 'output-error' && (
        <ToolErrorState error={error} onRetry={onRetry} />
      )}
    </div>
  );
}
