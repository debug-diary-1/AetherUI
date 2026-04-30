/**
 * Enhanced setup for Vitest tests with memory optimization
 * This file provides all the necessary mocks and setup for testing
 * with memory efficiency in mind.
 */
import '@open-wc/testing';
import { vi, beforeAll, afterEach, afterAll } from 'vitest';

// Memory optimization flag
const IS_MEMORY_OPTIMIZED = process.env.MEMORY_OPTIMIZED === 'true';

// Setup before all tests run
beforeAll(() => {
  console.log(
    `Test setup running in ${IS_MEMORY_OPTIMIZED ? 'MEMORY OPTIMIZED' : 'STANDARD'} mode`,
  );

  // Ensure global objects exist and are properly linked
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.document = window.document || document;
    document.defaultView = document.defaultView || window;
  }

  // Create document.body if needed
  if (typeof document !== 'undefined' && !document.body) {
    document.body = document.createElement('body');
  }

  // Setup required Web Component APIs
  if (typeof window !== 'undefined') {
    // Mock CustomElementRegistry
    window.customElements = window.customElements || {
      define: vi.fn(),
      get: vi.fn(() => undefined),
      upgrade: vi.fn(),
      whenDefined: vi.fn(() => Promise.resolve()),
    };

    // Mock all required browser APIs in one place
    setupBrowserAPIs();
  }

  // Set test environment flag
  global.IS_TEST_ENV = true;
});

// Clean up after each test to prevent memory leaks
afterEach(() => {
  if (IS_MEMORY_OPTIMIZED && document && document.body) {
    // Clear the body to prevent memory leaks
    document.body.innerHTML = '';

    // Force garbage collection when available and in memory-optimized mode
    if (global.gc) {
      global.gc();
    }
  }
});

// Clean up after all tests
afterAll(() => {
  if (IS_MEMORY_OPTIMIZED) {
    // Clean up any global mocks that might hold references
    vi.clearAllMocks();

    // Clear any event listeners
    if (window) {
      for (const prop in window) {
        if (prop.startsWith('on') && typeof window[prop] === 'function') {
          window[prop] = null;
        }
      }
    }
  }
});

// Helper function to set up all browser APIs in one place
function setupBrowserAPIs() {
  // Mock ShadowRoot and attachShadow
  if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachShadow) {
    HTMLElement.prototype.attachShadow = function ({ mode }) {
      const shadowRoot = document.createElement('div');
      shadowRoot.host = this;
      shadowRoot.mode = mode || 'open';

      // Add critical methods to shadowRoot
      if (!shadowRoot.querySelector) {
        shadowRoot.querySelector = function (selector) {
          return null;
        };
      }
      if (!shadowRoot.querySelectorAll) {
        shadowRoot.querySelectorAll = function (selector) {
          return [];
        };
      }

      Object.defineProperty(this, 'shadowRoot', {
        get() {
          return mode === 'open' ? shadowRoot : null;
        },
      });

      return shadowRoot;
    };
  }

  // Mock createTreeWalker - critical for lit-html to work
  if (typeof document !== 'undefined') {
    document.createTreeWalker =
      document.createTreeWalker ||
      function (root, whatToShow, filter) {
        return {
          root,
          currentNode: root,
          whatToShow: whatToShow || (typeof NodeFilter !== 'undefined' ? NodeFilter.SHOW_ALL : -1),
          filter,
          nextNode: vi.fn(() => null),
          previousNode: vi.fn(() => null),
          parentNode: vi.fn(() => null),
          firstChild: vi.fn(() => null),
          lastChild: vi.fn(() => null),
          nextSibling: vi.fn(() => null),
          previousSibling: vi.fn(() => null),
        };
      };
  }

  // Observers
  window.MutationObserver =
    window.MutationObserver ||
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };

  window.ResizeObserver =
    window.ResizeObserver ||
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

  window.IntersectionObserver =
    window.IntersectionObserver ||
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

  // Style and layout APIs
  window.getComputedStyle =
    window.getComputedStyle ||
    (() => ({
      getPropertyValue: () => '',
      setProperty: () => {},
    }));

  window.CSSStyleSheet =
    window.CSSStyleSheet ||
    class {
      constructor() {
        this.cssRules = [];
      }
      replaceSync() {}
    };

  // Make sure location exists for hrefs
  if (!window.location) {
    window.location = { href: 'http://localhost/' };
  }

  // Mock adoptedStyleSheets for Lit
  if (typeof document !== 'undefined' && !('adoptedStyleSheets' in document)) {
    Object.defineProperty(Document.prototype, 'adoptedStyleSheets', {
      get() {
        return [];
      },
      set() {},
    });

    if (typeof ShadowRoot !== 'undefined') {
      Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
        get() {
          return [];
        },
        set() {},
      });
    }
  }

  // Animation API
  window.Animation =
    window.Animation ||
    class {
      constructor() {}
      play() {}
      pause() {}
      cancel() {}
    };

  // Add NodeFilter constants for createTreeWalker
  window.NodeFilter = window.NodeFilter || {
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3,
  };

  // CSS API
  window.CSSRule = window.CSSRule || {
    STYLE_RULE: 1,
    KEYFRAMES_RULE: 7,
    STYLE_SHEET_RULE: 3,
  };
}
