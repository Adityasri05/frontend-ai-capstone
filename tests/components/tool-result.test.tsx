import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CandidateScoreCard from '@/components/ai/tools/CandidateScoreCard';
import ToolErrorState from '@/components/ai/tools/ToolErrorState';
import type { CandidateScoreResult } from '@/lib/ai/tools/scoreCandidate';

describe('Tool Result Component (CandidateScoreCard & ToolErrorState)', () => {
  const mockScoreResult: CandidateScoreResult = {
    candidateName: 'Aditya Srivastava',
    targetRole: 'Senior Frontend & AI Engineer',
    overallScore: 92,
    technicalScore: 95,
    problemSolvingScore: 90,
    communicationScore: 88,
    strengths: [
      'Mastery of React 19 concurrent features and Next.js App Router',
      'Production-grade streaming AI state and error handling architecture',
      'Robust WAI-ARIA APG keyboard accessibility standards',
    ],
    skillGaps: ['Deepen distributed systems telemetry observability'],
    recommendation: 'strong',
    summary:
      'Candidate demonstrates exemplary technical depth in frontend architecture, resilient AI SDK integrations, and rigorous testing methodologies.',
    assessedAt: new Date().toISOString(),
  };

  it('renders complete score card with metrics, recommendation, and strengths', () => {
    render(<CandidateScoreCard result={mockScoreResult} />);

    expect(screen.getByText('Candidate Qualification Score Card')).toBeInTheDocument();
    expect(screen.getByText(/Aditya Srivastava • Senior Frontend & AI Engineer/i)).toBeInTheDocument();
    expect(screen.getByText('Strong Candidate')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Mastery of React 19 concurrent features and Next.js App Router')).toBeInTheDocument();
    expect(screen.getByText('Deepen distributed systems telemetry observability')).toBeInTheDocument();
  });

  it('copies assessment summary to clipboard on Copy Report click', async () => {
    const user = userEvent.setup();
    const writeSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

    render(<CandidateScoreCard result={mockScoreResult} />);

    const copyBtn = screen.getByRole('button', { name: /copy assessment summary/i });
    expect(copyBtn).toBeInTheDocument();

    await user.click(copyBtn);
    expect(writeSpy).toHaveBeenCalledTimes(1);
    expect(writeSpy).toHaveBeenCalledWith(
      expect.stringContaining('HIREVIUM Candidate Qualification Assessment')
    );
    writeSpy.mockRestore();
  });

  it('renders tool error state with accessible alert and retry action', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(
      <ToolErrorState
        error="Evaluation payload timed out."
        onRetry={handleRetry}
      />
    );

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(screen.getByText('Assessment Unavailable')).toBeInTheDocument();
    expect(screen.getByText(/Evaluation payload timed out/i)).toBeInTheDocument();

    const tryAgainBtn = screen.getByRole('button', { name: /retry candidate assessment tool call/i });
    await user.click(tryAgainBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
