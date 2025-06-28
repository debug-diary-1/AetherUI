import { vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Create a full JSDOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

// Set up global environment
global.window = dom.window as any;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.ShadowRoot = dom.window.ShadowRoot;

// Add missing global constructors
global.Event = dom.window.Event;
global.CustomEvent = dom.window.CustomEvent;
global.KeyboardEvent = dom.window.KeyboardEvent;
global.MouseEvent = dom.window.MouseEvent;

// Mock createTreeWalker if not available
if (!document.createTreeWalker) {
  document.createTreeWalker = function(root: Node, whatToShow?: number, filter?: NodeFilter | null) {
    let currentNode = root;
    return {
      root,
      whatToShow: whatToShow || NodeFilter.SHOW_ALL,
      filter,
      currentNode,
      nextNode() {
        // Simple implementation - just return null
        return null;
      },
      previousNode() {
        return null;
      },
      parentNode() {
        return null;
      },
      firstChild() {
        return null;
      },
      lastChild() {
        return null;
      },
      previousSibling() {
        return null;
      },
      nextSibling() {
        return null;
      }
    };
  };
}

// Mock @open-wc/testing utilities for vitest
const html = (strings: TemplateStringsArray, ...values: any[]) => {
  // Simple template literal implementation
  let result = '';
  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      result += values[i];
    }
  });
  return result;
};

const fixture = async <T extends HTMLElement>(template: string): Promise<T> => {
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = template;
  document.body.appendChild(container);
  
  const element = container.firstElementChild as T;
  
  // Wait for custom element to be defined if needed
  if (element && element.tagName.includes('-')) {
    const tagName = element.tagName.toLowerCase();
    try {
      await customElements.whenDefined(tagName);
    } catch (e) {
      // Custom element might not be defined yet
    }
  }
  
  // Mock updateComplete for Lit elements
  if (element && 'updateComplete' in element) {
    (element as any).updateComplete = Promise.resolve();
  }
  
  return element;
};

const waitUntil = async (
  condition: () => boolean | Promise<boolean>,
  message?: string,
  options: { interval?: number; timeout?: number } = {}
): Promise<void> => {
  const { interval = 50, timeout = 1000 } = options;
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const result = await condition();
    if (result) return;
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(message || 'Timeout waiting for condition');
};

// Create a mock expect object that mimics Chai's API
const expect = (actual: any) => {
  return {
    to: {
      equal: (expected: any) => {
        if (actual !== expected) {
          throw new Error(`Expected ${actual} to equal ${expected}`);
        }
      },
      be: {
        true: () => {
          if (actual !== true) {
            throw new Error(`Expected ${actual} to be true`);
          }
        },
        false: () => {
          if (actual !== false) {
            throw new Error(`Expected ${actual} to be false`);
          }
        },
        null: () => {
          if (actual !== null) {
            throw new Error(`Expected ${actual} to be null`);
          }
        },
        undefined: () => {
          if (actual !== undefined) {
            throw new Error(`Expected ${actual} to be undefined`);
          }
        }
      },
      exist: () => {
        if (!actual) {
          throw new Error(`Expected ${actual} to exist`);
        }
      }
    },
    // Direct properties
    get exist() {
      return actual != null;
    }
  };
};

// Mock LitElement's base functionality
class LitElement extends HTMLElement {
  static properties = {};
  
  updateComplete = Promise.resolve();
  shadowRoot: ShadowRoot | null = null;
  
  constructor() {
    super();
    // Create a mock shadow root
    this.shadowRoot = {
      querySelector: (selector: string) => {
        // Return null or mock elements as needed
        return null;
      },
      querySelectorAll: (selector: string) => {
        return [];
      },
      innerHTML: '',
      host: this
    } as any;
  }
  
  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback() {}
  
  // Mock Lit's render cycle
  requestUpdate() {
    this.updateComplete = Promise.resolve();
  }
}

// Make these available globally
(global as any).html = html;
(global as any).fixture = fixture;
(global as any).expect = expect;
(global as any).waitUntil = waitUntil;
(global as any).LitElement = LitElement;

// Mock the import resolution for @open-wc/testing
vi.mock('@open-wc/testing', () => ({
  html,
  fixture,
  expect,
  waitUntil
}));

// Mock lit imports
vi.mock('lit', () => ({
  LitElement,
  html,
  css: (strings: TemplateStringsArray, ...values: any[]) => {
    return strings.join('');
  }
}));

vi.mock('lit/decorators.js', () => ({
  customElement: (name: string) => (target: any) => {
    customElements.define(name, target);
    return target;
  },
  property: (options?: any) => (target: any, propertyKey: string) => {
    // Simple property decorator mock
  },
  state: () => (target: any, propertyKey: string) => {
    // Simple state decorator mock
  },
  query: (selector: string) => (target: any, propertyKey: string) => {
    // Simple query decorator mock
  }
}));