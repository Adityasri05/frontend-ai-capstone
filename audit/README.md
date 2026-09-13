# Lighthouse & Accessibility Audit Screenshots Directory

This directory stores real mobile Lighthouse and WAVE audit capture assets for the portfolio.

## Files
1. `lighthouse-before.png`: Baseline Lighthouse Mobile audit screenshot before performance and accessibility polish.
2. `lighthouse-after.png`: Post-fix Lighthouse Mobile audit screenshot demonstrating 90+ Performance, 95+ Accessibility, 100 Best Practices, and 100 SEO.

## How to Capture Real Lighthouse Screenshots:
1. Open Google Chrome in Incognito mode.
2. Navigate to the deployed production URL: `https://aditya-srivastav.netlify.app` (or your active Netlify deploy preview).
3. Open Chrome DevTools (`F12` or `Ctrl+Shift+I` on Windows / `Cmd+Option+I` on macOS).
4. Click on the **Lighthouse** tab.
5. Select:
   - **Mode**: Navigation (Default)
   - **Device**: Mobile
   - **Categories**: Performance, Accessibility, Best Practices, SEO
6. Click **Analyze page load**.
7. Once generated, capture a clear screenshot of the scores widget showing the URL, Mobile preset, and Category scores.
8. Save into this directory as `lighthouse-before.png` (or `lighthouse-after.png` for the post-optimization run).
