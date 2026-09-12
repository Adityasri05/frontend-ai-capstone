'use client';

import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  TrendingUp,
  Cpu,
  Layers,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import type { CandidateScoreResult } from '@/lib/ai/tools/scoreCandidate';

interface CandidateScoreCardProps {
  result: CandidateScoreResult;
}

export default function CandidateScoreCard({ result }: CandidateScoreCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const text = `HIREVIUM Candidate Qualification Assessment
Candidate: ${result.candidateName}
Target Role: ${result.targetRole}
Overall Score: ${result.overallScore}/100 (${result.recommendation.toUpperCase()})

Breakdown:
- Technical Score: ${result.technicalScore}/100
- Problem Solving: ${result.problemSolvingScore}/100
- Communication: ${result.communicationScore}/100

Strengths:
${result.strengths.map((s) => `• ${s}`).join('\n')}

Skill Gaps:
${result.skillGaps.map((g) => `• ${g}`).join('\n')}

Summary:
${result.summary}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getRecommendationBadge = () => {
    switch (result.recommendation) {
      case 'strong':
        return {
          label: 'Strong Candidate',
          className:
            'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          icon: <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'consider':
        return {
          label: 'Consider',
          className:
            'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          icon: <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      default:
        return {
          label: 'Needs Review',
          className:
            'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
          icon: <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />,
        };
    }
  };

  const badge = getRecommendationBadge();

  return (
    <article
      aria-label="Candidate Qualification Score Card"
      className="my-3 rounded-2xl border border-brand-border bg-brand-card/95 p-5 shadow-lg backdrop-blur-md transition-all duration-300 animate-in fade-in"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-indigo-600 text-white shadow-md">
            <Award className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground font-display">
                Candidate Qualification Score Card
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {result.candidateName} • {result.targetRole}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border font-mono ${badge.className}`}
          >
            {badge.icon}
            <span>{badge.label}</span>
          </span>
        </div>
      </div>

      {/* Grid: Overall Gauge & Category Breakdowns */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Score Highlight */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/5 p-4 text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Overall Score
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-brand-primary font-display">
              {result.overallScore}
            </span>
            <span className="text-xs text-muted-foreground font-mono">/100</span>
          </div>
          <span className="mt-1 text-[10px] text-muted-foreground font-mono">
            Weighted Composite
          </span>
        </div>

        {/* 3 Dimension Progress Bars */}
        <div className="sm:col-span-2 space-y-3 rounded-2xl border border-brand-border/60 bg-background/60 p-4">
          {/* Technical Score */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
                Technical Depth (50%)
              </span>
              <span className="font-mono font-bold text-foreground">{result.technicalScore}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-brand-border/60">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                style={{ width: `${result.technicalScore}%` }}
              />
            </div>
          </div>

          {/* Problem Solving Score */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <Layers className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
                Problem Solving (30%)
              </span>
              <span className="font-mono font-bold text-foreground">
                {result.problemSolvingScore}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-brand-border/60">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-700"
                style={{ width: `${result.problemSolvingScore}%` }}
              />
            </div>
          </div>

          {/* Communication Score */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                Communication (20%)
              </span>
              <span className="font-mono font-bold text-foreground">
                {result.communicationScore}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-brand-border/60">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all duration-700"
                style={{ width: `${result.communicationScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Skill Gaps */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Strengths */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>Observed Strengths</span>
          </div>
          <ul className="space-y-1.5 text-xs text-foreground/90 pl-1">
            {result.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Gaps */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>Areas for Growth</span>
          </div>
          <ul className="space-y-1.5 text-xs text-foreground/90 pl-1">
            {result.skillGaps.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mt-4 rounded-xl border border-brand-border bg-background/50 p-3.5 text-xs leading-relaxed text-foreground">
        <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider block mb-1">
          Executive Qualification Summary
        </span>
        <p>{result.summary}</p>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 flex items-center justify-between border-t border-brand-border/70 text-xs">
        <span className="text-[10px] text-muted-foreground font-mono">
          Evaluated {new Date(result.assessedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <button
          type="button"
          onClick={handleCopySummary}
          aria-label={copied ? 'Assessment copied to clipboard' : 'Copy assessment summary'}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-brand-border bg-brand-card hover:bg-brand-border text-xs font-semibold text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>Copied Report</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy Report</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
