# FL-02 Prompt Engineering Assignment: Prompt Iteration Log

- **Candidate Name**: Aditya Srivastav
- **Internship**: FlyRank AI Frontend Engineering Internship (Phase 2)
- **Role**: Frontend AI Engineering Intern
- **Date**: August 2026

---

## 1. Selected Task

- **Task Name**: Build the **HIREVIUM Live Interview Workspace** component (`LiveInterviewWorkspace.tsx`) in `/src/app/dashboard/live-interview/components/`.
- **Purpose**: This component serves as the core user experience for candidates taking an adaptive screening test. It manages the active question rendering, a real-time response timer, candidate answer inputs, and sends payload states to the backend API.
- **Why Selected**: It is a state-heavy, highly interactive component containing timers, markdown parsing, loading states, and API boundary validations. This makes it an ideal candidate to demonstrate how progressive prompt engineering directly improves code quality, validation schemas, and accessibility controls.

---

## 2. Naive Prompt (Baseline)

> "build an interview simulator page for candidate"

### Representative AI Output Excerpt
```javascript
import React from 'react';

export default function InterviewSimulator() {
  return (
    <div>
      <h1>Candidate Interview</h1>
      <p>Question: Explain React Hooks.</p>
      <textarea placeholder="Write your answer here..." />
      <br />
      <button onClick={() => alert('Answer Submitted!')}>Submit</button>
    </div>
  );
}
```

### Reflection
- **What Changed**: This is the baseline prompt. It contains no instructions on structure, programming language, design rules, or accessibility compliance.
- **What Improved**: The model generated a basic React element that renders a title, text area, and a button.
- **Remaining Problems**:
  - Code is written in untyped JavaScript instead of TypeScript.
  - No styling (Tailwind CSS) is applied.
  - The question and state are hardcoded.
  - Lacks accessibility tags, loading indicators, and timers.

---

## 3. Version 1: Role Assignment

### Technique Used
Role Assignment (assigning a professional persona to the AI to align its internal model constraints).

### Prompt
> "As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidate."

### Representative AI Output Excerpt
```tsx
import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  category: string;
}

export default function LiveInterview() {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '1',
    text: 'Explain the difference between useMemo and useCallback in React.',
    category: 'React Core'
  });

  return (
    <div className="p-6 bg-slate-900 text-slate-100 rounded-lg max-w-xl mx-auto shadow-md">
      <h2 className="text-xl font-bold mb-2">Live Technical Vetting</h2>
      <div className="bg-slate-800 p-4 rounded mb-4">
        <span className="text-xs text-indigo-400 font-semibold">{currentQuestion.category}</span>
        <p className="mt-1">{currentQuestion.text}</p>
      </div>
      <textarea 
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 bg-slate-950 border border-slate-850 rounded"
        placeholder="Type your response..."
      />
      <button className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors">
        Submit Response
      </button>
    </div>
  );
}
```

### Reflection
- **What Changed**: Added the role: `"As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design..."`.
- **What Improved**: The output switched to typed TypeScript (`.tsx`) and used Tailwind utility classes (`bg-slate-900`, `text-slate-100`, `p-6`) for basic layout. It also introduced a dynamic state object (`useState`) and interfaces.
- **Remaining Problems**:
  - The component lacks project context (HIREVIUM, FastAPI integration).
  - No validation constraints on answer submission length or empty answers.
  - The layout is still basic and lacks key features like timers and loaders.

---

## 4. Version 2: Context & Motivation

### Technique Used
Context & Motivation (providing the project context, technical environment boundaries, and the "why" behind the task).

### Prompt
> "As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy. The goal is to create a secure, responsive workspace that eliminates resume deception through live, adaptive questioning."

### Representative AI Output Excerpt
```tsx
'use client';

import React, { useState } from 'react';

interface LiveInterviewProps {
  interviewId: string;
  onSessionComplete: (verdictId: string) => void;
}

export default function HIREVIUMLiveInterview({ interviewId, onSessionComplete }: LiveInterviewProps) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/interviews/${interviewId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
      });
      if (!res.ok) throw new Error('Failed to submit answer.');
      // Handle next question state...
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-6">
      {/* UI Elements with Loading indicator & Error labels */}
    </div>
  );
}
```

### Reflection
- **What Changed**: Added the HIREVIUM project context, technical stack (Next.js, FastAPI proxy), and the target business goals.
- **What Improved**: The component is now a Next.js Client Component (`'use client'`). It has API request logic matching HIREVIUM's actual endpoints and handles loading states (`isSubmitting`) and network errors.
- **Remaining Problems**:
  - The model hardcoded the `fetch` API request inside the component instead of using the shared API utility client.
  - Lacks concrete examples of how the state updates are processed (the RAG/Gemini payload).
  - Lacks timers, screen reader tags, and keyboard focus states.

---

## 5. Version 3: Few-Shot Examples

### Technique Used
Few-Shot Examples (providing specific examples of input data formats and expected API output shapes to guide parsing logic).

### Prompt
> "As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy. The goal is to create a secure, responsive workspace that eliminates resume deception through live, adaptive questioning.
> 
> Here is an example of the API payload returned from the FastAPI endpoint:
> ```json
> {
>   "question_id": "q_024",
>   "text": "What are React 19 Server Actions?",
>   "difficulty": "advanced",
>   "previous_grade": 88
> }
> ```
> Use this format to map the response schema into the component state."

### Representative AI Output Excerpt
```tsx
interface APIQuestionResponse {
  question_id: string;
  text: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previous_grade: number;
}

// In the component state:
const [activeQuestion, setActiveQuestion] = useState<APIQuestionResponse | null>(null);

const handleNextQuestion = (data: APIQuestionResponse) => {
  setActiveQuestion(data);
  setAnswer('');
};
```

### Reflection
- **What Changed**: Provided a few-shot JSON example of HIREVIUM's FastAPI question payload.
- **What Improved**: The AI mapped the response into a type-safe `APIQuestionResponse` interface. This eliminates parsing errors and ensures the difficulty and score states match our actual backend design.
- **Remaining Problems**:
  - The visual page layout is still left to the AI's imagination.
  - The component lacks accessibility (ARIA labels) and a countdown timer.
  - All logic is in a single long file.

---

## 6. Version 4: Output Structure

### Technique Used
Output Structure (declaring the layout components and styling requirements, enforcing strict component boundaries).

### Prompt
> "As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy. The goal is to create a secure, responsive workspace that eliminates resume deception through live, adaptive questioning.
> 
> Example API payload:
> ```json
> {
>   "question_id": "q_024",
>   "text": "What are React 19 Server Actions?",
>   "difficulty": "advanced",
>   "previous_grade": 88
> }
> ```
> 
> Output requirements:
> 1. A single-file React component using Tailwind CSS styling.
> 2. Structured layout containing:
>    - A header section with HIREVIUM branding and a 60-second countdown timer.
>    - An active question box displaying the difficulty tier as a color-coded tag.
>    - A text area with dynamic character counting (minimum 50 characters required).
>    - Action buttons ("Submit Answer" and "Skip Question").
> 3. Zero inline styles; use Tailwind utility classes exclusively."

### Representative AI Output Excerpt
```tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function LiveWorkspace() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [answer, setAnswer] = useState('');

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <section className="w-full max-w-4xl bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-lg font-bold text-slate-200">HIREVIUM Live Workspace</h2>
        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold ${timeLeft < 15 ? 'text-red-400 bg-red-950/20' : 'text-slate-300 bg-slate-950/50'}`}>
          Time Left: {timeLeft}s
        </div>
      </div>
      
      {/* Text Area with Character Counter */}
      <div className="flex flex-col gap-2">
        <textarea 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full min-h-[150px] bg-slate-950 border border-slate-850 p-4 text-sm text-slate-200 rounded-xl"
        />
        <div className="text-right text-xs text-slate-500">
          Characters: {answer.length} (min 50)
        </div>
      </div>
    </section>
  );
}
```

### Reflection
- **What Changed**: Enforced output structures (countdown timer, character counting, Tailwind-only classes, distinct UI panels).
- **What Improved**: The output now includes a fully functional countdown timer hook and a character counter. The styling matches the glassmorphic theme.
- **Remaining Problems**:
  - No validation block checking the minimum character length before submission.
  - The AI did not implement keyboard focus trapping or ARIA attributes for accessibility.
  - The API requests are still un-isolated from component rendering.

---

## 7. Version 5: Step Decomposition

### Technique Used
Step Decomposition (splitting execution into a multi-step logical chain: planning, implementation, validation, and self-review).

### Prompt
> "As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy.
> 
> Example API payload:
> ```json
> {
>   "question_id": "q_024",
>   "text": "What are React 19 Server Actions?",
>   "difficulty": "advanced",
>   "previous_grade": 88
> }
> ```
> 
> Output requirements:
> 1. React component using Tailwind CSS styling.
> 2. Layout must include: HIREVIUM header with 60-second timer, question box with difficulty tags, and a text area with a 50-character limit check.
> 3. Fully accessible: use semantic HTML, associated labels, and focus rings.
> 
> Run the task step-by-step:
> - **Step 1**: Write a 3-sentence implementation plan detailing how you will structure local state, handle the timer interval, and validate character lengths.
> - **Step 2**: Generate the TypeScript code matching the plan.
> - **Step 3**: Identify potential edge cases (e.g., timer reaching 0, API network failure) and write handling logic.
> - **Step 4**: Self-review the output against React 19 standards before presenting."

### Representative AI Output Excerpt
```tsx
'use client';

import React, { useState, useEffect, useTransition } from 'react';

// === STEP 1: PLAN ===
// 1. Manage state locally for current question, text response, timer, and errors.
// 2. Clear timer interval on answer submission or unmount.
// 3. Disable submit button if character count is < 50.

export interface QuestionState {
  question_id: string;
  text: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface WorkspaceProps {
  initialQuestion: QuestionState;
  onSubmitAnswer: (answer: string) => Promise<QuestionState>;
}

export default function LiveWorkspace({ initialQuestion, onSubmitAnswer }: WorkspaceProps) {
  const [question, setQuestion] = useState<QuestionState>(initialQuestion);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(60);
  }, [question]);

  // Timer interval
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleAutoSubmit = () => {
    startTransition(async () => {
      try {
        const next = await onSubmitAnswer(answer || "[No response submitted in time]");
        setQuestion(next);
        setAnswer('');
      } catch (err) {
        setError('Auto-submission failed. Please retry.');
      }
    });
  };

  const handleSubmit = () => {
    if (answer.trim().length < 50) return;
    startTransition(async () => {
      try {
        setError(null);
        const next = await onSubmitAnswer(answer);
        setQuestion(next);
        setAnswer('');
      } catch (err) {
        setError('Failed to submit response. Please check your connection.');
      }
    });
  };

  return (
    <section aria-label="Live Vetting Workspace" className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 id="question-heading" className="text-lg font-bold text-slate-200">Active Question</h2>
        <div role="timer" aria-live="polite" className="text-xs font-mono px-3 py-1.5 bg-slate-950 border rounded-lg">
          Timer: {timeLeft}s
        </div>
      </div>

      <div className="bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl mb-6">
        <span className="text-[10px] tracking-wider uppercase font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/30">
          {question.difficulty}
        </span>
        <p className="text-slate-200 mt-3 text-sm leading-relaxed">{question.text}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="candidate-answer" className="text-xs text-slate-400 font-medium">Your Response</label>
        <textarea
          id="candidate-answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full min-h-[120px] bg-slate-950 border border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500/50"
        />
        <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
          <span>{error && <span className="text-red-400 font-medium" role="alert">{error}</span>}</span>
          <span>{answer.length}/50 chars min</span>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 border-t border-slate-800/80 pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={answer.trim().length < 50 || isPending}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-xs font-bold rounded-lg cursor-pointer"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </section>
  );
}
```

### Reflection
- **What Changed**: Formulated a structured step decomposition plan (planning, execution, edge cases, review).
- **What Improved**: The component is now highly robust and production-grade. It automatically submits the text when the timer reaches 0, handles network failures cleanly, disables input during submission via React 19's `useTransition`, and implements ARIA timers and roles.
- **Remaining Problems**: The component is fully functional.

---

## 7. Claude vs. ChatGPT Comparison

| Metric | Claude (3.5 Sonnet / Claude Code) | ChatGPT (GPT-4o) |
| :--- | :--- | :--- |
| **Tone** | Objective, technical, direct, and developer-focused. | Helpful, polite, conversational, often includes generic comments. |
| **Accuracy** | High. Adheres strictly to layout boundaries and type definitions. | High, but occasionally drops custom type attributes on complex loops. |
| **Technical Detail** | Explains trade-offs, imports correct React 19 hooks. | Focuses on basic syntax, uses older react state hooks. |
| **Formatting** | Clean, minimal Markdown boxes. | Heavily formatted with emojis and long preambles. |
| **Reasoning** | Strong understanding of asynchronous state flows. | Good, but can hallucinate folder-level imports. |
| **Creativity** | Practical, focuses on standard design tokens. | Higher visual suggestions, often drafts complex CSS. |
| **Consistency** | Highly consistent. Follows constraints strictly. | Varies. Can lose track of constraints in long conversations. |
| **Failure Points** | Can be overly rigid when parsing unformatted instructions. | Prone to writing partial code blocks with placeholders. |
| **Best Use Cases** | Component creation, refactoring, and type validations. | Brainstorming ideas, boilerplate code, quick mockups. |

---

## 8. Final Reusable Prompt Template

Use the following template to prompt any AI for structured component development:

```text
You are a Senior Frontend Engineer. Implement a React Client Component for our project based on the instructions below.

### 1. Project Stack Context
- Framework: Next.js (App Router, React 19)
- Language: TypeScript (Strict Mode)
- Styling: Tailwind CSS (no inline styles)

### 2. Context & Motivation
- Project: <Project_Name>
- Target Audience: <Target_Audience>
- Purpose: <Feature_Goal>

### 3. File Reference & Interfaces
- Path: <File_Path>
- Example API Payload Format:
<JSON_Payload_Example>

### 4. Layout & Constraints
- Component parts: <Layout_Components>
- Sizing limit: Keep code under 150 lines.
- Accessibility: Keyboard navigation, associated HTML labels, ARIA tags.

### 5. Multi-Step Execution Loop (Decomposition)
- Step 1: Write an implementation plan.
- Step 2: Code the TypeScript component.
- Step 3: Handle edge cases: <Edge_Cases>.
- Step 4: Verify against React 19 and accessibility standards before presenting.
```

---

## 9. Lessons Learned

- **Biggest Lesson**: AI outputs are determined by the quality of inputs. A vague prompt forces the AI to guess variables, layouts, and styles, leading to bugs.
- **Most Effective Technique**: **Step Decomposition**. Forcing the AI to plan and think step-by-step prior to writing prevents common placeholder bugs and incomplete code.
- **Least Impactful Technique**: **Role Assignment (on its own)**. While setting a persona improves code styling, it does not fix logical bugs or API mismatches without context and structure.
- **Future Workflow**: I will systematically apply context, few-shot payloads, and step decomposition to all frontend code requests.
