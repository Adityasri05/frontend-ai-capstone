'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthViewModel } from './useAuthViewModel';

interface AuthViewProps {
  mode: 'login' | 'register';
}

export default function AuthView({ mode }: AuthViewProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    submitError,
    loading,
    handleFormSubmit
  } = useAuthViewModel(mode);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-16">
      <div className="bg-brand-card/65 border border-brand-border rounded-3xl p-8 backdrop-blur-md shadow-brand-shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent -z-10" />

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-text mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-xs text-brand-muted">
            {mode === 'login'
              ? 'Access and sync your watchlist catalog across devices'
              : 'Save titles and synchronize your database to the cloud'}
          </p>
        </div>

        {/* Firebase Warning Fallback Alert */}
        {submitError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-4 rounded-xl mb-6 text-xs font-medium text-center">
            ⚠️ {submitError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email-input" className="text-xs text-brand-muted font-bold tracking-wide">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-primary/50 rounded-xl focus:outline-none text-sm text-brand-text placeholder-brand-muted transition-colors font-sans"
            />
            {emailError && (
              <span className="text-[10px] text-red-500 font-medium" role="alert">
                {emailError}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password-input" className="text-xs text-brand-muted font-bold tracking-wide">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-primary/50 rounded-xl focus:outline-none text-sm text-brand-text placeholder-brand-muted transition-colors font-sans"
            />
            {passwordError && (
              <span className="text-[10px] text-red-500 font-medium" role="alert">
                {passwordError}
              </span>
            )}
          </div>

          {/* Confirm Password (Register Mode only) */}
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-password-input" className="text-xs text-brand-muted font-bold tracking-wide">
                Confirm Password
              </label>
              <input
                id="confirm-password-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-primary/50 rounded-xl focus:outline-none text-sm text-brand-text placeholder-brand-muted transition-colors font-sans"
              />
              {confirmPasswordError && (
                <span className="text-[10px] text-red-500 font-medium" role="alert">
                  {confirmPasswordError}
                </span>
              )}
            </div>
          )}

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-card disabled:text-brand-muted text-slate-100 font-bold text-sm rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-md mt-6"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Links */}
        <div className="text-center mt-6 text-xs">
          <span className="text-brand-muted">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <Link
            href={mode === 'login' ? '/register' : '/login'}
            className="text-brand-primary hover:text-brand-primary-hover font-bold hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
      </div>
    </div>
  );
}
