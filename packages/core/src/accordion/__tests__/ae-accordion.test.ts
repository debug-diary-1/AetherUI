import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import type { AeAccordion, AeAccordionItem } from '../index.js';
import '../index.js';

describe('ae-accordion', () => {
  it('exposes accessible disclosure state', async () => {
    const item = await fixture<AeAccordionItem>(html`
      <ae-accordion-item header-id="shipping">
        <span slot="header">Shipping</span>
        Details
      </ae-accordion-item>
    `);

    const button = item.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-expanded')).to.equal('false');

    button.click();
    await item.updateComplete;

    expect(item.open).to.be.true;
    expect(button.getAttribute('aria-expanded')).to.equal('true');
  });

  it('keeps a single panel open and reports the selected value', async () => {
    const accordion = await fixture<AeAccordion>(html`
      <ae-accordion>
        <ae-accordion-item header-id="first"><span slot="header">First</span></ae-accordion-item>
        <ae-accordion-item header-id="second"><span slot="header">Second</span></ae-accordion-item>
      </ae-accordion>
    `);
    const items = Array.from(accordion.querySelectorAll('ae-accordion-item'));

    items[0].shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await accordion.updateComplete;

    const changed = oneEvent(accordion, 'ae-accordion-change');
    items[1].shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    const event = (await changed) as CustomEvent<{ value: string[] }>;

    expect(event.detail.value).to.deep.equal(['second']);
    expect(items[0].open).to.be.false;
    expect(items[1].open).to.be.true;
  });
});
