# FL-09 Demo Video Recording Setup Guide (FL-09)

This guide provides recommended hardware and software configurations for capturing the live 3–5 minute video demonstration of **HackScout AI**.

---

## 1. Preferred Recording Tools

| Software | Tool | Recommended Setup |
| :--- | :--- | :--- |
| **Option 1 (Recommended)** | **OBS Studio (Free & Open Source)** | Window Capture (VS Code / Terminal window) + Audio Input Capture (Mic). |
| **Option 2** | **Loom (Free Tier)** | Screen + Microphone recording (Hide camera bubble if preferred). |
| **Option 3** | **Windows Game Bar (`Win + Alt + R`)** | Native Windows screen recorder capturing active terminal window. |

---

## 2. Recommended OBS Settings

- **Video Resolution:** 1920x1080 (1080p) @ 30fps or 60fps
- **Audio Output:** Crisp noise-suppressed microphone input
- **Zoom Level:** Set Terminal / VS Code font size to 16px or 18px for clear text readability.
- **Window Capture:** Target `Windows Terminal` or `VS Code` specifically to avoid broadcasting full desktop notifications.

---

## 3. Pre-Recording Privacy & Environment Checks

1. **Disable Desktop Notifications:** Turn on Windows "Do Not Disturb" / Focus mode.
2. **Verify Secrets:** Ensure no `.env` files or raw API keys are visible on screen.
3. **Test Audio:** Record a 5-second test clip to verify microphone levels are audible without background static.
4. **Prepare Commands:** Open terminal in workspace root `d:\Hackathon\frontend-ai-capstone`.
