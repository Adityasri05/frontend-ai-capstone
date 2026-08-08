import React from 'react';
import Link from 'next/link';
import { getHealthStatus } from '../../utils/health';

export const dynamic = 'force-dynamic';

export default async function HealthPage() {
  let health;
  let fetchError = null;

  try {
    health = await getHealthStatus();
  } catch (error: any) {
    fetchError = error.message || 'Failed to retrieve system health diagnostics.';
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-16">
      {/* Back home link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors mb-8"
      >
        <span>◀</span> Go Home
      </Link>

      <div className="bg-slate-950/60 border border-slate-900/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/5 via-transparent to-transparent -z-10" />

        <div className="text-center mb-6">
          <span className="text-3xl block mb-2" role="img" aria-label="Heartbeat monitor">🩺</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-100">
            System Diagnostics
          </h1>
          <p className="text-xs text-slate-500 mt-1">CineTrack health check monitor</p>
        </div>

        {fetchError ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-medium text-center">
            ⚠️ {fetchError}
          </div>
        ) : health ? (
          <div className="space-y-6">
            {/* Status Banner */}
            <div
              className={`p-4 rounded-2xl border text-center font-bold text-sm flex items-center justify-center gap-3 ${
                health.status === 'Healthy'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${health.status === 'Healthy' ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
              <span>Status: {health.status}</span>
            </div>

            {/* Metrics List */}
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-900">
                <span className="text-slate-500 font-bold uppercase tracking-wide">Application</span>
                <span className="text-slate-300 font-semibold">{health.application}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-900">
                <span className="text-slate-500 font-bold uppercase tracking-wide">Version</span>
                <span className="text-slate-300 font-mono font-semibold">{health.version}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-900">
                <span className="text-slate-500 font-bold uppercase tracking-wide">Environment</span>
                <span className="text-slate-300 font-mono font-semibold capitalize">{health.environment}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-900">
                <span className="text-slate-500 font-bold uppercase tracking-wide">API Endpoint Reachability</span>
                <span className={`font-semibold ${health.apiReachable ? 'text-green-400' : 'text-red-400'}`}>
                  {health.apiReachable ? 'Connected' : 'Offline'}
                </span>
              </div>
              {health.apiReachable && (
                <div className="flex justify-between items-center py-2.5 border-b border-slate-900">
                  <span className="text-slate-500 font-bold uppercase tracking-wide">API Latency</span>
                  <span className="text-slate-300 font-mono font-semibold">{health.apiResponseTimeMs} ms</span>
                </div>
              )}
              <div className="flex flex-col gap-1.5 py-2.5">
                <span className="text-slate-500 font-bold uppercase tracking-wide">Timestamp</span>
                <span className="text-slate-400 font-mono text-[10px] truncate" title={health.timestamp}>
                  {health.timestamp}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-8 pt-6 border-t border-slate-900 text-center">
          <Link
            href="/api/health"
            target="_blank"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
          >
            Inspect Raw JSON Response ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
