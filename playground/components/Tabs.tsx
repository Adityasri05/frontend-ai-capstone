'use client';

import React, { useState, useRef, useId } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onChange?: (id: string) => void;
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTabId,
  activeTabId: controlledActiveTabId,
  onChange,
  ariaLabel = 'Tab navigation',
}) => {
  const baseId = useId();
  const [internalActiveTabId, setInternalActiveTabId] = useState<string>(
    () => defaultTabId || items[0]?.id || ''
  );

  const activeTabId = controlledActiveTabId !== undefined ? controlledActiveTabId : internalActiveTabId;
  const tabRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const activeTab = items.find((item) => item.id === activeTabId) || items[0];

  const handleSelectTab = (id: string) => {
    if (controlledActiveTabId === undefined) {
      setInternalActiveTabId(id);
    }
    onChange?.(id);
  };

  const getEnabledItems = () => items.filter((item) => !item.disabled);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const enabledItems = getEnabledItems();
    if (enabledItems.length === 0) return;

    const currentIndex = enabledItems.findIndex((item) => item.id === activeTabId);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % enabledItems.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = enabledItems.length - 1;
        break;
      default:
        return;
    }

    const nextTab = enabledItems[nextIndex];
    if (nextTab) {
      handleSelectTab(nextTab.id);
      tabRefs.current.get(nextTab.id)?.focus();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="flex border-b border-slate-800 space-x-1 overflow-x-auto scrollbar-none"
      >
        {items.map((item) => {
          const isActive = item.id === activeTabId;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current.set(item.id, el);
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              disabled={item.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !item.disabled && handleSelectTab(item.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-all duration-150 border-b-2 rounded-t-md focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                isActive
                  ? 'border-indigo-500 text-indigo-400 bg-slate-900/60'
                  : item.disabled
                  ? 'border-transparent text-slate-600 cursor-not-allowed'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      {activeTab && (
        <div
          key={activeTab.id}
          id={`${baseId}-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          tabIndex={0}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 shadow-sm"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};
