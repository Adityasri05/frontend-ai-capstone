import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Automatically clean up rendered React components after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock matchMedia for responsive and reduced-motion tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
};

// Mock window and element scrolling APIs
window.scrollTo = vi.fn();
window.scroll = vi.fn();
if (typeof HTMLElement !== 'undefined') {
  HTMLElement.prototype.scrollTo = vi.fn();
  HTMLElement.prototype.scroll = vi.fn();
  HTMLElement.prototype.scrollIntoView = vi.fn();
}
Element.prototype.scrollIntoView = vi.fn();

// Mock navigator.clipboard
const writeTextMock = vi.fn().mockResolvedValue(undefined);
const readTextMock = vi.fn().mockResolvedValue('');

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: writeTextMock,
    readText: readTextMock,
  },
  writable: true,
  configurable: true,
});
