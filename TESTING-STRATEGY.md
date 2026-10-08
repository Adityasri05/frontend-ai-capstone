# Testing Strategy & Automated Suite Architecture (`TESTING-STRATEGY.md`)

This document defines the testing architecture, frameworks, coverage targets, and execution strategies across the codebase.

---

## 1. Testing Frameworks & Tooling

| Testing Layer | Framework / Tool | Scope & Purpose |
| :--- | :--- | :--- |
| **Component & Unit Testing** | **Vitest 5.0 + React Testing Library** | Verifies React 19 component rendering, user interactions, form validation, accessibility attributes, and UI lifecycle states. |
| **Agent Evaluation Suite** | **Python `unittest` / `eval_runner.py`** | Automated regression testing of HackScout AI agent decisions, 5-tier fit scoring, eligibility filters, and safety guardrails. |
| **Build & Type Validation** | **TypeScript Compiler (`npx tsc --noEmit`)** | Static typechecking verifying interface props, route handlers, and state contracts. |

---

## 2. Test Suites Breakdown

### Web Component Test Suites (`tests/components/`)
1. `contact-form.test.tsx` (6 tests): Validates contact form inputs, accessible labels, submission states, and error messages.
2. `chat-message.test.tsx` (3 tests): Tests chat message rendering, markdown parsing, and role badges.
3. `chat-state.test.tsx` (4 tests): Tests onboarding starter topics, streaming indicators, and error resilience.
4. `ai-action-button.test.tsx` (5 tests): Verifies AI button state transitions (idle, loading, success, disabled).
5. `tool-result.test.tsx` (3 tests): Tests grounded tool result drawer rendering and citation tags.
6. `workspace-3d.test.tsx` (7 tests): Tests 3D workspace digital twin controls, mode toggles, and title badges.
7. `form-validation.test.tsx` (3 tests): Verifies email validation, short password alerts, and password match checks.

### Agent Pre-Build Evaluation Suite (`agent/eval_runner.py`)
1. `EVAL-01` (Standard Discovery): Validates discovery and ranking of live hackathons.
2. `EVAL-02` (Student Eligibility Filter): Confirms exclusion of PhD/corporate internal competitions.
3. `EVAL-03` (GenAI Technology Fit): Verifies stack synergy matching with agentic AI and RAG themes.
4. `EVAL-04` (Deadline Lead Time): Verifies lead-time score calculation (14–35 day sweet spot).
5. `EVAL-05` (Missing Data Handling): Confirms flagging of unverified external URLs without hallucinations.
6. `EVAL-06` (Disqualification Test): Verifies `Fit Score: 0/100 (DISQUALIFIED)` for PhD restricted programs.
7. `EVAL-07` (Safety Interception): Tests safety guardrail blocking automated registration requests.

---

## 3. Mocking & Isolation Strategy

- **API Request Isolation:** Component unit tests mock network `fetch` calls using MSW / Vitest vi.fn() to test error boundaries without hitting external rate limits.
- **Firebase Local Mode Fallback:** Auth and data hooks automatically fall back to local state when Firebase environment variables are unconfigured.
- **Separation of Concerns:** Real API routes (`/api/chat`) and Python agent scripts are tested via isolated runner scripts (`agent/eval_runner.py`).
