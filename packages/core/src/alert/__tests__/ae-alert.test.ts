import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import { beforeEach, describe, it } from 'vitest';
import '../ae-alert';
import { AeAlert } from '../ae-alert';

describe('ae-alert', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert>Alert content</ae-alert>`);
    expect(el.variant).to.equal('info');
    expect(el.closable).to.be.true;
    expect(el.open).to.be.true;
    expect(el.getAttribute('role')).to.equal('status');
  });

  it('renders with custom variant', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert variant="warning">Warning</ae-alert>`);
    expect(el.variant).to.equal('warning');
    expect(el.getAttribute('role')).to.equal('alert');
  });

  it('uses role="alert" for warning and error variants', async () => {
    const warning = await fixture<AeAlert>(html`<ae-alert variant="warning">Warning</ae-alert>`);
    expect(warning.getAttribute('role')).to.equal('alert');
    
    const error = await fixture<AeAlert>(html`<ae-alert variant="error">Error</ae-alert>`);
    expect(error.getAttribute('role')).to.equal('alert');
  });

  it('uses role="status" for info variant', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert variant="info">Info</ae-alert>`);
    expect(el.getAttribute('role')).to.equal('status');
  });

  it('shows close button when closable=true', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert closable>Alert content</ae-alert>`);
    const closeButton = el.shadowRoot!.querySelector('.close-button');
    expect(closeButton).to.exist;
    
    const nonClosable = await fixture<AeAlert>(html`<ae-alert closable="false">Alert content</ae-alert>`);
    const noCloseButton = nonClosable.shadowRoot!.querySelector('.close-button');
    expect(noCloseButton).to.not.exist;
  });

  it('dispatches ae-close event when close button is clicked', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert>Alert content</ae-alert>`);
    
    setTimeout(() => {
      const closeButton = el.shadowRoot!.querySelector('.close-button') as HTMLButtonElement;
      closeButton.click();
    });
    
    const { detail } = await oneEvent(el, 'ae-close');
    expect(detail).to.deep.equal({ source: 'closeButton' });
    expect(el.open).to.be.false;
  });

  it('hides when open=false', async () => {
    const el = await fixture<AeAlert>(html`<ae-alert open>Alert content</ae-alert>`);
    expect(el).to.be.visible;
    
    el.open = false;
    await elementUpdated(el);
    expect(el.style.display).to.equal('none');
  });

  it('allows custom icon via slot', async () => {
    const el = await fixture<AeAlert>(
      html`<ae-alert>
        <svg slot="icon" width="16" height="16"></svg>
        Alert content
      </ae-alert>`
    );
    
    const slot = el.shadowRoot!.querySelector('slot[name="icon"]');
    expect(slot).to.exist;
  });
}); 