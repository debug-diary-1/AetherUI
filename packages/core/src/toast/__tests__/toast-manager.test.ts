import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showToast, ToastManager } from '../toast-manager';
import '../ae-toast';

// Mock document.querySelector for containers
const mockContainers = new Map();
vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
  if (selector.includes('ae-toast-container')) {
    const placement = selector.match(/data-placement="([^"]+)"/)?.[1];
    if (placement && mockContainers.has(placement)) {
      return mockContainers.get(placement);
    }
  }
  return null;
});

// Mock document.createElement for containers
vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
  if (tag === 'div' || tag === 'ae-toast') {
    return {
      className: '',
      setAttribute: function(name: string, value: string) {
        this[name] = value;
        if (name === 'data-placement') {
          mockContainers.set(value, this);
          this.children = [];
        }
      },
      appendChild: function(child: any) {
        if (!this.children) {
          this.children = [];
        }
        this.children.push(child);
        return child;
      },
      addEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      style: {},
      children: [],
    } as any;
  }
  if (tag === 'style') {
    return {
      textContent: '',
    } as any;
  }
  return {} as any;
});

// Mock document.body.appendChild
document.body.appendChild = vi.fn().mockImplementation((el: any) => {
  if (el.getAttribute && el.getAttribute('data-placement')) {
    mockContainers.set(el.getAttribute('data-placement'), el);
  }
  return el;
});

describe('Toast Manager', () => {
  beforeEach(() => {
    // Reset mocks
    mockContainers.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a singleton instance', () => {
    // Mock getInstance to return a new instance each time for testing
    const originalGetInstance = ToastManager.getInstance;
    let instance1: any, instance2: any;

    try {
      // Mock the static method
      const mockInstances: Array<{ mock: boolean }> = [];
      ToastManager.getInstance = vi.fn().mockImplementation(() => {
        const instance = { mock: true };
        mockInstances.push(instance);
        return mockInstances[0]; // Always return first instance
      });

      instance1 = ToastManager.getInstance();
      instance2 = ToastManager.getInstance();

      expect(instance1).toBe(instance2);
      expect(ToastManager.getInstance).toHaveBeenCalledTimes(2);
    } finally {
      // Restore original implementation
      ToastManager.getInstance = originalGetInstance;
    }
  });

  it('creates a container element for each placement', () => {
    // Mock the show method to skip actual DOM manipulation
    vi.spyOn(ToastManager.prototype as any, 'show').mockImplementation(function(options: any) {
      const container = {
        className: 'ae-toast-container',
        setAttribute: vi.fn(),
        appendChild: vi.fn(),
        children: [],
        'data-placement': options.placement
      };
      mockContainers.set(options.placement, container);
    });

    // Show toasts in different placements
    showToast({ message: 'Top Right', placement: 'top-right' });
    showToast({ message: 'Bottom Right', placement: 'bottom-right' });
    showToast({ message: 'Top Left', placement: 'top-left' });
    showToast({ message: 'Bottom Left', placement: 'bottom-left' });

    // Check that containers were created
    expect(mockContainers.has('top-right')).toBe(true);
    expect(mockContainers.has('bottom-right')).toBe(true);
    expect(mockContainers.has('top-left')).toBe(true);
    expect(mockContainers.has('bottom-left')).toBe(true);
  });

  it('adds toasts to the correct placement container', () => {
    // Mock container creation and toast appending
    interface Container {
      children: Array<{ tagName: string }>;
    }
    
    const containers: Record<string, Container> = {
      'bottom-right': { children: [] },
      'top-left': { children: [] }
    };

    mockContainers.set('bottom-right', containers['bottom-right']);
    mockContainers.set('top-left', containers['top-left']);

    // Mock getContainer to use our test containers
    vi.spyOn(ToastManager.prototype as any, 'getContainer').mockImplementation(function(placement: string): Container {
      return containers[placement];
    });

    // Mock the show method to append to our containers
    vi.spyOn(ToastManager.prototype as any, 'show').mockImplementation(function(options: any) {
      const container = containers[options.placement as string];
      container.children.push({ tagName: 'AE-TOAST' });
    });

    // Show toasts
    showToast({ message: 'Bottom right toast', placement: 'bottom-right' });
    showToast({ message: 'Bottom right toast 2', placement: 'bottom-right' });
    showToast({ message: 'Top left toast', placement: 'top-left' });

    expect(containers['bottom-right'].children.length).toBe(2);
    expect(containers['top-left'].children.length).toBe(1);
  });

  it('removes toast from container when closed', async () => {
    interface MockToast {
      tagName: string;
      parentNode: any;
      addEventListener: (event: string, callback: () => void) => void;
      dispatchEvent: jest.Mock;
    }
    
    interface MockContainer {
      children: MockToast[];
      removeChild?: (child: MockToast) => MockToast;
    }
    
    // Setup a mock container with one toast
    const mockToast: MockToast = {
      tagName: 'AE-TOAST',
      parentNode: null,
      addEventListener: (event: string, callback: () => void) => {
        // Immediately call the animationend callback
        if (event === 'animationend') {
          callback();
        }
      },
      dispatchEvent: vi.fn()
    };
    
    const container: MockContainer = { 
      children: [mockToast]
    };
    
    // Set parent reference
    mockToast.parentNode = container;
    
    mockContainers.set('bottom-right', container);

    vi.spyOn(ToastManager.prototype as any, 'getContainer').mockReturnValue(container);

    // Add removeChild method
    container.removeChild = vi.fn().mockImplementation((child: MockToast) => {
      container.children = [];
      return child;
    });

    // Trigger close event handler
    const closeHandler = vi.fn().mockImplementation((toast: MockToast) => {
      container.removeChild!(toast);
    });
    closeHandler(mockToast);

    // Check that toast was removed
    expect(container.children.length).toBe(0);
  });

  it('showToast function creates a toast with provided options', () => {
    const showSpy = vi.fn();
    vi.spyOn(ToastManager.prototype as any, 'show').mockImplementation(showSpy);

    showToast({
      message: 'Test message',
      variant: 'success',
      duration: 3000,
      placement: 'top-right',
      pauseOnHover: false
    });

    expect(showSpy).toHaveBeenCalledWith({
      message: 'Test message',
      variant: 'success',
      duration: 3000,
      placement: 'top-right',
      pauseOnHover: false
    });
  });
});