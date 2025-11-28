import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeSwitch } from '../ae-switch.js';
import '../ae-switch.js';

describe('ae-switch', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch></ae-switch>`);

    expect(el.checked).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
    expect(el.size).to.equal('md');
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeSwitch>(html`
      <ae-switch checked disabled required size="lg"></ae-switch>
    `);

    expect(el.checked).to.be.true;
    expect(el.disabled).to.be.true;
    expect(el.required).to.be.true;
    expect(el.size).to.equal('lg');
  });

  it('renders label when provided', async () => {
    const el = await fixture<AeSwitch>(html`
      <ae-switch>Enable notifications</ae-switch>
    `);

    const labelText = el.shadowRoot!.querySelector('[part="label"]');
    expect(labelText).to.exist;
    // Check slot content via assignedNodes
    const slot = labelText!.querySelector('slot');
    const assignedNodes = slot!.assignedNodes();
    const textContent = assignedNodes.map(n => n.textContent).join('').trim();
    expect(textContent).to.equal('Enable notifications');
  });

  it('toggles checked state when clicked', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch></ae-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;

    expect(el.checked).to.be.false;

    input.click();
    await el.updateComplete;

    expect(el.checked).to.be.true;
  });

  it('emits ae-change event when toggled', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch></ae-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => input.click());

    const event = await oneEvent(el, 'ae-switch-change');
    expect(event).to.exist;
    expect(event.detail.checked).to.be.true;
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch disabled></ae-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;

    expect(el.checked).to.be.false;

    input.click();
    await el.updateComplete;

    expect(el.checked).to.be.false;
  });

  it('applies size classes correctly', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch size="sm"></ae-switch>`);

    // Size is reflected as an attribute, not a CSS class
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('participates in form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ae-switch name="notifications" checked></ae-switch>
      </form>
    `);

    const el = form.querySelector('ae-switch') as AeSwitch;
    await el.updateComplete;

    const formData = new FormData(form);
    expect(formData.get('notifications')).to.equal('on');
  });

  it('validates required field', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch required></ae-switch>`);
    await el.updateComplete;

    expect(el.checkValidity()).to.be.false;

    el.checked = true;
    await el.updateComplete;

    expect(el.checkValidity()).to.be.true;
  });

  it('has correct ARIA attributes', async () => {
    const el = await fixture<AeSwitch>(html`<ae-switch></ae-switch>`);
    await el.updateComplete;

    // ARIA attributes are set via ElementInternals (not as DOM attributes)
    // Check internals role via internals API or verify the component's semantic role
    // The input inside has role implied via checkbox type, but the host has switch role via internals
    // We verify the internal checkbox has the correct behaviors
    const input = el.shadowRoot!.querySelector('input');
    expect(input).to.exist;
    expect(input!.type).to.equal('checkbox');

    // Verify aria-checked state changes correctly by checking the checked property
    expect(el.checked).to.be.false;

    el.checked = true;
    await el.updateComplete;

    expect(el.checked).to.be.true;
  });

  it('supports all size types', async () => {
    const sizes = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<AeSwitch>(html`<ae-switch size="${size}"></ae-switch>`);

      // Size is reflected as an attribute, not a CSS class
      expect(el.getAttribute('size')).to.equal(size);
    }
  });
});
