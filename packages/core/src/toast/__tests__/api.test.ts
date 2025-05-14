import { describe, it, expect, vi, beforeEach } from 'vitest';
import { showToast, createToastHelpers } from '../api';
import { ToastManager } from '../toast-manager';

// Mock the ToastManager.getInstance
const mockShow = vi.fn();
vi.mock('../toast-manager', () => {
  return {
    ToastManager: {
      getInstance: () => ({
        show: mockShow
      })
    },
    showToast: (options: any) => {
      ToastManager.getInstance().show(options);
    }
  };
});

describe('Toast API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('showToast calls the manager show method', () => {
    showToast({
      message: 'Test message',
      variant: 'success',
      duration: 3000
    });

    expect(mockShow).toHaveBeenCalledWith({
      message: 'Test message',
      variant: 'success',
      duration: 3000
    });
  });

  it('createToastHelpers returns convenience methods for each variant', () => {
    const helpers = createToastHelpers();

    // Test each helper
    helpers.info('Info message', { duration: 3000 });
    expect(mockShow).toHaveBeenNthCalledWith(1, {
      message: 'Info message',
      variant: 'info',
      duration: 3000
    });

    helpers.success('Success message');
    expect(mockShow).toHaveBeenNthCalledWith(2, {
      message: 'Success message',
      variant: 'success'
    });

    helpers.warning('Warning message');
    expect(mockShow).toHaveBeenNthCalledWith(3, {
      message: 'Warning message',
      variant: 'warning'
    });

    helpers.error('Error message');
    expect(mockShow).toHaveBeenNthCalledWith(4, {
      message: 'Error message',
      variant: 'error'
    });
  });

  it('helper methods pass through all options', () => {
    const helpers = createToastHelpers();

    helpers.success('Success message', {
      duration: 10000,
      placement: 'top-left',
      pauseOnHover: false
    });

    expect(mockShow).toHaveBeenCalledWith({
      message: 'Success message',
      variant: 'success',
      duration: 10000,
      placement: 'top-left',
      pauseOnHover: false
    });
  });
});