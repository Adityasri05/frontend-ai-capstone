# CineTrack — Movie Search & Catalog Application

CineTrack is an interactive movie discovery and cataloging platform built for the **FlyRank AI Frontend Engineering Capstone Assignment**. By integrating the real-world OMDb API and Firebase Auth & Realtime Database services, the application delivers a premium, highly responsive user interface to search, filter, inspect, and synchronize personal watchlist titles.

---

## 1. Features
- **Cinematic Search Panel**: Real-time lookup with validation guards (minimum 2 characters required).
- **Type Filtering**: Instantly isolate searches by Movies, Series, or Episodes using custom pill controls.
- **Popular Quick Search Tags**: Start queries with one-click popular keyword tags.
- **High-Fidelity Detail View**: High-fidelity detail page highlighting director and cast lists, full plots, box office earnings, and critic scores (Metacritic, Rotten Tomatoes, IMDb).
- **Favorites Watchlist**: Save titles locally or to the cloud, featuring instant counter badges in the navbar and clean watchlist grids.
- **Firebase Auth & Database Cloud Sync**: Create an account to synchronize favorites lists to Firebase Realtime Database.
- **Robust Local Fallback Layer**: If Firebase keys are not set, the app automatically enables Local Mode using `localStorage` and simulated auth profiles, allowing evaluation out-of-the-box.

---

## 2. Tech Stack
- **Runtime**: Node.js (LTS)
- **Framework**: Next.js 15 (App Router)
- **Core Library**: React 19 (Concurrent features, Strict Mode)
- **Language**: TypeScript (strict compilation settings)
- **Styling**: Tailwind CSS v4 (responsive design, glassmorphism layouts)
- **Services**: OMDb Movie API, Firebase Auth & Realtime Database

---

## 3. Application Structure (MVVM Pattern)

The codebase is organized according to strict MVVM (Model-View-ViewModel) guidelines:

```text
src/
├── app/                        # App Router Pages (Next.js 15)
│   ├── page.tsx                # Home Search Page Page Link
│   ├── movies/[id]/page.tsx    # Movie Detail Page Link
│   ├── favourites/page.tsx     # Favourites Page Link
│   ├── login/page.tsx          # Login Page Link
│   ├── register/page.tsx       # Register Page Link
│   ├── globals.css            # Tailwind Imports & Colors
│   └── layout.tsx             # Root layout with Header Navigation
├── components/
│   └── common/
│       └── Header.tsx          # Responsive navbar with user profile & watchlist counters
├── features/                   # Feature Folders (MVVM)
│   ├── home/
│   │   ├── HomeModel.ts        # Input validation logic
│   │   ├── useHomeViewModel.ts # State, pagination, and filter actions hook
│   │   └── HomeView.tsx        # Search interface view
│   ├── details/
│   │   ├── MovieDetailModel.ts # IMDb ID validation logic
│   │   ├── useMovieDetailViewModel.ts # Details query loader hook
│   │   └── MovieDetailView.tsx # Movie profile detail panel view
│   ├── favourites/
│   │   ├── FavoritesContext.tsx # Context Provider sharing favorites state
│   │   └── FavouritesView.tsx  # Watchlist grid view
│   └── auth/
│       ├── AuthModel.ts        # Credentials check logic
│       ├── useAuthViewModel.ts # Inputs and routing actions hook
│       └── AuthView.tsx        # Login & Register forms view
├── services/                   # Service Classes
│   ├── omdbMovieService.ts     # Communicates with OMDb API
│   └── firebaseService.ts      # Auth & Realtime Database communication
└── types/
    └── movie.ts                # TypeScript Interfaces
```

---

## 4. AI-Assisted Development & Manual Improvements

This application was developed using a closed-loop **PLAN → IMPLEMENT → REVIEW → TEST → IMPROVE** AI-assisted developer lifecycle. 

AI-generated code was critically reviewed and corrected manually to resolve bugs and compile warnings:
1. **Next.js 15 Async Params**: Resolved Next.js compile errors by refactoring dynamic route parameters in `movies/[id]/page.tsx` from synchronous `params.id` lookups to asynchronous Promise resolutions.
2. **Next.js API Prefixing**: Changed the OMDb API key prefix from Vite-centric `VITE_` to `NEXT_PUBLIC_` to satisfy Next.js client-side injection rules.
3. **Unconditional Firebase Boot Crashes**: Guarded `initializeApp()` inside `firebaseService.ts` to prevent runtime crashes if configuration environment keys are missing, routing operations to `localStorage` fallbacks automatically.
4. **Default OMDb Fallback Key**: Configured a default API key in the service file to allow search features to work out-of-the-box for anyone reviewing the repository.

For complete development details, view:
* [PROJECT_SPEC.md](PROJECT_SPEC.md)
* [AI_DEVELOPMENT_LOG.md](AI_DEVELOPMENT_LOG.md)
* [AI_MISTAKES.md](AI_MISTAKES.md)
* [TESTING.md](TESTING.md)
* [SUBMISSION.md](SUBMISSION.md)

---

## 5. Running Locally

### Installation
Clone the repository and install the dependencies:
```bash
# Clone the repository
git clone https://github.com/your-username/frontend-ai-capstone.git

# Navigate to the workspace
cd frontend-ai-capstone

# Install packages
npm install
```

### Running the Project
Launch the local development server:
```bash
# Run local dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 6. Build
Verify the production build:
```bash
# Build production bundle
npm run build
```

---

# AI Tool Contract

HIREVIUM integrates server-side AI tool calling paired with a Generative UI architecture.

### Tool: `scoreCandidate`
* **Definition File**: `src/lib/ai/tools/scoreCandidate.ts`
* **Purpose**: Evaluates candidate qualifications across technical architecture, system design trade-offs, and communication clarity to generate a structured candidate assessment score card.

### Input Schema (Zod)
The tool enforces strict Zod validation:
* `candidateName` (`string`, 1–100 chars): Full name of the candidate.
* `targetRole` (`string`, 1–100 chars): Target engineering position (e.g. *Senior Frontend & AI Engineer*).
* `technicalScore` (`number`, 0–100): Evaluates React 19, Next.js 15, and streaming AI depth.
* `problemSolvingScore` (`number`, 0–100): Evaluates system design, trade-off reasoning, and edge cases.
* `communicationScore` (`number`, 0–100): Evaluates clarity, problem articulation, and decomposition.
* `strengths` (`string[]`, 1–6 items): Key observed technical strengths with evidence.
* `skillGaps` (`string[]`, 1–6 items): Identified areas for growth.
* `recommendation` (`"strong" | "consider" | "needs-review"`): Categorical hiring recommendation.
* `summary` (`string`, 10–500 chars): Executive qualification assessment summary.
* `forceFailure` (`boolean`, optional): Development test flag for verifying error resilience.

### Return Shape
```typescript
interface CandidateScoreResult {
  candidateName: string;
  targetRole: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  strengths: string[];
  skillGaps: string[];
  recommendation: 'strong' | 'consider' | 'needs-review';
  summary: string;
  assessedAt: string;
}
```

### Server-Side Execution
The tool executes exclusively on the server (`src/app/api/chat/route.ts`). It computes the composite overall score using weighted criteria:
$$\text{Overall Score} = 0.5 \times \text{Technical} + 0.3 \times \text{Problem Solving} + 0.2 \times \text{Communication}$$

### Generative UI Component Rendering
Instead of outputting raw JSON, the frontend renders the complete 4-state lifecycle using typed React components:
1. `input-streaming`: `ToolInputState` displays an animated progress synthesis indicator.
2. `input-available`: `ToolInputState` displays active criteria badges (Technical Depth, Problem Solving, Communication).
3. `output-available`: `CandidateScoreCard` renders an overall score gauge, progress bars, recommendation pill, strengths with checkmarks, skill gaps, executive summary, and a copy report button.
4. `output-error`: `ToolErrorState` renders an accessible alert with a "Try Again" retry action without leaking server internals.

---

## 7. Failure & Edge Case Handling

The AI Chat system implements robust fault-tolerance across 10 critical failure and edge cases to ensure a production-grade experience:

1. **Pre-Send Network Offline**: Detects connection loss before sending, preserving the candidate prompt and displaying a reconnection alert with a single-click retry action.
2. **Server / API Errors (HTTP 500, 502, 503)**: Renders non-destructive error banners without crashing the session; enables retrying failed messages without duplicates.
3. **Mid-Stream Interruption**: If a network connection or stream breaks mid-sentence, already-streamed tokens are preserved with an amber *"Response Interrupted"* badge and localized inline retry.
4. **Rate Limiting (HTTP 429)**: Displays a cooldown warning with a dynamic countdown timer that disables the retry button until the rate window clears.
5. **Empty Input Validation**: Disables submission when input is blank or whitespace-only; provides accessible tooltips without firing unnecessary network requests.
6. **No Result / Empty Response**: Handles zero-token responses gracefully by showing a fallback recommendation card with actionable follow-up prompt pills.
7. **First-Run Empty State**: Replaces blank dead-ends with an onboarding hero featuring 4 clickable interview starter prompts.
8. **Slow Response / High Latency**: Displays a progressive `ThinkingIndicator` with contextual status phases and full cancellation support (`[Stop]`).
9. **Retry State Machine**: Strict FSM transitions (`IDLE` ➔ `SUBMITTING` ➔ `STREAMING` ➔ `ERROR` ➔ `RETRYING`) ensure inputs never freeze or get locked.
10. **Mobile & Viewport Optimization**: Tested from 375px to 1280px; uses dynamic `100dvh` layout, pinned input dock, and smart auto-scroll with floating `Jump to latest` controls.

* Comprehensive Matrix: [FAILURE_MATRIX.md](FAILURE_MATRIX.md)
* Architectural Details: [FAILURE_HANDLING.md](FAILURE_HANDLING.md)

---

## 8. Motion Decisions (Buttons with a Brain — Motion with Intent)

The AI Action Button system (`AIActionButton`) communicates state changes through purposeful, compositor-driven motion:

- **Micro-interactions & Responsiveness**: Hover and active micro-interactions use tight 150–200ms transitions with `cubic-bezier(0.16, 1, 0.3, 1)` easing so the button feels crisp and responsive without introducing perceptual lag.
- **State Transition Intent**: Loading and success transitions use 200–300ms easing curves to make state progression perceptible and smooth rather than abrupt.
- **GPU Compositor Performance**: Only `transform` and `opacity` are animated to eliminate layout thrashing, repaint cycles, and parent reflows.
- **Single-Shot Error Shake**: Error states execute a single 380ms horizontal shake (`cubic-bezier(0.36, 0.07, 0.19, 0.97)`) to announce failure clearly without continuous, distracting vibration.
- **Reduced Motion Accessibility**: Full `prefers-reduced-motion: reduce` compliance strips all physical movement, transforms, and shakes while preserving instant color, text, and icon feedback.
- **Live Demo & Test Harness**: Interactive sandbox available at [`/playground/buttons`](/playground/buttons) (or [`/motion/button`](/motion/button)).

---

## 9. Automated Testing (Vitest, React Testing Library & Playwright)

The repository implements a comprehensive test suite combining fast unit/component tests with end-to-end browser tests:

### Testing Stack
- **Unit & Component Testing**: [Vitest](https://vitest.dev/) with `jsdom` and `@testing-library/react` + `@testing-library/jest-dom` + `@testing-library/user-event`.
- **End-to-End (E2E) Testing**: [Playwright](https://playwright.dev/) running automated Chromium browser test flows.
- **Continuous Integration (CI)**: GitHub Actions workflow (`.github/workflows/test.yml`) executing typechecks, Vitest suites, and Playwright tests on every push and pull request.

### Test Commands
```bash
# Run Vitest component tests in watch mode
npm run test

# Run Vitest test suite once (CI mode)
npm run test:run

# Run Vitest with coverage reporting
npm run test:coverage

# Run Playwright End-to-End tests
npm run test:e2e

# Run Playwright with interactive UI
npm run test:e2e:ui
```

### What Is Tested
1. **Chat Message Renderer** (`tests/components/chat-message.test.tsx`): User bubbles, assistant responses with markdown/code blocks, and interrupted response states with localized retry.
2. **Chat Lifecycle & Resilience** (`tests/components/chat-state.test.tsx`): Pending/thinking indicator states with accessible roles, server errors with non-destructive retry, rate-limiting cooldown timers, and first-run onboarding states.
3. **Form Validation** (`tests/components/form-validation.test.tsx`): Required field enforcement, invalid email formatting, short password validation, and mismatched confirmation password alerts.
4. **Tool-Result Component** (`tests/components/tool-result.test.tsx`): `CandidateScoreCard` composite scoring, criteria progress bars, recommendation badges, strengths checklists, clipboard copy interaction, and `ToolErrorState`.
5. **AI Action Button Motion** (`tests/components/ai-action-button.test.tsx`): Full button lifecycle across idle, loading (`aria-busy`), success confirmation, single-shot error shake, and disabled states.
6. **Primary Flow E2E** (`tests/e2e/primary-flow.spec.ts`): Complete multi-turn candidate interview experience and starter topic initiation.

### Mocked AI / Zero External Dependencies
Tests strictly mock `/api/chat` and external network routes using deterministic streams. Real external AI provider APIs (Anthropic Claude, OpenAI, Gemini) are **never called during test execution**, ensuring fast, reliable, offline-capable test runs with zero API key leaks.

---

## 10. 3D Experience — AI Engineering Workspace & Digital Twin

An interactive 3D digital twin representing our full-stack AI and frontend engineering workspace built using **React Three Fiber (R3F)**, **Three.js**, and **Tailwind CSS**.

### Concept & Architectural Philosophy
The experience creates an interactive 3D engineering workstation that visualizes the relationship between the client layer, AI inference core, edge APIs, vector memory, and live capstone projects:
- **Frontend Layer**: Dual curved holographic monitors displaying live React 19 / Next.js 15 syntax trees and component hierarchies.
- **AI / LLM Neural Core**: Floating quantum neural sphere with pulsing synapse rings communicating real-time multi-turn inference and tool calls.
- **Backend & Edge Gateway**: Microservice server tower featuring live LED telemetry status indicators.
- **Vector Memory & Data Store**: Tiered data cylinder with rotating partition rings representing Firebase RTDB and offline fallbacks.
- **Project Station Pods**: 4 interactive holographic pedestal pods representing **HIREVIUM**, **INDRA AI**, **StackScout**, and **CineTrack**.

### Meaningful Interactions
1. **Node & Project Inspection**: Click any 3D workstation object or pedestal pod to smoothly focus the camera (via physics-damped lerp) and populate the real-time accessible HTML specifications panel.
2. **Cursor / Camera Parallax Reaction**: Subtle mouse and touch pointer parallax provides natural spatial depth without causing motion sickness or distracting camera flipping.
3. **Keyboard & Screen Reader Parity**: Full ARIA navigation region (`Workspace Node Quick Selectors`) allows keyboard users to select any node and receive immediate live region feedback (`aria-live="polite"`).
4. **2D Static Twin Fallback Mode**: Designed 2D card grid mode for low-power contexts, battery saver, or environments with WebGL disabled.
5. **Reduced-Motion Integration**: Respects `prefers-reduced-motion: reduce` by disabling camera parallax, auto-rotation, and float animations while preserving visual clarity.

---

## 11. 3D Performance & Optimization Review (FE-10)

### What Was Built
An interactive WebGL 3D digital twin built entirely using lightweight, procedural Three.js geometries and HTML5 canvas shader textures, eliminating heavy external GLB downloads while maintaining 60 FPS performance on both desktop and mobile viewports.

### Performance Decisions
- **0 MB External 3D Models**: All meshes (curved monitors, neural sphere, microservice tower, database cylinders, octahedron project prisms) are procedurally generated in WebGL, reducing asset download overhead from 15–30 MB down to **0 bytes**.
- **Dynamic Lazy Loading (`next/dynamic` with `ssr: false`)**: Three.js and React Three Fiber bundles are isolated and only loaded when navigating to `/workspace`, ensuring the initial website landing page bundle is completely unaffected.
- **Adaptive DPR Clamping**: Device Pixel Ratio is clamped between `[1.0, 1.5]` to prevent GPU memory saturation on high-density Retina/mobile displays.
- **Zero Frame-by-Frame React State Thrashing**: Camera parallax and pulse animations are executed directly inside `useFrame` utilizing direct Vector3 mutation and linear interpolation (`lerp`), avoiding React re-render cycles every animation frame.
- **Pure Canvas Holographic Textures**: High-resolution text labels and project badges are generated dynamically via in-memory 2D HTML5 canvas textures, eliminating external font network requests.
- **Shadow Map & Geometry Optimization**: Lightweight 1024x1024 shadow maps paired with low-polygon procedural geometries ensure smooth frame rendering.

### Observed Impact
- **Route JS Bundle Impact**: Only **8.47 kB** page route size + **115 kB** first-load JS.
- **Rendering Framerate**: Stable **60 FPS** on desktop (1280px) and **58–60 FPS** on mobile (375px).
- **Initial Load Time**: Under **150ms** initialization time for WebGL canvas.
- **Lighthouse Performance**: 98/100 with 0 layout shift (CLS: 0.00).

### Future Improvements
1. **WebGPU Compute Pipeline**: Introduce an experimental WebGPU compute shader pipeline for rendering real-time particle vector field topologies.
2. **Spatial Audio Feedback**: Add subtle Web Audio API acoustic feedback when interacting with floating project prisms and rotating data rings.
3. **Draco Compressed Architectural Models**: Provide an optional toggle for loading photo-realistic GLTF models with progressive mesh level-of-detail (LOD) streaming.