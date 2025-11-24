import { html, fixture, expect } from '@open-wc/testing';
import { AeProgress } from '../ae-progress.js';
import '../ae-progress.js';

describe('ae-progress', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeProgress>(html`<ae-progress></ae-progress>`);

    expect(el.value).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.showLabel).to.be.false;
    expect(el.indeterminate).to.be.false;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress
        value="75"
        max="100"
        variant="success"
        size="lg"
        show-label
        indeterminate
      ></ae-progress>
    `);

    expect(el.value).to.equal(75);
    expect(el.max).to.equal(100);
    expect(el.variant).to.equal('success');
    expect(el.size).to.equal('lg');
    expect(el.showLabel).to.be.true;
    expect(el.indeterminate).to.be.true;
  });

  it('calculates percentage correctly', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress value="50" max="100"></ae-progress>
    `);

    expect(el.percentage).to.equal(50);
  });

  it('renders progress bar', async () => {
    const el = await fixture<AeProgress>(html`<ae-progress value="50"></ae-progress>`);
    const bar = el.shadowRoot!.querySelector('[part="bar"]');

    expect(bar).to.exist;
  });

  it('applies correct width based on percentage', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress value="75" max="100"></ae-progress>
    `);

    const bar = el.shadowRoot!.querySelector('[part="bar"]') as HTMLElement;
    expect(bar.style.width).to.equal('75%');
  });

  it('shows label when showLabel is true', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress value="60" show-label></ae-progress>
    `);

    const label = el.shadowRoot!.querySelector('[part="label"]');
    expect(label).to.exist;
    expect(label!.textContent).to.include('60%');
  });

  it('applies variant classes correctly', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress variant="error"></ae-progress>
    `);

    const base = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.classList.contains('variant-error')).to.be.true;
  });

  it('applies size classes correctly', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress size="sm"></ae-progress>
    `);

    const base = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.classList.contains('size-sm')).to.be.true;
  });

  it('applies indeterminate class when indeterminate is true', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress indeterminate></ae-progress>
    `);

    const base = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.classList.contains('indeterminate')).to.be.true;
  });

  it('has correct ARIA attributes', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress value="50" max="100"></ae-progress>
    `);

    const base = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.getAttribute('role')).to.equal('progressbar');
    expect(base.getAttribute('aria-valuenow')).to.equal('50');
    expect(base.getAttribute('aria-valuemin')).to.equal('0');
    expect(base.getAttribute('aria-valuemax')).to.equal('100');
  });

  it('clamps value to max', async () => {
    const el = await fixture<AeProgress>(html`
      <ae-progress value="150" max="100"></ae-progress>
    `);

    expect(el.percentage).to.equal(100);
  });

  it('supports all variant types', async () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

    for (const variant of variants) {
      const el = await fixture<AeProgress>(html`
        <ae-progress variant="${variant}"></ae-progress>
      `);
      const base = el.shadowRoot!.querySelector('[part="base"]')!;

      expect(base.classList.contains(`variant-${variant}`)).to.be.true;
    }
  });

  it('supports all size types', async () => {
    const sizes = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<AeProgress>(html`
        <ae-progress size="${size}"></ae-progress>
      `);
      const base = el.shadowRoot!.querySelector('[part="base"]')!;

      expect(base.classList.contains(`size-${size}`)).to.be.true;
    }
  });
});
