import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../ae-alert';
import { AeAlert } from '../ae-alert';

describe('ae-alert', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert>Test message</ae-alert>`);
    
    expect(el.variant).to.equal('info');
    expect(el.closable).to.be.false;
    expect(el.open).to.be.true;
  });

  it('renders with custom variant', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert variant="error">Error message</ae-alert>`);
    
    expect(el.variant).to.equal('error');
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });

  it('uses role="alert" for warning and error variants', async () => {
    const warning = await fixture<AeAlert>(html`<ae-alert variant="warning">Warning</ae-alert>`);
    const error = await fixture<AeAlert>(html`<ae-alert variant="error">Error</ae-alert>`);
    
    expect(warning.shadowRoot!.querySelector('[role="alert"]')).to.exist;
    expect(error.shadowRoot!.querySelector('[role="alert"]')).to.exist;
  });

  it('uses role="status" for info variant', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert variant="info">Info</ae-alert>`);
    
    expect(el.shadowRoot!.querySelector('[role="status"]')).to.exist;
  });

  it('shows close button when closable=true', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert closable>Closable alert</ae-alert>`);
    
    const closeButton = el.shadowRoot!.querySelector('[part="close"]');
    expect(closeButton).to.exist;
    expect(closeButton!.getAttribute('aria-label')).to.equal('Close');
  });

  it('dispatches ae-close event when close button is clicked', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert closable>Closable alert</ae-alert>`);
    
    const closeButton = el.shadowRoot!.querySelector('[part="close"]');
    
    setTimeout(() => closeButton!.dispatchEvent(new MouseEvent('click')));
    const { type } = await oneEvent(el, 'ae-close');
    
    expect(type).to.equal('ae-close');
    expect(el.open).to.be.false;
  });

  it('hides when open=false', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert>Visible alert</ae-alert>`);
    
    el.open = false;
    await elementUpdated(el);
    
    const renderResult = el.shadowRoot!.innerHTML;
    expect(renderResult).to.not.include('part="base"');
  });

  it('allows custom icon via slot', async () => {
    const el = await fixture<AeAlert>(html`
      <ae-alert>
        <svg slot="icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2z"/>
        </svg>
        Alert with custom icon
      </ae-alert>
    `);
    
    const slotted = el.querySelector('[slot="icon"]');
    expect(slotted).to.exist;
  });
}); 