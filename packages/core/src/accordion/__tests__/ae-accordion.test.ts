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

  it('uses the authored identity when an open item is inserted after upgrade', async () => {
    const accordion = await fixture<AeAccordion>(html`<ae-accordion></ae-accordion>`);
    accordion.innerHTML = `
      <ae-accordion-item open header-id="shipping">
        <span slot="header">Shipping</span>
      </ae-accordion-item>`;
    const item = accordion.querySelector('ae-accordion-item') as AeAccordionItem;
    await item.updateComplete;
    await new Promise((resolve) => setTimeout(resolve));

    expect(item.headerId).to.equal('shipping');
    expect(item.open).to.be.true;
    expect(accordion.value).to.deep.equal(['shipping']);
  });

  it('does not synchronize nested accordion items from the outer accordion', async () => {
    const outer = await fixture<AeAccordion>(html`
      <ae-accordion>
        <ae-accordion-item header-id="outer">
          <span slot="header">Outer</span>
          <ae-accordion multiselectable>
            <ae-accordion-item header-id="inner">
              <span slot="header">Inner</span>
            </ae-accordion-item>
          </ae-accordion>
        </ae-accordion-item>
      </ae-accordion>
    `);
    const inner = outer.querySelector('ae-accordion') as AeAccordion;
    const innerItem = inner.querySelector('ae-accordion-item') as AeAccordionItem;
    innerItem.open = true;
    await innerItem.updateComplete;
    await inner.updateComplete;

    outer.value = ['outer'];
    await outer.updateComplete;
    await innerItem.updateComplete;

    expect(inner.value).to.deep.equal(['inner']);
    expect(innerItem.open).to.be.true;
  });

  it('does not emit public change events while initializing authored open items', async () => {
    const host = await fixture<HTMLDivElement>(html`<div></div>`);
    const accordion = document.createElement('ae-accordion') as AeAccordion;
    accordion.innerHTML = `
      <ae-accordion-item header-id="first" open></ae-accordion-item>
      <ae-accordion-item header-id="second" open></ae-accordion-item>`;
    let changes = 0;
    accordion.addEventListener('ae-accordion-change', () => changes++);
    accordion.addEventListener('ae-expand-change', () => changes++);
    host.append(accordion);
    await accordion.updateComplete;
    await Promise.all(
      Array.from(accordion.querySelectorAll('ae-accordion-item'), (item) => item.updateComplete),
    );

    expect(changes).to.equal(0);
    expect(accordion.value).to.deep.equal(['first']);
  });

  it('gives value precedence over expanded regardless of attribute order', async () => {
    for (const attributes of [
      `value='["canonical"]' expanded='["legacy"]'`,
      `expanded='["legacy"]' value='["canonical"]'`,
    ]) {
      const host = await fixture<HTMLDivElement>(html`<div></div>`);
      host.innerHTML = `<ae-accordion ${attributes}></ae-accordion>`;
      const accordion = host.firstElementChild as AeAccordion;
      await accordion.updateComplete;
      expect(accordion.value).to.deep.equal(['canonical']);
    }
  });

  it('publishes the next value before notifying a sibling that it closed', async () => {
    const accordion = await fixture<AeAccordion>(html`
      <ae-accordion value='["first"]'>
        <ae-accordion-item header-id="first"></ae-accordion-item>
        <ae-accordion-item header-id="second"></ae-accordion-item>
      </ae-accordion>
    `);
    const [first, second] = Array.from(
      accordion.querySelectorAll('ae-accordion-item'),
    ) as AeAccordionItem[];
    let observedValue: string[] | undefined;
    first.addEventListener('ae-accordion-item-change', (event) => {
      if (!(event as CustomEvent).detail.open) observedValue = [...accordion.value];
    });

    second.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await accordion.updateComplete;
    expect(observedValue).to.deep.equal(['second']);
  });

  it('copies arrays assigned through the expanded compatibility alias', async () => {
    const accordion = await fixture<AeAccordion>(html`<ae-accordion></ae-accordion>`);
    const expanded = ['first'];
    accordion.expanded = expanded;
    expanded.push('second');
    await accordion.updateComplete;

    expect(accordion.value).to.deep.equal(['first']);
  });
});
