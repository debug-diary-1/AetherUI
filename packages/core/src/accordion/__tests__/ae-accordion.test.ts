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

  it('keeps the legacy expanded property and event working', async () => {
    const accordion = await fixture<AeAccordion>(html`
      <ae-accordion .expanded=${['first']}>
        <ae-accordion-item headerid="first"><span slot="header">First</span></ae-accordion-item>
        <ae-accordion-item headerid="second"><span slot="header">Second</span></ae-accordion-item>
      </ae-accordion>
    `);
    const items = Array.from(accordion.querySelectorAll('ae-accordion-item'));
    expect(items[0].open).to.be.true;

    const changed = oneEvent(accordion, 'ae-expand-change');
    items[1].shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    const event = (await changed) as CustomEvent<{ expanded: string[] }>;

    expect(event.detail.expanded).to.deep.equal(['second']);
    expect((accordion as AeAccordion & { expanded: string[] }).expanded).to.deep.equal(['second']);
  });

  it('updates the selected identity when an open item headerId changes', async () => {
    const accordion = await fixture<AeAccordion>(html`
      <ae-accordion value='["shipping"]'>
        <ae-accordion-item header-id="shipping"
          ><span slot="header">Shipping</span></ae-accordion-item
        >
      </ae-accordion>
    `);
    const item = accordion.querySelector('ae-accordion-item') as AeAccordionItem;
    await accordion.updateComplete;

    item.headerId = 'delivery';
    await item.updateComplete;
    await new Promise((resolve) => setTimeout(resolve));

    expect(accordion.value).to.deep.equal(['delivery']);
    expect(item.open).to.be.true;
  });

  it('allows a controlled value to clear from a change handler', async () => {
    const accordion = await fixture<AeAccordion>(html`
      <ae-accordion .expanded=${['first']}>
        <ae-accordion-item header-id="first"><span slot="header">First</span></ae-accordion-item>
        <ae-accordion-item header-id="second"><span slot="header">Second</span></ae-accordion-item>
      </ae-accordion>
    `);
    const second = accordion.querySelectorAll('ae-accordion-item')[1] as AeAccordionItem;
    accordion.addEventListener('ae-accordion-change', () => {
      accordion.value = [];
    });

    second.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await accordion.updateComplete;
    await second.updateComplete;

    expect(accordion.value).to.deep.equal([]);
    expect(accordion.expanded).to.deep.equal([]);
    expect(second.open).to.be.false;
  });

  it('does not restore a stale reflected identity when an item reconnects', async () => {
    const accordion = await fixture<AeAccordion>(html`<ae-accordion></ae-accordion>`);
    const item = document.createElement('ae-accordion-item') as AeAccordionItem;
    const originalId = item.headerId;
    item.setAttribute('data-header-id', originalId);
    item.headerId = 'renamed';

    accordion.append(item);
    await item.updateComplete;

    expect(item.headerId).to.equal('renamed');
    expect(item.getAttribute('data-header-id')).to.equal('renamed');
  });

  it('honors defaultValue and initially open items on the first update', async () => {
    const withDefault = await fixture<AeAccordion>(html`
      <ae-accordion default-value='["first"]'>
        <ae-accordion-item header-id="first"><span slot="header">First</span></ae-accordion-item>
      </ae-accordion>
    `);
    const defaultItem = withDefault.querySelector('ae-accordion-item') as AeAccordionItem;
    expect(defaultItem.open).to.be.true;
    expect(withDefault.value).to.deep.equal(['first']);

    const withOpenItem = await fixture<AeAccordion>(html`
      <ae-accordion>
        <ae-accordion-item header-id="shipping" open
          ><span slot="header">Shipping</span></ae-accordion-item
        >
      </ae-accordion>
    `);
    const openItem = withOpenItem.querySelector('ae-accordion-item') as AeAccordionItem;
    expect(openItem.open).to.be.true;
    expect(withOpenItem.value).to.deep.equal(['shipping']);
  });

  it('coordinates programmatic item open changes through the compatibility events', async () => {
    const accordion = await fixture<AeAccordion>(html`
      <ae-accordion>
        <ae-accordion-item header-id="first"><span slot="header">First</span></ae-accordion-item>
        <ae-accordion-item header-id="second"><span slot="header">Second</span></ae-accordion-item>
      </ae-accordion>
    `);
    const items = Array.from(accordion.querySelectorAll('ae-accordion-item')) as AeAccordionItem[];

    const firstChange = oneEvent(accordion, 'ae-expand-change');
    items[0].open = true;
    await firstChange;
    const secondChange = oneEvent(accordion, 'ae-expand-change');
    items[1].open = true;
    const event = (await secondChange) as CustomEvent<{
      expanded: string[];
    }>;
    await items[0].updateComplete;

    expect(event.detail.expanded).to.deep.equal(['second']);
    expect(items[0].open).to.be.false;
    expect(accordion.value).to.deep.equal(['second']);
  });
});
