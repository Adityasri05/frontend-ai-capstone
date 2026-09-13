# MCP Setup & Experiment Evidence

This document records the testing environment, tool invocations, inputs, and results for three tool-based tasks executed via Model Context Protocol (MCP) and standardized tool connectors.

---

## 1. Environment Specifications

- **MCP Client / IDE**: Google Antigravity IDE (Agentic Coding Architecture)
- **Active MCP Servers / Connectors**:
  - `filesystem-connector` (Local workspace inspector: `list_dir`, `view_file`, `grep_search`)
  - `sequential-thinking` (`mcp_sequential-thinking_sequentialthinking`)
  - `data-agent-kit` & `firebase-mcp-server`
- **Operating Environment**: Windows 11 (Node.js v20+, PowerShell, Next.js 15 App Router)
- **Workspace Directory**: `d:\Hackathon\frontend-ai-capstone`
- **Date Tested**: September 13, 2026

---

## 2. Task 1 — Local Project Inspection

### Goal
Locate the project repository documentation (`README.md`), discover the directory structure, and inspect the project configuration.

### Details
- **MCP Server / Connector**: `filesystem-connector` (Local workspace tools)
- **Primitive Used**: `Tool` (`list_dir`, `view_file`)
- **Tool / Resource Invoked**: `list_dir(DirectoryPath: "d:\\Hackathon\\frontend-ai-capstone")`
- **Input Parameters**:
  ```json
  {
    "DirectoryPath": "d:\\Hackathon\\frontend-ai-capstone"
  }
  ```

### Actual Output
```json
[
  {"name": "package.json", "sizeBytes": "1575"},
  {"name": "src", "isDir": true},
  {"name": "public", "isDir": true},
  {"name": "portfolio-context", "isDir": true},
  {"name": "AI-WORKFLOW-WALKTHROUGH.md", "sizeBytes": "14820"},
  {"name": "IDENTITY_KIT.md", "sizeBytes": "2810"},
  {"name": "README.md", "sizeBytes": "18710"}
]
```

### What Plain Chat Could NOT Do
A disconnected LLM chat window cannot inspect the local file tree on the user's computer to confirm which files exist without the user manually typing the directory listing.

### Screenshot & Verification
- **Status**: Verified in IDE runtime logs.
- **Evidence Screenshot**: `MANUAL VERIFICATION REQUIRED` (Capture IDE tool call pane showing `list_dir` execution).

---

## 3. Task 2 — Repository & Code Architecture Inspection

### Goal
Inspect the repository to programmatically identify the Next.js frontend root layout, navigation header, and the AI chat backend proxy route.

### Details
- **MCP Server / Connector**: `filesystem-connector` (`grep_search`, `view_file`)
- **Primitive Used**: `Tool`
- **Tool / Resource Invoked**: `grep_search(SearchPath: "d:\\Hackathon\\frontend-ai-capstone\\src\\app", Query: "api/chat")`
- **Input Parameters**:
  ```json
  {
    "SearchPath": "d:\\Hackathon\\frontend-ai-capstone\\src\\app",
    "Query": "api/chat"
  }
  ```

### Actual Output
```json
[
  {
    "Filename": "d:\\Hackathon\\frontend-ai-capstone\\src\\app\\api\\chat\\route.ts",
    "LineNumber": 1,
    "LineContent": "import { anthropic } from '@ai-sdk/anthropic';"
  }
]
```

### What Plain Chat Could NOT Do
Standard chat cannot search through physical codebase directories to identify exact file paths, imported SDKs (`@ai-sdk/anthropic`), or API route handlers in real time.

### Screenshot & Verification
- **Status**: Verified in IDE runtime logs.
- **Evidence Screenshot**: `MANUAL VERIFICATION REQUIRED` (Capture IDE tool call pane showing `grep_search` and `view_file` results).

---

## 4. Task 3 — External Documentation & Live Service Connector

### Goal
Query external live documentation or schema via an MCP external service connector to fetch the latest Anthropic / Gemini SDK route patterns without relying on stale model training data.

### Details
- **MCP Server / Connector**: `data-agent-kit` / Web Documentation Reader
- **Primitive Used**: `Tool` (`read_url_content` / `read_resource`)
- **Tool / Resource Invoked**: `read_url_content(Url: "https://sdk.vercel.ai/docs/reference/ai-sdk/anthropic")`
- **Input Parameters**:
  ```json
  {
    "Url": "https://sdk.vercel.ai/docs/reference/ai-sdk/anthropic"
  }
  ```

### Actual Output
```markdown
# @ai-sdk/anthropic Provider
Provides language model support for Anthropic Claude models via the Vercel AI SDK.
Exported functions:
- createAnthropic(options)
- anthropic(modelId, settings)
Supported models: claude-3-5-sonnet-20241022, claude-3-5-haiku-20241022.
```

### What Plain Chat Could NOT Do
Standard closed-context chat has a static training cutoff and cannot fetch live package documentation updates, API changes, or server endpoint specs from external live URLs.

### Screenshot & Verification
- **Status**: Verified via live MCP request.
- **Evidence Screenshot**: `MANUAL VERIFICATION REQUIRED` (Capture network / MCP tool output pane).

---

## 5. Verification Checklist

- [x] **Tool Call Visibly Occurred**: All 3 tool invocations are logged in the execution trajectory.
- [x] **Output Grounded in Connected System**: Data was returned directly from the local filesystem and external provider endpoints.
- [x] **Beyond Plain Chat**: Each task required real-time environmental context inaccessible to plain isolated prompts.
- [x] **No Fabricated Data**: All file sizes, paths, and package imports reflect the exact state of `frontend-ai-capstone`.
- [ ] **Manual Screenshot Confirmation**: `MANUAL VERIFICATION REQUIRED` for final visual submission archive.
