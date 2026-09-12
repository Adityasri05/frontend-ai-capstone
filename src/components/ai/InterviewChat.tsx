'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Square,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Terminal,
  Award,
  AlertCircle,
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import ThinkingIndicator from './ThinkingIndicator';
import JumpToLatest from './JumpToLatest';
import ToolCallCard, { type ToolCallData } from './tools/ToolCallCard';
import ChatErrorBanner, { type ChatErrorDetails } from './ChatErrorBanner';
import DevSabotageDrawer from './DevSabotageDrawer';

export interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCallData[];
  isInterrupted?: boolean;
  createdAt: Date;
}

const STARTER_TOPICS = [
  'Analyze my strongest technical skills.',
  'Start a frontend & system design technical interview.',
  'What areas should I focus on for a Senior AI Engineer role?',
  'Can you assess my performance so far and generate a score card?',
];

export type ChatStatus = 'idle' | 'submitting' | 'streaming' | 'error' | 'retrying';

export default function InterviewChat() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [activeError, setActiveError] = useState<ChatErrorDetails | null>(null);
  const [inputValidationWarning, setInputValidationWarning] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewTokensWhileAway, setHasNewTokensWhileAway] = useState(false);

  // References
  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isAtBottomRef = useRef(true);

  const isStreaming = status === 'streaming';
  const isThinking = status === 'submitting' || status === 'retrying';
  const isLoading = isStreaming || isThinking;

  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  /**
   * Auto-scroll helper
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

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 40;

    setIsAtBottom(atBottom);
    if (atBottom) {
      setHasNewTokensWhileAway(false);
    }
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom]);

  /**
   * Primary Send Message & Streaming Request Flow
   */
  const executeSendMessage = async (textToSend: string, isRetry = false) => {
    const cleanText = textToSend.trim();

    // Step 3: Empty input validation guard
    if (!cleanText) {
      setInputValidationWarning('Please enter your technical answer before sending.');
      textareaRef.current?.focus();
      return;
    }

    if (isLoading) return; // Prevent double-click spam

    setInputValidationWarning(null);
    setActiveError(null);
    setInput('');
    setStatus(isRetry ? 'retrying' : 'submitting');
    setIsAtBottom(true);

    // Step 9: Network check before sending
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setActiveError({
        type: 'network',
        message: 'You appear to be offline. Please verify your internet connection before sending.',
      });
      setStatus('error');
      textareaRef.current?.focus();
      return;
    }

    let updatedMessages = [...messages];

    if (!isRetry) {
      // Append candidate message
      const userMessage: MessageItem = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: 'user',
        content: cleanText,
        createdAt: new Date(),
      };
      updatedMessages.push(userMessage);
      setMessages(updatedMessages);
    } else {
      // If retrying, remove trailing interrupted/empty assistant message if it exists
      const last = updatedMessages[updatedMessages.length - 1];
      if (last && last.role === 'assistant' && (last.isInterrupted || !last.content.trim())) {
        updatedMessages.pop();
        setMessages(updatedMessages);
      }
    }

    setTimeout(() => scrollToBottom(true), 50);

    const assistantId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let assistantText = '';
    let toolCallsList: ToolCallData[] = [];
    let receivedTokensCount = 0;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      // Step 8: Handle HTTP 429 Rate Limiting
      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('Retry-After');
        const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) || 5 : 4;
        const errData = await response.json().catch(() => null);

        setActiveError({
          type: 'rate-limit',
          statusCode: 429,
          retryAfter: retryAfterSec,
          message:
            errData?.error ||
            'The AI interview service is temporarily busy. Please wait a moment before sending your next answer.',
        });
        setStatus('error');
        return;
      }

      // Step 6: Handle Server / API Errors (HTTP 500, 502, 503)
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const isServerErr = response.status >= 500;

        setActiveError({
          type: 'server-error',
          statusCode: response.status,
          message:
            errData?.error ||
            (isServerErr
              ? 'The AI qualification service encountered an internal server error. Please retry.'
              : `Request failed with status ${response.status}.`),
        });
        setStatus('error');
        return;
      }

      if (!response.body) {
        throw new Error('Response body stream is empty.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      // Stream Tokens Loop
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const rawChunk = decoder.decode(value, { stream: true });
        if (!rawChunk) continue;

        const lines = rawChunk.split('\n');

        for (const line of lines) {
          if (!line) continue;

          // Tool Call Event Handling
          if (line.startsWith('__TOOL_EVENT__:')) {
            try {
              const eventData = JSON.parse(line.slice('__TOOL_EVENT__:'.length));
              if (eventData && eventData.type === 'tool-call') {
                setStatus('streaming');

                const existingIdx = toolCallsList.findIndex(
                  (tc) => tc.toolCallId === eventData.toolCallId
                );

                if (existingIdx !== -1) {
                  toolCallsList[existingIdx] = {
                    ...toolCallsList[existingIdx],
                    state: eventData.state,
                    input: eventData.input || toolCallsList[existingIdx].input,
                    result: eventData.result || toolCallsList[existingIdx].result,
                    error: eventData.error || toolCallsList[existingIdx].error,
                  };
                } else {
                  toolCallsList.push({
                    toolCallId: eventData.toolCallId,
                    toolName: eventData.toolName,
                    state: eventData.state,
                    input: eventData.input,
                    result: eventData.result,
                    error: eventData.error,
                  });
                }

                setMessages((prev) => {
                  const aIdx = prev.findIndex((m) => m.id === assistantId);
                  if (aIdx !== -1) {
                    const updated = [...prev];
                    updated[aIdx] = {
                      ...updated[aIdx],
                      toolCalls: [...toolCallsList],
                    };
                    return updated;
                  } else {
                    return [
                      ...prev,
                      {
                        id: assistantId,
                        role: 'assistant',
                        content: '',
                        toolCalls: [...toolCallsList],
                        createdAt: new Date(),
                      },
                    ];
                  }
                });

                if (isAtBottomRef.current) scrollToBottom();
              }
            } catch {
              // Ignore partial JSON
            }
            continue;
          }

          // Text token decoding
          let textDelta = line;
          if (line.startsWith('0:')) {
            try {
              textDelta = JSON.parse(line.slice(2));
            } catch {
              textDelta = '';
            }
          }

          if (textDelta) {
            assistantText += textDelta;
            receivedTokensCount++;
            setStatus('streaming');

            setMessages((prev) => {
              const existingIdx = prev.findIndex((m) => m.id === assistantId);
              if (existingIdx !== -1) {
                const updated = [...prev];
                updated[existingIdx] = {
                  ...updated[existingIdx],
                  content: assistantText,
                  toolCalls: [...toolCallsList],
                };
                return updated;
              } else {
                return [
                  ...prev,
                  {
                    id: assistantId,
                    role: 'assistant',
                    content: assistantText,
                    toolCalls: [...toolCallsList],
                    createdAt: new Date(),
                  },
                ];
              }
            });

            if (isAtBottomRef.current) {
              scrollToBottom();
            } else {
              setHasNewTokensWhileAway(true);
            }
          }
        }
      }

      // Step 10: Handle Empty / No-Result Response
      if (receivedTokensCount === 0 && toolCallsList.length === 0) {
        setActiveError({
          type: 'empty-response',
          message: 'The AI interviewer did not produce an answer for this prompt.',
          suggestedPrompts: [
            'Can you assess my performance so far?',
            'What technical interview question should we do next?',
          ],
        });
        setStatus('error');
      } else {
        setStatus('idle');
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User clicked Stop
        setStatus('idle');
      } else {
        // Step 7: Mid-Stream Interruption Handling
        const isMidStream = assistantText.length > 0;
        const errMsg =
          err instanceof Error
            ? err.message
            : 'An unexpected connection failure occurred while streaming.';

        if (isMidStream) {
          // Preserve partial assistant message and flag as interrupted
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === assistantId);
            if (idx !== -1) {
              const updated = [...prev];
              updated[idx] = {
                ...updated[idx],
                isInterrupted: true,
              };
              return updated;
            }
            return prev;
          });

          setActiveError({
            type: 'interrupted',
            message: 'Streaming connection was interrupted. Partial response preserved.',
          });
        } else {
          setActiveError({
            type: err instanceof TypeError ? 'network' : 'server-error',
            message: errMsg,
          });
        }
        setStatus('error');
      }
    } finally {
      abortControllerRef.current = null;
      textareaRef.current?.focus();
    }
  };

  /**
   * Retry the last candidate message
   */
  const handleRetryLastMessage = () => {
    const userMessages = messages.filter((m) => m.role === 'user');
    const lastUser = userMessages[userMessages.length - 1];
    if (lastUser) {
      executeSendMessage(lastUser.content, true);
    }
  };

  /**
   * Stop / Cancel Generation
   */
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus('idle');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim()) {
        setInputValidationWarning('Please type a technical response before sending.');
        return;
      }
      executeSendMessage(input);
    }
  };

  const handleResetChat = () => {
    if (isLoading) handleStop();
    setMessages([]);
    setActiveError(null);
    setInputValidationWarning(null);
    setInput('');
    setStatus('idle');
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] max-w-5xl mx-auto w-full bg-brand-bg relative overflow-hidden">
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
                Resilient Stream Active
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Candidate Technical Assessment • Resilient Multi-Turn Architecture
            </p>
          </div>
        </div>

        {/* Quick Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => executeSendMessage('Can you assess my performance so far and generate a score card?')}
            disabled={isLoading}
            aria-label="Generate Candidate Score Card via AI tool"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-primary/30 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden md:inline">Score Candidate</span>
          </button>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleResetChat}
              aria-label="Restart technical interview"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-brand-card hover:bg-brand-border/80 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
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
        {/* Developer Failure Sabotage Test Drawer */}
        <div className="mb-3">
          <DevSabotageDrawer
            disabled={isLoading}
            onTriggerSabotage={(prompt) => executeSendMessage(prompt)}
          />
        </div>

        {/* First-Run Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 shadow-sm">
              <Terminal className="w-7 h-7" aria-hidden="true" />
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2 font-display">
              Technical Qualification Interview
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Welcome to your HIREVIUM live engineering evaluation. The AI Interviewer uses resilient
              streaming and server-side scoring tools to assess your technical depth.
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
                    onClick={() => executeSendMessage(topic)}
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
              <span>Resilient stream • Partial preservation • 10 Failure Modes Guarded</span>
            </div>
          </div>
        )}

        {/* Render Message List */}
        {messages.map((msg, index) => {
          const isLastAssistantMessage =
            msg.role === 'assistant' && index === messages.length - 1 && isStreaming;

          return (
            <div key={msg.id} className="space-y-2">
              {/* Tool Call Cards */}
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <div className="max-w-3xl mr-auto">
                  {msg.toolCalls.map((tc) => (
                    <ToolCallCard
                      key={tc.toolCallId}
                      data={tc}
                      onRetry={() =>
                        executeSendMessage('Can you assess my performance so far and generate a score card?')
                      }
                    />
                  ))}
                </div>
              )}

              {/* Chat Message Bubble */}
              {msg.content && (
                <ChatMessage
                  id={msg.id}
                  role={msg.role}
                  content={msg.content}
                  isStreaming={isLastAssistantMessage}
                  isInterrupted={msg.isInterrupted}
                  createdAt={msg.createdAt}
                  onRetry={handleRetryLastMessage}
                />
              )}
            </div>
          );
        })}

        {/* Loading / Progressive Thinking State */}
        {isThinking && <ThinkingIndicator />}

        {/* Active Error Banner with Retry */}
        {activeError && (
          <ChatErrorBanner
            error={activeError}
            onRetry={handleRetryLastMessage}
            onDismiss={() => setActiveError(null)}
            onSelectPrompt={(p) => executeSendMessage(p)}
            isRetrying={status === 'retrying'}
          />
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
            if (!input.trim()) {
              setInputValidationWarning('Please enter your technical answer before sending.');
              return;
            }
            executeSendMessage(input);
          }}
          className="relative flex flex-col gap-2 max-w-4xl mx-auto"
        >
          {/* Validation Tooltip */}
          {inputValidationWarning && (
            <div
              role="alert"
              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold animate-in fade-in"
            >
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{inputValidationWarning}</span>
              </div>
              <button
                type="button"
                onClick={() => setInputValidationWarning(null)}
                className="text-[10px] underline hover:opacity-80"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-background border border-brand-border rounded-2xl p-2 shadow-inner focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (inputValidationWarning && e.target.value.trim()) {
                  setInputValidationWarning(null);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                isLoading
                  ? 'AI Interviewer is analyzing... (Click Stop to interrupt)'
                  : 'Type your technical response... (Enter to send, Shift+Enter for newline)'
              }
              rows={2}
              disabled={isLoading}
              aria-label="Candidate technical response input"
              className="w-full resize-none bg-transparent border-0 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none p-1.5 leading-relaxed max-h-32 disabled:opacity-60"
            />

            {/* Action Buttons: Stop or Send */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {isLoading ? (
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
            <span>
              Press <kbd className="px-1 py-0.5 rounded bg-brand-card border font-mono">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-brand-card border font-mono">Shift+Enter</kbd> for newline
            </span>
            <span className="font-mono">Turn: {messages.filter((m) => m.role === 'user').length}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
