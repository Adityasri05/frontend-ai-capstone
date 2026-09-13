# From Workflow to Agent: Understanding MCP

**Author:** Aditya Srivastav  
**Focus:** Frontend AI Engineering & Practical GenAI Systems  
**Date:** September 2026  

---

## 1. Introduction

As a Computer Science student building frontend interfaces for AI-driven systems—such as HIREVIUM (AI hiring intelligence) and INDRA AI (grounded RAG search)—I frequently encounter confusion around terms like "AI workflow," "AI agent," and "Model Context Protocol (MCP)." 

Many tutorials treat any application with an LLM call as an "agent." In practice, there is a fundamental architectural distinction between a deterministic AI workflow and an autonomous agent. Understanding this boundary, along with standard protocols like MCP, is essential for building production-grade AI systems that remain reliable, debuggable, and secure.

---

## 2. Workflow vs. Agent

The distinction between a workflow and an agent is not about whether artificial intelligence is used. Rather, it is about **who controls the execution path and decides the next action**.

### What is a Workflow?
A workflow follows a predetermined sequence of steps. The software developer defines the execution graph, state transitions, and tool handoffs ahead of time. Even if every single step in the pipeline invokes an LLM to generate or analyze text, the execution order remains fixed. Step B only executes after Step A finishes, and the system cannot independently invent a Step C unless an engineer explicitly coded a conditional branch.

### What is an Agent?
An agent is a goal-driven system where an LLM dynamically determines its own execution path. Given a high-level objective and a collection of tools, the model evaluates its current state, chooses an action, executes a tool, observes the output, and decides whether to take another action or terminate.

| Characteristic | AI Workflow | AI Agent |
| :--- | :--- | :--- |
| **Control Flow** | Predetermined by developer code | Dynamically selected by the model |
| **Decision Making** | Fixed conditional logic | Model-driven based on context |
| **Tool Selection** | Hardcoded at specific steps | Dynamically invoked on demand |
| **Looping** | Predefined loops and iterations | Model decides whether to continue or stop |
| **Predictability** | High | Lower (stochastic decision paths) |
| **Autonomy** | Low (strictly bounded) | High (operates within sandbox) |
| **Debugging** | Straightforward (linear call stack) | Complex (non-deterministic traces) |

---

## 3. Classifying My FL-04 Pipeline

In my previous assignment, I built the **FL-04 Case Study Generation Pipeline**:  
`Research → Synthesis → Draft → Critique → Final Formatting`.

**Classification:** FL-04 is primarily a **deterministic AI workflow**, not an autonomous agent.

### Why?
Although each stage uses an LLM to reason over project notes, the control flow is rigid. Stage 1 always extracts facts into a research brief. Stage 2 always synthesizes those facts. Stage 3 always drafts the eight sections. The pipeline cannot independently recognize that Stage 1 lacked sufficient data and pause to query GitHub or search local files on its own. It cannot dynamically re-route itself or pick new tools; it simply executes fixed prompts sequentially.

---

## 4. What Model Context Protocol (MCP) Is

Large language models are stateless text engines isolated inside an inference container. Standard chat interfaces cannot inspect a local repository, query a private database, or trigger a deployment unless external data is manually pasted into the prompt.

**Model Context Protocol (MCP)** is an open, standardized protocol created to connect AI applications to external data sources and tools through a unified client-server interface. 

A common analogy is USB-C: just as USB-C replaced dozens of proprietary charging cables with one universal physical standard, MCP provides a standard JSON-RPC communication layer so any AI client can communicate with any MCP server without writing bespoke integrations for every database, API, or local filesystem.

---

## 5. MCP's Three Core Primitives

MCP standardizes interactions using three foundational primitives:

1. **Tools (Model-Controlled Actions):** Executable functions that an AI model can invoke to perform side effects or retrieve dynamic data (e.g., `read_file`, `query_database`, `execute_search`). The model decides when to call a tool and passes structured arguments.
2. **Resources (Application-Controlled Data):** Static or dynamic context exposed by the MCP server that the client or user can attach to the conversation (e.g., file contents, system logs, API schemas). Unlike tools, resources do not execute actions; they provide readable context.
3. **Prompts (Reusable User Workflows):** Predefined, parameterized prompt templates provided by the MCP server to guide models through domain-specific workflows (e.g., `/debug-issue` or `/summarize-pr`).

```text
┌─────────────────────────────────────────────────────────┐
│                      AI CLIENT                          │
└────────────▲─────────────────▲─────────────────▲────────┘
             │ Tools (Execute) │ Resources (Read)│ Prompts
┌────────────▼─────────────────▼─────────────────▼────────┐
│                      MCP SERVER                         │
│  ├── Local Filesystem   ├── Database (Postgres)         │
│  ├── GitHub API         ├── Cloud Infrastructure        │
└─────────────────────────────────────────────────────────┘
```

---

## 6. What MCP Enables vs. Plain Chat

In a plain chat window, asking *"Inspect my repository entry point and analyze latency in HIREVIUM"* requires the developer to manually find, copy, and paste code. If the file is 500 lines long, it consumes manual effort and context window space.

With an MCP filesystem or repository connector, the AI can:
1. Discover the directory hierarchy via `list_dir`.
2. Inspect the exact entry point file via `view_file`.
3. Locate backend route proxies via `grep_search`.

The developer simply states the goal, and the model uses standardized MCP tools to retrieve the exact ground truth directly from the source.

---

## 7. Concrete Upgrade: Turning FL-04 into an Agent

Simply connecting an MCP server to FL-04 does not make it an agent. It only gives the existing linear workflow access to files.

To turn FL-04 into an **Evidence-Driven Autonomous Portfolio Agent**, we replace the linear pipeline with a dynamic **Observation-Decision-Action Loop**:

```text
[Goal: Generate Verified HIREVIUM Case Study]
   │
   ▼
[1. Inspect Local Repository] ──(Tool: list_dir / view_file)──> Reads package.json & README
   │
   ▼
[2. Evaluate Evidence] ──(Decision)──> Missing client-server routing proof
   │
   ▼
[3. Targeted Search] ──(Tool: grep_search)──> Finds FastAPI proxy in /api/
   │
   ▼
[4. Inspect Code Truth] ──(Tool: view_file)──> Confirms Gemini 2.5 Flash Lite implementation
   │
   ▼
[5. Check Verification Checklist] ──(Decision)──> Are claims grounded in actual code?
   ├── If No ──> Query git commit logs for evidence
   └── If Yes ──> Generate final formatted case study
```

Here, the model autonomously decides *what to inspect*, *when evidence is insufficient*, and *when to stop*.

---

## 8. Trade-offs and Engineering Restraint

While autonomous agents provide flexibility, they introduce real engineering risks:
- **Non-Deterministic Costs:** An agent that enters a multi-step search loop can consume thousands of tokens unexpectedly.
- **Latency:** Multiple sequential tool calls add noticeable latency compared to a single deterministic prompt chain.
- **Security & Sandboxing:** Giving models file execution or write access requires strict human-in-the-loop permission gates.

**Conclusion:** For repetitive, high-volume tasks with known inputs, a structured AI workflow (like FL-04) is superior due to its predictability and low cost. Agents should be reserved for exploratory tasks where the required information path cannot be predicted in advance.
