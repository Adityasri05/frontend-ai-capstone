'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Send, Sparkles, Check, AlertCircle, RefreshCw, Loader2, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AIButtonState = 'idle' | 'loading' | 'success' | 'error' | 'disabled';
export type AIButtonActionType = 'send' | 'generate' | 'save' | 'custom';
export type AIButtonSize = 'sm' | 'md' | 'lg';

export interface AIActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: AIButtonState;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  actionType?: AIButtonActionType;
  idleLabel?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  idleIcon?: React.ReactNode;
  size?: AIButtonSize;
  forceReducedMotion?: boolean;
  className?: string;
}

export const AIActionButton: React.FC<AIActionButtonProps> = ({
  state = 'idle',
  onClick,
  disabled = false,
  actionType = 'send',
  idleLabel,
  loadingLabel,
  successLabel,
  errorLabel,
  idleIcon,
  size = 'md',
  forceReducedMotion = false,
  className,
  ...props
}) => {
  const [internalShake, setInternalShake] = useState(false);
  const prevPropsStateRef = useRef<AIButtonState>(state);

  // Trigger single-shot shake effect when transitioning to error
  useEffect(() => {
    if (state === 'error' && prevPropsStateRef.current !== 'error') {
      setInternalShake(true);
      const timer = setTimeout(() => {
        setInternalShake(false);
      }, 450);
      return () => clearTimeout(timer);
    }
    prevPropsStateRef.current = state;
  }, [state]);

  const effectiveDisabled = disabled || state === 'disabled' || state === 'loading';

  // Default labels based on actionType
  const getLabels = () => {
    switch (actionType) {
      case 'generate':
        return {
          idle: idleLabel || 'Generate Evaluation',
          loading: loadingLabel || 'Evaluating...',
          success: successLabel || 'Evaluated!',
          error: errorLabel || 'Retry Evaluation',
        };
      case 'save':
        return {
          idle: idleLabel || 'Save Assessment',
          loading: loadingLabel || 'Saving...',
          success: successLabel || 'Saved!',
          error: errorLabel || 'Retry Save',
        };
      case 'send':
      default:
        return {
          idle: idleLabel || 'Send Message',
          loading: loadingLabel || 'Generating...',
          success: successLabel || 'Sent!',
          error: errorLabel || 'Retry',
        };
    }
  };

  const labels = getLabels();

  // Size styling classes
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg min-w-[90px]',
    md: 'h-10 px-4 text-sm gap-2 rounded-xl min-w-[120px]',
    lg: 'h-12 px-5 text-base gap-2.5 rounded-2xl min-w-[140px]',
  }[size];

  // State-specific visual styling
  const stateColorClasses = {
    idle: 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/25',
    loading: 'bg-indigo-700/80 text-white/90 shadow-none cursor-wait',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-500/20',
    error: 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-sm shadow-rose-500/20',
    disabled: 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 shadow-none cursor-not-allowed',
  }[state === 'disabled' || (disabled && state === 'idle') ? 'disabled' : state];

  // Icon selector based on state and actionType
  const renderIcon = () => {
    if (state === 'loading') {
      return (
        <Loader2
          className={cn(
            'size-4 animate-spin shrink-0',
            forceReducedMotion && 'animate-none'
          )}
          aria-hidden="true"
        />
      );
    }

    if (state === 'success') {
      return (
        <Check
          className={cn(
            'size-4 shrink-0 transform transition-transform duration-300 ease-out',
            !forceReducedMotion && 'scale-110'
          )}
          aria-hidden="true"
        />
      );
    }

    if (state === 'error') {
      return <RefreshCw className="size-4 shrink-0 animate-in fade-in duration-200" aria-hidden="true" />;
    }

    if (idleIcon) {
      return idleIcon;
    }

    switch (actionType) {
      case 'generate':
        return <Sparkles className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />;
      case 'save':
        return <Bookmark className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-y-[-1px]" aria-hidden="true" />;
      case 'send':
      default:
        return <Send className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />;
    }
  };

  const getAriaLabel = () => {
    switch (state) {
      case 'loading':
        return `${labels.loading} - please wait`;
      case 'success':
        return `${labels.success} - action completed`;
      case 'error':
        return `${labels.error} - action failed, click to retry`;
      case 'disabled':
        return `${labels.idle} - currently unavailable`;
      default:
        return labels.idle;
    }
  };

  return (
    <>
      {/* Global component keyframe for the subtle single-shot error shake */}
      <style jsx global>{`
        @keyframes ai-action-button-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-ai-button-shake {
          animation: ai-action-button-shake 380ms cubic-bezier(0.36, 0.07, 0.19, 0.97) 1;
        }
      `}</style>

      <button
        type="button"
        disabled={effectiveDisabled}
        onClick={onClick}
        aria-label={getAriaLabel()}
        aria-busy={state === 'loading'}
        aria-live="polite"
        className={cn(
          // Base button structure
          'group relative inline-flex items-center justify-center font-medium select-none outline-none',
          'border border-transparent font-sans tracking-tight',
          // Motion principles: micro-interaction timing (150-200ms) with GPU-accelerated transform & opacity
          'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
          // Hover elevation
          !effectiveDisabled && 'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
          // Focus ring for visible keyboard accessibility
          'focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          // Size and state classes
          sizeClasses,
          stateColorClasses,
          // Error shake animation
          internalShake && !forceReducedMotion && 'animate-ai-button-shake',
          // Prefers-reduced-motion / Simulation overrides
          (forceReducedMotion || 'motion-reduce:transition-none motion-reduce:transform-none motion-reduce:animate-none'),
          className
        )}
        {...props}
      >
        {/* Render Icon with smooth opacity transition */}
        <span className="inline-flex items-center justify-center transition-opacity duration-150">
          {renderIcon()}
        </span>

        {/* Render Label text with cross-fade transition */}
        <span
          className={cn(
            'whitespace-nowrap transition-all duration-200',
            state === 'loading' && 'opacity-90',
            state === 'success' && 'font-semibold',
            state === 'error' && 'font-semibold'
          )}
        >
          {state === 'loading' && labels.loading}
          {state === 'success' && labels.success}
          {state === 'error' && labels.error}
          {state !== 'loading' && state !== 'success' && state !== 'error' && labels.idle}
        </span>
      </button>
    </>
  );
};
