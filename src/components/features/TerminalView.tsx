'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

export default function TerminalView() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Aditya Srivastav AI OS [Version 1.0.0]", type: 'output' },
    { text: "Welcome to Aditya's interactive terminal. Type 'help' to get started.", type: 'output' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...history, { text: `visitor@adityasri:~$ ${inputValue}`, type: 'input' as const }];
    
    switch (command) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  about   - Brief overview of my engineering background', type: 'output' },
          { text: '  skills  - Display core technologies with competency levels', type: 'output' },
          { text: '  git     - Show recent commits from this project development', type: 'output' },
          { text: '  clear   - Clear the terminal screen', type: 'output' },
          { text: '  help    - Output this help menu', type: 'output' }
        );
        break;
      case 'about':
        newHistory.push(
          { 
            text: 'I am Aditya Srivastav, a 5th-semester B.Tech Computer Science student and Frontend AI Engineer. I focus on bridging React interfaces and FastAPI backends to deploy secure, responsive AI agent applications. I specialize in React 19, Next.js 15, FastAPI, and PyTorch.', 
            type: 'output' 
          }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: 'Core Technical Stack & Competency levels:', type: 'output' },
          { text: '  React 19 / Next.js 15  [██████████] 95%', type: 'output' },
          { text: '  TypeScript             [█████████░] 90%', type: 'output' },
          { text: '  Tailwind CSS           [██████████] 100%', type: 'output' },
          { text: '  FastAPI & Python       [████████░░] 80%', type: 'output' },
          { text: '  PyTorch & ML Basics    [████████░░] 80%', type: 'output' }
        );
        break;
      case 'git':
        newHistory.push(
          { text: 'commit 3a4f89d (HEAD -> main)', type: 'output' },
          { text: 'Author: Aditya Srivastav <aditya.sri@example.com>', type: 'output' },
          { text: 'Date:   Sat Aug 8 22:15:00 2026 +0530', type: 'output' },
          { text: '    feat(ui): implement glassmorphic recruiter candidate vetting dashboard with focus drawer', type: 'output' },
          { text: ' ', type: 'output' },
          { text: 'commit 1b9c28f', type: 'output' },
          { text: 'Author: Aditya Srivastav <aditya.sri@example.com>', type: 'output' },
          { text: 'Date:   Fri Aug 7 18:40:00 2026 +0530', type: 'output' },
          { text: '    feat(core): set up Next.js 15 layout with custom theme styles and metadata', type: 'output' },
          { text: ' ', type: 'output' },
          { text: 'commit 9d7a31e', type: 'output' },
          { text: 'Author: Aditya Srivastav <aditya.sri@example.com>', type: 'output' },
          { text: 'Date:   Wed Aug 5 14:10:00 2026 +0530', type: 'output' },
          { text: '    chore: initial repository configuration with strict TypeScript config', type: 'output' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      default:
        newHistory.push({ text: `Command not found: ${inputValue}. Type 'help' for available commands.`, type: 'error' });
    }

    setHistory(newHistory);
    setInputValue('');
  };

  return (
    <section 
      aria-label="Interactive Terminal Simulator"
      onClick={focusInput}
      className="w-full max-w-2xl bg-slate-950/90 border border-slate-800 rounded-xl p-4 shadow-2xl font-mono text-xs text-green-400 h-64 overflow-y-auto cursor-text transition-all duration-300 hover:border-slate-700/80 focus-within:ring-1 focus-within:ring-indigo-500/50"
    >
      <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-[10px] text-slate-500">aditya@terminal:~</span>
        <div className="w-10"></div>
      </div>

      <div className="space-y-1.5">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={
              line.type === 'input' 
                ? 'text-indigo-300' 
                : line.type === 'error' 
                  ? 'text-red-400' 
                  : 'text-slate-300'
            }
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-1 mt-2">
        <label htmlFor="terminal-input" className="text-indigo-400 shrink-0">
          visitor@adityasri:~$
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          className="w-full bg-transparent text-green-400 focus:outline-none caret-green-400 border-none p-0 m-0"
          aria-label="Terminal Command Prompt"
        />
      </form>
    </section>
  );
}
