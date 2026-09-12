import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import WorkspaceView from '@/features/workspace/WorkspaceView';
import WorkspaceInfoPanel from '@/features/workspace/components/WorkspaceInfoPanel';
import WorkspaceFallback2D from '@/features/workspace/components/WorkspaceFallback2D';

// Mock dynamic import of 3D Canvas in unit test environment
vi.mock('@/features/workspace/3d/WorkspaceCanvas', () => {
  return {
    default: ({ selectedId, onSelect }: any) => (
      <div data-testid="mock-3d-canvas" role="region" aria-label="3D Interactive Canvas">
        <span>3D Scene Mock</span>
        <button type="button" onClick={() => onSelect('hirevium')}>
          Simulate Click 3D Object
        </button>
      </div>
    ),
  };
});

describe('Workspace 3D Digital Twin Component Tests', () => {
  it('renders workspace title, digital twin badge, and mode controls', () => {
    render(<WorkspaceView />);

    expect(
      screen.getByRole('heading', { level: 1, name: /AI Engineering Workspace/i })
    ).toBeInTheDocument();
    expect(screen.getByText('3D DIGITAL TWIN')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Switch to 2D Static Mode/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Enable reduced motion/i })
    ).toBeInTheDocument();
  });

  it('renders all accessible quick filter buttons for keyboard users', () => {
    render(<WorkspaceView />);

    const quickPills = screen.getByRole('region', {
      name: /Workspace Node Quick Selectors/i,
    });
    expect(quickPills).toBeInTheDocument();

    expect(within(quickPills).getByRole('button', { name: /HIREVIUM/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /Next.js 15 & React 19/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /AI \/ LLM Neural Inference/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /Node.js & Edge API/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /Vector Memory/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /INDRA AI/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /StackScout/i })).toBeInTheDocument();
    expect(within(quickPills).getByRole('button', { name: /CineTrack/i })).toBeInTheDocument();
  });

  it('selecting a node via keyboard pill updates the specifications info panel with full engineering metrics', async () => {
    const user = userEvent.setup();
    render(<WorkspaceView />);

    const quickPills = screen.getByRole('region', {
      name: /Workspace Node Quick Selectors/i,
    });
    const hireviumPill = within(quickPills).getByRole('button', { name: /HIREVIUM/i });
    await user.click(hireviumPill);

    // Verify information panel updates
    const infoPanel = screen.getByRole('complementary', {
      name: /Selected Workspace Node Specifications/i,
    });
    expect(infoPanel).toBeInTheDocument();

    expect(
      within(infoPanel).getByRole('heading', { level: 2, name: /HIREVIUM — AI Hiring Intelligence OS/i })
    ).toBeInTheDocument();
    expect(within(infoPanel).getByText(/FLAGSHIP CAPSTONE/i)).toBeInTheDocument();
    expect(within(infoPanel).getByText(/5 Competency Axes/i)).toBeInTheDocument();
    expect(within(infoPanel).getByText(/Realtime SSE/i)).toBeInTheDocument();
    expect(
      within(infoPanel).getByRole('link', { name: /Launch HIREVIUM Chat/i })
    ).toHaveAttribute('href', '/interview');
  });

  it('allows toggling between 3D WebGL mode and 2D Static Digital Twin mode', async () => {
    const user = userEvent.setup();
    render(<WorkspaceView />);

    const modeToggleButton = screen.getByRole('button', { name: /Switch to 2D Static Mode/i });
    await user.click(modeToggleButton);

    // Verify 2D Static Twin view is displayed
    expect(
      screen.getByRole('region', { name: /2D Static Architecture Digital Twin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/2D Static Twin Mode \(Low Power \/ High Accessibility\)/i)
    ).toBeInTheDocument();
  });

  it('allows deselecting and resetting view using the Reset Selection button', async () => {
    const user = userEvent.setup();
    render(<WorkspaceView />);

    const quickPills = screen.getByRole('region', {
      name: /Workspace Node Quick Selectors/i,
    });
    // Select node
    await user.click(within(quickPills).getByRole('button', { name: /INDRA AI/i }));
    expect(
      screen.getByRole('heading', { level: 2, name: /INDRA AI — Multimodal Agent System/i })
    ).toBeInTheDocument();

    // Click Reset Selection button
    const resetButton = screen.getByRole('button', { name: /Reset Selection/i });
    await user.click(resetButton);

    // Verify info panel returns to default state
    expect(
      screen.getByRole('heading', { level: 2, name: /Interactive 3D Digital Twin/i })
    ).toBeInTheDocument();
  });

  it('WorkspaceFallback2D renders interactive accessible cards for all architectural layers', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(<WorkspaceFallback2D selectedId={null} onSelect={handleSelect} />);

    const cardButton = screen.getByRole('button', {
      name: /Next.js 15 & React 19 Frontend Layer/i,
    });
    expect(cardButton).toBeInTheDocument();

    await user.click(cardButton);
    expect(handleSelect).toHaveBeenCalledWith('frontend');
  });

  it('WorkspaceInfoPanel correctly renders empty state with quick starter buttons when no item is selected', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleClose = vi.fn();

    render(
      <WorkspaceInfoPanel selectedId={null} onClose={handleClose} onSelect={handleSelect} />
    );

    const hireviumQuick = screen.getByRole('button', { name: /HIREVIUM OS/i });
    await user.click(hireviumQuick);
    expect(handleSelect).toHaveBeenCalledWith('hirevium');
  });
});
