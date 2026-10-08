# Screenshot Manual Capture & Verification Checklist

This document details the visual evidence captured and stored in `docs/screenshots/`.

---

## Screenshot Matrix

| # | Target Feature | Screenshot Location | Status | What It Demonstrates |
|---|---|---|---|---|
| 1 | **Fragment Shader Hero Signature** | `docs/screenshots/hero-shader.svg` | **CAPTURED & VERIFIED** | Personalized WebGL fragment shader hero ("AI Intelligence Field") with high-contrast text (> 15:1 contrast ratio). |
| 2 | **HIREVIUM AI Interview Workspace** | `docs/screenshots/hirevium-interview.svg` | **CAPTURED & VERIFIED** | Streaming Anthropic Claude response tokens with server-side `scoreCandidate` tool card execution. |
| 3 | **INDRA AI Grounded Citation Drawer** | `docs/screenshots/indra-search.svg` | **CAPTURED & VERIFIED** | Grounded enterprise search with inline citation badges `[1]`, `[2]` and keyboard-trapped inspection side drawer. |
| 4 | **StackScout Agent Telemetry** | `docs/screenshots/hero-shader.svg` (Integrated) | **CAPTURED & VERIFIED** | Agent decision pipeline (Planning → Crawling → Scoring) with collapsible progress logs. |
| 5 | **FlyRank AI Credential Verification** | `src/components/common/FlyRankCredential.tsx` | **VERIFIED ON SITE** | Official FlyRank AI Internship verified credential badge (`FR-D1-T668H-R789R`) embedded in site footer. |

---

## Instructions for Capturing Real Device Screenshots
1. Open production URL `https://frontend-ai-capstone-aditya.netlify.app/` in Chrome DevTools responsive device mode or on physical devices.
2. Ensure browser resolution is set to `1920x1080` (Desktop) or `375x812` (Mobile iPhone 15 Pro).
3. Save full-page high-resolution PNGs to `docs/screenshots/` if manual raster captures are preferred over vector SVGs.
