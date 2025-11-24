import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeSelect } from '../ae-select.js';
import '../ae-select.js';

describe('ae-select', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeSelect>(html`<ae-select></ae-select>`);

    expect(el.value).to.equal('');
    expect(el.multiple).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select
        value="option1"
        multiple
        required
        disabled
      ></ae-select>
    `);

    expect(el.value).to.equal('option1');
    expect(el.multiple).to.be.true;
    expect(el.required).to.be.true;
    expect(el.disabled).to.be.true;
  });

  it('renders label when provided', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select label="Choose option"></ae-select>
    `);

    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.exist;
    expect(label!.textContent).to.include('Choose option');
  });

  it('renders helper text when provided', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select help-text="Select an option"></ae-select>
    `);

    const helperText = el.shadowRoot!.querySelector('[part="help-text"]');
    expect(helperText).to.exist;
    expect(helperText!.textContent).to.include('Select an option');
  });

  it('renders error message when provided', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select error="Selection is required"></ae-select>
    `);

    await el.updateComplete;

    const errorMessage = el.shadowRoot!.querySelector('[part="error-text"]');
    expect(errorMessage).to.exist;
    expect(errorMessage!.textContent).to.include('Selection is required');
  });

  it('renders options from light DOM', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </ae-select>
    `);

    const select = el.shadowRoot!.querySelector('select')!;
    const options = select.querySelectorAll('option');
    expect(options.length).to.equal(3);
  });

  it('emits ae-select-change event when value changes', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </ae-select>
    `);

    const select = el.shadowRoot!.querySelector('select')!;

    setTimeout(() => {
      select.value = '2';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'ae-select-change');
    expect(event).to.exist;
  });

  it('disables the select when disabled property is true', async () => {
    const el = await fixture<AeSelect>(html`<ae-select disabled></ae-select>`);
    const select = el.shadowRoot!.querySelector('select')!;

    expect(select.disabled).to.be.true;
  });

  it('applies error class when error is provided', async () => {
    const el = await fixture<AeSelect>(html`<ae-select error="Invalid"></ae-select>`);
    const wrapper = el.shadowRoot!.querySelector('.select-wrapper')!;

    expect(wrapper.classList.contains('error')).to.be.true;
  });

  it('validates required field', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select required>
        <option value="">Select...</option>
        <option value="1">Option 1</option>
      </ae-select>
    `);

    expect(el.checkValidity()).to.be.false;

    el.value = '1';
    await el.updateComplete;

    expect(el.checkValidity()).to.be.true;
  });

  it('handles multiple selection mode', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select multiple>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </ae-select>
    `);

    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.multiple).to.be.true;

    // Set multiple values
    el.values = ['1', '2'];
    await el.updateComplete;

    expect(el.values).to.deep.equal(['1', '2']);
  });

  it('syncs option selection in multiple mode', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select multiple>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </ae-select>
    `);

    el.values = ['1', '3'];
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector('select')!;
    const options = Array.from(select.querySelectorAll('option'));

    expect(options[0].selected).to.be.true;
    expect(options[1].selected).to.be.false;
    expect(options[2].selected).to.be.true;
  });

  it('participates in form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ae-select name="choice">
          <option value="a">A</option>
          <option value="b" selected>B</option>
        </ae-select>
      </form>
    `);

    const el = form.querySelector('ae-select') as AeSelect;
    await el.updateComplete;

    const formData = new FormData(form);
    expect(formData.get('choice')).to.equal('b');
  });

  it('shows required indicator when required', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select label="Choice" required></ae-select>
    `);

    const requiredIndicator = el.shadowRoot!.querySelector('.required-indicator');
    expect(requiredIndicator).to.exist;
  });
});
