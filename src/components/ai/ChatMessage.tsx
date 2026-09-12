'use client';

import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';

export interface ChatMessageProps {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
  createdAt?: Date;
}

/**
 * Formats message content for safe rendering during active streaming.
 * Incomplete code blocks or unclosed tokens are handled gracefully without visual layout breakage.
 */
function renderSafeContent(text: string, isStreaming?: boolean) {
  // If text is empty and streaming, show nothing (handled by ThinkingIndicator)
  if (!text) return null;

  // Split by code blocks ```...```
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed break-words font-sans">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const language = lines[0]?.trim() || '';
          const code = (language ? lines.slice(1) : lines).join('\n');

          return (
            <div
              key={index}
              className="my-3 rounded-xl overflow-hidden border border-brand-border bg-slate-950 text-slate-100 font-mono text-xs shadow-sm"
            >
              {language && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="uppercase font-semibold tracking-wider">{language}</span>
                </div>
              )}
              <pre className="p-3.5 overflow-x-auto whitespace-pre font-mono text-xs leading-5">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // If an open ``` is currently being streamed without closing backticks
        if (part.startsWith('```') && !part.endsWith('```')) {
          const lines = part.slice(3).split('\n');
          const language = lines[0]?.trim() || '';
          const code = (language ? lines.slice(1) : lines).join('\n');

          return (
            <div
              key={index}
              className="my-3 rounded-xl overflow-hidden border border-brand-primary/40 bg-slate-950 text-slate-100 font-mono text-xs shadow-sm animate-pulse"
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-brand-primary font-semibold">
                <span>{language ? language.toUpperCase() : 'CODE'} (STREAMING...)</span>
              </div>
              <pre className="p-3.5 overflow-x-auto whitespace-pre font-mono text-xs leading-5">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Render normal text with bullet points, bolding, and inline code formatting
        const paragraphs = part.split('\n\n');

        return (
          <div key={index} className="space-y-2">
            {paragraphs.map((para, pIdx) => {
              if (!para.trim()) return null;

              // Check if paragraph is a bullet list or numbered list
              const lines = para.split('\n');
              const isList = lines.some((l) => /^\s*([*-]|\d+\.)\s+/.test(l));

              if (isList) {
                return (
                  <ul key={pIdx} className="list-disc list-outside pl-5 space-y-1 my-1.5">
                    {lines.map((line, lIdx) => {
                      const cleanLine = line.replace(/^\s*([*-]|\d+\.)\s+/, '');
                      return (
                        <li key={lIdx} className="text-sm">
                          {renderInlineFormatted(cleanLine)}
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              return (
                <p key={pIdx} className="text-sm">
                  {renderInlineFormatted(para)}
                </p>
              );
            })}
          </div>
        );
      })}

      {/* Streaming blinking cursor */}
      {isStreaming && (
        <span
          className="inline-block w-2 h-4 bg-brand-primary ml-1 rounded-sm animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Formats inline bold (**text**), inline code (`code`), and italics (*text*)
 */
function renderInlineFormatted(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((chunk, i) => {
    if (chunk.startsWith('`') && chunk.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-mono text-xs border border-brand-primary/20"
        >
          {chunk.slice(1, -1)}
        </code>
      );
    }
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    if (chunk.startsWith('*') && chunk.endsWith('*')) {
      return (
        <em key={i} className="italic text-foreground/90">
          {chunk.slice(1, -1)}
        </em>
      );
    }
    return chunk;
  });
}

export default function ChatMessage({
  id,
  role,
  content,
  isStreaming = false,
  createdAt,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isAssistant = role === 'assistant';
  const isUser = role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard permission is denied
    }
  };

  const formattedTime = createdAt
    ? new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(createdAt)
    : '';

  return (
    <article
      id={`message-${id}`}
      aria-label={`${isAssistant ? 'AI Interviewer' : 'Candidate'} message`}
      className={`group flex items-start gap-3.5 max-w-3xl my-3 transition-opacity duration-200 ${
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm transition-transform ${
          isAssistant
            ? 'bg-brand-primary/15 border border-brand-primary/30 text-brand-primary'
            : 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white border border-indigo-400/30'
        }`}
        aria-hidden="true"
      >
        {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Message Content Container */}
      <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[90%]">
        {/* Header (Role & Time) */}
        <div
          className={`flex items-center gap-2 text-[11px] font-mono tracking-wide ${
            isUser ? 'justify-end text-brand-muted' : 'justify-start text-brand-muted'
          }`}
        >
          <span className="font-semibold text-foreground/80 uppercase">
            {isAssistant ? 'AI Interviewer' : 'Candidate'}
          </span>
          {formattedTime && <span className="text-muted-foreground/60">{formattedTime}</span>}
          {isAssistant && isStreaming && (
            <span className="text-[10px] text-brand-primary font-bold animate-pulse">● LIVE</span>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`relative px-4 py-3.5 rounded-2xl shadow-sm border transition-all ${
            isUser
              ? 'bg-brand-primary text-white border-brand-primary rounded-tr-sm selection:bg-white/30'
              : 'bg-brand-card/90 text-foreground border-brand-border rounded-tl-sm backdrop-blur-sm'
          }`}
        >
          {renderSafeContent(content, isStreaming)}

          {/* Action Toolbar (Copy Button) */}
          <div
            className={`mt-2 pt-1.5 flex items-center justify-end gap-2 border-t text-[11px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity ${
              isUser ? 'border-white/20 text-white/80' : 'border-brand-border/60 text-muted-foreground'
            }`}
          >
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Message copied to clipboard' : 'Copy message to clipboard'}
              className="inline-flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                  <span className="text-[10px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" aria-hidden="true" />
                  <span className="text-[10px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
