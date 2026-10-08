# AI Route Abuse Test Plan & Results

This document records the empirical abuse testing performed on the AI streaming route (`POST /api/chat`).

---

## Abuse Test Execution Matrix

| Test ID | Test Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **TEST-01** | Empty request body (`{}`) | `HTTP 422` Validation Error (`"Payload must be an array of messages."`) | Returns `HTTP 422` with validation error message | **PASS** |
| **TEST-02** | Whitespace-only message (`"   \n\t   "`) | `HTTP 422` Validation Error (`"Message at index 0 has empty or non-string content."`) | Returns `HTTP 422` with empty content rejection | **PASS** |
| **TEST-03** | Normal technical interview question | `HTTP 200` Chunked streaming response with simulated or live Claude response | Returns `HTTP 200` with clean token stream | **PASS** |
| **TEST-04** | Maximum allowed input (4,000 characters) | `HTTP 200` Processed successfully within validation bounds | Returns `HTTP 200` and generates response | **PASS** |
| **TEST-05** | Oversized input (> 4,000 characters) | `HTTP 422` Rejection (`"Message at index 0 exceeds maximum character length (4000)."`) | Returns `HTTP 422` error response | **PASS** |
| **TEST-06** | Repeated rapid requests (> 10 req/min) | `HTTP 429` Rate Limit Exceeded with `Retry-After: 60` header | Returns `HTTP 429 Too Many Requests` | **PASS** |
| **TEST-07** | Invalid request structure (Non-JSON payload) | `HTTP 400 Bad Request` (`"Invalid JSON request body."`) | Returns `HTTP 400` with safe JSON error | **PASS** |
| **TEST-08** | Missing required fields (`[{"role": "user"}]` without `content`) | `HTTP 422` Rejection (`"Message at index 0 has empty or non-string content."`) | Returns `HTTP 422` error response | **PASS** |
| **TEST-09** | AI provider failure (`[SIMULATE:HTTP_500]`) | `HTTP 500` Safe user message without leaking stack traces or keys | Returns `HTTP 500` with user-safe message | **PASS** |
| **TEST-10** | Stream interruption (`[SIMULATE:MID_STREAM_FAIL]`) | Stream terminates with partial text and triggers UI error retry banner | UI catches stream drop and renders retry banner | **PASS** |
| **TEST-11** | Client cancellation (`AbortController.abort()`) | Server halts stream processing and abort signal propagates | Server terminates execution and closes response stream | **PASS** |

---

## Verification Summary
All 11 abuse test cases passed validation. The API route rejects malicious payloads before incurring model provider fees, caps input and token budgets, and fails gracefully during network disruptions.
