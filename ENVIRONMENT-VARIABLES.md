# Environment Variables Reference

This document provides a complete security audit and configuration reference for all environment variables used by the application.

---

## Environment Variable Matrix

| Variable | Required | Used By | Purpose | Public / Server-Only | Security Status |
|---|---|---|---|---|---|
| `ANTHROPIC_API_KEY` | Optional (Demo fallback available) | `src/app/api/chat/route.ts` | Server-side API key for Anthropic Claude live streaming and tool calling in HIREVIUM AI interview. | **Server-Only** | ✅ Secure (Never exposed to browser) |
| `ANTHROPIC_MODEL` | No (Defaults to `claude-3-5-sonnet-20241022`) | `src/lib/ai/config.ts` | Configures model target for server-side AI requests. | **Server-Only** | ✅ Secure |
| `NEXT_PUBLIC_OMDB_API_KEY` | No (Demo fallback `849d44e5` included) | `src/services/omdbMovieService.ts` | Client-visible API key for querying OMDb movie search API. | **Public (Client)** | ℹ️ Intentionally public client query key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | No (Local storage fallback active) | `src/services/firebaseService.ts` | Firebase Web SDK configuration parameter. | **Public (Client)** | ℹ️ Client web SDK key |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | No | `src/services/firebaseService.ts` | Firebase Project identifier. | **Public (Client)** | ℹ️ Client project config |
| `NEXT_PUBLIC_GA_ID` | No | `src/components/analytics/Analytics.tsx` | Google Analytics 4 Measurement ID for telemetry. | **Public (Client)** | ℹ️ Client tracking ID |
| `CONTACT_EMAIL` | No (Defaults to `adityasri1205@gmail.com`) | `src/app/api/contact/route.ts` | Serverless dispatch target for portfolio contact submissions. | **Server-Only** | ✅ Secure |
| `CONTACT_WEBHOOK_URL` | No | `src/app/api/contact/route.ts` | Optional external webhook endpoint for form notifications. | **Server-Only** | ✅ Secure |

---

## Security Verification Summary

1. **No Client-Exposed AI Keys**: `ANTHROPIC_API_KEY` is exclusively read on the server within `src/app/api/chat/route.ts` via `process.env.ANTHROPIC_API_KEY`. It is **never** prefixed with `NEXT_PUBLIC_`.
2. **Local Development Fallback**: When `ANTHROPIC_API_KEY` is not present in `.env.local`, `src/app/api/chat/route.ts` runs a deterministic local simulated streaming engine, guaranteeing full UI testing without cost or key configuration requirements.
3. **Repository Protection**: `.gitignore` excludes `.env`, `.env.local`, `.env.production`, and `.env*.local` from Git commits.
