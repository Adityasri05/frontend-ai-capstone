# Phase 3 Build Notes — CineTrack

This document details the route architecture, component design decisions, styling tokens, health diagnostics, and verification logs for CineTrack.

---

## 1. Route Architecture & Structure

CineTrack uses Next.js 15 App Router directory layout:
- `/` -> `src/app/page.tsx`: Home search hub and results grid.
- `/favourites` -> `src/app/favourites/page.tsx`: Personal saved WATCHLIST list.
- `/movies/[id]` -> `src/app/movies/[id]/page.tsx`: Cinematic details profiles page.
- `/login` -> `src/app/login/page.tsx`: Authentication sign-in forms.
- `/register` -> `src/app/register/page.tsx`: Authentication registration forms.
- `/health` -> `src/app/health/page.tsx`: Diagnostic system metrics dashboard.
- `/api/health` -> `src/app/api/health/route.ts`: API route returning JSON system status.

---

## 2. Server vs Client Components

To optimize bundle sizes and SEO, CineTrack uses **Server Components by default** and isolates interactivity into client component trees:
- **Server Components (Default)**:
  - Layout (`layout.tsx`) handles root structural wrappers.
  - Page routers (`page.tsx`, `movies/[id]/page.tsx`, `health/page.tsx`) parse route param Promises, load models, and fetch server diagnostics before rendering.
- **Client Components (Isolated Interactivity)**:
  - `HomeView.tsx` handles dynamic keyword state, filters, and pagination.
  - `MovieDetailView.tsx` handles watchlist toggling actions.
  - `FavouritesView.tsx` handles removing watchlisted titles.
  - `AuthView.tsx` handles form states, validation triggers, and router transitions.
  - `Header.tsx` handles mobile burger menu triggers and dynamic counter badge updates.

---

## 3. Design System Tokens (Tailwind CSS v4)

Custom design system tokens are configured under `@theme` inside [globals.css](file:///d:/Hackathon/frontend-ai-capstone/src/app/globals.css):
- **Colors**:
  - `brand-bg`: `#030712` (deep dark theme background)
  - `brand-card`: `#090d16` (slate glassmorphic container backing)
  - `brand-primary`: `#4f46e5` (indigo branding accent)
  - `brand-primary-hover`: `#6366f1` (hover highlight)
  - `brand-text`: `#f8fafc` (light text overlay)
  - `brand-muted`: `#64748b` (grey subtext)
- **Radii**:
  - Standard sizes (`rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` equivalent brand tokens).
- **Shadows**:
  - `shadow-lg` and `shadow-2xl` custom atmospheric glows.

---

## 4. Health Check Diagnostics

The health check route (`/health`) retrieves system metrics:
- **Lightweight Reachability Ping**: Calls `searchMovies('Inception', 1)` to evaluate if the OMDb API is online.
- **Diagnostics Package**:
  - `status`: "Healthy" (or "Unhealthy" on failure).
  - `timestamp`: Current ISO string.
  - `application`: Name of the capstone application.
  - `version`: CineTrack package version (`0.1.0`).
  - `environment`: Runtime context (`process.env.NODE_ENV`).
  - `apiReachable`: Boolean check result.
  - `apiResponseTimeMs`: Latency roundtrip in milliseconds.

---

## 5. Environment Variables

CineTrack details public configuration templates inside [.env.example](file:///d:/Hackathon/frontend-ai-capstone/.env.example):
- `NEXT_PUBLIC_OMDB_API_KEY`: client-visible OMDb query authorization key.
- `NEXT_PUBLIC_FIREBASE_API_KEY` (and other `NEXT_PUBLIC_FIREBASE_*` parameters): Firebase client access variables.

*No secrets or credentials are hardcoded in the codebase, and all local `.env` keys are blocked by `.gitignore` rules.*

---

## 6. Verification Log

- **Build compilation**: Pass. Production bundle compiles without compile-time errors.
- **Viewport check**: Responsive grids adapt to 375px (mobile) and 1280px (widescreen) with no horizontal scroll overflows.
- **Accessibility verification**: Associated labels, aria-expanded triggers, tabIndex key binds, and semantic elements tested.
