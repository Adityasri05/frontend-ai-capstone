'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  WifiOff,
  Clock,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';

export type ErrorType =
  | 'network'
  | 'rate-limit'
  | 'server-error'
  | 'empty-response'
  | 'interrupted'
  | 'validation';

export interface ChatErrorDetails {
  type: ErrorType;
  message: string;
  statusCode?: number;
  retryAfter?: number;
  suggestedPrompts?: string[];
}

interface ChatErrorBannerProps {
  error: ChatErrorDetails;
  onRetry?: () => void;
  onDismiss?: () => void;
  onSelectPrompt?: (prompt: string) => void;
  isRetrying?: boolean;
}

export default function ChatErrorBanner({
  error,
  onRetry,
  onDismiss,
  onSelectPrompt,
  isRetrying = false,
}: ChatErrorBannerProps) {
  const [cooldown, setCooldown] = useState<number>(error.retryAfter || 0);

  useEffect(() => {
    if (error.type === 'rate-limit' && error.retryAfter) {
      setCooldown(error.retryAfter);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [error]);

  const getErrorConfig = () => {
    switch (error.type) {
      case 'network':
        return {
          title: 'Network Connection Lost',
          description: error.message || 'Unable to connect to the server. Please check your internet connection.',
          icon: <WifiOff className="w-4 h-4 text-amber-500" aria-hidden="true" />,
          borderColor: 'border-amber-500/30',
          bgColor: 'bg-amber-500/10',
          textColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'rate-limit':
        return {
          title: 'AI Service Temporarily Busy (Rate Limited)',
          description:
            cooldown > 0
              ? `High traffic detected. Please wait ${cooldown}s before retrying.`
              : 'Traffic limits cleared. You can now retry your request.',
          icon: <Clock className="w-4 h-4 text-orange-500" aria-hidden="true" />,
          borderColor: 'border-orange-500/30',
          bgColor: 'bg-orange-500/10',
          textColor: 'text-orange-600 dark:text-orange-400',
        };
      case 'interrupted':
        return {
          title: 'Response Generation Interrupted',
          description: error.message || 'The streaming connection was closed prematurely. Your partial response has been saved.',
          icon: <AlertTriangle className="w-4 h-4 text-amber-500" aria-hidden="true" />,
          borderColor: 'border-amber-500/30',
          bgColor: 'bg-amber-500/10',
          textColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'empty-response':
        return {
          title: 'No Useful Response Generated',
          description: error.message || 'The AI interviewer did not produce output for this turn. Try rephrasing or choose a suggested follow-up.',
          icon: <HelpCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />,
          borderColor: 'border-blue-500/30',
          bgColor: 'bg-blue-500/10',
          textColor: 'text-blue-600 dark:text-blue-400',
        };
      default:
        return {
          title: error.statusCode ? `AI Service Notice (HTTP ${error.statusCode})` : 'AI Interview Service Error',
          description: error.message || 'Something went wrong while generating the response. Please try again.',
          icon: <ShieldAlert className="w-4 h-4 text-destructive" aria-hidden="true" />,
          borderColor: 'border-destructive/30',
          bgColor: 'bg-destructive/10',
          textColor: 'text-destructive',
        };
    }
  };

  const config = getErrorConfig();
  const isRetryDisabled = isRetrying || cooldown > 0;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`my-3 p-4 rounded-2xl border ${config.borderColor} ${config.bgColor} backdrop-blur-md shadow-md transition-all duration-200 animate-in fade-in max-w-2xl mx-auto`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-bold ${config.textColor}`}>
              {config.title}
            </h3>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss error banner"
                className="text-[11px] text-muted-foreground hover:text-foreground font-semibold hover:underline cursor-pointer"
              >
                Dismiss
              </button>
            )}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {config.description}
          </p>

          {/* Suggested Prompts on Empty Response */}
          {error.suggestedPrompts && error.suggestedPrompts.length > 0 && onSelectPrompt && (
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-primary" />
                Try one of these:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {error.suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSelectPrompt(p)}
                    className="px-2.5 py-1 rounded-lg border border-brand-border bg-background text-[11px] font-medium text-foreground hover:border-brand-primary transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Retry Action */}
          {onRetry && (
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onRetry}
                disabled={isRetryDisabled}
                aria-label={cooldown > 0 ? `Retry available in ${cooldown} seconds` : 'Retry failed interview request'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-sm hover:bg-brand-primary-hover active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>
                  {isRetrying
                    ? 'Retrying...'
                    : cooldown > 0
                    ? `Retry in ${cooldown}s`
                    : 'Retry Request'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
