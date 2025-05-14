// Fix for createTreeWalker and other DOM API issues in JSDOM
import { beforeAll, vi } from 'vitest';

// Global DOM mocks
beforeAll(() => {
  // Ensure document and window exist
  global.document = global.document || {};
  global.window = global.window || {};
  
  // Ensure document.defaultView and window.document are properly linked
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    document.defaultView = document.defaultView || window;
    window.document = window.document || document;
  }

  // Mock createTreeWalker - this is critical for lit-html
  if (typeof document !== 'undefined') {
    document.createTreeWalker = document.createTreeWalker || function(root, whatToShow, filter) {
      const walker = {
        root,
        currentNode: root,
        whatToShow: whatToShow || NodeFilter.SHOW_ALL,
        filter,
        
        // Implement the required methods
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

  // Mock ShadowRoot and attachShadow
  if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachShadow) {
    HTMLElement.prototype.attachShadow = function({ mode }) {
      const shadowRoot = document.createElement('div');
      shadowRoot.host = this;
      shadowRoot.mode = mode;
      
      Object.defineProperty(this, 'shadowRoot', {
        get: function() {
          return mode === 'open' ? shadowRoot : null;
        }
      });
      
      return shadowRoot;
    };
  }

  // Mock customElements
  if (typeof window !== 'undefined') {
    window.customElements = window.customElements || {
      define: vi.fn(),
      get: vi.fn(() => undefined),
      upgrade: vi.fn(),
      whenDefined: vi.fn(() => Promise.resolve())
    };
  }
  
  // Mock other APIs needed by Lit
  if (typeof window !== 'undefined') {
    // Ensure MutationObserver exists
    window.MutationObserver = window.MutationObserver || class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      disconnect() {}
      takeRecords() { return []; }
    };
    
    // Ensure ResizeObserver exists
    window.ResizeObserver = window.ResizeObserver || class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    
    // Add additional browser APIs used by web components
    window.getComputedStyle = window.getComputedStyle || (() => ({
      getPropertyValue: () => '',
    }));
    
    // Add location if needed by tests
    if (!window.location) {
      window.location = { href: 'http://localhost/' };
    }
  }
  
  // Add NodeFilter constants if needed by tests
  global.NodeFilter = global.NodeFilter || {
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3
  };
});