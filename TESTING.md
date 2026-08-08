# HIREVIUM AI-Assisted React Application — Testing & Verification Report

This report records the test cases, execution steps, verified edge cases, and results for Aditya Srivastav's AI-Assisted React Portfolio.

---

## 1. Features & Scenarios Tested

We performed verification checks across five core aspects of the application:

1. **Responsive Common Navigation**: Inspected desktop link styles, active page highlights, and mobile menu hamburger toggle responses.
2. **Terminal Command Simulator**: Verified CLI execution flow on custom string inputs (`help`, `about`, `skills`, `git`, `clear`).
3. **Hirevium Vetting Dashboard Filters**: Tested candidate list response when applying filters (vetting scores, technology tags, and persona dropdowns).
4. **React 19 Scores Sync Transition**: Inspected "Sync Scores" button state, loading skeleton indicators, and async transition durations.
5. **Candidate Twin Drawer (a11y)**: Audited focus trapping inside the drawer, keyboard Escape key dismissals, backdrop clicks, and scroll bar behaviors.
6. **Scannable Resume & Print Formatting**: Verified layout spacing on print previews and PDF exports.

---

## 2. Manual Test Cases & Execution Details

### Test Case 1: Terminal Simulator Commands
* **Objective**: Confirm that typing commands in the CLI returns accurate output blocks.
* **Execution Steps**:
  1. Click inside the terminal body to focus the prompt input.
  2. Type `help` and press Enter. Verify list of commands is returned.
  3. Type `about` and press Enter. Confirm biography text matches.
  4. Type `skills` and press Enter. Verify progress bars render correctly.
  5. Type `clear` and press Enter. Confirm history is reset and terminal is empty.
* **Result**: **PASS**. Output arrays update instantly; console container scrolls to the bottom on new text additions.

### Test Case 2: Candidate Filter Panel Logic
* **Objective**: Confirm that list outputs filter candidates accurately based on score ranges and tech checklists.
* **Execution Steps**:
  1. Navigate to `/projects/hirevium`.
  2. In the Filter Panel, check "Python" and "PyTorch". Click "Apply Filters".
  3. Verify that only "Aditya Srivastav" is displayed in the list (since he is the only mock candidate matching both skills).
  4. Change "Min Score" input to `90` and "Max Score" to `95`.
  5. Verify that only "Jane Smith" (score 92) is displayed in the list.
* **Result**: **PASS**. Candidates are filtered correctly with zero ESLint or console runtime warnings.

### Test Case 3: Sync Scores Transition & Skeleton Loading
* **Objective**: Verify that clicking "Sync Scores" displays skeleton placeholders during transition latency.
* **Execution Steps**:
  1. Click the "Sync Scores" button on `/projects/hirevium`.
  2. Confirm button text changes to "Syncing..." and displays disabled style.
  3. Verify that three pulse skeleton elements render immediately in place of the candidate cards.
  4. Await 700ms; verify skeletons disappear and the candidate list returns with updated score tags.
* **Result**: **PASS**. React 19 transition state tracks correctly; loading skeleton is visible during the delay.

### Test Case 4: Twin Drawer Focus Containment & Esc Close
* **Objective**: Verify that opening a details drawer traps focus and closes on Escape.
* **Execution Steps**:
  1. Click "View Twin" on a candidate card.
  2. Verify drawer slides in from the right. Confirm the close button has active focus.
  3. Press the Tab key repeatedly. Verify that focus loops only between the close button and the LinkedIn link within the drawer, and does not bleed out to the main page links behind it.
  4. Press the `Escape` key. Confirm drawer closes.
  5. Verify focus is returned to the "View Twin" button that triggered it.
* **Result**: **PASS**. Tab focus remains trapped in the modal dialog container, and focus is restored on dismissal.

### Test Case 5: Responsive Mobile Adjustments
* **Objective**: Verify that the application renders without visual bugs on small viewports.
* **Execution Steps**:
  1. Open Chrome Developer Tools; toggle device simulation to Mobile view.
  2. Verify Navbar links collapse into a hamburger menu.
  3. Check that the terminal CLI adjusts fits within the mobile screen.
  4. Confirm candidate card columns stack vertically on screens under 768px.
* **Result**: **PASS**. Spacing and margins scale down gracefully.

---

## 3. Edge Cases Audited

* **Zero Filter Results**:
  * *Test*: Set score range between `99` and `100` and check "Node.js" and "Python".
  * *Result*: Vetting dashboard displays a clean empty state card: *"No candidates matched the active search filters."*, preventing list crashes.
* **Score Boundary Validation**:
  * *Test*: Enter `110` in Max Score or `-5` in Min Score.
  * *Result*: FilterPanel validation error text displays: *"Scores must be between 0 and 100."* and blocks the "Apply Filters" button.
* **Print Layout Override**:
  * *Test*: Press Ctrl+P on the `/resume` page.
  * *Result*: Navigation bar, footer, and control buttons are hidden. The resume content adjusts margins to print cleanly as a single sheet.
