# Accessibility (A11Y) Test Report

This document records the comprehensive manual keyboard navigation, focus management, and WAI-ARIA validation results for the hand-built components (`Modal`, `Tabs`, and `Disclosure`).

---

## Accessibility Test Matrix

| Component | Keyboard Test | Focus Test | ARIA Test | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Modal Dialog** | Esc closes dialog; Tab cycles forward through interactive controls; Shift+Tab cycles backward | Initial focus moves into modal (or designated `initialFocusRef`); focus trapped inside modal; focus restored to trigger button on close | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` correctly linked | **PASS** |
| **Tabs** | ArrowRight / ArrowLeft navigate tabs with wrap-around; Home jumps to first tab; End jumps to last tab; Arrow keys prevent page scrolling | Roving `tabIndex` (`0` for active tab, `-1` for inactive tabs); single Tab press enters panel or skips tablist | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby` | **PASS** |
| **Disclosure** | Enter and Space activate/toggle trigger button natively | Focus remains on trigger button after expand/collapse toggle; sequential Tab enters panel content | Native `<button>` trigger; `aria-expanded` toggles dynamically; `aria-controls` links to content ID | **PASS** |

---

## Detailed Test Verification Log

### 1. Modal Dialog (`Modal.tsx`)
- **Keyboard Trapping Test**:
  - Pressed <kbd>Tab</kbd> on the last focusable element ("Save Changes" button) -> Focus automatically wrapped to the first focusable element ("Full Name" input).
  - Pressed <kbd>Shift + Tab</kbd> on the first focusable element ("Full Name" input) -> Focus automatically wrapped to the close button / last focusable element.
  - Verified edge case with zero focusable elements: Focus remains locked to the modal container (`tabIndex={-1}`) without throwing errors.
- **Escape Key Test**:
  - Pressed <kbd>Esc</kbd> while modal was open -> Modal immediately closed.
- **Focus Restoration Test**:
  - Focused "Open Standard Modal" trigger button and pressed <kbd>Enter</kbd> -> Modal opened, initial focus set to "Full Name" input.
  - Closed modal via <kbd>Esc</kbd> -> Focus returned directly to "Open Standard Modal" trigger button.
- **Body Scroll Lock**:
  - Verified `document.body.style.overflow = 'hidden'` is applied when modal opens and restored to original state when unmounted.

### 2. Tabs (`Tabs.tsx`)
- **Roving `tabIndex` Test**:
  - Inspected DOM: Active tab "Semantic HTML" had `tabIndex="0"`. Inactive tabs ("WAI-ARIA APG", "Keyboard Nav") had `tabIndex="-1"`.
  - Tabbing into the tablist focused "Semantic HTML". Next <kbd>Tab</kbd> press bypassed inactive tabs and focused the interactive button inside the tab panel.
- **Arrow Navigation Test**:
  - Focused "Semantic HTML" tab and pressed <kbd>ArrowRight</kbd> -> Focus & selection moved to "WAI-ARIA APG".
  - Pressed <kbd>ArrowRight</kbd> twice more -> Skipped disabled tab "Disabled Tab" and wrapped around to "Semantic HTML".
  - Pressed <kbd>Home</kbd> -> Jumped to first enabled tab. Pressed <kbd>End</kbd> -> Jumped to last enabled tab.
- **Page Scroll Prevention**:
  - Verified `e.preventDefault()` stops arrow key presses from scrolling the browser window.

### 3. Disclosure (`Disclosure.tsx`)
- **Native Activation Test**:
  - Focused disclosure header button using <kbd>Tab</kbd>.
  - Pressed <kbd>Space</kbd> and <kbd>Enter</kbd> -> Panel toggled between expanded and collapsed states smoothly.
- **State & Attribute Verification**:
  - When expanded: `aria-expanded="true"`, panel `id` matches `aria-controls` attribute on button.
  - When collapsed: `aria-expanded="false"`, panel content is unmounted/hidden.
  - Focus remains on trigger button throughout state transitions.

---

## Bugs Discovered and Resolved During Implementation

1. **Bug**: Modal initial focus was defaulting to the backdrop overlay if rendered synchronously before DOM elements mounted.
   - **Fix**: Wrapped initial focus call in `setTimeout(..., 0)` to guarantee full DOM node mounting before calling `.focus()`.
2. **Bug**: Arrow keys in Tabs scrolled the entire page while navigating between tabs.
   - **Fix**: Added `event.preventDefault()` inside `handleKeyDown` for `ArrowRight`, `ArrowLeft`, `Home`, and `End` keys.
3. **Bug**: Inactive tabs were focusable via <kbd>Tab</kbd> key press.
   - **Fix**: Applied roving `tabIndex={isActive ? 0 : -1}` to ensure only the currently selected tab is part of the document tab sequence.
