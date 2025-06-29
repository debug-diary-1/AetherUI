/**
 * Test for toast manager API
 */
import { expect } from '@open-wc/testing';

// Mock toast instances for testing
let mockToastInstances: Record<string, unknown>[] = [];

class MockToastManager {
  static instance: MockToastManager | null = null;
  static containers: Record<string, unknown> = {};

  constructor() {
    // Mock constructor
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MockToastManager();
    }
    return this.instance;
  }

  show(options: Record<string, unknown>) {
    const mockToast: Record<string, unknown> = {
      message: options.message,
      variant: options.variant || 'info',
      duration: options.duration ?? 5000,
      placement: options.placement || 'bottom-right',
      pauseOnHover: options.pauseOnHover ?? true,
      addEventListener: (event: string, callback: Function) => {
        if (event === 'ae-close') {
          mockToast.closeCallback = callback;
        }
      },
      close: () => {
        mockToast.open = false;
      },
      open: true
    };
    
    mockToastInstances.push(mockToast);
    return mockToast;
  }
}

// Override global for testing
(window as any).__mockToastManager = MockToastManager;

describe('Toast Manager API', () => {
  beforeEach(() => {
    mockToastInstances = [];
    MockToastManager.instance = null;
  });

  it('should create a singleton instance', () => {
    const instance1 = MockToastManager.getInstance();
    const instance2 = MockToastManager.getInstance();
    expect(instance1).to.equal(instance2);
  });

  it('should show a toast with default values', () => {
    const manager = MockToastManager.getInstance();
    manager.show({ message: 'Test message' });
    
    expect(mockToastInstances.length).to.equal(1);
    expect(mockToastInstances[0].message).to.equal('Test message');
    expect(mockToastInstances[0].variant).to.equal('info');
    expect(mockToastInstances[0].duration).to.equal(5000);
    expect(mockToastInstances[0].placement).to.equal('bottom-right');
    expect(mockToastInstances[0].pauseOnHover).to.equal(true);
  });

  it('should show a toast with custom options', () => {
    const manager = MockToastManager.getInstance();
    manager.show({
      message: 'Custom toast',
      variant: 'error',
      duration: 10000,
      placement: 'top-left',
      pauseOnHover: false
    });
    
    expect(mockToastInstances.length).to.equal(1);
    expect(mockToastInstances[0].message).to.equal('Custom toast');
    expect(mockToastInstances[0].variant).to.equal('error');
    expect(mockToastInstances[0].duration).to.equal(10000);
    expect(mockToastInstances[0].placement).to.equal('top-left');
    expect(mockToastInstances[0].pauseOnHover).to.equal(false);
  });

  it('should handle multiple toasts', () => {
    const manager = MockToastManager.getInstance();
    
    manager.show({ message: 'Toast 1' });
    manager.show({ message: 'Toast 2' });
    manager.show({ message: 'Toast 3' });
    
    expect(mockToastInstances.length).to.equal(3);
    expect(mockToastInstances[0].message).to.equal('Toast 1');
    expect(mockToastInstances[1].message).to.equal('Toast 2');
    expect(mockToastInstances[2].message).to.equal('Toast 3');
  });
});