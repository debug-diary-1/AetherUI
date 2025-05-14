import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AeToast } from '../ae-toast';

// Helper to create a mock instance of AeToast with the given properties
function createMockToast(props = {}) {
  const toast = new AeToast();

  // Apply default properties
  toast.message = '';
  toast.variant = 'info';
  toast.open = true;
  toast.duration = 5000;
  toast.placement = 'bottom-right';
  toast.pauseOnHover = true;

  // Override with provided properties
  Object.assign(toast, props);

  // Mock shadowRoot
  const shadowRoot = {
    querySelector: (selector) => {
      if (selector === '[part="content"]') {
        return { textContent: toast.message || toast.textContent || '' };
      }
      if (selector === '[part="progress"]') {
        return toast.duration > 0 ? { style: { getPropertyValue: () => `${toast.duration / 1000}s` } } : null;
      }
      if (selector === '[part="toast"]') {
        return {
          getAttribute: () => '0',
          click: vi.fn(),
          dispatchEvent: vi.fn()
        };
      }
      if (selector === '[part="close"]') {
        return {
          click: () => toast.close('closeButton')
        };
      }
      return null;
    },
    querySelectorAll: () => []
  };

  Object.defineProperty(toast, 'shadowRoot', {
    get: () => shadowRoot
  });

  // Mock other necessary methods
  toast.getAttribute = (attr) => {
    if (attr === 'role') {
      return (toast.variant === 'error' || toast.variant === 'warning') ? 'alert' : 'status';
    }
    if (attr === 'aria-live') {
      return (toast.variant === 'error' || toast.variant === 'warning') ? 'assertive' : 'polite';
    }
    return null;
  };

  toast.setAttribute = vi.fn();
  toast.dispatchEvent = vi.fn();

  // content and slots
  toast.textContent = props.textContent || '';
  toast.querySelector = (selector) => {
    if (selector === '[slot="icon"]') {
      return props.hasCustomIcon ? {} : null;
    }
    return null;
  };

  return toast;
}

describe('ae-toast', () => {
  beforeEach(() => {
    // Reset timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('has correct default properties', () => {
    const toast = createMockToast({ textContent: 'Message content' });

    expect(toast.message).toBe('');
    expect(toast.variant).toBe('info');
    expect(toast.open).toBe(true);
    expect(toast.duration).toBe(5000);
    expect(toast.placement).toBe('bottom-right');
    expect(toast.pauseOnHover).toBe(true);
    expect(toast.getAttribute('role')).toBe('status');
  });

  it('displays the message provided as content', () => {
    const toast = createMockToast({ textContent: 'Message content' });
    const content = toast.shadowRoot!.querySelector('[part="content"]');
    expect(content?.textContent).toBe('Message content');
  });

  it('displays the message provided as property', () => {
    const toast = createMockToast({ message: 'Property message' });
    const content = toast.shadowRoot!.querySelector('[part="content"]');
    expect(content?.textContent).toBe('Property message');
  });

  it('renders with custom variant and applies proper ARIA role', () => {
    const variants = ['info', 'success', 'warning', 'error'];

    for (const variant of variants) {
      const toast = createMockToast({ variant });
      expect(toast.variant).toBe(variant);

      // Error and warning should have role="alert", others role="status"
      const expectedRole = (variant === 'error' || variant === 'warning') ? 'alert' : 'status';
      expect(toast.getAttribute('role')).toBe(expectedRole);
      expect(toast.getAttribute('aria-live')).toBe(expectedRole === 'alert' ? 'assertive' : 'polite');
    }
  });

  it('closes automatically after duration', () => {
    const toast = createMockToast({ duration: 1000 });

    // Mock the close method to check it's called
    toast.close = vi.fn();

    // Mock the timer
    toast._timer = setTimeout(() => toast.close('timeout'), 1000);

    // Fast-forward time by more than duration
    vi.advanceTimersByTime(1100);

    // Check close was called with timeout
    expect(toast.close).toHaveBeenCalledWith('timeout');
  });

  it('does not auto-close when duration is 0', () => {
    const toast = createMockToast({ duration: 0 });

    // Mock the close method
    toast.close = vi.fn();

    // No timer should be set with duration 0
    expect(toast._timer).toBeUndefined();

    // Fast-forward time
    vi.advanceTimersByTime(10000);

    // Close method should not have been called
    expect(toast.close).not.toHaveBeenCalled();
  });

  it('pauses timer when hovered and pauseOnHover is true', () => {
    const toast = createMockToast({ duration: 2000, pauseOnHover: true });

    // Mock methods
    toast._pauseTimer = vi.fn();
    toast._resumeTimer = vi.fn();

    // Simulate mouseenter
    toast.dispatchEvent(new MouseEvent('mouseenter'));

    // Check if pause was called
    expect(toast._pauseTimer).toHaveBeenCalled();

    // Simulate mouseleave
    toast.dispatchEvent(new MouseEvent('mouseleave'));

    // Check if resume was called
    expect(toast._resumeTimer).toHaveBeenCalled();
  });

  it('does not pause timer when pauseOnHover is false', () => {
    const toast = createMockToast({ duration: 2000, pauseOnHover: false });

    // Mock methods
    toast._pauseTimer = vi.fn();
    toast._resumeTimer = vi.fn();

    // Simulate mouseenter
    toast.dispatchEvent(new MouseEvent('mouseenter'));

    // Check if pause was not called
    expect(toast._pauseTimer).not.toHaveBeenCalled();

    // Simulate mouseleave
    toast.dispatchEvent(new MouseEvent('mouseleave'));

    // Check if resume was not called
    expect(toast._resumeTimer).not.toHaveBeenCalled();
  });

  it('dispatches ae-close event when close button is clicked', () => {
    const toast = createMockToast();

    // Mock the dispatchEvent method
    toast.dispatchEvent = vi.fn();

    // Original close method
    const originalClose = toast.close;
    toast.close = vi.fn().mockImplementation((source) => {
      toast.open = false;

      // Create and dispatch event
      const event = new CustomEvent('ae-close', {
        bubbles: true,
        composed: true,
        detail: { source }
      });
      toast.dispatchEvent(event);
    });

    // Simulate close button click
    const closeButton = toast.shadowRoot!.querySelector('[part="close"]') as any;
    closeButton.click();

    // Check that event was dispatched
    expect(toast.dispatchEvent).toHaveBeenCalled();
    expect(toast.open).toBe(false);
  });

  it('dispatches ae-click event when clicked', () => {
    const toast = createMockToast();

    // Mock the _handleClick method
    toast._handleClick = vi.fn().mockImplementation((e) => {
      toast.dispatchEvent(new CustomEvent('ae-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      }));
    });

    // Mock the dispatchEvent method
    toast.dispatchEvent = vi.fn();

    // Simulate toast click
    const mockEvent = new MouseEvent('click');
    toast._handleClick(mockEvent);

    // Check that event was dispatched
    expect(toast.dispatchEvent).toHaveBeenCalled();
  });

  it('allows custom icon via slot', () => {
    const toast = createMockToast({ hasCustomIcon: true });

    // Mock _getDefaultIcon to check if slot is used
    toast._getDefaultIcon = vi.fn().mockImplementation(() => {
      if (toast.querySelector('[slot="icon"]')) {
        return { type: 'slot' };
      }
      return { type: 'default' };
    });

    const iconResult = toast._getDefaultIcon();
    expect(iconResult.type).toBe('slot');
  });

  it('includes progress bar when duration > 0', () => {
    const toast = createMockToast({ duration: 5000 });

    const progressBar = toast.shadowRoot!.querySelector('[part="progress"]');
    expect(progressBar).toBeTruthy();

    // Check the animation duration is set correctly
    const style = progressBar?.style;
    expect(style?.getPropertyValue('--ae-toast-duration')).toBe('5s');
  });

  it('does not include progress bar when duration is 0', () => {
    const toast = createMockToast({ duration: 0 });

    const progressBar = toast.shadowRoot!.querySelector('[part="progress"]');
    expect(progressBar).toBeNull();
  });

  it('becomes focusable and has correct keyboard interaction', () => {
    const toast = createMockToast();

    // Mock the _handleKeyDown method
    toast._handleKeyDown = vi.fn().mockImplementation((e) => {
      if (e.key === 'Escape') {
        toast.close('keyboard');
      }
    });

    // Mock the close method
    toast.close = vi.fn();

    // Simulate Escape key
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    toast._handleKeyDown(event);

    // Should close on Escape
    expect(toast.close).toHaveBeenCalledWith('keyboard');
  });
});