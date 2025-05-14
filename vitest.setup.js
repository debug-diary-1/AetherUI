// Import global test helpers first
import '@open-wc/testing';
import { vi } from 'vitest';

// Ensure global objects exist and are properly linked
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.document = window.document || document;
  document.defaultView = document.defaultView || window;
}

// Mock createTreeWalker - critical for lit-html to work
if (typeof document !== 'undefined') {
  document.createTreeWalker = document.createTreeWalker || function(root, whatToShow, filter) {
    return {
      root,
      currentNode: root,
      whatToShow: whatToShow || NodeFilter.SHOW_ALL,
      filter,
      nextNode: vi.fn(() => null),
      previousNode: vi.fn(() => null),
      parentNode: vi.fn(() => null),
      firstChild: vi.fn(() => null),
      lastChild: vi.fn(() => null),
      nextSibling: vi.fn(() => null),
      previousSibling: vi.fn(() => null)
    };
  };
}

// Setup Web Components APIs
if (typeof window !== 'undefined') {
  // Mock CustomElementRegistry
  window.customElements = window.customElements || {
    define: vi.fn(),
    get: vi.fn(() => undefined),
    upgrade: vi.fn(),
    whenDefined: vi.fn(() => Promise.resolve())
  };
  
  // Mock ShadowRoot
  if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachShadow) {
    HTMLElement.prototype.attachShadow = function({ mode }) {
      const shadowRoot = document.createElement('div');
      shadowRoot.host = this;
      shadowRoot.mode = mode || 'open';
      
      Object.defineProperty(this, 'shadowRoot', {
        get() { return mode === 'open' ? shadowRoot : null; }
      });
      
      return shadowRoot;
    };
  }
  
  // Mock other browser APIs used by lit and @open-wc/testing
  
  // Observers
  window.MutationObserver = window.MutationObserver || class {
    constructor(callback) { this.callback = callback; }
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  };
  
  window.ResizeObserver = window.ResizeObserver || class {
    constructor(callback) { this.callback = callback; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  
  // Style-related APIs
  window.getComputedStyle = window.getComputedStyle || (() => ({
    getPropertyValue: () => '',
    setProperty: () => {}
  }));
  
  // Make sure location exists for hrefs
  if (!window.location) {
    window.location = { href: 'http://localhost/' };
  }
  
  // Mock adoptedStyleSheets for Lit
  if (typeof document !== 'undefined' && !('adoptedStyleSheets' in document)) {
    Object.defineProperty(Document.prototype, 'adoptedStyleSheets', {
      get() { return []; },
      set() {}
    });
    
    if (typeof ShadowRoot !== 'undefined') {
      Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
        get() { return []; },
        set() {}
      });
    }
  }
}

// Add NodeFilter constants for createTreeWalker
if (typeof window !== 'undefined' && typeof NodeFilter === 'undefined') {
  window.NodeFilter = {
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3
  };
}

// Set test environment flag
global.IS_TEST_ENV = true;