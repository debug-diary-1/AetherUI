import { html, fixture, expect, waitUntil } from '@open-wc/testing';
import { AeAlert } from '../ae-alert.js';
import '../ae-alert.js'; // This imports and registers the custom element

describe('ae-alert', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert>Alert content</ae-alert>`);

    expect(el.variant).to.equal('info');
    expect(el.closable).to.be.false;
    expect(el.open).to.be.true;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeAlert>(html`
      <ae-alert variant="error" closable>Alert content</ae-alert>
    `);

    expect(el.variant).to.equal('error');
    expect(el.closable).to.be.true;
    expect(el.open).to.be.true; // Default is true
  });

  it('handles open state changes', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert>Alert content</ae-alert>`);
    
    expect(el.open).to.be.true;
    
    // Set open to false
    el.open = false;
    await el.updateComplete;
    
    expect(el.open).to.be.false;
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.be.null;
  });

  it('renders correct role based on variant', async () => {
    const infoEl = await fixture<AeAlert>(html`<ae-alert>Info alert</ae-alert>`);
    const errorEl = await fixture<AeAlert>(html`<ae-alert variant="error">Error alert</ae-alert>`);

    // Check the rendered DOM role attribute
    const infoSection = infoEl.shadowRoot!.querySelector('[part="base"]');
    const errorSection = errorEl.shadowRoot!.querySelector('[part="base"]');

    expect(infoSection?.getAttribute('role')).to.equal('status');
    expect(errorSection?.getAttribute('role')).to.equal('alert');
  });

  it('shows close button when closable is true', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert closable>Alert content</ae-alert>`);
    const closeButton = el.shadowRoot!.querySelector('[part="close"]');
    expect(closeButton).to.exist;
  });

  it('emits ae-close event when closed', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert closable>Alert content</ae-alert>`);
    
    let eventFired = false;
    el.addEventListener('ae-close', () => {
      eventFired = true;
    });

    const closeButton = el.shadowRoot!.querySelector('[part="close"]') as HTMLButtonElement;
    expect(closeButton).to.exist;
    
    closeButton.click();

    // Wait for event to propagate
    await waitUntil(() => eventFired, 'Close event was not fired');
    
    expect(eventFired).to.be.true;
    expect(el.open).to.be.false;
  });
});