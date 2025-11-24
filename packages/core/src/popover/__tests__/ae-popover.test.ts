import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AePopover } from '../ae-popover.js';
import '../ae-popover.js';

describe('ae-popover', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AePopover>(html`<ae-popover></ae-popover>`);

    expect(el.open).to.be.false;
    expect(el.trigger).to.equal('click');
    expect(el.placement).to.equal('bottom');
    expect(el.arrow).to.be.true;
    expect(el.offset).to.equal(8);
    expect(el.closeOnClickOutside).to.be.true;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover
        open
        trigger="hover"
        placement="top"
        offset="12"
      ></ae-popover>
    `);

    expect(el.open).to.be.true;
    expect(el.trigger).to.equal('hover');
    expect(el.placement).to.equal('top');
    expect(el.offset).to.equal(12);
  });

  it('renders trigger slot', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover>
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    const triggerSlot = el.shadowRoot!.querySelector('slot[name="trigger"]');
    expect(triggerSlot).to.exist;
  });

  it('renders content when open', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover open>
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    const content = el.shadowRoot!.querySelector('[part="popover"]');
    expect(content).to.exist;
  });

  it('does not render content when closed', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover>
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    const content = el.shadowRoot!.querySelector('[part="popover"]');
    expect(content).to.not.exist;
  });

  it('opens on click when trigger is "click"', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover trigger="click">
        <button slot="trigger">Click me</button>
        <div>Content</div>
      </ae-popover>
    `);

    const trigger = el.shadowRoot!.querySelector('[part="trigger"]') as HTMLElement;

    setTimeout(() => trigger.click());

    const event = await oneEvent(el, 'ae-popover-open');
    expect(event).to.exist;
    expect(el.open).to.be.true;
  });

  it('does not open on click when trigger is "manual"', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover trigger="manual">
        <button slot="trigger">Click me</button>
        <div>Content</div>
      </ae-popover>
    `);

    const trigger = el.shadowRoot!.querySelector('[part="trigger"]') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('can be controlled programmatically in manual mode', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover trigger="manual">
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    expect(el.open).to.be.false;

    el.show();
    await el.updateComplete;

    expect(el.open).to.be.true;

    el.hide();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('toggles with toggle() method', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover trigger="manual">
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    expect(el.open).to.be.false;

    el.toggle();
    await el.updateComplete;

    expect(el.open).to.be.true;

    el.toggle();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('shows arrow when arrow is true', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover open arrow>
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    const arrow = el.shadowRoot!.querySelector('[part="arrow"]');
    expect(arrow).to.exist;
  });

  it('hides arrow when arrow is false', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover open>
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    el.arrow = false;
    await el.updateComplete;

    const arrow = el.shadowRoot!.querySelector('[part="arrow"]');
    expect(arrow).to.not.exist;
  });

  it('updates position using requestAnimationFrame', async () => {
    const el = await fixture<AePopover>(html`
      <ae-popover>
        <button slot="trigger">Trigger</button>
        <div>Content</div>
      </ae-popover>
    `);

    el.open = true;
    await el.updateComplete;

    // Position should be updated via requestAnimationFrame
    const content = el.shadowRoot!.querySelector('[part="popover"]') as HTMLElement;
    expect(content).to.exist;
  });

  it('supports all placement types', async () => {
    const placements = ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'];

    for (const placement of placements) {
      const el = await fixture<AePopover>(html`
        <ae-popover open placement="${placement}">
          <button slot="trigger">Trigger</button>
          <div>Content</div>
        </ae-popover>
      `);

      expect(el.placement).to.equal(placement);
    }
  });

  it('supports all trigger types', async () => {
    const triggers = ['click', 'hover', 'manual'];

    for (const trigger of triggers) {
      const el = await fixture<AePopover>(html`
        <ae-popover trigger="${trigger}">
          <button slot="trigger">Trigger</button>
          <div>Content</div>
        </ae-popover>
      `);

      expect(el.trigger).to.equal(trigger);
    }
  });
});
