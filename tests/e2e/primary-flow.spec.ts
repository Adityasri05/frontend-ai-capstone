import { test, expect } from '@playwright/test';

test.describe('HIREVIUM AI Technical Interview Primary Flow (E2E)', () => {
  test('completes primary technical interview conversation turn with mocked AI stream', async ({
    page,
  }) => {
    // Intercept /api/chat with a deterministic mocked AI streaming response
    await page.route('**/api/chat', async (route) => {
      const mockStreamText = `0:"Hello! Welcome to your technical qualification interview."\n0:" Today we will evaluate your React 19 concurrent features and streaming architecture."\n`;

      await route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
        body: mockStreamText,
      });
    });

    // 1. Navigate to the interview route
    await page.goto('/interview');
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify initial page state and onboarding header
    await expect(
      page.getByText('HIREVIUM AI Technical Qualification', { exact: false })
    ).toBeVisible();

    // 3. Locate the candidate response textarea
    const textarea = page.getByPlaceholder(/Type your technical response/i);
    await expect(textarea).toBeVisible();

    // 4. Focus and type candidate response sequentially to ensure state binding
    await textarea.focus();
    await textarea.pressSequentially('I specialize in building streaming AI user interfaces with React 19.');

    // 5. Submit the response
    const sendButton = page.getByRole('button', { name: /Send technical answer/i });
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // 6. Verify that the assistant response message appears in the chat transcript
    await expect(
      page.getByText(/Hello! Welcome to your technical qualification interview/i)
    ).toBeVisible();
  });

  test('handles starter topic prompt click to initiate interview', async ({ page }) => {
    await page.route('**/api/chat', async (route) => {
      const mockStreamText = `0:"Analyzing your technical profile... You have strong experience in frontend engineering."\n`;
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        body: mockStreamText,
      });
    });

    await page.goto('/interview');
    await page.waitForLoadState('domcontentloaded');

    // Click starter topic pill
    const starterButton = page.getByRole('button', {
      name: /Analyze my strongest technical skills/i,
    });
    await expect(starterButton).toBeVisible();
    await starterButton.click();

    // Verify candidate message and assistant reply are rendered
    await expect(page.getByText('Analyze my strongest technical skills.')).toBeVisible();
    await expect(page.getByText(/Analyzing your technical profile/i)).toBeVisible();
  });
});
