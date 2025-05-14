// Core package test setup - provides DOM API implementations for JSDOM
import { vi } from 'vitest';

// Ensure global objects exist
global.document = global.document || {};
global.window = global.window || {};

// Create proper cross-references
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  document.defaultView = document.defaultView || window;
  window.document = window.document || document;
}

// Mock createTreeWalker - this is critical for lit-html rendering
if (typeof document !== 'undefined') {
  document.createTreeWalker = document.createTreeWalker || function(root, whatToShow, filter) {
    const walker = {
      root,
      currentNode: root,
      whatToShow: whatToShow || NodeFilter.SHOW_ALL,
      filter,
      
      // Implement traversal methods with vitest spies
      nextNode: vi.fn(() => null),
      previousNode: vi.fn(() => null),
      parentNode: vi.fn(() => null),
      firstChild: vi.fn(() => null),
      lastChild: vi.fn(() => null),
      nextSibling: vi.fn(() => null),
      previousSibling: vi.fn(() => null)
    };
    
    return walker;
  };
}

// Mock ShadowRoot and attachShadow for Web Components
if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachShadow) {
  HTMLElement.prototype.attachShadow = function({ mode }) {
    const shadowRoot = document.createElement('div');
    shadowRoot.host = this;
    shadowRoot.mode = mode;
    
    // Define shadowRoot property with proper open/closed mode handling
    Object.defineProperty(this, 'shadowRoot', {
      get: function() {
        return mode === 'open' ? shadowRoot : null;
      }
    });
    
    return shadowRoot;
  };
}

// Mock CustomElementRegistry for Web Components
if (typeof window !== 'undefined') {
  window.customElements = window.customElements || {
    define: vi.fn(),
    get: vi.fn(() => undefined),
    upgrade: vi.fn(),
    whenDefined: vi.fn(() => Promise.resolve())
  };
}

// Mock observers used by modern web components
if (typeof window !== 'undefined') {
  // Mock ResizeObserver
  window.ResizeObserver = window.ResizeObserver || class ResizeObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  
  // Mock MutationObserver
  window.MutationObserver = window.MutationObserver || class MutationObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  };
  
  // Mock getComputedStyle
  window.getComputedStyle = window.getComputedStyle || (() => ({
    getPropertyValue: () => '',
  }));
  
  // Mock location if needed
  if (!window.location) {
    window.location = { href: 'http://localhost/' };
  }
}

// Add NodeFilter constants needed by createTreeWalker
global.NodeFilter = global.NodeFilter || {
  SHOW_ALL: -1,
  SHOW_ELEMENT: 1,
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_SKIP: 3
};

// Mock Web Component APIs that might be needed by @open-wc/testing
if (typeof window !== 'undefined') {
  // Mock adoptedStyleSheets (used by Lit)
  if (!('adoptedStyleSheets' in document)) {
    Object.defineProperty(Document.prototype, 'adoptedStyleSheets', {
      get() { return []; },
      set() {}
    });
    
    Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
      get() { return []; },
      set() {}
    });
  }
}

// Add any test-specific flags
global.IS_TEST_ENV = true;