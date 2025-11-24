import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeTextarea } from '../ae-textarea.js';
import '../ae-textarea.js';

describe('ae-textarea', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea></ae-textarea>`);

    expect(el.value).to.equal('');
    expect(el.placeholder).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.required).to.be.false;
    expect(el.resize).to.equal('vertical');
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeTextarea>(html`
      <ae-textarea
        value="Test content"
        placeholder="Enter text"
        rows="5"
        resize="none"
        required
        disabled
      ></ae-textarea>
    `);

    expect(el.value).to.equal('Test content');
    expect(el.placeholder).to.equal('Enter text');
    expect(el.rows).to.equal(5);
    expect(el.resize).to.equal('none');
    expect(el.required).to.be.true;
    expect(el.disabled).to.be.true;
  });

  it('renders label when provided', async () => {
    const el = await fixture<AeTextarea>(html`
      <ae-textarea label="Description"></ae-textarea>
    `);

    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.exist;
    expect(label!.textContent).to.include('Description');
  });

  it('shows required indicator when required', async () => {
    const el = await fixture<AeTextarea>(html`
      <ae-textarea label="Comments" required></ae-textarea>
    `);

    const requiredIndicator = el.shadowRoot!.querySelector('.required-indicator');
    expect(requiredIndicator).to.exist;
  });

  it('renders helper text when provided', async () => {
    const el = await fixture<AeTextarea>(html`
      <ae-textarea help-text="Max 500 characters"></ae-textarea>
    `);

    const helperText = el.shadowRoot!.querySelector('[part="help-text"]');
    expect(helperText).to.exist;
    expect(helperText!.textContent).to.include('Max 500 characters');
  });

  it('renders error message when invalid', async () => {
    const el = await fixture<AeTextarea>(html`
      <ae-textarea error="This field is required"></ae-textarea>
    `);

    
    await el.updateComplete;

    const errorMessage = el.shadowRoot!.querySelector('[part="error-text"]');
    expect(errorMessage).to.exist;
    expect(errorMessage!.textContent).to.include('This field is required');
  });

  it('emits ae-input event on input', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea></ae-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    setTimeout(() => {
      textarea.value = 'test';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'ae-textarea-input');
    expect(event).to.exist;
  });

  it('emits ae-change event on change', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea></ae-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    setTimeout(() => {
      textarea.value = 'test';
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'ae-textarea-change');
    expect(event).to.exist;
  });

  it('disables the textarea when disabled property is true', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea disabled></ae-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    expect(textarea.disabled).to.be.true;
  });

  it('makes textarea readonly when readonly property is true', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea readonly></ae-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    expect(textarea.readOnly).to.be.true;
  });

  it('applies resize class correctly', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea resize="horizontal"></ae-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    expect(textarea.classList.contains('resize-horizontal')).to.be.true;
  });

  it('applies size classes correctly', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea size="sm"></ae-textarea>`);
    const base = el.shadowRoot!.querySelector('[part="base"]')!;

    expect(base.classList.contains('size-sm')).to.be.true;
  });

  it('validates required field', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea required></ae-textarea>`);

    expect(el.checkValidity()).to.be.false;

    el.value = 'test content';
    await el.updateComplete;

    expect(el.checkValidity()).to.be.true;
  });

  it('participates in form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ae-textarea name="comments" value="Great product!"></ae-textarea>
      </form>
    `);

    const formData = new FormData(form);
    expect(formData.get('comments')).to.equal('Great product!');
  });

  it('uses ifDefined for optional attributes', async () => {
    const el = await fixture<AeTextarea>(html`<ae-textarea></ae-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    // These attributes should not exist when undefined
    expect(textarea.hasAttribute('minlength')).to.be.false;
    expect(textarea.hasAttribute('maxlength')).to.be.false;
  });
});
