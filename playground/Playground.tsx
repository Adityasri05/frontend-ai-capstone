'use client';

import React, { useState, useRef } from 'react';
import { Modal } from './components/Modal';
import { Tabs } from './components/Tabs';
import { Disclosure } from './components/Disclosure';

export const Playground: React.FC = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoFocusableModalOpen, setIsNoFocusableModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const initialInputRef = useRef<HTMLInputElement>(null);

  // Form submission feedback state for modal test
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6">
        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full mb-3 border border-indigo-500/20">
          FlyRank AI Internship — Accessibility Playground
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Accessible React Components Playground
        </h1>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-2xl">
          Hand-crafted components demonstrating WAI-ARIA APG patterns, strict focus trapping, keyboard navigation, focus restoration, and semantic HTML accessibility without any component libraries.
        </p>
      </header>

      {/* Section 1: Modal Dialog Demo */}
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>1. Modal Dialog Pattern</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">role="dialog"</span>
        </h2>
        <p className="text-sm text-slate-400">
          Tests focus trap (Tab / Shift+Tab), Escape key close, custom initial focus, and focus restoration to the trigger element.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Open Standard Modal
          </button>

          <button
            type="button"
            onClick={() => setIsNoFocusableModalOpen(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Open Modal (Edge Case: Content Only)
          </button>
        </div>

        {/* Standard Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFormSubmitted(false);
          }}
          title="User Account Preferences"
          description="Update your profile settings and notification preferences below."
          initialFocusRef={initialInputRef}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="user-name" className="block text-xs font-medium text-slate-300 mb-1">
                Full Name (Initial Focus Target)
              </label>
              <input
                ref={initialInputRef}
                id="user-name"
                type="text"
                defaultValue="Alex Rivera"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="role-select" className="block text-xs font-medium text-slate-300 mb-1">
                Engineering Role
              </label>
              <select
                id="role-select"
                defaultValue="frontend"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              >
                <option value="frontend">Frontend Engineer</option>
                <option value="accessibility">Accessibility Reviewer</option>
                <option value="fullstack">Fullstack Engineer</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                id="notifications"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="notifications" className="text-xs text-slate-300">
                Receive accessibility updates & audit reports
              </label>
            </div>

            {formSubmitted && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg">
                ✓ Preferences updated successfully!
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3.5 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>

        {/* Edge Case Modal: Content only */}
        <Modal
          isOpen={isNoFocusableModalOpen}
          onClose={() => setIsNoFocusableModalOpen(false)}
          title="Important Notice"
          description="This modal tests focus behavior when minimal controls are present."
        >
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-sm">
            Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-xs">Esc</kbd> or click the Close button to dismiss this message.
          </div>
        </Modal>
      </section>

      {/* Section 2: Tabs Demo */}
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>2. Tabs Pattern</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">role="tablist"</span>
        </h2>
        <p className="text-sm text-slate-400">
          Supports keyboard navigation via <kbd className="px-1 py-0.5 bg-slate-800 rounded text-xs text-slate-200">←</kbd> / <kbd className="px-1 py-0.5 bg-slate-800 rounded text-xs text-slate-200">→</kbd>, <kbd className="px-1 py-0.5 bg-slate-800 rounded text-xs text-slate-200">Home</kbd>, and <kbd className="px-1 py-0.5 bg-slate-800 rounded text-xs text-slate-200">End</kbd> with roving <code className="text-indigo-400 font-mono text-xs">tabIndex</code>.
        </p>

        <div className="pt-2">
          <Tabs
            ariaLabel="Engineering topics"
            defaultTabId="semantics"
            items={[
              {
                id: 'semantics',
                label: 'Semantic HTML',
                content: (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white">Why Native Semantics Matter</h3>
                    <p className="text-sm text-slate-300">
                      Using native elements like <code className="text-indigo-400 font-mono">&lt;button&gt;</code> and <code className="text-indigo-400 font-mono">&lt;dialog&gt;</code> provides built-in keyboard activation (Enter/Space) and focusability without requiring manual custom event handlers.
                    </p>
                    <button
                      type="button"
                      onClick={() => alert('Tab panel interactive element focused!')}
                      className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      Interactive Element inside Panel
                    </button>
                  </div>
                ),
              },
              {
                id: 'aria',
                label: 'WAI-ARIA APG',
                content: (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white">ARIA APG Standardized Patterns</h3>
                    <p className="text-sm text-slate-300">
                      ARIA attributes like <code className="text-indigo-400 font-mono">aria-selected</code>, <code className="text-indigo-400 font-mono">aria-controls</code>, and <code className="text-indigo-400 font-mono">aria-expanded</code> inform screen readers about state changes, but do not replace JavaScript keyboard behaviors.
                    </p>
                  </div>
                ),
              },
              {
                id: 'keyboard',
                label: 'Keyboard Nav',
                content: (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white">Roving tabindex Pattern</h3>
                    <p className="text-sm text-slate-300">
                      Only the currently active tab has <code className="text-indigo-400 font-mono">tabIndex="0"</code>. Inactive tabs receive <code className="text-indigo-400 font-mono">tabIndex="-1"</code> so tabbing moves past the tablist in a single press.
                    </p>
                  </div>
                ),
              },
              {
                id: 'disabled-tab',
                label: 'Disabled Tab',
                disabled: true,
                content: <p className="text-sm text-slate-400">Disabled content</p>,
              },
            ]}
          />
        </div>
      </section>

      {/* Section 3: Disclosure Demo */}
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>3. Disclosure Pattern</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">aria-expanded</span>
        </h2>
        <p className="text-sm text-slate-400">
          Native button trigger with <code className="text-indigo-400 font-mono text-xs">aria-expanded</code> state and <code className="text-indigo-400 font-mono text-xs">aria-controls</code> link. Toggling preserves button focus position.
        </p>

        <div className="space-y-3 pt-2">
          <Disclosure title="What is the difference between ARIA and HTML semantics?" defaultIsOpen={true}>
            HTML semantics provide intrinsic browser behavior, default roles, and native focus handling. ARIA attributes provide metadata to screen readers when native semantics are insufficient, but require developer JS implementation for keyboard interaction.
          </Disclosure>

          <Disclosure title="How does focus trapping work in Modal Dialogs?">
            Focus trapping intercepts Tab and Shift+Tab key presses. If focus is on the last focusable element and Tab is pressed, focus is programmatically moved to the first focusable element. If Shift+Tab is pressed on the first element, focus wraps to the last.
          </Disclosure>

          <Disclosure title="Why use roving tabindex for Tabs?">
            Roving tabindex prevents keyboard users from having to press Tab through every single tab item in a long tab bar. A single Tab press enters the active tab, and arrow keys move between tabs.
          </Disclosure>
        </div>
      </section>
    </div>
  );
};
