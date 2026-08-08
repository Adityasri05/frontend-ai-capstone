import React, { Suspense } from 'react';
import { promises as fs } from 'fs';
import path from 'path';

interface HealthData {
  status: string;
  application: string;
  version: string;
  environment: string;
  timestamp: string;
}

// Asynchronous server-side data retriever
async function getHealthData(): Promise<HealthData> {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const fileContents = await fs.readFile(packagePath, 'utf8');
    const pkg = JSON.parse(fileContents);

    return {
      status: 'healthy',
      application: pkg.name || 'frontend-ai-capstone',
      version: pkg.version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error('System diagnostic failure: package.json could not be parsed.');
  }
}

// Sub-component fetching and rendering diagnostic status
async function HealthStatusCard() {
  try {
    const data = await getHealthData();
    
    return (
      <div 
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl flex flex-col gap-4 font-mono text-xs text-slate-300"
        role="region"
        aria-label="System Health Diagnostic Report"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-slate-200 uppercase">Diagnostic Status</span>
          <span 
            className="text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10"
            role="status"
          >
            {data.status.toUpperCase()}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500">Application Name:</span>
            <span className="text-slate-100 font-medium">{data.application}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Engine Version:</span>
            <span className="text-slate-100">{data.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Deployment Env:</span>
            <span className="text-slate-100 uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900">
              {data.environment}
            </span>
          </div>
          <div className="flex justify-between flex-col sm:flex-row gap-1 sm:gap-4">
            <span className="text-slate-500">UTC Timestamp:</span>
            <span className="text-indigo-400 text-left sm:text-right break-all">{data.timestamp}</span>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div 
        className="w-full max-w-md bg-red-950/20 border border-red-500/30 rounded-xl p-6 shadow-xl text-xs font-mono text-slate-300"
        role="alert"
      >
        <span className="text-red-400 font-bold uppercase block border-b border-red-500/20 pb-3 mb-3">
          Status Check Fail
        </span>
        <p className="leading-relaxed">
          {error.message || 'System diagnostic checks failed during server-side package fetching.'}
        </p>
      </div>
    );
  }
}

export default function HealthPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
          Health Diagnostics
        </h1>
        <p className="text-xs text-slate-400">Real-time status check for local filesystems and environments</p>
      </div>
      
      <Suspense fallback={
        <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-xl animate-pulse flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="h-4 bg-slate-800 rounded w-1/3"></div>
            <div className="h-4 bg-slate-800 rounded w-12"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-800 rounded w-full"></div>
            <div className="h-3 bg-slate-800 rounded w-5/6"></div>
            <div className="h-3 bg-slate-800 rounded w-2/3"></div>
          </div>
        </div>
      }>
        <HealthStatusCard />
      </Suspense>
    </div>
  );
}
