# FL-07 Run Capture Guide — HackScout AI

This document provides exact instructions for recording the raw, unedited **~2-minute screen capture** required for the FL-07 Checkpoint 1 submission.

---

## 1. Recording Objective

The video must prove that **HackScout AI** executes an end-to-end, live opportunity discovery, filtering, scoring, and recommendation loop **without human mid-run editing or manual intervention**.

---

## 2. Before You Record (Pre-Flight Setup)

1. Open your terminal in the project root: `d:\Hackathon\frontend-ai-capstone`.
2. Ensure Python is accessible by running:
   ```bash
   python --version
   ```
3. Open `agent-config/profile.json` in your editor side panel so the evaluator can see the ground-truth profile being ingested.
4. Have the screen recorder ready (OBS Studio, Loom, or Windows Game Bar `Win + Alt + R`).

---

## 3. Exact Test Query to Enter

Run the following exact command in your terminal:

```bash
python agent/hackscout_agent.py "Find the best AI/GenAI hackathons for me that I could realistically participate in, and prioritize the top opportunities based on eligibility, deadline, technology fit, and project relevance."
```

Or run the automated 7-case evaluation suite:
```bash
python agent/eval_runner.py
```

---

## 4. What Must Be Visible in the Recording

- **Terminal Window**: Showing the command execution and live output stream.
- **Profile Source File**: `agent-config/profile.json` visible in the workspace.
- **Tool Execution**: Discovery, eligibility parsing, and deterministic scoring breakdown.
- **Final Output Table**: Prioritized opportunities, fit scores, verified official links, and next actions.
- **Clean Execution**: Zero runtime crashes or encoding errors.

---

## 5. What NOT to Do

- ❌ Do NOT pause the recording to edit intermediate text.
- ❌ Do NOT splice multiple video takes together.
- ❌ Do NOT fabricate or hardcode fake outputs.
- ❌ Do NOT hide the terminal or tool execution logs.

---

## 6. Recommended 2-Minute Timeline

| Timestamp | Action to Perform on Screen |
| :--- | :--- |
| **0:00 – 0:15** | Show `agent-config/profile.json` briefly to prove candidate profile ground truth. |
| **0:15 – 0:30** | Paste and run the test query: `python agent/hackscout_agent.py`. |
| **0:30 – 1:15** | Show the agent discovering opportunities, checking student eligibility, and calculating fit scores. |
| **1:15 – 1:45** | Highlight the top recommended opportunity, fit score breakdown, and official registration URL. |
| **1:45 – 2:00** | Run `python agent/eval_runner.py` to demonstrate 7/7 evaluation test cases passing. |

---

## 7. Post-Recording Submission Step

1. Save the video file as `hackscout-ai-mvp-run.mp4` (or upload to Loom/Google Drive).
2. Attach the video link or file to your FL-07 assignment submission alongside `FL-07-BUILD-LOG.md` and `FL-07-AGENT-DESIGN-SPEC.md`.
