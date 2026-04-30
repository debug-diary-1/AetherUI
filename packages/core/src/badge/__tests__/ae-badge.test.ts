import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AeBadge } from '../ae-badge.js';
import '../ae-badge.js';

describe('ae-badge', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge>New</ae-badge>`);

    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.closable).to.be.false;
    expect(el.dot).to.be.false;
    expect(el.outline).to.be.false;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeBadge>(html`
      <ae-badge variant="success" size="lg" closable outline>Badge</ae-badge>
    `);

    expect(el.variant).to.equal('success');
    expect(el.size).to.equal('lg');
    expect(el.closable).to.be.true;
    expect(el.outline).to.be.true;
  });

  it('renders badge content', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge>New</ae-badge>`);
    const base = el.shadowRoot!.querySelector('[part="base"]');

    expect(base).to.exist;
  });

  it('applies variant attribute correctly', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge variant="error">Error</ae-badge>`);

    expect(el.getAttribute('variant')).to.equal('error');
  });

  it('applies size attribute correctly', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge size="sm">Small</ae-badge>`);

    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('shows close button when closable is true', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge closable>Badge</ae-badge>`);
    const closeButton = el.shadowRoot!.querySelector('[part="close-button"]');

    expect(closeButton).to.exist;
  });

  it('emits ae-badge-close event when close button is clicked', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge closable>Badge</ae-badge>`);
    const closeButton = el.shadowRoot!.querySelector('[part="close-button"]') as HTMLElement;

    setTimeout(() => closeButton.click());

    const event = await oneEvent(el, 'ae-badge-close');
    expect(event).to.exist;
  });

  it('applies outline attribute when outline is true', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge outline>Badge</ae-badge>`);

    expect(el.hasAttribute('outline')).to.be.true;
  });

  it('displays as dot indicator when dot is true', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge dot></ae-badge>`);
    const base = el.shadowRoot!.querySelector('[part="base"]')!;

    expect(base.classList.contains('badge-dot')).to.be.true;
  });

  it('renders icon slot when provided', async () => {
    const el = await fixture<AeBadge>(html`
      <ae-badge>
        <span slot="icon">★</span>
        Badge
      </ae-badge>
    `);

    const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
    expect(iconSlot).to.exist;
  });

  it('renders default slot content', async () => {
    const el = await fixture<AeBadge>(html`<ae-badge>Test Badge</ae-badge>`);
    const contentSlot = el.shadowRoot!.querySelector('slot:not([name])');

    expect(contentSlot).to.exist;
  });

  it('supports all variant types', async () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

    for (const variant of variants) {
      const el = await fixture<AeBadge>(html`<ae-badge variant="${variant}">Badge</ae-badge>`);

      expect(el.getAttribute('variant')).to.equal(variant);
    }
  });

  it('supports all size types', async () => {
    const sizes = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<AeBadge>(html`<ae-badge size="${size}">Badge</ae-badge>`);

      expect(el.getAttribute('size')).to.equal(size);
    }
  });
});
