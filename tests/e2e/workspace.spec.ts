import { test, expect } from '@playwright/test';

test.describe('3D AI Engineering Workspace & Digital Twin (E2E)', () => {
  test('navigates to workspace, explores 3D digital twin, selects nodes, and verifies specifications panel', async ({
    page,
  }) => {
    // 1. Navigate to 3D workspace page
    await page.goto('/workspace');
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify page heading and technical badge
    await expect(
      page.getByRole('heading', { level: 1, name: /AI Engineering Workspace/i })
    ).toBeVisible();
    await expect(page.getByText('3D DIGITAL TWIN', { exact: true })).toBeVisible();

    // 3. Locate quick selector region and click HIREVIUM project node
    const quickSelectors = page.getByRole('region', {
      name: /Workspace Node Quick Selectors/i,
    });
    await expect(quickSelectors).toBeVisible();

    const hireviumBtn = quickSelectors.getByRole('button', { name: /HIREVIUM/i });
    await expect(hireviumBtn).toBeVisible();
    await hireviumBtn.click();

    // 4. Verify specifications panel renders detailed metrics & action links
    const infoPanel = page.getByRole('complementary', {
      name: /Selected Workspace Node Specifications/i,
    });
    await expect(infoPanel).toBeVisible();
    await expect(
      infoPanel.getByRole('heading', { level: 2, name: /HIREVIUM/i })
    ).toBeVisible();
    await expect(infoPanel.getByText(/FLAGSHIP CAPSTONE/i)).toBeVisible();
    await expect(infoPanel.getByText(/5 Competency Axes/i)).toBeVisible();
    await expect(
      infoPanel.getByRole('link', { name: /Launch HIREVIUM Chat/i })
    ).toBeVisible();

    // 5. Test 2D Static Digital Twin Mode fallback toggle
    const modeToggleBtn = page.getByRole('button', { name: /Switch to 2D Static Mode/i });
    await expect(modeToggleBtn).toBeVisible();
    await modeToggleBtn.click();

    // Verify 2D Static Region is rendered
    const static2DRegion = page.getByRole('region', {
      name: /2D Static Architecture Digital Twin/i,
    });
    await expect(static2DRegion).toBeVisible();
    await expect(
      static2DRegion.getByText(/2D Static Twin Mode \(Low Power \/ High Accessibility\)/i)
    ).toBeVisible();

    // 6. Select node inside 2D grid
    const frontendCard = static2DRegion.getByRole('button', {
      name: /Next.js 15 & React 19 Frontend Layer/i,
    });
    await expect(frontendCard).toBeVisible();
    await frontendCard.click();

    // Verify info panel updates to frontend layer
    await expect(
      infoPanel.getByRole('heading', { level: 2, name: /Next.js 15 & React 19/i })
    ).toBeVisible();
    await expect(infoPanel.getByText(/CORE ARCHITECTURE/i)).toBeVisible();
  });

  test('header navigation bar includes accessible 3D Workspace link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const workspaceLink = page
      .getByRole('navigation', { name: /Main Navigation/i })
      .getByRole('link', { name: /3D Workspace/i });
    await expect(workspaceLink).toBeVisible();
    await workspaceLink.click();

    await page.waitForURL('**/workspace');
    await expect(
      page.getByRole('heading', { level: 1, name: /AI Engineering Workspace/i })
    ).toBeVisible();
  });
});
