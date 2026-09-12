'use client';

import React, { useState, useId } from 'react';

export interface DisclosureProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}

export const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultIsOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  className = '',
}) => {
  const panelId = useId();
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(defaultIsOpen);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  return (
    <div className={`border border-slate-800 rounded-xl bg-slate-900/80 overflow-hidden ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-100 hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-inset"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-400' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content Panel */}
      {isOpen && (
        <div id={panelId} className="p-4 border-t border-slate-800 text-slate-300 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};
