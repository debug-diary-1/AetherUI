/**
 * This module provides polyfills specifically for lit-html compatibility in tests
 * It's designed to be imported directly in component test files that use lit-html
 */

// Setup document object
if (typeof document !== 'undefined') {
  // Create a proper document.body if it doesn't exist
  if (!document.body) {
    document.body = document.createElement('body');
  }

  // Ensure document.body has appendChild method
  if (!document.body.appendChild) {
    document.body.appendChild = function<T extends Node>(node: T): T {
      // Mock implementation
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
      
      // Add to internal children collection
      const thisAsAny = this as any;
      if (!thisAsAny._childNodes) {
        thisAsAny._childNodes = [];
      }
      
      thisAsAny._childNodes.push(node);
      (node as any).parentNode = this;
      
      return node;
    };
  }

  // Ensure document.createTreeWalker is available and working properly
  if (!document.createTreeWalker || 
    (document.createTreeWalker && typeof document.createTreeWalker !== 'function')) {
    document.createTreeWalker = function(root: Node, whatToShow: number, filter: NodeFilter | null) {
      return {
        root,
        currentNode: root,
        whatToShow: whatToShow || -1, // NodeFilter.SHOW_ALL
        filter,
        nextNode: () => null,
        previousNode: () => null,
        parentNode: () => null,
        firstChild: () => null,
        lastChild: () => null,
        nextSibling: () => null,
        previousSibling: () => null
      };
    };
  }
}

// Setup window object
if (typeof window !== 'undefined') {
  // Make sure window.document is set
  window.document = window.document || document;
  
  // Make sure location exists for hrefs
  if (!window.location) {
    window.location = { href: 'http://localhost/' } as Location;
  }
  
  // Setup customElements registry
  if (!window.customElements) {
    window.customElements = {
      define: (_name: string, _constructor: CustomElementConstructor) => {},
      get: (_name: string) => undefined,
      upgrade: (_root: Node) => {},
      whenDefined: (_name: string) => Promise.resolve(HTMLElement as CustomElementConstructor),
      getName: (_constructor: CustomElementConstructor) => null
    } as CustomElementRegistry;
  }
}

// Add necessary NodeFilter constants
if (typeof NodeFilter === 'undefined') {
  (window as any).NodeFilter = {
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3
  };
}

// Mock Element.prototype methods if needed
if (typeof Element !== 'undefined') {
  if (!Element.prototype.attachShadow) {
    Element.prototype.attachShadow = function(init: ShadowRootInit): ShadowRoot {
      const shadowRoot = document.createElement('div') as unknown as ShadowRoot;
      const shadowRootAsAny = shadowRoot as any;
      shadowRootAsAny.host = this;
      shadowRootAsAny.mode = init.mode;
      
      // Add methods to the shadowRoot
      if (!shadowRootAsAny.querySelector) {
        shadowRootAsAny.querySelector = (_selector: string) => null;
      }
      
      (this as any).shadowRoot = init.mode === 'open' ? shadowRoot : null;
      return shadowRoot;
    };
  }
}