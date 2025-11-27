import { html, fixture, expect } from '@open-wc/testing';
import { AeSpinner } from '../ae-spinner.js';
import '../ae-spinner.js';
import { getComponentStyles, assertNoHardcodedColors, assertCSSVariablesUsed } from '../../test-utils/theme-test-helpers.js';

describe('ae-spinner', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);

    expect(el.size).to.equal('md');
    expect(el.variant).to.equal('primary');
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeSpinner>(html`
      <ae-spinner size="lg" variant="secondary"></ae-spinner>
    `);

    expect(el.size).to.equal('lg');
    expect(el.variant).to.equal('secondary');
  });

  it('renders spinner element', async () => {
    const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);
    const base = el.shadowRoot!.querySelector('[part="base"]');

    expect(base).to.exist;
  });

  it('applies size attribute correctly', async () => {
    const el = await fixture<AeSpinner>(html`<ae-spinner size="sm"></ae-spinner>`);

    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('applies variant attribute correctly', async () => {
    const el = await fixture<AeSpinner>(html`<ae-spinner variant="success"></ae-spinner>`);

    expect(el.getAttribute('variant')).to.equal('success');
  });

  it('supports all size types', async () => {
    const sizes = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<AeSpinner>(html`<ae-spinner size="${size}"></ae-spinner>`);

      expect(el.getAttribute('size')).to.equal(size);
    }
  });

  it('supports all variant types', async () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

    for (const variant of variants) {
      const el = await fixture<AeSpinner>(html`<ae-spinner variant="${variant}"></ae-spinner>`);

      expect(el.getAttribute('variant')).to.equal(variant);
    }
  });

  it('has correct ARIA attributes', async () => {
    const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);
    const base = el.shadowRoot!.querySelector('[part="base"]')!;

    expect(base.getAttribute('role')).to.equal('status');

    // The label is rendered as a visually hidden span, not as aria-label
    const label = el.shadowRoot!.querySelector('[part="label"]');
    expect(label).to.exist;
    expect(label!.textContent).to.equal('Loading...');
  });

  it('renders SVG spinner', async () => {
    const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);
    const svg = el.shadowRoot!.querySelector('svg');

    expect(svg).to.exist;
  });

  describe('Theme Integration', () => {
    it('uses CSS variables for spinner colors', async () => {
      const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);
      const stylesText = getComponentStyles(el);

      // Check that theme variables are used
      assertCSSVariablesUsed(stylesText, [
        '--ae-spinner-color-primary',
        '--ae-spinner-color-secondary',
        '--ae-spinner-color-success',
        '--ae-spinner-track-color',
      ], 'Spinner');
    });

    it('does not have hardcoded color fallbacks', async () => {
      const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);
      const stylesText = getComponentStyles(el);

      // Ensure no hardcoded colors in styles
      assertNoHardcodedColors(stylesText, { componentName: 'Spinner' });
    });

    it('computed styles exist at runtime', async () => {
      const el = await fixture<AeSpinner>(html`<ae-spinner></ae-spinner>`);
      await el.updateComplete;

      const svg = el.shadowRoot!.querySelector('svg');
      expect(svg).to.exist;

      const styles = window.getComputedStyle(svg!);
      expect(styles).to.exist;
    });
  });
});
