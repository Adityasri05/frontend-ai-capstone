'use client';

import React, { useState } from 'react';
import {
  Bug,
  ChevronDown,
  ChevronUp,
  ServerCrash,
  Clock,
  Scissors,
  HelpCircle,
  Hourglass,
  ShieldAlert,
  WifiOff,
} from 'lucide-react';

interface DevSabotageDrawerProps {
  onTriggerSabotage: (prompt: string, failureType?: string) => void;
  disabled?: boolean;
}

export default function DevSabotageDrawer({
  onTriggerSabotage,
  disabled = false,
}: DevSabotageDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const SABOTAGE_TESTS = [
    {
      label: 'HTTP 500 Server Error',
      prompt: '[SIMULATE:HTTP_500]',
      desc: 'Simulates an unexpected server crash (HTTP 500)',
      icon: <ServerCrash className="w-3.5 h-3.5 text-destructive" />,
      tag: 'API 500',
    },
    {
      label: 'HTTP 429 Rate Limit',
      prompt: '[SIMULATE:HTTP_429]',
      desc: 'Simulates high-traffic rate limiting with countdown',
      icon: <Clock className="w-3.5 h-3.5 text-orange-500" />,
      tag: 'Rate Limit',
    },
    {
      label: 'Mid-Stream Interruption',
      prompt: '[SIMULATE:MID_STREAM_FAIL]',
      desc: 'Streams 15 tokens then drops stream to test partial preservation',
      icon: <Scissors className="w-3.5 h-3.5 text-amber-500" />,
      tag: 'Mid-Stream',
    },
    {
      label: 'Empty AI Response',
      prompt: '[SIMULATE:EMPTY_RESPONSE]',
      desc: 'Returns 0 tokens to test no-results empty recovery state',
      icon: <HelpCircle className="w-3.5 h-3.5 text-blue-500" />,
      tag: 'No Results',
    },
    {
      label: 'Slow Latency (3.5s Delay)',
      prompt: '[SIMULATE:SLOW_RESPONSE]',
      desc: 'Adds 3.5s delay to test multi-phase progressive thinking',
      icon: <Hourglass className="w-3.5 h-3.5 text-indigo-500" />,
      tag: 'Latency',
    },
    {
      label: 'Score Tool Failure',
      prompt: 'Simulate error in candidate assessment tool',
      desc: 'Tests Generative UI error container with Try Again button',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />,
      tag: 'Tool Error',
    },
  ];

  return (
    <div className="rounded-2xl border border-dashed border-brand-primary/40 bg-brand-primary/5 p-3 text-xs">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle Evaluator Failure Simulation Drawer"
          className="flex items-center gap-2 font-bold text-brand-primary hover:underline cursor-pointer focus:outline-none"
        >
          <Bug className="w-4 h-4" aria-hidden="true" />
          <span>Evaluator Failure Simulation Harness</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <span className="text-[10px] font-mono text-muted-foreground uppercase">
          Dev / Evaluation Mode
        </span>
      </div>

      {isOpen && (
        <div className="mt-3 space-y-2 pt-2 border-t border-brand-border/60 animate-in fade-in">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Click any failure condition below to test HIREVIUM&apos;s error resilience, partial response preservation, and retry recovery mechanisms:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {SABOTAGE_TESTS.map((test, index) => (
              <button
                key={index}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onTriggerSabotage(test.prompt, test.tag);
                }}
                className="flex flex-col gap-1 p-2.5 rounded-xl border border-brand-border bg-background hover:border-brand-primary/60 hover:bg-brand-primary/5 text-left transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none group shadow-sm active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-foreground group-hover:text-brand-primary">
                    {test.icon}
                    <span className="text-xs">{test.label}</span>
                  </div>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-brand-card text-muted-foreground border">
                    {test.tag}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2">
                  {test.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
