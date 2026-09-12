'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Square,
  Sparkles,
  RotateCcw,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Terminal,
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import ThinkingIndicator from './ThinkingIndicator';
import JumpToLatest from './JumpToLatest';

export interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const STARTER_TOPICS = [
  'Architecting a resilient Next.js 15 App with Server Components',
  'Real-time streaming AI token handling & cancellation UX',
  'WCAG 2.1 AA Accessibility & Keyboard Navigation standards',
  'State management & optimistic UI in high-concurrency apps',
];

export default function InterviewChat() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewTokensWhileAway, setHasNewTokensWhileAway] = useState(false);

  // References for abort control & scrolling
  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isAtBottomRef = useRef(true);

  // Keep ref in sync
  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  /**
   * Smoothly scrolls container to the bottom if the user is attached to the bottom
   */
  const scrollToBottom = useCallback((force = false) => {
    if (!scrollContainerRef.current) return;
    if (force || isAtBottomRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: force ? 'smooth' : 'auto',
      });
      if (force) {
        setIsAtBottom(true);
        setHasNewTokensWhileAway(false);
      }
    }
  }, []);

  /**
   * Monitor user scroll events to detect if user has scrolled away from the bottom
   */
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // Consider at bottom if within 40px threshold
    const atBottom = scrollHeight - scrollTop - clientHeight < 40;

    setIsAtBottom(atBottom);
    if (atBottom) {
      setHasNewTokensWhileAway(false);
    }
  }, []);

  /**
   * Auto-scroll on initial render or when messages array changes
   */
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom]);

  /**
   * Send Message & Stream Response
   */
  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : input).trim();
    if (!text || isStreaming || isThinking) return;

    setError(null);
    setInput('');

    // 1. Append Candidate (User) Message
    const userMessage: MessageItem = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'user',
      content: text,
      createdAt: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsThinking(true);
    setIsAtBottom(true);

    // Scroll to bottom immediately on send
    setTimeout(() => scrollToBottom(true), 50);

    // 2. Prepare assistant placeholder ID
    const assistantId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // 3. POST to Next.js API Route Handler
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      if (!response.body) {
        throw new Error('Response body is null.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let assistantText = '';
      let hasReceivedFirstToken = false;

      // 4. Stream Tokens
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        let newTokens = '';

        // Check if stream is in AI SDK 0:"..." data format
        if (chunk.includes('0:')) {
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const parsed = JSON.parse(line.slice(2));
                newTokens += parsed;
              } catch {
                // Ignore incomplete JSON chunks on stream boundaries
              }
            }
          }
        } else {
          // Standard text stream
          newTokens = chunk;
        }

        if (newTokens) {
          assistantText += newTokens;

          if (!hasReceivedFirstToken) {
            hasReceivedFirstToken = true;
            setIsThinking(false);
            setIsStreaming(true);
          }

          // Update assistant message in state
          setMessages((prev) => {
            const existingIdx = prev.findIndex((m) => m.id === assistantId);
            if (existingIdx !== -1) {
              const updated = [...prev];
              updated[existingIdx] = {
                ...updated[existingIdx],
                content: assistantText,
              };
              return updated;
            } else {
              return [
                ...prev,
                {
                  id: assistantId,
                  role: 'assistant',
                  content: assistantText,
                  createdAt: new Date(),
                },
              ];
            }
          });

          // Handle auto-scroll tracking
          if (isAtBottomRef.current) {
            scrollToBottom();
          } else {
            setHasNewTokensWhileAway(true);
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User intentionally cancelled stream via Stop button
        // Keep partial text intact!
      } else {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'An error occurred while streaming the interview response.';
        setError(errorMessage);
      }
    } finally {
      setIsThinking(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
      // Re-focus input for next turn
      textareaRef.current?.focus();
    }
  };

  /**
   * Stop / Cancel Generation Handler
   * Aborts HTTP stream immediately, preserves partial assistant response in messages,
   * re-enables candidate input.
   */
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsThinking(false);
    setIsStreaming(false);
    textareaRef.current?.focus();
  };

  /**
   * Keyboard Interaction:
   * Enter -> Send message
   * Shift + Enter -> Insert newline
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Reset / Clear Conversation
   */
  const handleResetChat = () => {
    if (isStreaming || isThinking) {
      handleStop();
    }
    setMessages([]);
    setError(null);
    setInput('');
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto w-full bg-brand-bg relative overflow-hidden">
      {/* 1. Header Toolbar */}
      <div className="flex-shrink-0 px-4 py-3 bg-brand-card/70 border-b border-brand-border flex items-center justify-between backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shadow-sm">
            <Sparkles className="w-5 h-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-foreground font-display">
                HIREVIUM AI Technical Qualification
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Live Claude Stream
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Candidate Technical Assessment • Frontend & AI SDK Architecture
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleResetChat}
              aria-label="Restart technical interview"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-brand-card hover:bg-brand-border/80 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">New Interview</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Messages Viewport */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-3 relative focus:outline-none"
        tabIndex={0}
        role="region"
        aria-label="Interview conversation history"
      >
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 shadow-sm">
              <Terminal className="w-7 h-7" aria-hidden="true" />
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2 font-display">
              Technical Qualification Interview
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Welcome to your HIREVIUM live engineering evaluation. The AI Interviewer will evaluate
              your architectural reasoning, modern React/Next.js depth, accessibility, and AI systems engineering.
            </p>

            <div className="w-full space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                <HelpCircle className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                <span>Suggested Starter Topics:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {STARTER_TOPICS.map((topic, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => sendMessage(topic)}
                    className="p-3 rounded-xl border border-brand-border bg-brand-card/50 hover:bg-brand-primary/10 hover:border-brand-primary/40 text-xs text-foreground font-medium transition-all text-left cursor-pointer group shadow-sm active:scale-[0.98]"
                  >
                    <span className="line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {topic}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[11px] text-muted-foreground bg-brand-card/80 px-3.5 py-2 rounded-xl border border-brand-border">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Server-side Claude streaming • Zero client API key leakage</span>
            </div>
          </div>
        )}

        {/* Render Message List */}
        {messages.map((msg, index) => {
          const isLastAssistantMessage =
            msg.role === 'assistant' && index === messages.length - 1 && isStreaming;

          return (
            <ChatMessage
              key={msg.id}
              id={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={isLastAssistantMessage}
              createdAt={msg.createdAt}
            />
          );
        })}

        {/* Thinking State */}
        {isThinking && <ThinkingIndicator />}

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 p-3.5 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-xs max-w-xl mx-auto my-3 animate-fade-in"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-semibold">Generation Notice</p>
              <p className="text-[11px] opacity-90 mt-0.5">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-xs font-bold underline hover:opacity-75 cursor-pointer ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* 3. Floating Jump to Latest Button */}
      <JumpToLatest
        visible={!isAtBottom && (isStreaming || hasNewTokensWhileAway)}
        onClick={() => scrollToBottom(true)}
        unreadCount={hasNewTokensWhileAway ? 1 : 0}
      />

      {/* 4. Input Controls & Toolbar */}
      <div className="flex-shrink-0 p-4 bg-brand-card/90 border-t border-brand-border backdrop-blur-md z-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="relative flex flex-col gap-2 max-w-4xl mx-auto"
        >
          <div className="relative flex items-end gap-2 bg-background border border-brand-border rounded-2xl p-2 shadow-inner focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isStreaming
                  ? 'AI Interviewer is answering... (Click Stop to interrupt)'
                  : 'Type your technical response... (Enter to send, Shift+Enter for newline)'
              }
              rows={2}
              disabled={isStreaming || isThinking}
              aria-label="Candidate technical response input"
              className="w-full resize-none bg-transparent border-0 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none p-1.5 leading-relaxed max-h-32 disabled:opacity-60"
            />

            {/* Action Buttons: Stop or Send */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {isStreaming || isThinking ? (
                <button
                  type="button"
                  onClick={handleStop}
                  aria-label="Stop generating response"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer animate-pulse"
                >
                  <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send technical answer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between px-1 text-[10px] text-muted-foreground">
            <span>Press <kbd className="px-1 py-0.5 rounded bg-brand-card border font-mono">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-brand-card border font-mono">Shift+Enter</kbd> for newline</span>
            <span className="font-mono">Turn: {messages.filter((m) => m.role === 'user').length}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
