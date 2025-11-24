import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeMenu } from '../ae-menu.js';
import { AeMenuItem } from '../ae-menu-item.js';
import { AeMenuDivider } from '../ae-menu-divider.js';
import '../ae-menu.js';
import '../ae-menu-item.js';
import '../ae-menu-divider.js';

describe('ae-menu', () => {
  it('renders menu element', async () => {
    const el = await fixture<AeMenu>(html`<ae-menu></ae-menu>`);
    const menu = el.shadowRoot!.querySelector('[part="base"]');

    expect(menu).to.exist;
  });

  it('has correct ARIA role', async () => {
    const el = await fixture<AeMenu>(html`<ae-menu></ae-menu>`);
    const menu = el.shadowRoot!.querySelector('[part="base"]')!;

    expect(menu.getAttribute('role')).to.equal('menu');
  });

  it('renders menu items', async () => {
    const el = await fixture<AeMenu>(html`
      <ae-menu>
        <ae-menu-item>Item 1</ae-menu-item>
        <ae-menu-item>Item 2</ae-menu-item>
        <ae-menu-item>Item 3</ae-menu-item>
      </ae-menu>
    `);

    const items = el.querySelectorAll('ae-menu-item');
    expect(items.length).to.equal(3);
  });

  it('renders slot content', async () => {
    const el = await fixture<AeMenu>(html`<ae-menu></ae-menu>`);
    const slot = el.shadowRoot!.querySelector('slot');

    expect(slot).to.exist;
  });
});

describe('ae-menu-item', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item>Menu Item</ae-menu-item>
    `);

    expect(el.disabled).to.be.false;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item disabled>Menu Item</ae-menu-item>
    `);

    expect(el.disabled).to.be.true;
  });

  it('renders menu item element', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item>Menu Item</ae-menu-item>
    `);

    const item = el.shadowRoot!.querySelector('[part="base"]');
    expect(item).to.exist;
  });

  it('has correct ARIA role', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item>Menu Item</ae-menu-item>
    `);

    const item = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(item.getAttribute('role')).to.equal('menuitem');
  });

  it('emits ae-menu-item-click event when clicked', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item>Menu Item</ae-menu-item>
    `);

    const item = el.shadowRoot!.querySelector('[part="base"]') as HTMLElement;

    setTimeout(() => item.click());

    const event = await oneEvent(el, 'ae-menu-item-click');
    expect(event).to.exist;
  });

  it('does not emit event when disabled and clicked', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item disabled>Menu Item</ae-menu-item>
    `);

    let eventFired = false;
    el.addEventListener('ae-menu-item-click', () => {
      eventFired = true;
    });

    const item = el.shadowRoot!.querySelector('[part="base"]') as HTMLElement;
    item.click();
    await el.updateComplete;

    expect(eventFired).to.be.false;
  });

  it('applies disabled class when disabled', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item disabled>Menu Item</ae-menu-item>
    `);

    const item = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(item.classList.contains('disabled')).to.be.true;
  });

  it('sets aria-disabled when disabled', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item disabled>Menu Item</ae-menu-item>
    `);

    const item = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(item.getAttribute('aria-disabled')).to.equal('true');
  });

  it('renders slot content', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item>Test Content</ae-menu-item>
    `);

    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('is keyboard accessible', async () => {
    const el = await fixture<AeMenuItem>(html`
      <ae-menu-item>Menu Item</ae-menu-item>
    `);

    const item = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(item.getAttribute('tabindex')).to.exist;
  });
});

describe('ae-menu-divider', () => {
  it('renders divider element', async () => {
    const el = await fixture<AeMenuDivider>(html`<ae-menu-divider></ae-menu-divider>`);
    const divider = el.shadowRoot!.querySelector('[part="base"]');

    expect(divider).to.exist;
  });

  it('has correct ARIA role', async () => {
    const el = await fixture<AeMenuDivider>(html`<ae-menu-divider></ae-menu-divider>`);
    const divider = el.shadowRoot!.querySelector('[part="base"]')!;

    expect(divider.getAttribute('role')).to.equal('separator');
  });

  it('renders as hr element', async () => {
    const el = await fixture<AeMenuDivider>(html`<ae-menu-divider></ae-menu-divider>`);
    const hr = el.shadowRoot!.querySelector('hr');

    expect(hr).to.exist;
  });
});
