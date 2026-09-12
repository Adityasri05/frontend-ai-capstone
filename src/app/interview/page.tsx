import React from 'react';
import type { Metadata } from 'next';
import InterviewChat from '@/components/ai/InterviewChat';

export const metadata: Metadata = {
  title: 'AI Technical Interview | HIREVIUM',
  description:
    'Live streaming AI Technical Qualification Interview powered by Claude and Vercel AI SDK on HIREVIUM.',
};

export default function InterviewPage() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col bg-brand-bg">
      <InterviewChat />
    </main>
  );
}
