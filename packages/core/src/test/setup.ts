import { vi } from 'vitest';

// Setup mock environment for web components
global.HTMLElement = class HTMLElement {} as any;
global.customElements = { define: vi.fn(), get: vi.fn() } as any;

// Mocking the Element class
class Element {
  // Implement methods needed in tests
  getBoundingClientRect() {
    return { top: 0, left: 0, width: 0, height: 0 };
  }
  
  // Mock animations/transitions
  addEventListener() {}
  removeEventListener() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  
  // Mock shadowRoot for LitElement
  get shadowRoot() { return { 
    querySelector: () => null,
    querySelectorAll: () => [],
  }; }
}

// Mock window object for browser-related functionality
global.window = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  getComputedStyle: () => ({
    getPropertyValue: () => ''
  }),
  CustomEvent: class CustomEvent extends Event {
    constructor(name, options) {
      super(name);
      this.detail = options?.detail || {};
    }
  },
} as any;

// Mock document object
global.document = {
  createElement: () => new Element(),
  createElementNS: () => new Element(),
  createTextNode: () => ({}),
  body: {},
  head: { appendChild: vi.fn() },
  querySelector: () => null,
  querySelectorAll: () => [],
} as any;

// Set up a unified fake Event class
global.Event = class Event {
  type: string;
  bubbles: boolean;
  cancelable: boolean;
  
  constructor(type, options?) {
    this.type = type;
    this.bubbles = options?.bubbles || false;
    this.cancelable = options?.cancelable || false;
  }
  
  stopPropagation() {}
  preventDefault() {}
};

// Mock key events
global.KeyboardEvent = class KeyboardEvent extends Event {
  key: string;
  
  constructor(type, options?) {
    super(type);
    this.key = options?.key || '';
  }
};

// Mock mouse events
global.MouseEvent = class MouseEvent extends Event {
  clientX: number;
  clientY: number;
  
  constructor(type, options?) {
    super(type);
    this.clientX = options?.clientX || 0;
    this.clientY = options?.clientY || 0;
  }
};