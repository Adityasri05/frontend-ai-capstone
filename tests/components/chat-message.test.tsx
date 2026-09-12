import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatMessage from '@/components/ai/ChatMessage';

describe('ChatMessage Component', () => {
  it('renders a user message correctly with accessible role and text', () => {
    render(
      <ChatMessage
        id="msg-1"
        role="user"
        content="I have extensive experience with React 19 and Next.js 15 App Router."
      />
    );

    expect(screen.getByText('Candidate')).toBeInTheDocument();
    expect(
      screen.getByText('I have extensive experience with React 19 and Next.js 15 App Router.')
    ).toBeInTheDocument();
  });

  it('renders an assistant message with technical markdown and code block', () => {
    render(
      <ChatMessage
        id="msg-2"
        role="assistant"
        content="Here is how you handle race conditions:\n\n```typescript\nconst controller = new AbortController();\n```"
      />
    );

    expect(screen.getByText('AI Interviewer')).toBeInTheDocument();
    expect(screen.getByText(/Here is how you handle race conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/const controller = new AbortController/i)).toBeInTheDocument();
  });

  it('renders an interrupted assistant message with alert badge and localized retry action', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(
      <ChatMessage
        id="msg-3"
        role="assistant"
        content="Based on your experience with system architecture, you should consider..."
        isInterrupted={true}
        onRetry={handleRetry}
      />
    );

    expect(screen.getByText('INTERRUPTED')).toBeInTheDocument();
    expect(
      screen.getByText(/Stream closed unexpectedly\. Partial response saved\./i)
    ).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /^Retry$/i });
    expect(retryBtn).toBeInTheDocument();

    await user.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
