# WAI-ARIA Authoring Practices (APG) Behavioral Requirements

This document outlines the WAI-ARIA design patterns, roles, properties, states, keyboard interactions, and focus management requirements for the three components: Modal Dialog, Tabs, and Disclosure.

---

## 1. Modal Dialog Pattern (`role="dialog"`)

### W3C ARIA Reference
- Pattern: [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### Roles, States, and Properties
- **Role**: `role="dialog"` (or `role="alertdialog"` for urgent prompts).
- **`aria-modal="true"`**: Informs assistive technologies that elements outside the dialog are inert/hidden.
- **Accessible Name**:
  - `aria-labelledby="[header-id]"` referencing the dialog title element, OR
  - `aria-label="[Modal Title]"` if no visible title header exists.
- **Accessible Description**:
  - `aria-describedby="[description-id]"` referencing any descriptive message body.
- **Trigger Element**:
  - Native `<button>` with explicit accessible text.

### Focus Management & Keyboard Interaction
1. **Opening Focus**:
   - When opened, focus MUST move immediately inside the dialog.
   - Focus should default to the first focusable element inside the modal, or to the dialog container itself if no interactive elements exist.
2. **Focus Trapping (Focus Loop)**:
   - When Tab is pressed on the **last** focusable element in the dialog, focus MUST wrap around to the **first** focusable element inside the dialog.
   - When Shift + Tab is pressed on the **first** focusable element in the dialog, focus MUST wrap around to the **last** focusable element inside the dialog.
   - Focus MUST NOT escape the modal container to the underlying document body while the modal is open.
3. **Closing Focus (Focus Restoration)**:
   - When the dialog closes, focus MUST return to the trigger element that initiated the modal opening (or a logical fallback if the trigger element was removed).
4. **Keyboard Shortcuts**:
   - `Escape`: Closes the dialog immediately.
5. **Background Isolation**:
   - Page content behind the modal overlay should be non-interactive (e.g., `aria-hidden="true"` or `inert` on background containers, pointer events blocked on overlay).

---

## 2. Tabs Pattern (`role="tablist"`)

### W3C ARIA Reference
- Pattern: [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

### Roles, States, and Properties
- **Container**: `role="tablist"`
  - `aria-label` or `aria-labelledby` providing an accessible name for the tab set.
  - `aria-orientation="horizontal"` (default) or `"vertical"`.
- **Tab Triggers**: `<button role="tab">`
  - `aria-selected="true"` for the active tab; `"false"` for inactive tabs.
  - `aria-controls="[tabpanel-id]"` linking the tab to its corresponding panel ID.
  - `id="[tab-id]"` unique identifier.
  - Roving `tabIndex`:
    - Active tab has `tabIndex={0}`.
    - Inactive tabs have `tabIndex={-1}` so only the active tab is in the page tab sequence.
- **Tab Panels**: `<div role="tabpanel">`
  - `id="[tabpanel-id]"`.
  - `aria-labelledby="[tab-id]"` linking back to its controlling tab.
  - `tabIndex={0}` if the panel contains no focusable elements, allowing keyboard users to scroll/read the content.
  - `hidden` attribute or unmounted state when inactive.

### Keyboard Interaction
- `Tab`: Moves focus into the active tab in the tablist. Subsequent `Tab` press skips inactive tabs and moves focus directly into the active tabpanel (or next focusable page element).
- `Arrow Right` (Horizontal): Moves focus to the next tab. In automatic activation mode, also activates the next tab.
- `Arrow Left` (Horizontal): Moves focus to the previous tab. Wrap-around from first to last / last to first.
- `Home`: Moves focus to the first tab in the tablist.
- `End`: Moves focus to the last tab in the tablist.
- **Page Scroll Prevention**: Arrow key events within the `tablist` must invoke `event.preventDefault()` to avoid accidental page scrolling.

---

## 3. Disclosure Pattern (Expand/Collapse)

### W3C ARIA Reference
- Pattern: [Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

### Roles, States, and Properties
- **Trigger Element**: Native `<button>` element.
  - No explicit `role="button"` required if using native HTML `<button>`.
  - `aria-expanded="true"` when content is visible; `aria-expanded="false"` when collapsed.
  - `aria-controls="[content-id]"` referencing the ID of the expandable panel element.
- **Expandable Content Region**: `<div id="[content-id]">`
  - Rendered when open, hidden/unmounted when closed.
  - Standard container element without requiring special ARIA roles unless region semantics are specifically requested.

### Keyboard Interaction
- `Enter`: Toggles the disclosure (expands if collapsed, collapses if expanded).
- `Space`: Toggles the disclosure.
- `Tab`: Moves focus to the trigger button, and if expanded, next `Tab` enters the content region controls naturally.
- **Focus Behavior**: Toggling disclosure does NOT move focus away from the trigger button. Focus remains predictably on the trigger.
