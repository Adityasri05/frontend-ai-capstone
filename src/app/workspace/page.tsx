import type { Metadata } from 'next';
import WorkspaceView from '@/features/workspace/WorkspaceView';

export const metadata: Metadata = {
  title: '3D AI Engineering Workspace | Digital Twin',
  description:
    'Interactive 3D digital twin exploring our full-stack React 19 / Next.js 15 frontend architecture, AI neural core, API gateway, and capstone projects.',
};

export default function WorkspacePage() {
  return <WorkspaceView />;
}
