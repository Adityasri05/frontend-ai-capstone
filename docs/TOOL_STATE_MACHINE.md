# HIREVIUM AI Tool State Machine (FE-07)

This document details the lifecycle state machine for server-side AI tool calling and Generative UI component rendering within **HIREVIUM — AI Hiring Intelligence Operating System**.

---

## 1. Visual State Machine Architecture

```text
       +-------------------------------------------------------------+
       | AI Interviewer Decides Candidate Assessment Is Warranted    |
       +-------------------------------------------------------------+
                                      │
                                      ▼
                      [ State 1: input-streaming ]
       "What is the AI currently preparing?"
       - Model initiates tool call: `scoreCandidate`
       - Animated progress bar & loader
       - Informs user that responses are being synthesized
                                      │
                                      ▼
                      [ State 2: input-available ]
       "What tool is being called and with what input?"
       - Zod schema validates incoming parameters:
         • Candidate Name & Target Role
         • Technical, Problem Solving, Communication criteria
       - Visual badge: `ANALYZING`
                                      │
                                      ▼
                      [ Server-side execute() ]
       - Server validates scores (0-100 range)
       - Calculates composite weighted score (50% Tech, 30% PS, 20% Comm)
       - Evaluates strengths & growth recommendations
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
              (Success Path)                      (Error Path)
                    ▼                                   ▼
        [ State 3: output-available ]       [ State 4: output-error ]
 "What did the tool return?"           "What went wrong and what can user do?"
 - Full `CandidateScoreCard.tsx`:      - `ToolErrorState.tsx`:
   • Overall Score Gauge (/100)          • Friendly, non-leaking notice
   • 3 Progress Bars                     • Preserves conversation history
   • Recommendation Pill Badge           • "Try Again" retry action button
   • Strengths & Growth lists
   • Executive Summary
   • Copy Report action
```

---

## 2. State-by-State Technical Specifications

### State 1: `input-streaming`
- **User Question Answered**: *"What is the AI currently preparing?"*
- **Component**: `ToolInputState.tsx` (`state="input-streaming"`)
- **Visual Presentation**:
  - Distinct container with indigo border and subtle backdrop blur.
  - Heading: *"Preparing Candidate Analysis"*.
  - Subtext: *"Synthesizing interview responses & code architecture..."*.
  - Status Badge: `STREAMING` with spinning loader (`prefers-reduced-motion` compliant).
  - Animated pulsing progress bar.
- **Accessibility**: `role="status"`, `aria-live="polite"`.

---

### State 2: `input-available`
- **User Question Answered**: *"What tool is being called and with what input?"*
- **Component**: `ToolInputState.tsx` (`state="input-available"`)
- **Visual Presentation**:
  - Heading: *"Candidate Assessment in Progress"*.
  - Target Role Tag: e.g. *"Target Role: Senior Frontend / AI Engineer"*.
  - 3 Criteria Dimension Cards:
    1. *Technical Depth* (React 19, Next.js, AI SDK)
    2. *Problem Solving* (Architecture & Trade-offs)
    3. *Communication* (Clarity & Decomposition)
  - Status Badge: `ANALYZING` with steady progress indicator.
- **Accessibility**: `role="status"`, announces assessment start.

---

### State 3: `output-available`
- **User Question Answered**: *"What did the tool return?"*
- **Component**: `CandidateScoreCard.tsx`
- **Visual Presentation**:
  - **Overall Score Callout**: Large numerical display (e.g. `89 / 100`) with weighted composite indicator.
  - **Category Breakdown Gauges**:
    - Technical Depth (50% weight): progress bar + score percentage.
    - Problem Solving (30% weight): progress bar + score percentage.
    - Communication (20% weight): progress bar + score percentage.
  - **Recommendation Badge**:
    - `Strong Candidate` (Emerald) / `Consider` (Amber) / `Needs Review` (Rose).
  - **Observed Strengths**: Bulleted list with green checkmark icons.
  - **Areas for Growth**: Bulleted list with amber warning icons.
  - **Executive Qualification Summary**: Callout card with recruiter-ready summary.
  - **Copy Report Button**: One-click clipboard copy formatted for candidate feedback emails.
- **Accessibility**: Semantic `<article>`, `aria-label="Candidate Qualification Score Card"`.

---

### State 4: `output-error`
- **User Question Answered**: *"What went wrong and what can the user do?"*
- **Component**: `ToolErrorState.tsx`
- **Visual Presentation**:
  - Red shield alert icon and `TOOL ERROR` badge.
  - Friendly explanation: *"Assessment Unavailable. We couldn't complete the candidate qualification assessment. Your interview responses and conversational history remain fully preserved and available."*
  - **Try Again Button**: Re-invokes the candidate scoring tool call immediately.
  - **Zero Leaks**: Stack traces, server internals, and API keys are completely stripped.
- **Accessibility**: `role="alert"`, `aria-live="assertive"`.

---

## 3. State Transition Smoothness & Accessibility

- Transitions between states occur within the same visual card container (`ToolCallCard.tsx`).
- Smooth 200ms morphing transitions eliminate abrupt layout jank or disappearing elements.
- Complies with `prefers-reduced-motion` to disable animations for users with motion sensitivity.
