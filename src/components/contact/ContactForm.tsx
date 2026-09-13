'use client';

import React, { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  'bot-field': string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    'bot-field': '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const isSubmittingRef = React.useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current || status === 'submitting') {
      return;
    }

    if (!validate()) {
      return;
    }

    isSubmittingRef.current = true;
    setStatus('submitting');
    setErrors({});

    const cleanPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      'bot-field': formData['bot-field'],
    };

    try {
      // 1. Dual-compatible submission: Try the Next.js API route first
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(cleanPayload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus('success');
        setSuccessMessage(
          data.message || 'Message sent successfully. Thanks for reaching out.'
        );
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          'bot-field': '',
        });
      } else {
        setStatus('error');
        setErrors({
          general:
            data.error || 'Something went wrong. Please try again or reach out on LinkedIn.',
        });
      }
    } catch (err) {
      console.error('Contact Form submission error:', err);
      setStatus('error');
      setErrors({
        general: 'Network error. Please check your connection or reach out on LinkedIn.',
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleReset = () => {
    isSubmittingRef.current = false;
    setStatus('idle');
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-brand-card/70 border border-brand-border rounded-2xl p-5 sm:p-8 backdrop-blur-md shadow-brand-shadow-lg text-left">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-brand-text mb-1 font-display">
          Send a Direct Message
        </h3>
        <p className="text-xs text-brand-muted leading-relaxed">
          Fill out this form to connect about junior Frontend AI roles, project collaborations, or technical questions.
        </p>
      </div>

      {/* Success Banner */}
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-4 animate-fade-in"
        >
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-emerald-500/20">
            ✓
          </div>
          <div>
            <h4 className="text-base font-bold text-emerald-300">Message Delivered</h4>
            <p className="text-xs text-emerald-400/90 mt-1 leading-relaxed">
              {successMessage} I typically respond within 24–48 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] px-5 py-2.5 bg-brand-bg hover:bg-brand-border border border-brand-border text-xs font-semibold text-brand-text rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          {/* Netlify Form Hidden Inputs */}
          <input type="hidden" name="form-name" value="contact" />
          
          {/* Honeypot Spam Protection (Hidden from visual users and screen readers) */}
          <p className="hidden" aria-hidden="true">
            <label>
              Don&apos;t fill this out if you&apos;re human:{' '}
              <input
                name="bot-field"
                tabIndex={-1}
                value={formData['bot-field']}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
          </p>

          {/* General Error Banner */}
          {errors.general && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start gap-2"
            >
              <span className="font-bold text-red-400" aria-hidden="true">✕</span>
              <span>{errors.general}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-bold font-mono text-brand-text uppercase tracking-wider mb-1.5"
            >
              Your Name <span className="text-red-400" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'submitting'}
              required
              autoComplete="name"
              placeholder="e.g. Alex Morgan"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full px-4 py-3 sm:py-2.5 bg-brand-bg border rounded-xl text-base sm:text-xs text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all ${
                errors.name
                  ? 'border-red-500/80 focus:ring-red-500'
                  : 'border-brand-border hover:border-brand-border/80'
              }`}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-[11px] text-red-400 mt-1 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-bold font-mono text-brand-text uppercase tracking-wider mb-1.5"
            >
              Email Address <span className="text-red-400" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              required
              autoComplete="email"
              placeholder="e.g. alex@company.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-4 py-3 sm:py-2.5 bg-brand-bg border rounded-xl text-base sm:text-xs text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all ${
                errors.email
                  ? 'border-red-500/80 focus:ring-red-500'
                  : 'border-brand-border hover:border-brand-border/80'
              }`}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-[11px] text-red-400 mt-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject Field (Optional) */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-bold font-mono text-brand-text uppercase tracking-wider mb-1.5"
            >
              Subject <span className="text-brand-muted font-normal normal-case">(optional)</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="e.g. Frontend AI Engineering Role / Project"
              className="w-full px-4 py-3 sm:py-2.5 bg-brand-bg border border-brand-border hover:border-brand-border/80 rounded-xl text-base sm:text-xs text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold font-mono text-brand-text uppercase tracking-wider mb-1.5"
            >
              Message <span className="text-red-400" aria-hidden="true">*</span>
              <span className="sr-only">(required, minimum 10 characters)</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'submitting'}
              required
              placeholder="Write your message here..."
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`w-full px-4 py-3 sm:py-2.5 bg-brand-bg border rounded-xl text-base sm:text-xs text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all resize-none ${
                errors.message
                  ? 'border-red-500/80 focus:ring-red-500'
                  : 'border-brand-border hover:border-brand-border/80'
              }`}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-[11px] text-red-400 mt-1 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button (Min 44px height for mobile touch ergonomics) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
              className="min-h-[44px] w-full py-3 px-6 bg-brand-accent hover:bg-brand-primary-hover disabled:bg-brand-muted/40 disabled:cursor-not-allowed text-slate-100 font-bold text-xs rounded-xl transition-all duration-300 active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              {status === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-100/30 border-t-slate-100 rounded-full animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
