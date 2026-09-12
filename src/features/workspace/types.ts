export type WorkspaceNodeId =
  | 'frontend'
  | 'ai-core'
  | 'backend'
  | 'database'
  | 'hirevium'
  | 'indra'
  | 'stackscout'
  | 'cinetrack';

export type WorkspaceCategory = 'layer' | 'project';

export interface WorkspaceMetric {
  label: string;
  value: string;
}

export interface WorkspaceItem {
  id: WorkspaceNodeId;
  title: string;
  subtitle: string;
  category: WorkspaceCategory;
  badge: string;
  icon: string;
  description: string;
  techStack: string[];
  metrics: WorkspaceMetric[];
  color: string;
  emissive: string;
  position: [number, number, number];
  targetCamera: [number, number, number];
  details: string[];
  actionLink?: string;
  actionLabel?: string;
}
