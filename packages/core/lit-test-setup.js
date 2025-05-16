/**
 * Custom setup file for Lit with @open-wc/testing compatibility
 * This file provides proper mocks for DOM APIs needed by lit-html 3.x
 */
import { vi } from 'vitest';

// Ensure we have a proper document mock that works with lit-html
global.document = global.document || {};
global.window = global.window || {};

// Helper function to add DOM manipulation methods to elements
const addDOMFunctions = (element) => {
  if (!element.insertBefore) {
    element.insertBefore = function(newNode, referenceNode) {
      if (newNode.parentNode) {
        newNode.parentNode.removeChild(newNode);
      }
      
      // Initialize childNodes if needed
      if (!this.childNodes) {
        this.childNodes = [];
      }
      
      if (!referenceNode) {
        // If referenceNode is null, append to the end
        this.childNodes.push(newNode);
        if (newNode.nodeType === 1) {
          if (!this.children) {
            this.children = [];
          }
          this.children.push(newNode);
        }
      } else {
        // Insert before the reference node
        const index = this.childNodes.indexOf(referenceNode);
        if (index !== -1) {
          this.childNodes.splice(index, 0, newNode);
          if (newNode.nodeType === 1) {
            if (!this.children) {
              this.children = [];
            }
            const elemIndex = this.children.indexOf(referenceNode);
            if (elemIndex !== -1) {
              this.children.splice(elemIndex, 0, newNode);
            } else {
              this.children.push(newNode);
            }
          }
        } else {
          // If reference node not found, append to the end
          this.childNodes.push(newNode);
          if (newNode.nodeType === 1) {
            if (!this.children) {
              this.children = [];
            }
            this.children.push(newNode);
          }
        }
      }
      
      newNode.parentNode = this;
      return newNode;
    };
  }
  
  if (!element.appendChild) {
    element.appendChild = function(child) {
      if (child && child.parentNode) {
        try {
          child.parentNode.removeChild(child);
        } catch (e) {
          // Ignore errors if removeChild fails
          console.warn('Error removing child from parent:', e);
        }
      }
      
      if (!this.childNodes) {
        this.childNodes = [];
      }
      
      if (child) {
        this.childNodes.push(child);
        
        if (child.nodeType === 1) {
          if (!this.children) {
            this.children = [];
          }
          this.children.push(child);
        }
        
        child.parentNode = this;
      }
      
      return child;
    };
  }
  
  if (!element.removeChild) {
    element.removeChild = function(child) {
      if (!this.childNodes) {
        this.childNodes = [];
      }
      
      const index = this.childNodes.indexOf(child);
      if (index !== -1) {
        this.childNodes.splice(index, 1);
        if (child.nodeType === 1) {
          if (!this.children) {
            this.children = [];
          }
          const elemIndex = this.children.indexOf(child);
          if (elemIndex !== -1) {
            this.children.splice(elemIndex, 1);
          }
        }
        child.parentNode = null;
      }
      return child;
    };
  }
  
  // Add missing properties
  if (!element.nodeType) {
    element.nodeType = 1; // ELEMENT_NODE
  }
  
  return element;
};

// Create proper document body if it doesn't exist
if (typeof document !== 'undefined') {
  // Create body if it doesn't exist
  document.body = document.body || {};
  
  // Ensure document.body has DOM methods
  addDOMFunctions(document.body);
}

// Make sure document has all required methods for lit-html rendering
if (typeof document !== 'undefined') {
  // createComment is critical for lit-html markers
  document.createComment = document.createComment || function(text) {
    return {
      nodeType: 8, // COMMENT_NODE
      textContent: text,
      nodeName: '#comment'
    };
  };
  
  // Other essential document methods
  document.createElement = document.createElement || function(tagName) {
    const element = {
      nodeType: 1, // ELEMENT_NODE
      tagName: tagName.toUpperCase(),
      nodeName: tagName.toUpperCase(),
      attributes: [],
      childNodes: [],
      children: [],
      
      getAttribute: function(name) {
        const attr = this.attributes.find(a => a.name === name);
        return attr ? attr.value : null;
      },
      
      setAttribute: function(name, value) {
        const existingAttr = this.attributes.find(a => a.name === name);
        if (existingAttr) {
          existingAttr.value = value;
        } else {
          this.attributes.push({ name, value });
        }
      },
      
      attachShadow: function({ mode }) {
        const shadowRoot = document.createElement('div');
        shadowRoot.host = this;
        shadowRoot.mode = mode;
        Object.defineProperty(this, 'shadowRoot', {
          get: function() {
            return mode === 'open' ? shadowRoot : null;
          }
        });
        return addDOMFunctions(shadowRoot);
      }
    };
    
    // Add DOM manipulation methods
    return addDOMFunctions(element);
  };
  
  // Ensure createTreeWalker is properly mocked
  document.createTreeWalker = document.createTreeWalker || function(root, whatToShow, filter) {
    return {
      root,
      currentNode: root,
      whatToShow: whatToShow || -1, // NodeFilter.SHOW_ALL
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

// Setup window APIs needed for web components
if (typeof window !== 'undefined') {
  // Link document properly
  window.document = window.document || document;
  
  // Set up customElements registry
  window.customElements = window.customElements || {
    define: vi.fn(),
    get: vi.fn(() => undefined),
    upgrade: vi.fn(),
    whenDefined: vi.fn(() => Promise.resolve())
  };

  // Set up other required browser APIs
  window.HTMLElement = window.HTMLElement || function() {};
  window.HTMLElement.prototype = window.HTMLElement.prototype || {};
  
  // Setup location if needed
  if (!window.location) {
    window.location = { href: 'http://localhost/' };
  }
}

// Add NodeFilter constants needed by lit-html
global.NodeFilter = global.NodeFilter || {
  SHOW_ALL: -1,
  SHOW_ELEMENT: 1,
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_SKIP: 3
};

// Hook into @open-wc/testing-helpers fixtureWrapper function
// This happens after import processing, so we need to patch our own version
// Create a div for testing
const fixtureWrapper = (parent) => {
  const wrapper = document.createElement('div');
  wrapper.id = 'fixture-wrapper';
  
  // Make sure we add DOM functions to this element
  addDOMFunctions(wrapper);
  
  if (parent) {
    parent.appendChild(wrapper);
  } else {
    document.body.appendChild(wrapper);
  }
  
  return wrapper;
};

// Export for use in tests
window.fixtureWrapper = fixtureWrapper;

// Set test environment flag
global.IS_TEST_ENV = true;