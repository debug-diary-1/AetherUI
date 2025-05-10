// Test setup file

// Mock classes for browser APIs not available in Node.js
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  private callback: IntersectionObserverCallback;
  observe() {}
  unobserve() {}
  disconnect() {}
  root: Element | Document | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [0];
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

// Set global mocks
(global as any).ResizeObserver = MockResizeObserver;
(global as any).IntersectionObserver = MockIntersectionObserver;

// Note: registerCustomElements() is now called directly in component test files
// to avoid automatically importing all components in every test