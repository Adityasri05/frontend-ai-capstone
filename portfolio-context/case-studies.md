# Case Studies Context — Aditya Srivastav

This document outlines the three primary engineering case studies featured in Aditya Srivastav's portfolio.

---

## 1. HIREVIUM — AI Hiring Intelligence Operating System

### The Problem
Traditional technical screening is either static (multiple-choice or rigid coding tests) or consumes valuable engineering manager sprint hours on unqualified candidates.

### What I Built & Why
- Built the live interview workspace in React 19 featuring an **Adaptive Difficulty Controller** that scales questions dynamically based on model evaluation feedback.
- Implemented real-time speech-to-text transcript capture and responsive timer loops.
- Routed Gemini 2.5 Flash Lite API calls through a secure FastAPI backend proxy to prevent exposing API keys in the client browser.

### Key Engineering Decisions
- Chose standard React state hooks (`useState`, `useEffect`) for single-view prototype scope, planned migration to Zustand for multi-user recruiter panels.
- Designed dense recruiter evaluation telemetry dashboards highlighting scoring breakdowns without visual noise.

---

## 2. INDRA AI — Institutional Knowledge Intelligence

### The Problem
Enterprise knowledge is scattered across fragmented documents (PDFs, wikis). Generic LLMs hallucinate ungrounded information, triggering trust deficits in production workflows.

### What I Built & Why
- Built the search dashboard and document intelligence drawer in Next.js 15.
- Structured verifiable RAG responses with numbered inline citation tags `[1]`, `[2]` linked directly to cited source documents.
- Integrated color-coded trust-score badges (green, yellow, red) to surface model certainty.
- Created a slide-out side drawer with keyboard focus trapping to view cited document chunks without navigating away from the search view.

### Key Engineering Decisions
- Enforced type safety across client-server boundaries using tRPC.
- Prioritized UI verifiability over opaque conversational chat bubbles.

---

## 3. StackScout — Autonomous Software Procurement & Decision Agent

### The Problem
Evaluating B2B software involves tedious manual reading of vendor matrices, pricing tiers, and docs, which slows engineering teams down.

### What I Built & Why
- Built the procurement tracking dashboard and comparison matrix interface.
- Designed progressive disclosure UI that displays high-level agent stages (*Planning*, *Crawling*, *Scoring*, *Synthesis*) while keeping raw scraper logs in an expandable drawer.
- Implemented resilient error states for crawl timeouts and rate limits with retry triggers.

### Key Engineering Decisions
- Implemented HTTP polling hooks for initial prototype simplicity, architected for Server-Sent Events (SSE) streaming in production.
- Built interactive multi-vendor comparison grids with dynamic score diffing.
