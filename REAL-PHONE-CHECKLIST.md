# Real Phone QA Checklist

A physical mobile verification checklist for testing Aditya Srivastav's portfolio on a real smartphone.

---

## Device & Environment Details
- **Device**: *(e.g. iPhone 14 Pro / Samsung Galaxy S23 / Pixel 8)*
- **OS**: *(e.g. iOS 17.5 / Android 14)*
- **Browser**: *(e.g. Safari / Mobile Chrome)*
- **Screen Resolution / Viewport**: *(e.g. 393 x 852 px / 390 x 844 px)*
- **Network**: *(e.g. 4G / 5G / Wi-Fi)*
- **Tested Live URL**: `https://aditya-srivastav.netlify.app` *(or custom deploy URL)*

---

## 1. Layout & Viewport Inspection
- [ ] **No Horizontal Scrolling**: Page stays firmly bounded horizontally at 320px–414px viewports with zero lateral drift.
- [ ] **Hero Fits Ergonomically**: Status badge, headline, positioning statement, and CTA cluster display without clipping.
- [ ] **Sticky Navigation**: Header stays anchored to the top with high-contrast backdrop blur.
- [ ] **Project Cards Fit Comfortably**: All 4 project cards (HIREVIUM, INDRA AI, StackScout, ResQra) scale to the screen width with readable inner margins.
- [ ] **Subtle Visual Textures**: SVG background patterns render sharply without heavy bandwidth overhead.
- [ ] **Footer Display**: Copyright mark and subtitle render cleanly without touching the mobile screen edges.

---

## 2. Touch Interaction & Navigation
- [ ] **Hamburger Menu Toggle**: Menu button opens and closes smoothly with a touch target ≥ 44x44px.
- [ ] **Anchor Auto-Scroll & Close**: Tapping `Work`, `About`, `AI / Tech`, or `Contact` in mobile menu scrolls smoothly to the section and auto-closes the overlay.
- [ ] **CTA Buttons Responsive**: `Connect on LinkedIn`, `View Selected Work`, and `Send Message` respond instantly to touch with active press states (`active:scale-95`).
- [ ] **Project Route Links**: Tapping `View Case Study` links navigates smoothly to case study subpages (`/projects/hirevium`, `/projects/indra-ai`, `/projects/stackscout`).
- [ ] **External Links**: LinkedIn and GitHub profile links open cleanly in new browser tabs with `rel="noopener noreferrer"`.

---

## 3. Typography, Contrast & Readability
- [ ] **Display Font Hierarchy**: Space Grotesk headings (`text-2xl` to `text-4xl`) scale down cleanly on narrow screens without awkward line breaks.
- [ ] **Body Readability**: Inter body text renders comfortably at readable sizes with 1.5–1.6 line height.
- [ ] **Color Contrast (WCAG 2.1 AA)**: Slate text and muted labels maintain strong contrast ratios (≥ 4.5:1) in both bright and low-light environments.
- [ ] **No Overlapping Text**: Tags, timestamps, and bullet points wrap naturally on small screens.

---

## 4. Real Dynamic Contact Form
- [ ] **Touch-Friendly Fields**: Input fields (`Name`, `Email`, `Subject`, `Message`) have generous padding and minimum 44px tap heights.
- [ ] **iOS Safari Zoom Prevention**: Focusing an input field does *not* trigger unwanted automatic viewport zooming (`font-size ≥ 16px`).
- [ ] **Virtual Keyboard Ergonomics**: Opening the on-screen keyboard does not distort the card layout or hide active inputs.
- [ ] **Validation Feedback**: Submitting an empty form or invalid email displays clear, readable red error indicators below each field.
- [ ] **Submitting State**: Tapping `Send Message` disables the button, displays an animated spinner, and shows *"Sending Message..."*.
- [ ] **Success Confirmation**: Successfully sent messages render the emerald confirmation banner with a *"Send Another Message"* reset button.

---

## 5. Orientation & Responsive Shifts
- [ ] **Portrait Mode Checked**: Full page verified from top to bottom in portrait orientation.
- [ ] **Landscape Mode Checked**: Rotating device horizontally maintains centered max-width and adjusts header navigation gracefully.

---

## 6. Final Usability & Trust Rating
- [ ] **No Visual Glitches**: Zero flickering animations or unstyled layout shifts.
- [ ] **Production Trustworthiness**: Portfolio feels fast, stable, and professionally crafted for hiring managers.
