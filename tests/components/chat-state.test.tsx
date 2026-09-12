import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThinkingIndicator from '@/components/ai/ThinkingIndicator';
import ChatErrorBanner from '@/components/ai/ChatErrorBanner';
import InterviewChat from '@/components/ai/InterviewChat';

describe('Chat State Lifecycle & Resilience', () => {
  it('renders pending thinking indicator with accessible status role', () => {
    render(<ThinkingIndicator />);

    const statusElement = screen.getByRole('status');
    expect(statusElement).toBeInTheDocument();
    expect(
      screen.getByText(/AI Interviewer is analyzing your response/i)
    ).toBeInTheDocument();
  });

  it('renders server error banner with accessible alert and retry action', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();
    const handleDismiss = vi.fn();

    render(
      <ChatErrorBanner
        error={{
          type: 'server-error',
          message: 'Server returned HTTP 500 while generating technical assessment.',
        }}
        onRetry={handleRetry}
        onDismiss={handleDismiss}
      />
    );

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(screen.getByText(/AI Interview Service Error/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Server returned HTTP 500 while generating technical assessment/i)
    ).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /retry failed interview request/i });
    await user.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders rate limit cooldown error with dynamic countdown timer', () => {
    render(
      <ChatErrorBanner
        error={{
          type: 'rate-limit',
          message: 'Service is temporarily busy.',
          retryAfter: 5,
        }}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByText(/AI Service Temporarily Busy/i)).toBeInTheDocument();
    expect(screen.getByText(/Retry in 5s/i)).toBeInTheDocument();
  });

  it('renders first-run onboarding state with interactive starter topics', async () => {
    const user = userEvent.setup();
    render(<InterviewChat />);

    expect(
      screen.getByText(/HIREVIUM AI Technical Qualification/i)
    ).toBeInTheDocument();

    const starterPill = screen.getByRole('button', {
      name: /Analyze my strongest technical skills/i,
    });
    expect(starterPill).toBeInTheDocument();

    // Verify textarea is available
    const textarea = screen.getByPlaceholderText(
      /Type your technical response/i
    );
    expect(textarea).toBeInTheDocument();
  });
});
