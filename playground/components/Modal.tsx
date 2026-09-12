'use client'; // React component
import React, { useEffect, useRef, useId } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  closeOnOverlayClick?: boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
].join(', ');

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  initialFocusRef,
  closeOnOverlayClick = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descriptionId = useId();

  // Helper to retrieve all focusable elements currently visible in the modal
  const getFocusableElements = (): HTMLElement[] => {
    if (!dialogRef.current) return [];
    const elements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    return elements.filter(
      (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    // 1. Save previously focused element for focus restoration
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    // 2. Prevent background scrolling while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. Set initial focus inside modal
    const timer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        const focusables = getFocusableElements();
        if (focusables.length > 0) {
          focusables[0].focus();
        } else if (dialogRef.current) {
          dialogRef.current.focus();
        }
      }
    }, 0);

    // 4. Clean up: restore scroll & restore focus when modal closes
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;

      // Focus restoration
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, initialFocusRef]);

  // Handle Keyboard Navigation: Escape key and Focus Trapping
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === 'Tab') {
      const focusables = getFocusableElements();

      // Edge case: No focusable elements inside modal
      if (focusables.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: if on first element, cycle to last element
        if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, cycle to first element
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-lg rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl focus:outline-none text-slate-100"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id={titleId} className="text-xl font-semibold tracking-tight text-white">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-sm text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};
