# Analytics Setup & Verification Guide

This guide details how to configure and verify free Google Analytics 4 (GA4) traffic monitoring on this Next.js portfolio.

---

## 1. Create the Free Google Analytics 4 Property
1. Navigate to [Google Analytics](https://analytics.google.com/) and sign in with your Google account.
2. Click **Admin** (gear icon in lower-left) > **Create** > **Property**.
3. Enter Property Name: `Aditya Srivastav Portfolio`.
4. Set your reporting time zone and currency, then click **Next**.
5. Select Industry: **Technology / Computers & Electronics**, Business Size: **Small**, and choose objectives (**Examine user behavior**, **Generate leads**). Click **Create**.

---

## 2. Set Up Web Data Stream
1. Choose platform: **Web**.
2. Enter Website URL: `https://aditya-srivastav.netlify.app` (or your custom domain).
3. Enter Stream Name: `Portfolio Web Traffic`.
4. Leave **Enhanced Measurement** enabled (tracks page views, scrolls, outbound clicks, site search, and form interactions).
5. Click **Create Stream**.

---

## 3. Obtain Your Measurement ID
1. Once created, copy the **Measurement ID** (formatted as `G-XXXXXXXXXX`).
2. Example placeholder: `G-XXXXXXXXXX`.

---

## 4. Add Environment Variable
Add your Measurement ID to your deployment environment:

### In Netlify Dashboard:
1. Go to **Site Configuration** > **Environment Variables**.
2. Click **Add a variable** > **Add a single variable**.
3. Key: `NEXT_PUBLIC_GA_ID`
4. Value: `G-XXXXXXXXXX` (Paste your real measurement ID).
5. Scope: **All deploy contexts** (Production, Deploy Previews, Branch deploys).
6. Click **Save** and trigger a **Clear cache and deploy site** rebuild.

### In Local Development:
Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 5. Verify Real-Time Traffic
1. Open `https://aditya-srivastav.netlify.app` in a private incognito window.
2. Navigate across pages:
   - Homepage (`/`)
   - Case Studies (`/projects/hirevium`, `/projects/indra-ai`, `/projects/stackscout`)
   - Interactive Interview Simulator (`/interview`)
   - Online Resume (`/resume`)
3. Return to Google Analytics dashboard > **Reports** > **Realtime**.
4. Confirm:
   - **Users in Last 30 Minutes**: `1+`
   - **Page views**: Showing active paths (`/`, `/projects/hirevium`, `/interview`)
   - **Device category**: Desktop or Mobile correctly recognized.
5. Capture a screenshot of the Realtime Overview dashboard and save as `launch/analytics-installed.png`.
