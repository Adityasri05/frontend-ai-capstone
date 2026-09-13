# Launch & Analytics Verification Directory

This directory stores real production launch and live analytics verification screenshots.

## Files
- `analytics-installed.png`: Real-time dashboard screenshot demonstrating active analytics traffic from the production portfolio.

## How to Capture Real Analytics Screenshot:
1. Open Google Analytics (GA4) Realtime Overview dashboard (`analytics.google.com`).
2. Set the stream/property to your active portfolio tracking ID (configured via `NEXT_PUBLIC_GA_ID`).
3. Open `https://aditya-srivastav.netlify.app` in a new browser window and click through the case studies (`/projects/hirevium`, `/projects/indra-ai`, `/resume`, `/interview`).
4. In the Google Analytics Realtime Dashboard, verify that:
   - Active Users in Last 30 Minutes shows 1+.
   - Page path and screen class shows `/`, `/projects/hirevium`, etc.
   - User engagement events (`page_view`, `session_start`) are registered.
5. Capture a clean screenshot of the Realtime Overview dashboard.
6. Save the screenshot to this path as `launch/analytics-installed.png`.
