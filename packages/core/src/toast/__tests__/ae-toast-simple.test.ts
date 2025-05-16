/**
 * Simple test for the ae-toast component using @open-wc/testing
 */
import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import '../ae-toast.js';
import { AeToast } from '../ae-toast.js';

describe('ae-toast - simple test', () => {
  let toast: AeToast;
  
  beforeEach(async () => {
    toast = await fixture<AeToast>(html`<ae-toast>Test toast message</ae-toast>`);
  });
  
  it('should have default properties', () => {
    expect(toast.variant).to.equal('info');
    expect(toast.duration).to.equal(5000);
    expect(toast.textContent?.trim()).to.equal('Test toast message');
  });
  
  it('should update properties correctly', async () => {
    toast.variant = 'warning';
    toast.duration = 2000;
    
    await elementUpdated(toast);
    
    expect(toast.variant).to.equal('warning');
    expect(toast.duration).to.equal(2000);
    expect(toast.getAttribute('variant')).to.equal('warning');
  });
  
  it('should use correct ARIA attributes', async () => {
    // Create toasts with different variants to test ARIA attributes set on connect
    const warningToast = await fixture<AeToast>(html`<ae-toast variant="warning">Warning</ae-toast>`);
    expect(warningToast.getAttribute('role')).to.equal('alert');
    expect(warningToast.getAttribute('aria-live')).to.equal('assertive');
    
    const infoToast = await fixture<AeToast>(html`<ae-toast variant="info">Info</ae-toast>`);
    expect(infoToast.getAttribute('role')).to.equal('status');
    expect(infoToast.getAttribute('aria-live')).to.equal('polite');
  });
});