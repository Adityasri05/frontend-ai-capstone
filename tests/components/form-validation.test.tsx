import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthView from '@/features/auth/AuthView';
import { AuthProvider } from '@/features/auth/AuthContext';

describe('Validated Auth Form Component', () => {
  it('shows accessible validation error when submitting with an invalid email', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthView mode="login" />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    await user.type(emailInput, 'candidate@domain'); // Missing top-level domain extension (.com)
    await user.type(passwordInput, 'validpass123');
    await user.click(submitButton);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows accessible validation error when password is too short', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthView mode="login" />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    await user.type(emailInput, 'candidate@hirevium.com');
    await user.type(passwordInput, '123'); // Less than 6 characters
    await user.click(submitButton);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/Password must contain at least 6 characters/i)).toBeInTheDocument();
  });

  it('validates mismatched password confirmation on registration', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthView mode="register" />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    await user.type(emailInput, 'candidate@hirevium.com');
    await user.type(passwordInput, 'secret123');
    await user.type(confirmPasswordInput, 'different123');
    await user.click(submitButton);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});
