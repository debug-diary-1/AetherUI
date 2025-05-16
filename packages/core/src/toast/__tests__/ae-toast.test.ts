/**
 * Web component test for the ae-toast component using @open-wc/testing
 */
import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../ae-toast.js';
import { AeToast } from '../ae-toast.js';

describe('ae-toast', () => {
  let toast: AeToast;

  beforeEach(async () => {
    // Create a fresh component before each test
    toast = await fixture<AeToast>(html`<ae-toast>Test toast message</ae-toast>`);
  });

  it('should be defined', () => {
    // Test that the component is properly defined
    expect(toast).to.exist;
    expect(toast.shadowRoot).to.exist;
  });

  it('should render with default properties', () => {
    // Test default property values
    expect(toast.variant).to.equal('info');
    expect(toast.duration).to.equal(5000);
    expect(toast.textContent?.trim()).to.equal('Test toast message');
  });

  it('should apply the correct variant attribute', async () => {
    // Test setting properties and ensuring they are reflected in the UI
    toast.variant = 'warning';
    await elementUpdated(toast);
    
    // The variant is reflected as an attribute, not a class
    expect(toast.getAttribute('variant')).to.equal('warning');
  });

  it('should handle different variants with appropriate ARIA roles', async () => {
    // Create new instances with different variants since ARIA attributes are set on connected
    const infoToast = await fixture<AeToast>(html`<ae-toast variant="info">Info</ae-toast>`);
    expect(infoToast.getAttribute('role')).to.equal('status');
    expect(infoToast.getAttribute('aria-live')).to.equal('polite');

    const warningToast = await fixture<AeToast>(html`<ae-toast variant="warning">Warning</ae-toast>`);
    expect(warningToast.getAttribute('role')).to.equal('alert');
    expect(warningToast.getAttribute('aria-live')).to.equal('assertive');

    const errorToast = await fixture<AeToast>(html`<ae-toast variant="error">Error</ae-toast>`);
    expect(errorToast.getAttribute('role')).to.equal('alert');
    expect(errorToast.getAttribute('aria-live')).to.equal('assertive');
  });

  it('should close when the close button is clicked', async () => {
    // Setup listener for the custom event
    setTimeout(() => {
      const closeButton = toast.shadowRoot?.querySelector('[part="close"]') as HTMLElement;
      closeButton?.click();
    });
    
    const event = await oneEvent(toast, 'ae-close');
    
    // Verify the event is correct
    expect(event).to.exist;
    expect(event.type).to.equal('ae-close');
    expect(event.detail.source).to.equal('closeButton');
    expect(toast.open).to.be.false;
  });

  it('should show progress bar when duration > 0', async () => {
    toast.duration = 3000;
    await elementUpdated(toast);
    
    const progressBar = toast.shadowRoot?.querySelector('[part="progress"]');
    expect(progressBar).to.exist;
    
    // Check the CSS variable is set
    const style = getComputedStyle(progressBar as Element);
    expect(style.getPropertyValue('--ae-toast-duration') || 
           progressBar?.getAttribute('style')?.includes('--ae-toast-duration')).to.be.ok;
  });

  it('should not show progress bar when duration is 0', async () => {
    toast.duration = 0;
    await elementUpdated(toast);
    
    const progressBar = toast.shadowRoot?.querySelector('[part="progress"]');
    expect(progressBar).to.not.exist;
  });

  it('should handle custom content', async () => {
    const customToast = await fixture<AeToast>(html`
      <ae-toast>
        <div class="custom-content">Custom message</div>
      </ae-toast>
    `);
    
    expect(customToast.textContent?.trim()).to.include('Custom message');
  });

  it('should allow custom icon via slot', async () => {
    const toastWithIcon = await fixture<AeToast>(html`
      <ae-toast>
        <svg slot="icon" width="16" height="16"></svg>
        Toast with custom icon
      </ae-toast>
    `);
    
    const iconSlot = toastWithIcon.shadowRoot?.querySelector('slot[name="icon"]');
    expect(iconSlot).to.exist;
  });
});