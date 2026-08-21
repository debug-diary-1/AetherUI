import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import type { AeModal } from '../index.js';
import '../index.js';

describe('ae-modal', () => {
  it('renders an accessible dialog only while open', async () => {
    const element = await fixture<AeModal>(html`
      <ae-modal open aria-label="Confirm deletion"></ae-modal>
    `);
    const dialog = element.shadowRoot!.querySelector('[role="dialog"]')!;

    expect(dialog.getAttribute('aria-modal')).to.equal('true');
    expect(dialog.getAttribute('aria-label')).to.equal('Confirm deletion');

    element.open = false;
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('[role="dialog"]')).to.not.exist;
  });

  it('closes on Escape and emits its public close event', async () => {
    const element = await fixture<AeModal>(html`<ae-modal open></ae-modal>`);
    const closed = oneEvent(element, 'ae-modal-close');

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await closed;

    expect(element.open).to.be.false;
  });
});
