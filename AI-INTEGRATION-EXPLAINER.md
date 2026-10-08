# AI Integration Explainer (`AI-INTEGRATION-EXPLAINER.md`)

This document details the exact AI capabilities, model choices, prompts, structured inputs/outputs, and failure resilience strategies across the application.

---

## 1. AI Capabilities Overview

The project incorporates two complementary AI surfaces:

1. **HackScout AI Decision Agent (`agent/hackscout_agent.py`):** An autonomous decision-support agent that evaluates live hackathon opportunities against candidate profile constraints (`agent-config/profile.json`), filters out hard disqualifications, scores feasibility deterministically, and formats prioritized reports.
2. **Streaming Portfolio AI Assistant (`/api/chat`):** A real-time conversational interface built with Vercel AI SDK and Gemini 2.5 Flash Lite that answers recruiter queries about case studies, architecture decisions, and code evidence.

---

## 2. Why AI Is Needed

- **For Opportunity Scouting:** Standard keyword search returns generic, expired, or ineligible hackathons. AI decision-support evaluates multi-dimensional synergy (connecting past projects like INDRA AI or StackScout to competition themes) and enforces lead-time feasibility.
- **For Portfolio Vetting:** Static portfolio pages require recruiters to manually read documents. Streaming AI assistance provides grounded, verifiable answers with instant citation drawers.

---

## 3. Models & Provider Infrastructure

- **Primary Streaming Model:** `gemini-2.5-flash-lite` via `@ai-sdk/google` (Vercel AI SDK).
- **Agent Reasoning Engine:** Python 3.10+ rule-based decision controller + JSON profile match engine.

---

## 4. Prompts & System Instructions

### Streaming Assistant System Prompt (`/api/chat`)
```text
You are Aditya Srivastav's AI Engineering Assistant for his capstone portfolio.
Your role is to answer questions about Aditya's projects (HIREVIUM, INDRA AI, StackScout, ResQra, HackScout AI), tech stack (React 19, Next.js 15, FastAPI, Gemini, Claude), and engineering decisions.
Rules:
1. Always maintain a professional, grounded, technical tone. Never fabricate metrics or experience.
2. Highlight Aditya's actual positioning: Frontend AI Engineer / B.Tech CSE Student.
3. Keep responses concise, structured with Markdown, and provide direct file references where relevant.
```

---

## 5. Input & Output Schemas

### Request Schema (`/api/chat`)
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain how HackScout AI scores hackathons."
    }
  ]
}
```

### Structured Fit Score Output Schema (`agent/hackscout_agent.py`)
```json
{
  "opportunity_id": "lablab-gemini-multimodal-2026",
  "title": "Gemini AI Agents & Multimodal Hackathon",
  "total_score": 90,
  "status": "QUALIFIED",
  "lead_days": 24,
  "breakdown": {
    "skill_fit": 30,
    "eligibility_fit": 25,
    "deadline_feasibility": 20,
    "project_relevance": 10,
    "value_effort": 5
  }
}
```

---

## 6. Failure & Resilience Matrix

| Failure Mode | Detection Mechanism | User-Facing UI Result | Recovery / Fallback Action |
| :--- | :--- | :--- | :--- |
| **API Key Missing / Unconfigured** | Environment variable check at route entry (`process.env.GEMINI_API_KEY`). | Displays helpful local mode banner: `"Running in Local Offline Mode"`. | Serves grounded fallback responses from static case study data without crashing. |
| **Rate Limit Exceeded (429)** | In-memory IP rate limiter tracks > 20 requests/min. | HTTP 429 response with header `Retry-After: 60`. | UI displays: `"Rate limit exceeded. Please wait 60 seconds."` |
| **Model Timeout / Network Drop** | AbortController signal after 10,000ms. | Inline error alert component in chat drawer. | Provides an explicit `"Retry Request"` button with exponential backoff. |
| **Empty or Malformed Input** | Input length validation (`content.trim().length === 0`). | Submits button disabled; inline validation message. | Prevents API request invocation. |
| **Automated Registration Prompt** | String matching in `HackScoutAgent.run` (`"register me"`). | Returns safety block notice. | Directs user to official portal URLs for manual registration. |
