'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AIActionButton, AIButtonState } from '@/components/ai/AIActionButton';
import { Sparkles, ArrowLeft, Play, CheckCircle2, AlertTriangle, ShieldCheck, Zap, RefreshCw, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ButtonMotionPlaygroundPage() {
  // Primary Send Button State Machine
  const [sendState, setSendState] = useState<AIButtonState>('idle');
  // Secondary Generate Button State Machine
  const [generateState, setGenerateState] = useState<AIButtonState>('idle');
  // Simulated force mode: null = random (80/20), true = force success, false = force error
  const [forceOutcome, setForceOutcome] = useState<'random' | 'success' | 'error'>('random');
  // Global simulation flag for reduced motion
  const [simulatedReducedMotion, setSimulatedReducedMotion] = useState(false);
  // Manual disabled toggle
  const [isForceDisabled, setIsForceDisabled] = useState(false);
  // Stress test / Rapid click tracking
  const [clickCount, setClickCount] = useState(0);
  const [eventLogs, setEventLogs] = useState<Array<{ id: string; time: string; msg: string; type: 'info' | 'success' | 'error' }>>([]);

  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEventLogs((prev) => [{ id: Math.random().toString(), time, msg, type }, ...prev.slice(0, 7)]);
  };

  const handleExecuteSend = () => {
    setClickCount((c) => c + 1);

    // Prevent re-trigger if already loading
    if (sendState === 'loading') {
      addLog('Click ignored: request already in flight (debounce lock)', 'info');
      return;
    }

    // Clean up any existing auto-reset timers
    if (activeTimerRef.current) {
      clearTimeout(activeTimerRef.current);
    }

    addLog('Transition: IDLE ➔ LOADING (Async request initiated)', 'info');
    setSendState('loading');

    // Simulate async network latency between 1000ms - 2200ms
    const latency = Math.floor(Math.random() * 1200) + 1000;

    activeTimerRef.current = setTimeout(() => {
      // Determine outcome
      let isSuccess = true;
      if (forceOutcome === 'random') {
        isSuccess = Math.random() < 0.8; // 80% success, 20% error
      } else if (forceOutcome === 'error') {
        isSuccess = false;
      }

      if (isSuccess) {
        addLog(`Transition: LOADING ➔ SUCCESS (${latency}ms latency resolved)`, 'success');
        setSendState('success');

        // Auto-reset to IDLE after 1800ms
        activeTimerRef.current = setTimeout(() => {
          addLog('Transition: SUCCESS ➔ IDLE (Ready for next prompt)', 'info');
          setSendState('idle');
        }, 1800);
      } else {
        addLog(`Transition: LOADING ➔ ERROR (Single-shot shake triggered)`, 'error');
        setSendState('error');
      }
    }, latency);
  };

  const handleExecuteGenerate = () => {
    if (generateState === 'loading') return;
    setGenerateState('loading');
    setTimeout(() => {
      setGenerateState('success');
      setTimeout(() => {
        setGenerateState('idle');
      }, 1800);
    }, 1400);
  };

  const handleReset = () => {
    if (activeTimerRef.current) {
      clearTimeout(activeTimerRef.current);
    }
    setSendState('idle');
    setGenerateState('idle');
    addLog('State machine explicitly reset to IDLE', 'info');
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (activeTimerRef.current) {
        clearTimeout(activeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 space-y-10 max-w-5xl mx-auto">
      {/* Navigation & Header */}
      <header className="border-b border-slate-800 pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <Link
            href="/interview"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to AI Interview Chat
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/20">
            <Sparkles className="size-3" /> Buttons with a Brain — Motion with Intent
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Intelligent AI Action Button System
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
          An intentional, GPU-compositor-driven motion system built for AI chat interfaces. The button communicates its complete lifecycle through purposeful transitions rather than decorative flair, incorporating full keyboard accessibility, state-debounce guards, and <code className="text-indigo-400 font-mono text-xs">prefers-reduced-motion</code> compliance.
        </p>
      </header>

      {/* Main Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Canvas & Primary Buttons */}
        <section className="lg:col-span-7 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-0.5">
              <h2 className="text-base font-semibold text-white">Live Component Canvas</h2>
              <p className="text-xs text-slate-400">Click the buttons below or use the testing triggers</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">STATE:</span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  sendState === 'idle'
                    ? 'bg-slate-800 text-slate-300'
                    : sendState === 'loading'
                    ? 'bg-indigo-500/20 text-indigo-300 animate-pulse'
                    : sendState === 'success'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : sendState === 'error'
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isForceDisabled ? 'DISABLED' : sendState}
              </span>
            </div>
          </div>

          {/* Canvas Display Area */}
          <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-950/80 rounded-xl border border-slate-800/80 min-h-[200px] gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Primary AI Send Button */}
              <AIActionButton
                state={isForceDisabled ? 'disabled' : sendState}
                actionType="send"
                size="lg"
                onClick={handleExecuteSend}
                forceReducedMotion={simulatedReducedMotion}
              />

              {/* Secondary Related Action Button (Systemic Reusability) */}
              <AIActionButton
                state={isForceDisabled ? 'disabled' : generateState}
                actionType="generate"
                size="lg"
                onClick={handleExecuteGenerate}
                forceReducedMotion={simulatedReducedMotion}
              />
            </div>

            <p className="text-xs text-slate-500 text-center max-w-sm">
              Keyboard: <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] text-slate-300 font-mono">Tab</kbd> to focus, <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] text-slate-300 font-mono">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] text-slate-300 font-mono">Space</kbd> to activate.
            </p>
          </div>

          {/* Simulation Controls Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Simulation Controls</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setForceOutcome('random');
                  handleExecuteSend();
                }}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  forceOutcome === 'random'
                    ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Play className="size-3" /> Normal Test (80/20)
              </button>

              <button
                type="button"
                onClick={() => {
                  setForceOutcome('success');
                  handleExecuteSend();
                }}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  forceOutcome === 'success'
                    ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="size-3 text-emerald-400" /> Force Success
              </button>

              <button
                type="button"
                onClick={() => {
                  setForceOutcome('error');
                  handleExecuteSend();
                }}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  forceOutcome === 'error'
                    ? 'bg-rose-600/20 border-rose-500/40 text-rose-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <AlertTriangle className="size-3 text-rose-400" /> Force Error (Shake)
              </button>

              <button
                type="button"
                onClick={() => setIsForceDisabled(!isForceDisabled)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  isForceDisabled
                    ? 'bg-amber-600/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="size-3 text-amber-400" /> {isForceDisabled ? 'Enable Button' : 'Disable Button'}
              </button>

              <button
                type="button"
                onClick={() => setSimulatedReducedMotion(!simulatedReducedMotion)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  simulatedReducedMotion
                    ? 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {simulatedReducedMotion ? <EyeOff className="size-3 text-cyan-400" /> : <Eye className="size-3 text-cyan-400" />}
                {simulatedReducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 text-xs font-medium rounded-lg border bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="size-3" /> Reset to Idle
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Live Event Log & State Machine Details */}
        <section className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Live State Machine Audit Feed */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className="size-4 text-indigo-400" /> State Transition Log
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">Clicks: {clickCount}</span>
            </div>

            <div className="space-y-2 font-mono text-xs min-h-[180px]">
              {eventLogs.length === 0 ? (
                <div className="text-slate-500 text-xs py-8 text-center">
                  Click Send or a simulation trigger to observe state transitions.
                </div>
              ) : (
                eventLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-2 p-2 rounded-lg border ${
                      log.type === 'success'
                        ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                        : log.type === 'error'
                        ? 'bg-rose-950/40 border-rose-800/50 text-rose-300'
                        : 'bg-slate-950/40 border-slate-800/50 text-slate-300'
                    }`}
                  >
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    <span>{log.msg}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Motion System Guarantees Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Interruptibility & Safety Guarantees
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong className="text-slate-200">Rapid-Click Guard:</strong> Clicks while in <code className="text-indigo-400">loading</code> state are safely ignored.</li>
              <li><strong className="text-slate-200">No Stuck Transitions:</strong> Automatic timer teardown prevents lingering in success or error.</li>
              <li><strong className="text-slate-200">Layout Stability:</strong> Min-width anchors prevent neighboring elements from shifting.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Motion Design Specifications Table */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white">Motion Design Specifications</h2>
          <p className="text-sm text-slate-400 mt-1">
            Intentional animation values selected to communicate state changes efficiently without delaying the user.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Interaction Phase</th>
                <th className="py-3 px-4 font-semibold">Duration</th>
                <th className="py-3 px-4 font-semibold">Easing Curve</th>
                <th className="py-3 px-4 font-semibold">Animated Properties</th>
                <th className="py-3 px-4 font-semibold">Reduced Motion Fallback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Hover / Focus</td>
                <td className="py-3 px-4 font-mono text-indigo-400">150–200ms</td>
                <td className="py-3 px-4 font-mono text-slate-400">cubic-bezier(0.16, 1, 0.3, 1)</td>
                <td className="py-3 px-4"><code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">transform</code>, <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">box-shadow</code></td>
                <td className="py-3 px-4 text-slate-400">Static background color highlight only</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Active / Pressed</td>
                <td className="py-3 px-4 font-mono text-indigo-400">100ms</td>
                <td className="py-3 px-4 font-mono text-slate-400">ease-out</td>
                <td className="py-3 px-4"><code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">scale(0.98)</code>, <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">translateY(0)</code></td>
                <td className="py-3 px-4 text-slate-400">Instant brightness shift without scale transform</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Loading Ingestion</td>
                <td className="py-3 px-4 font-mono text-indigo-400">200ms</td>
                <td className="py-3 px-4 font-mono text-slate-400">ease-in-out</td>
                <td className="py-3 px-4"><code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">opacity</code>, <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">transform (spinner)</code></td>
                <td className="py-3 px-4 text-slate-400">Static loader glyph without continuous rotation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Success Confirmation</td>
                <td className="py-3 px-4 font-mono text-indigo-400">250–300ms</td>
                <td className="py-3 px-4 font-mono text-slate-400">cubic-bezier(0.34, 1.56, 0.64, 1)</td>
                <td className="py-3 px-4"><code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">scale(1.1)</code>, <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">background-color</code></td>
                <td className="py-3 px-4 text-slate-400">Instant emerald fill and static checkmark</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Single-Shot Error Shake</td>
                <td className="py-3 px-4 font-mono text-rose-400">380ms</td>
                <td className="py-3 px-4 font-mono text-slate-400">cubic-bezier(0.36, 0.07, 0.19, 0.97)</td>
                <td className="py-3 px-4"><code className="bg-slate-800 px-1.5 py-0.5 rounded text-rose-300">translateX(±4px)</code> (1 iteration)</td>
                <td className="py-3 px-4 text-slate-400">Immediate rose color & refresh icon without vibration</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
