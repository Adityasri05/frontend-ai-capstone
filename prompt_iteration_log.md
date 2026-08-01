# Prompt Iteration Log

## Selected Task
The selected task is to build the **HIREVIUM Live Interview Workspace** component (`LiveInterviewWorkspace.tsx`) located in `src/app/dashboard/live-interview/components/`. This component is the primary user interface that candidates interact with during technical vetting assessments. It renders active questions, handles text response inputs, displays a countdown timer, validates minimum answer length constraints, and manages async submit transitions to the backend API.

This task is highly appropriate because it has a state-heavy structure, handles real-time timer intervals, requires input validation boundaries, connects to backend proxies, and must support strict accessibility guidelines (WCAG) to be production-grade.

---

## Naive Prompt
"build an interview simulator page for candidate"

### Representative Output
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
#### What Changed
No techniques used. This is a naive, single-sentence baseline prompt without role, context, or formatting constraints.
#### What Improved
A basic React component was created that has a simple text area and a submit alert handler.
#### Remaining Problems
The output is written in untyped JavaScript, contains no styling (Tailwind CSS), uses hardcoded values, and lacks any interactive timers, loading states, or accessibility attributes.

---

## Version 1

### Technique Used
Role Assignment

### Prompt
"As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidate."

### Representative Output
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
#### What Changed
Introduced the Senior Frontend AI Engineer role, setting professional standards and technical boundaries for the code.
#### What Improved
The code output transitioned from raw JavaScript to typed TypeScript (`.tsx`). It uses standard React state hooks (`useState`), declares a strong TypeScript data interface, and applies initial Tailwind CSS utility classes.
#### Remaining Problems
The component is disconnected from any project environment (HIREVIUM, FastAPI integration) and lacks user feedback states, timers, and submission verification controls.

---

## Version 2

### Technique Used
Context & Motivation

### Prompt
"As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy. The goal is to create a secure, responsive workspace that eliminates resume deception through live, adaptive questioning."

### Representative Output
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
      // Handle state updates...
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-6">
      {/* Form structure with error and loading states */}
    </div>
  );
}
```

### Reflection
#### What Changed
Added the HIREVIUM project context, connection proxy target (FastAPI backend), and the motivation (securing evaluations against resume deception).
#### What Improved
The component is now structured as a Next.js App Router Client Component (`'use client'`). It implements async fetch functions connecting to HIREVIUM's actual API endpoints, and manages states for API loading (`isSubmitting`) and network failure flags.
#### Remaining Problems
The API response data schema is still unstructured (causing potential JSON parsing errors), and the component lacks a countdown timer or a character count boundary check.

---

## Version 3

### Technique Used
Few-shot Examples

### Prompt
"As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy. The goal is to create a secure, responsive workspace that eliminates resume deception through live, adaptive questioning.
 
Here is an example of the API payload returned from the FastAPI endpoint:
```json
{
  "question_id": "q_024",
  "text": "What are React 19 Server Actions?",
  "difficulty": "advanced",
  "previous_grade": 88
}
```
Use this format to map the response schema into the component state."

### Representative Output
```tsx
interface APIQuestionResponse {
  question_id: string;
  text: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previous_grade: number;
}

// Inside the component:
const [activeQuestion, setActiveQuestion] = useState<APIQuestionResponse | null>(null);

const handleNextQuestion = (data: APIQuestionResponse) => {
  setActiveQuestion(data);
  setAnswer('');
};
```

### Reflection
#### What Changed
Included a concrete JSON payload example representing HIREVIUM's FastAPI endpoint response structure.
#### What Improved
The AI mapped the exact response schema to a typed TypeScript interface (`APIQuestionResponse`), ensuring parsing consistency. This prevents compilation errors when rendering dynamic content such as difficulty tiers and previous scores.
#### Remaining Problems
The layout parameters and key features (timer, character limitations) are still omitted, and the component does not include any screen-reader compatibility attributes.

---

## Version 4

### Technique Used
Output Structure

### Prompt
"As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy. The goal is to create a secure, responsive workspace that eliminates resume deception through live, adaptive questioning.
 
Example API payload:
```json
{
  "question_id": "q_024",
  "text": "What are React 19 Server Actions?",
  "difficulty": "advanced",
  "previous_grade": 88
}
```
 
Output requirements:
1. A single-file React component using Tailwind CSS styling.
2. Structured layout containing:
   - A header section with HIREVIUM branding and a 60-second countdown timer.
   - An active question box displaying the difficulty tier as a color-coded tag.
   - A text area with dynamic character counting (minimum 50 characters required).
   - Action buttons ("Submit Answer" and "Skip Question").
3. Zero inline styles; use Tailwind utility classes exclusively."

### Representative Output
```tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function LiveWorkspace() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [answer, setAnswer] = useState('');

  // Countdown timer hook
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <section className="w-full max-w-4xl bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Header with Timer */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-lg font-bold text-slate-200">HIREVIUM Live Workspace</h2>
        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold ${timeLeft < 15 ? 'text-red-400 bg-red-950/20' : 'text-slate-300 bg-slate-950/50'}`}>
          Time Left: {timeLeft}s
        </div>
      </div>
      
      {/* Text Area and counter */}
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
#### What Changed
Enforced layout structures, countdown hooks, character boundary parameters, and forbade the use of inline styles.
#### What Improved
The component includes a functioning count-down hook, a visual styling theme for low-time states (turning text red when `timeLeft < 15`), and a live character counter block.
#### Remaining Problems
The text area lacks associated HTML label elements, and the API request lacks safety states to handle network timeouts or browser navigation during submission.

---

## Version 5

### Technique Used
Step Decomposition

### Prompt
"As a Senior Frontend AI Engineer specializing in React 19, TypeScript, and modern UX design, build an interview simulator page for candidates in HIREVIUM, our AI-powered technical vetting platform. The frontend should connect to our FastAPI backend proxy.
 
Example API payload:
```json
{
  "question_id": "q_024",
  "text": "What are React 19 Server Actions?",
  "difficulty": "advanced",
  "previous_grade": 88
}
```
 
Output requirements:
1. React component using Tailwind CSS styling.
2. Layout must include: HIREVIUM header with 60-second timer, question box with difficulty tags, and a text area with a 50-character limit check.
3. Fully accessible: use semantic HTML, associated labels, and focus rings.
 
Run the task step-by-step:
- **Step 1**: Write a 3-sentence implementation plan detailing how you will structure local state, handle the timer interval, and validate character lengths.
- **Step 2**: Generate the TypeScript code matching the plan.
- **Step 3**: Identify potential edge cases (e.g., timer reaching 0, API network failure) and write handling logic.
- **Step 4**: Self-review the output against React 19 standards before presenting."

### Representative Output
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
#### What Changed
Decomposed the generation steps sequentially (Planning -> Code -> Edge Cases -> Quality Review).
#### What Improved
The component includes auto-submit logic when the countdown timer hits `0`, handles submission state locking cleanly via React 19's `useTransition`, provides validation blocks on input boundaries, and implements complete ARIA attributes (`role="timer"`, `aria-live`, `aria-label`).
#### Remaining Problems
The component is fully compliant and ready to build.

---

## Claude vs ChatGPT Comparison

| Metric | Claude (3.5 Sonnet / Claude Code) | ChatGPT (GPT-4o) |
| :--- | :--- | :--- |
| **Tone** | Objective, technical, and direct. Avoids fluff. | Conversational, encouraging, verbose preambles. |
| **Accuracy** | Extremely high. Follows specific API JSON structures without omissions. | High, but occasionally uses placeholders for helper methods. |
| **Technical Detail** | Explains React 19 design changes and a11y properties. | Explains basic JS syntax, rarely dives into low-level runtime topics. |
| **Formatting** | Minimal, clean code blocks. | Uses descriptive Markdown layouts, emojis, and summary bullet points. |
| **Reasoning** | Strong logical flows for multi-step hooks and asynchronous state. | Good, but can occasionally draft redundant hooks. |
| **Creativity** | Focuses on standard utility patterns and tokens. | Suggests alternative visual structures and color gradients. |
| **Consistency** | Adheres strictly to limitations and negative constraints. | Tends to forget negative constraints in longer conversation cycles. |
| **Failure Points** | Can produce overly dry descriptions if context is too narrow. | Often drops types or uses `any` under complex conditions. |
| **Best Use Cases** | Component engineering, strict API schema mappings, refactoring. | Code brainstorming, mockups, generic HTML/CSS drafting. |

---

## Final Prompt Template

Use the following reusable template to prompt any AI assistant for component implementation:

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

## Lessons Learned

- **Biggest Lesson**: Prompt quality determines code compilation quality. Vague baseline instructions force the AI to choose default patterns, leading to untyped structures, layout warnings, and missing event validators.
- **Most Effective Technique**: **Step Decomposition**. Instructing the model to write an implementation plan and identify edge cases prior to code rendering forces it to build proper error limits and async state locks.
- **Least Impactful Technique**: **Role Assignment (by itself)**. Setting a persona shifts the vocabulary of the AI, but fails to prevent logical bugs or integration mismatches without explicit JSON schemas and constraints.
- **Future Workflow**: I will implement this prompt ladder structure (Context, Few-Shot examples, and Step Decomposition) in all my future AI-assisted engineering sprints.
