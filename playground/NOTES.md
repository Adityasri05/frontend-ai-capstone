# Accessibility Component Comparison & Analysis

## 1. Modal Dialog Component Comparison

### My Implementation (`playground/components/Modal.tsx`)
- **Approach**:
  - Implemented using React hooks (`useState`, `useEffect`, `useRef`, `useId`).
  - **Focus Trapping**: Querying all visible, enabled focusable elements (`a`, `button`, `input`, `select`, `textarea`, `[tabindex]`) inside the dialog container on `Tab` / `Shift+Tab` key press events, programmatically refocusing the first or last element when boundaries are crossed.
  - **Focus Restoration**: Captures `document.activeElement` when `isOpen` changes to `true` and calls `.focus()` on that element in the `useEffect` cleanup phase when `isOpen` becomes `false`.
  - **Escape Handler**: Listens to `KeyDown` events on the modal wrapper and invokes `onClose()`.
  - **Body Scroll Lock**: Modifies `document.body.style.overflow = 'hidden'` while active.

### shadcn/ui Implementation (`@radix-ui/react-dialog`)
- **Approach**:
  - Built on top of Radix UI primitives with compound primitives (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogClose`).
  - **Portal & DOM Layering**: Renders dialog content via `ReactPortal` at the document root to avoid z-index stacking context issues.
  - **FocusGuards & FocusScope**: Uses invisible DOM sentinel nodes (`<span tabindex="0">`) placed before and after the modal content. When focus lands on a sentinel, Radix redirects focus to the opposite boundary of the container without needing manual query selector arrays on every key press.
  - **Tree Isolation (`aria-hidden`)**: Uses `@radix-ui/react-aria-hidden` to automatically mark all sibling DOM trees outside the modal portal as `aria-hidden="true"` while open.
  - **Dismissable Layer**: Distinguishes between `pointerdown` and `click` events outside the modal container to prevent accidental closures when dragging text selection outside the dialog.

### Concrete Gap 1: Sentinel-Based Focus Guards & Background Tree Isolation
- **Gap**: My manual implementation relies on `querySelectorAll` to construct an array of focusable elements on every `Tab` key press. If interactive content inside the modal is dynamically rendered or modified while open, manual index tracking can break or miss newly added elements. Furthermore, my modal uses a background overlay div but does not dynamically mark top-level sibling DOM nodes outside the modal as `aria-hidden="true"`.
- **shadcn/Radix Solution**: Radix uses persistent DOM focus sentinels at the top and bottom of the dialog container, making focus trapping immune to internal dynamic DOM updates. Additionally, it applies `aria-hidden="true"` across all background DOM nodes, ensuring screen readers cannot navigate into background content.

---

## 2. Tabs Component Comparison

### My Implementation (`playground/components/Tabs.tsx`)
- **Approach**:
  - Accepts a single props configuration array (`items`) and active tab state (controlled or uncontrolled).
  - Implements WAI-ARIA APG `role="tablist"`, `role="tab"`, and `role="tabpanel"` relationships using React `useId()` for auto-generating unique `id`, `aria-controls`, and `aria-labelledby` pairings.
  - **Roving Tabindex**: Sets `tabIndex={0}` on the active tab button and `tabIndex={-1}` on all inactive tab buttons.
  - **Keyboard Navigation**: Implements an `onKeyDown` handler on the tablist listening for `ArrowRight`, `ArrowLeft`, `Home`, and `End` keys, using `event.preventDefault()` to prevent page scrolling while cycling tabs.

### shadcn/ui Implementation (`@radix-ui/react-tabs`)
- **Approach**:
  - Implements a flexible **Compound Component** architecture (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) backed by React Context.
  - **Activation Modes**: Supports both `automatic` (tab activates on focus) and `manual` (tab activates on Space/Enter after focus) selection behavior via an `activationMode` prop.
  - **Orientation Support**: Supports both `horizontal` (ArrowLeft/ArrowRight) and `vertical` (ArrowUp/ArrowDown) keyboard navigation through an `orientation` prop.
  - **Unmounted Content Optimization**: Supports lazy loading or preserving tab panel DOM states when switching tabs.

### Concrete Gap 2: Compound Component Architecture & Multi-Orientation Support
- **Gap**: My manual implementation relies on a rigid prop-driven array (`items: TabItem[]`) that requires all tab headers and panel contents to be defined in a single configuration object. It lacks support for vertical orientation (`ArrowUp`/`ArrowDown`) and manual activation mode.
- **shadcn/Radix Solution**: Shadcn uses a compound component pattern (`TabsList` and `TabsTrigger` separated from `TabsContent` in the JSX layout). This enables developers to place tab triggers and tab panels anywhere in the component hierarchy, styled independently, while maintaining ARIA context relationships through React Context.

---

## 3. What I Learned

### What Was Harder Than Expected
- **Focus Restoration Lifecycle**: Handling edge cases where the triggering element is unmounted or removed from the DOM while the modal is open. Restoring focus requires checking if `document.contains(previousElement)` is true, with a fallback to document body or header.
- **Strict Keyboard Trapping**: Preventing focus from escaping when using <kbd>Shift + Tab</kbd> from the very first focusable element required careful event interception before default browser focus movement occurred.

### Which Accessibility Behavior Is Easiest to Get Wrong
- **Page Scroll on Arrow Keys**: Forgetting `e.preventDefault()` on `ArrowRight`/`ArrowLeft` keypresses in tablists causes the browser window to scroll horizontally/vertically while shifting tabs.
- **Static IDs in Duplicate Components**: Hardcoding IDs for `aria-controls` and `aria-labelledby` instead of using React's `useId()` hook causes duplicate ID violations when multiple instances of a component are rendered on the same page.

### What AI-Generated Code Commonly Gets Wrong
1. **Pseudo-Buttons**: AI frequently generates `<div onClick={...}>` instead of native `<button>` tags, omitting `tabIndex="0"`, `role="button"`, and `Enter`/`Space` keydown event handlers.
2. **Missing Roving Tabindex**: AI often sets `tabIndex={0}` on *all* tabs in a tablist, forcing keyboard users to press <kbd>Tab</kbd> through every tab title before reaching the tab panel content.
3. **Forgotten Focus Restoration**: AI-generated modals frequently open and close without saving or restoring focus to the element that triggered the modal opening.

---

## 4. AI Code Review & Audit

### Analysis of AI Patterns in Component Development
- **Issue**: Standard AI completions often omit `aria-modal="true"` on dialog containers or neglect to attach `aria-describedby` when a modal description is present.
- **Issue**: AI code frequently attaches `window.addEventListener('keydown', ...)` globally inside `useEffect` without filtering whether the event originated inside the target dialog, leading to unintended side effects when multiple modals or overlays exist simultaneously.
- **Fix Applied**: In our hand-built `Modal.tsx`, keydown events are bound directly to the modal wrapper container (`onKeyDown={handleKeyDown}`) and scoped strictly to elements contained within `dialogRef.current`.
