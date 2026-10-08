# Operations & Rollback Procedure (`OPERATIONS-AND-ROLLBACK.md`)

This document defines operational protocols, monitoring scope, incident response, and rollback mechanisms for production releases.

---

## 1. Deployment Architecture & Deployment Process

- **Hosting Platform:** Netlify Global Edge CDN
- **Build Pipeline:** Automated Netlify Build triggered on `git push` to `main` branch.
- **Environment Configuration:** Server environment variables (`GEMINI_API_KEY`, `NODE_ENV`) configured in Netlify Site Settings.

---

## 2. Real Rollback Mechanism

In the event of a production regression or broken build:

### Option A: Platform Instant Rollback (Recommended)
1. Log into the Netlify Admin Dashboard (`app.netlify.com`).
2. Navigate to **Deploys** → **Deploy History**.
3. Select the last known-good successful deployment.
4. Click **Publish Deploy** to instantly revert edge CDN traffic to the selected build preview (Instant < 5-second rollback).

### Option B: Git Revert Rollback
```bash
# Identify previous stable commit
git log --oneline -n 5

# Create a revert commit
git revert HEAD -m "revert: rollback bad release"

# Push to trigger automated redeployment
git push origin main
```

---

## 3. Operations & Monitoring Scope

- **Logging & Diagnostics:** Platform execution monitoring is currently grounded in Netlify Serverless Function logs and Netlify Build logs.
- **Smoke Testing:** Manual post-deployment validation executed via [`DEPLOYMENT-CHECKLIST.md`](file:///d:/Hackathon/frontend-ai-capstone/DEPLOYMENT-CHECKLIST.md).

---

## 4. Incident Response Procedure

1. **Detect:** Identify issue via Netlify logs or manual verification failure.
2. **Reproduce:** Isolate failure scenario locally using `npm run dev` or `npm run build`.
3. **Identify Cause:** Determine whether issue is frontend asset, proxy API route, or environment variable.
4. **Rollback / Fix:** Trigger Netlify instant rollback or commit hotfix.
5. **Redeploy & Verify:** Push fix to `main` and execute post-deployment checklist.
6. **Document:** Record incident root cause in release logs.
