/**
 * Improved DOM setup for testing Web Components with Vitest & JSDOM
 * This file provides a complete testing environment for Lit components
 * with optimized memory usage and proper @open-wc/testing support
 */
import { beforeAll, vi, afterEach } from 'vitest';
import '@open-wc/testing';

// Global DOM setup
beforeAll(() => {
  // Ensure document and window exist
  global.document = global.document || {};
  global.window = global.window || {};

  // Create a proper document.body if it doesn't exist
  if (typeof document !== 'undefined' && !document.body) {
    document.body = document.createElement('body');
  }

  // Ensure document.defaultView and window.document are properly linked
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    document.defaultView = document.defaultView || window;
    window.document = window.document || document;
  }

  // Mock createTreeWalker - this is critical for lit-html
  if (typeof document !== 'undefined') {
    document.createTreeWalker =
      document.createTreeWalker ||
      function (root, whatToShow, filter) {
        const walker = {
          root,
          currentNode: root,
          whatToShow: whatToShow || (typeof NodeFilter !== 'undefined' ? NodeFilter.SHOW_ALL : -1),
          filter,

          // Implement the required methods
          nextNode: vi.fn(() => null),
          previousNode: vi.fn(() => null),
          parentNode: vi.fn(() => null),
          firstChild: vi.fn(() => null),
          lastChild: vi.fn(() => null),
          nextSibling: vi.fn(() => null),
          previousSibling: vi.fn(() => null),
        };

        return walker;
      };
  }

  // Mock ShadowRoot and attachShadow
  if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachShadow) {
    HTMLElement.prototype.attachShadow = function ({ mode }) {
      const shadowRoot = document.createElement('div');
      shadowRoot.host = this;
      shadowRoot.mode = mode;

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
        get: function () {
          return mode === 'open' ? shadowRoot : null;
        },
      });

      return shadowRoot;
    };
  }

  // Mock adoptedStyleSheets - needed for lit@2+
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

  // Mock customElements registry
  if (typeof window !== 'undefined') {
    window.customElements = window.customElements || {
      define: vi.fn(),
      get: vi.fn(() => undefined),
      upgrade: vi.fn(),
      whenDefined: vi.fn(() => Promise.resolve()),
    };
  }

  // Mock other APIs needed by Lit and Web Components
  if (typeof window !== 'undefined') {
    // Observer APIs
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

    // Style and computation APIs
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

    // Add location if needed by tests
    if (!window.location) {
      window.location = { href: 'http://localhost/' };
    }

    // CSS Animation API
    window.Animation =
      window.Animation ||
      class {
        constructor() {}
        play() {}
        pause() {}
        cancel() {}
      };
  }

  // Add NodeFilter constants
  global.NodeFilter = global.NodeFilter || {
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3,
  };

  // Set test environment flag to help conditional logic in components
  global.IS_TEST_ENV = true;
});

// Clean up after each test to prevent memory leaks
afterEach(() => {
  // Remove any elements added to the document body
  if (document && document.body) {
    document.body.innerHTML = '';
  }

  // Force garbage collection for better memory management if needed
  if (global.gc) {
    global.gc();
  }
});
