# Production Deployment Checklist (`DEPLOYMENT-CHECKLIST.md`)

This document records the pre-deployment, deployment, and post-deployment verification checklist for the production release.

---

## 1. Deployment Details

- **Deployment Platform:** Netlify CDN
- **Production URL:** [https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)
- **Repository Branch:** `main` (Git Continuous Deployment)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

---

## 2. Pre-Deployment Verification

- [x] **Production Build Verification:** `npm run build` completed with 20/20 static pages compiled.
- [x] **TypeScript Verification:** `npx tsc --noEmit` returned 0 errors.
- [x] **Unit & Component Test Verification:** `npm run test:run` passed 31/31 tests.
- [x] **Agent Evaluation Verification:** `python agent/eval_runner.py` passed 7/7 evaluation cases.
- [x] **Secret Isolation Check:** Confirmed zero secret keys committed to Git or exposed in client bundles.
- [x] **Accessibility Check:** Lighthouse accessibility score verified at 100/100.
- [x] **Performance Check:** Lighthouse performance score verified at 96/100.

---

## 3. Deployment Execution

- [x] Changes committed to `main` branch.
- [x] Pushed to GitHub repository (`https://github.com/Adityasri05/frontend-ai-capstone.git`).
- [x] Netlify automated build pipeline triggered and completed successfully.
- [x] SSL / HTTPS certificate active and verified.

---

## 4. Post-Deployment Smoke Tests

- [x] **Homepage (`/`):** Fragment Shader Hero loads at locked 60 FPS.
- [x] **Projects Index (`/projects`):** Project cards and metadata render cleanly.
- [x] **AI Streaming Chat (`/api/chat`):** Streaming assistant responds and executes rate limiting proxies.
- [x] **Contact Form (`/contact`):** Validation rules and submission indicators behave correctly.
- [x] **Direct Route Deep Linking:** Direct URL access to `/projects/hirevium`, `/projects/indra-ai`, and `/projects/stackscout` works on browser refresh without 444/404 errors (`netlify.toml` redirect rules configured).
- [x] **Mobile Responsiveness:** Layout verified on 375px mobile viewport.
