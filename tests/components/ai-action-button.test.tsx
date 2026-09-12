import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AIActionButton } from '@/components/ai/AIActionButton';

describe('AIActionButton Component Lifecycle & Motion', () => {
  it('renders in idle state with accessible label and responds to click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<AIActionButton state="idle" onClick={handleClick} idleLabel="Send Answer" />);

    const button = screen.getByRole('button', { name: /Send Answer/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders in loading state with busy status and disabled interaction', () => {
    render(<AIActionButton state="loading" loadingLabel="Evaluating..." />);

    const button = screen.getByRole('button', { name: /Evaluating\.\.\. - please wait/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('renders in success state with completed label and confirmation icon', () => {
    render(<AIActionButton state="success" successLabel="Sent!" />);

    const button = screen.getByRole('button', { name: /Sent! - action completed/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Sent!')).toBeInTheDocument();
  });

  it('renders in error state with retry label and accessible retry hint', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(<AIActionButton state="error" onClick={handleRetry} errorLabel="Retry Evaluation" />);

    const button = screen.getByRole('button', { name: /Retry Evaluation - action failed, click to retry/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Retry Evaluation')).toBeInTheDocument();

    await user.click(button);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state and prevents clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<AIActionButton disabled={true} onClick={handleClick} idleLabel="Submit" />);

    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
