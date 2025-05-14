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
    detail: Record<string, any>;
    constructor(name: string, options?: { detail?: Record<string, any> }) {
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
// Using an interface to match the expected static methods
interface EventStatic {
  new(type: string, eventInitDict?: EventInit): Event;
  prototype: Event;
  readonly NONE: 0;
  readonly CAPTURING_PHASE: 1;
  readonly AT_TARGET: 2;
  readonly BUBBLING_PHASE: 3;
}

class EventMock {
  type: string;
  bubbles: boolean;
  cancelable: boolean;
  
  static NONE = 0;
  static CAPTURING_PHASE = 1;
  static AT_TARGET = 2;
  static BUBBLING_PHASE = 3;
  
  constructor(type: string, options?: { bubbles?: boolean; cancelable?: boolean }) {
    this.type = type;
    this.bubbles = options?.bubbles || false;
    this.cancelable = options?.cancelable || false;
  }
  
  stopPropagation(): void {}
  preventDefault(): void {}
}

// Cast the EventMock class to match the EventStatic interface
global.Event = EventMock as unknown as EventStatic;

// Mock key events
interface KeyboardEventStatic {
  new(type: string, eventInitDict?: KeyboardEventInit): KeyboardEvent;
  prototype: KeyboardEvent;
  readonly DOM_KEY_LOCATION_STANDARD: 0;
  readonly DOM_KEY_LOCATION_LEFT: 1;
  readonly DOM_KEY_LOCATION_RIGHT: 2;
  readonly DOM_KEY_LOCATION_NUMPAD: 3;
}

class KeyboardEventMock extends EventMock {
  key: string;
  
  static DOM_KEY_LOCATION_STANDARD = 0;
  static DOM_KEY_LOCATION_LEFT = 1;
  static DOM_KEY_LOCATION_RIGHT = 2;
  static DOM_KEY_LOCATION_NUMPAD = 3;
  
  constructor(type: string, options?: { key?: string }) {
    super(type);
    this.key = options?.key || '';
  }
}

global.KeyboardEvent = KeyboardEventMock as unknown as KeyboardEventStatic;

// Mock mouse events
interface MouseEventStatic {
  new(type: string, eventInitDict?: MouseEventInit): MouseEvent;
  prototype: MouseEvent;
}

class MouseEventMock extends EventMock {
  clientX: number;
  clientY: number;
  altKey: boolean = false;
  button: number = 0;
  buttons: number = 0;
  ctrlKey: boolean = false;
  metaKey: boolean = false;
  movementX: number = 0;
  movementY: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
  pageX: number = 0;
  pageY: number = 0;
  relatedTarget: EventTarget | null = null;
  screenX: number = 0;
  screenY: number = 0;
  shiftKey: boolean = false;
  x: number = 0;
  y: number = 0;
  
  constructor(type: string, options?: { clientX?: number; clientY?: number }) {
    super(type);
    this.clientX = options?.clientX || 0;
    this.clientY = options?.clientY || 0;
  }
  
  getModifierState(_key: string): boolean {
    return false;
  }
}

global.MouseEvent = MouseEventMock as unknown as MouseEventStatic;