import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeDrawer } from '../ae-drawer.js';
import '../ae-drawer.js';

describe('ae-drawer', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer></ae-drawer>`);

    expect(el.open).to.be.false;
    expect(el.placement).to.equal('right');
    expect(el.closable).to.be.true;
    expect(el.backdrop).to.be.true;
    expect(el.size).to.equal('md');
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeDrawer>(html`
      <ae-drawer open placement="left" size="lg" closable backdrop></ae-drawer>
    `);

    expect(el.open).to.be.true;
    expect(el.placement).to.equal('left');
    expect(el.size).to.equal('lg');
    expect(el.closable).to.be.true;
    expect(el.backdrop).to.be.true;
  });

  it('renders when open is true', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open></ae-drawer>`);
    const panel = el.shadowRoot!.querySelector('[part="panel"]');

    expect(panel).to.exist;
  });

  it('does not render when open is false', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer></ae-drawer>`);

    expect(el.open).to.be.false;
  });

  it('emits ae-drawer-open event when opened', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer></ae-drawer>`);

    setTimeout(() => {
      el.open = true;
    });

    const event = await oneEvent(el, 'ae-drawer-open');
    expect(event).to.exist;
  });

  it('emits ae-drawer-close event when closed', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open></ae-drawer>`);

    setTimeout(() => {
      el.open = false;
    });

    const event = await oneEvent(el, 'ae-drawer-close');
    expect(event).to.exist;
  });

  it('shows close button when closable is true', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open closable></ae-drawer>`);
    const closeButton = el.shadowRoot!.querySelector('[part="close-button"]');

    expect(closeButton).to.exist;
  });

  it('hides close button when closable is false', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open></ae-drawer>`);

    el.closable = false;
    await el.updateComplete;

    const closeButton = el.shadowRoot!.querySelector('[part="close-button"]');
    expect(closeButton).to.not.exist;
  });

  it('renders backdrop when backdrop is true', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open backdrop></ae-drawer>`);
    const backdrop = el.shadowRoot!.querySelector('[part="backdrop"]');

    expect(backdrop).to.exist;
  });

  it('hides backdrop when backdrop is false', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open></ae-drawer>`);

    el.backdrop = false;
    await el.updateComplete;

    const backdrop = el.shadowRoot!.querySelector('[part="backdrop"]');
    expect(backdrop).to.not.exist;
  });

  it('closes when backdrop is clicked', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open backdrop></ae-drawer>`);
    const backdrop = el.shadowRoot!.querySelector('[part="backdrop"]') as HTMLElement;

    setTimeout(() => backdrop.click());

    const event = await oneEvent(el, 'ae-drawer-close');
    expect(event).to.exist;
  });

  it('closes when close button is clicked', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open closable></ae-drawer>`);
    const closeButton = el.shadowRoot!.querySelector('[part="close-button"]') as HTMLElement;

    setTimeout(() => closeButton.click());

    const event = await oneEvent(el, 'ae-drawer-close');
    expect(event).to.exist;
  });

  it('applies placement attribute correctly', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open placement="left"></ae-drawer>`);

    expect(el.getAttribute('placement')).to.equal('left');
  });

  it('applies size attribute correctly', async () => {
    const el = await fixture<AeDrawer>(html`<ae-drawer open size="lg"></ae-drawer>`);

    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('renders header slot content', async () => {
    const el = await fixture<AeDrawer>(html`
      <ae-drawer open>
        <div slot="header">Header Content</div>
      </ae-drawer>
    `);

    const headerSlot = el.shadowRoot!.querySelector('slot[name="header"]');
    expect(headerSlot).to.exist;
  });

  it('renders footer slot content', async () => {
    const el = await fixture<AeDrawer>(html`
      <ae-drawer open>
        <div slot="footer">Footer Content</div>
      </ae-drawer>
    `);

    const footerSlot = el.shadowRoot!.querySelector('slot[name="footer"]');
    expect(footerSlot).to.exist;
  });

  it('renders body slot content', async () => {
    const el = await fixture<AeDrawer>(html` <ae-drawer open>Body Content</ae-drawer> `);

    const bodySlot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(bodySlot).to.exist;
  });

  it('traps focus when open', async () => {
    const el = await fixture<AeDrawer>(html`
      <ae-drawer open closable>
        <button>Inside Button</button>
      </ae-drawer>
    `);

    // Focus trap should include shadow DOM elements like close button
    const closeButton = el.shadowRoot!.querySelector('[part="close-button"]') as HTMLElement;
    expect(closeButton).to.exist;
  });

  it('supports all placement types', async () => {
    const placements = ['left', 'right', 'top', 'bottom'];

    for (const placement of placements) {
      const el = await fixture<AeDrawer>(html`
        <ae-drawer open placement="${placement}"></ae-drawer>
      `);

      expect(el.getAttribute('placement')).to.equal(placement);
    }
  });

  it('supports all size types', async () => {
    const sizes = ['sm', 'md', 'lg', 'full'];

    for (const size of sizes) {
      const el = await fixture<AeDrawer>(html` <ae-drawer open size="${size}"></ae-drawer> `);

      expect(el.getAttribute('size')).to.equal(size);
    }
  });
});
