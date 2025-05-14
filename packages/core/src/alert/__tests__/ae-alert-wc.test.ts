/**
 * Web component test for the ae-alert component using @open-wc/testing
 */
import '../../../src/test-lit-polyfill'; // Import polyfill to fix DOM issues
import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import '../ae-alert';

// Type definition for the component
interface AlertComponent extends HTMLElement {
  variant: string;
  open: boolean;
  icon: string;
}

describe('ae-alert', () => {
  let element: AlertComponent;

  beforeEach(async () => {
    // Create a fresh component before each test
    element = await fixture<AlertComponent>(html`<ae-alert>Test alert message</ae-alert>`);
  });

  it('should be defined', () => {
    // Test that the component is properly defined
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  it('should render with default properties', () => {
    // Test default property values
    expect(element.variant).to.equal('info');
    expect(element.open).to.be.true;
    expect(element.textContent?.trim()).to.equal('Test alert message');
  });

  it('should apply the correct variant class', async () => {
    // Test setting properties and ensuring they are reflected in the UI
    element.variant = 'warning';
    await elementUpdated(element);
    
    // Get the alert container from the shadow DOM
    const alertContainer = element.shadowRoot?.querySelector('.alert');
    expect(alertContainer?.classList.contains('warning')).to.be.true;
  });

  it('should hide when open is false', async () => {
    // Test hiding the component
    element.open = false;
    await elementUpdated(element);
    
    // Get the alert container and check it has the hidden attribute
    const alertContainer = element.shadowRoot?.querySelector('.alert');
    expect(alertContainer?.hasAttribute('hidden')).to.be.true;
  });

  it('should dispatch close event when the close button is clicked', async () => {
    // Test event handling
    const closeButton = element.shadowRoot?.querySelector('.close-button');
    
    // Setup listener for the custom event
    setTimeout(() => closeButton?.dispatchEvent(new MouseEvent('click')));
    const event = await oneEvent(element, 'close');
    
    // Verify the event is correct
    expect(event).to.exist;
    expect(event.type).to.equal('close');
  });
});