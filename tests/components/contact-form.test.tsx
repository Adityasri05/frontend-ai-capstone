import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '@/components/contact/ContactForm';

describe('ContactForm Dynamic Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all required form inputs and accessible labels in idle state', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows client-side validation errors when submitting empty form', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a message/i)).toBeInTheDocument();
  });

  it('validates invalid email formats correctly', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalid-email-no-at' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello Aditya, this is a test message for your portfolio.' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('validates minimum message length (< 10 chars)', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'alex@startup.ai' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Too short' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Message must be at least 10 characters long/i)).toBeInTheDocument();
  });

  it('submits valid data, enters submitting state, and renders success message on API success', async () => {
    // Mock successful fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Message sent successfully. Thanks for reaching out.',
      }),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Sarah Jenkins' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'sarah.jenkins@company.ai' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Frontend AI Opportunity' } });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'Hi Aditya, we reviewed your HIREVIUM and INDRA AI case studies and would love to chat!' },
    });

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    // Verify fetch call payload
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
    });

    // Verify success banner appears
    expect(await screen.findByText(/Message Delivered/i)).toBeInTheDocument();
    expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Another Message/i })).toBeInTheDocument();
  });

  it('renders accessible error message when server responds with an error', async () => {
    // Mock server error
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        error: 'Too many requests. Please wait a minute before sending another message.',
      }),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Valid message body exceeding 10 chars.' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Too many requests/i)).toBeInTheDocument();
  });
});
