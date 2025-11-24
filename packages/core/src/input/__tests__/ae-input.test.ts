import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeInput } from '../ae-input.js';
import '../ae-input.js';

describe('ae-input', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeInput>(html`<ae-input></ae-input>`);

    expect(el.type).to.equal('text');
    expect(el.value).to.equal('');
    expect(el.placeholder).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.required).to.be.false;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input
        type="email"
        value="test@example.com"
        placeholder="Enter email"
        required
        disabled
      ></ae-input>
    `);

    expect(el.type).to.equal('email');
    expect(el.value).to.equal('test@example.com');
    expect(el.placeholder).to.equal('Enter email');
    expect(el.required).to.be.true;
    expect(el.disabled).to.be.true;
  });

  it('renders label when provided', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input label="Username"></ae-input>
    `);

    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.exist;
    expect(label!.textContent).to.include('Username');
  });

  it('shows required indicator when required', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input label="Email" required></ae-input>
    `);

    const requiredIndicator = el.shadowRoot!.querySelector('.required-indicator');
    expect(requiredIndicator).to.exist;
  });

  it('renders helper text when provided', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input help-text="Enter your username"></ae-input>
    `);

    const helperText = el.shadowRoot!.querySelector('[part="help-text"]');
    expect(helperText).to.exist;
    expect(helperText!.textContent).to.include('Enter your username');
  });

  it('renders error message when provided', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input error="This field is required"></ae-input>
    `);

    await el.updateComplete;

    const errorMessage = el.shadowRoot!.querySelector('[part="error-text"]');
    expect(errorMessage).to.exist;
    expect(errorMessage!.textContent).to.include('This field is required');
  });

  it('emits ae-input-input event on input', async () => {
    const el = await fixture<AeInput>(html`<ae-input></ae-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'ae-input-input');
    expect(event).to.exist;
  });

  it('emits ae-input-change event on change', async () => {
    const el = await fixture<AeInput>(html`<ae-input></ae-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = 'test';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'ae-input-change');
    expect(event).to.exist;
  });

  it('disables the input when disabled property is true', async () => {
    const el = await fixture<AeInput>(html`<ae-input disabled></ae-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    expect(input.disabled).to.be.true;
  });

  it('makes input readonly when readonly property is true', async () => {
    const el = await fixture<AeInput>(html`<ae-input readonly></ae-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    expect(input.readOnly).to.be.true;
  });

  it('applies error class when error is provided', async () => {
    const el = await fixture<AeInput>(html`<ae-input error="Invalid"></ae-input>`);
    const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;

    expect(wrapper.classList.contains('error')).to.be.true;
  });

  it('renders prefix slot content', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input>
        <span slot="prefix">$</span>
      </ae-input>
    `);

    const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]');
    expect(prefixSlot).to.exist;
  });

  it('renders suffix slot content', async () => {
    const el = await fixture<AeInput>(html`
      <ae-input>
        <span slot="suffix">.com</span>
      </ae-input>
    `);

    const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]');
    expect(suffixSlot).to.exist;
  });

  it('validates required field', async () => {
    const el = await fixture<AeInput>(html`<ae-input required></ae-input>`);

    expect(el.checkValidity()).to.be.false;

    el.value = 'test';
    await el.updateComplete;

    expect(el.checkValidity()).to.be.true;
  });

  it('participates in form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ae-input name="username" value="john"></ae-input>
      </form>
    `);

    const formData = new FormData(form);
    expect(formData.get('username')).to.equal('john');
  });

  it('uses ifDefined for optional attributes', async () => {
    const el = await fixture<AeInput>(html`<ae-input></ae-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    // These attributes should not exist when undefined
    expect(input.hasAttribute('minlength')).to.be.false;
    expect(input.hasAttribute('maxlength')).to.be.false;
    expect(input.hasAttribute('pattern')).to.be.false;
  });
});
