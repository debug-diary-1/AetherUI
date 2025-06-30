import { expect } from '@open-wc/testing';
import { showToast, createToastHelpers } from '../api';

// Simple mock for ToastManager
let mockShowCalls: any[] = [];

// Override the toast manager for testing
(window as any).__mockToastManager = {
  show: (options: any) => {
    mockShowCalls.push(options);
  }
};

describe('Toast API', () => {
  beforeEach(() => {
    mockShowCalls = [];
  });

  it('showToast calls the manager show method', () => {
    showToast({
      message: 'Test message',
      variant: 'success',
      duration: 3000
    });

    expect(mockShowCalls.length).to.equal(1);
    expect(mockShowCalls[0]).to.deep.equal({
      message: 'Test message',
      variant: 'success',
      duration: 3000
    });
  });

  it('createToastHelpers returns convenience methods for each variant', () => {
    const helpers = createToastHelpers();

    // Test each helper
    helpers.info('Info message', { duration: 3000 });
    expect(mockShowCalls[0]).to.deep.equal({
      message: 'Info message',
      variant: 'info',
      duration: 3000
    });

    helpers.success('Success message');
    expect(mockShowCalls[1]).to.deep.equal({
      message: 'Success message',
      variant: 'success'
    });

    helpers.warning('Warning message');
    expect(mockShowCalls[2]).to.deep.equal({
      message: 'Warning message',
      variant: 'warning'
    });

    helpers.error('Error message');
    expect(mockShowCalls[3]).to.deep.equal({
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

    expect(mockShowCalls[0]).to.deep.equal({
      message: 'Success message',
      variant: 'success',
      duration: 10000,
      placement: 'top-left',
      pauseOnHover: false
    });
  });
});