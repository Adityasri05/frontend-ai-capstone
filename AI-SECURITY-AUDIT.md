# AI Security & Secret Protection Audit (`AI-SECURITY-AUDIT.md`)

This audit evaluates the AI API request pipeline, secret protection, server/client boundaries, and input validation to guarantee zero credential exposure.

---

## 1. Architectural Server / Client Boundary

All external AI provider API requests are routed strictly through server-side handlers:

```text
[ Browser / Client UI ] 
        │
        ▼ (Client HTTPS POST / Request Body: { messages })
[ Next.js API Route Handler: /api/chat ] ◄── Reads server-only process.env.GEMINI_API_KEY
        │
        ▼ (Server-to-Server Authorized Request)
[ Google Gemini API / External Provider ]
```

- **Client Bundle Safety:** No AI provider API keys (`GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`) are prefixed with `NEXT_PUBLIC_`. They are excluded from the client JavaScript bundle.
- **Verification:** Inspection of `.next/static/` build output confirms zero API key strings embedded in client assets.

---

## 2. Security Controls Matrix

| Security Layer | Implementation Detail | Source Reference | Defense Outcome |
| :--- | :--- | :--- | :--- |
| **Secret Isolation** | Server environment variable `GEMINI_API_KEY` stored in `.env.local` and Netlify Dashboard environment. | `.env.example` & `src/app/api/chat/route.ts` | Prevents public credential leakage on GitHub or browser devtools. |
| **IP Rate Limiting** | In-memory sliding window rate limiter capping requests at 20 requests per minute per IP address. | `src/app/api/chat/route.ts` | Prevents API cost amplification and denial-of-wallet attacks. |
| **Input Sanitization** | Trims whitespace, caps payload length at 1,000 characters, and validates JSON body structure. | `src/app/api/chat/route.ts` | Blocks buffer overflow and prompt injection payloads. |
| **Safety Interception Guardrail** | Keyword pattern matching in Python agent controller (`"register me"`, `"submit application"`). | `agent/hackscout_agent.py` | Prevents unauthorized autonomous external actions or credential submissions. |
| **Disqualification Filtering** | Hard filter check rejecting restricted tracks (PhD required, corporate internal). | `agent/hackscout_agent.py` | Prevents automated submission to ineligible programs. |

---

## 3. Residual Security Limitations & Mitigations

- **In-Memory Rate Limiting Scope:** In-memory IP tracking resets on serverless cold starts. *Mitigation:* Capable for current scale; Redis rate-limiting (Upstash) can be added if traffic scales.
- **Static Grounded Data:** HackScout AI relies on grounded active directories to eliminate unverified external web scraping attack vectors.
