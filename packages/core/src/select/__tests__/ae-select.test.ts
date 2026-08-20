import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeSelect } from '../ae-select.js';
import '../ae-select.js';
import {
  getComponentStyles,
  assertNoHardcodedColors,
  assertCSSVariablesUsed,
} from '../../test-utils/theme-test-helpers.js';

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
      <ae-select value="option1" multiple required disabled></ae-select>
    `);

    expect(el.value).to.equal('option1');
    expect(el.multiple).to.be.true;
    expect(el.required).to.be.true;
    expect(el.disabled).to.be.true;
  });

  it('renders label when provided', async () => {
    const el = await fixture<AeSelect>(html` <ae-select label="Choose option"></ae-select> `);

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

  it('renders options supplied through the public options property', async () => {
    const el = await fixture<AeSelect>(html`<ae-select label="Country"></ae-select>`);
    (
      el as AeSelect & {
        options: Array<{ value: string; label: string; disabled?: boolean }>;
      }
    ).options = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada', disabled: true },
    ];
    await el.updateComplete;

    const options = Array.from(el.shadowRoot!.querySelectorAll('option'));
    expect(options.map((option) => option.value)).to.deep.equal(['us', 'ca']);
    expect(options[1].disabled).to.be.true;
  });

  it('preserves the controlled value when programmatic options are replaced', async () => {
    const el = await fixture<AeSelect>(html`<ae-select value="ca"></ae-select>`);
    el.options = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
    ];
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.value).to.equal('ca');

    el.options = [
      { value: 'mx', label: 'Mexico' },
      { value: 'ca', label: 'Canada' },
    ];
    await el.updateComplete;

    expect(select.value).to.equal('ca');
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
    await el.updateComplete;

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

  it('adopts declaratively selected values in multiple mode', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ae-select name="choices" multiple>
          <option value="a" selected>A</option>
          <option value="b">B</option>
          <option value="c" selected>C</option>
        </ae-select>
      </form>
    `);
    const el = form.querySelector('ae-select') as AeSelect;
    await el.updateComplete;

    expect(el.values).to.deep.equal(['a', 'c']);
    expect(new FormData(form).getAll('choices')).to.deep.equal(['a', 'c']);
  });

  it('adopts selected programmatic options in multiple mode', async () => {
    const el = await fixture<AeSelect>(html`<ae-select multiple></ae-select>`);
    el.options = [
      { value: 'a', label: 'A', selected: true },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C', selected: true },
    ];
    await el.updateComplete;

    expect(el.values).to.deep.equal(['a', 'c']);
    expect(
      Array.from(el.shadowRoot!.querySelector('select')!.selectedOptions, (option) => option.value),
    ).to.deep.equal(['a', 'c']);
  });

  it('restores authored defaults on form reset in multiple mode', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ae-select name="choices" multiple>
          <option value="a" selected>A</option>
          <option value="b">B</option>
          <option value="c" selected>C</option>
        </ae-select>
      </form>
    `);
    const el = form.querySelector('ae-select') as AeSelect;
    await el.updateComplete;

    el.values = ['b'];
    await el.updateComplete;
    expect(new FormData(form).getAll('choices')).to.deep.equal(['b']);

    form.reset();
    await el.updateComplete;

    expect(el.values).to.deep.equal(['a', 'c']);
    expect(new FormData(form).getAll('choices')).to.deep.equal(['a', 'c']);
  });

  it('keeps authored multiple selection adoptable after an early form reset', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form><ae-select name="choices" multiple></ae-select></form>
    `);
    const el = form.querySelector('ae-select') as AeSelect;
    await el.updateComplete;

    form.reset();
    el.options = [
      { value: 'a', label: 'A', selected: true },
      { value: 'b', label: 'B' },
    ];
    await el.updateComplete;

    expect(el.values).to.deep.equal(['a']);
    expect(new FormData(form).getAll('choices')).to.deep.equal(['a']);
  });

  it('keeps multiple selections when only value changes', async () => {
    const el = await fixture<AeSelect>(html`
      <ae-select multiple>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </ae-select>
    `);
    el.values = ['a', 'c'];
    await el.updateComplete;

    el.value = 'b';
    await el.updateComplete;

    expect(
      Array.from(el.shadowRoot!.querySelector('select')!.selectedOptions, (option) => option.value),
    ).to.deep.equal(['a', 'c']);
    expect(el.values).to.deep.equal(['a', 'c']);
  });

  it('copies arrays assigned through values and options', async () => {
    const el = await fixture<AeSelect>(html`<ae-select multiple></ae-select>`);
    const values = ['a'];
    el.values = values;
    values.push('b');
    await el.updateComplete;

    expect(el.values).to.deep.equal(['a']);

    const options = [{ value: 'a', label: 'A' }];
    el.options = options;
    options.push({ value: 'b', label: 'B' });
    await el.updateComplete;

    expect(el.options).to.have.lengthOf(1);
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
    const el = await fixture<AeSelect>(html` <ae-select label="Choice" required></ae-select> `);

    const requiredIndicator = el.shadowRoot!.querySelector('.required-indicator');
    expect(requiredIndicator).to.exist;
  });

  describe('Theme Integration', () => {
    it('uses CSS variables for select styling', async () => {
      const el = await fixture<AeSelect>(html`<ae-select></ae-select>`);
      const stylesText = getComponentStyles(el);

      // Check that theme variables are used
      assertCSSVariablesUsed(
        stylesText,
        ['--ae-select-border', '--ae-select-bg', '--ae-select-color', '--ae-select-focus-ring'],
        'Select',
      );
    });

    it('does not have hardcoded color fallbacks', async () => {
      const el = await fixture<AeSelect>(html`<ae-select></ae-select>`);
      const stylesText = getComponentStyles(el);

      // Ensure no hardcoded colors in styles
      assertNoHardcodedColors(stylesText, { componentName: 'Select' });
    });

    it('computed styles exist at runtime', async () => {
      const el = await fixture<AeSelect>(html`<ae-select></ae-select>`);
      await el.updateComplete;

      const wrapper = el.shadowRoot!.querySelector('.select-wrapper');
      expect(wrapper).to.exist;

      const styles = window.getComputedStyle(wrapper!);
      expect(styles.borderColor).to.exist;
    });
  });
});
