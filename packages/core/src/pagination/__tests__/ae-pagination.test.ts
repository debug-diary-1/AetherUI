import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { AePagination } from '../ae-pagination.js';
import '../ae-pagination.js';
import {
  getComponentStyles,
  assertNoHardcodedColors,
  assertCSSVariablesUsed,
} from '../../test-utils/theme-test-helpers.js';

describe('ae-pagination', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AePagination>(html`<ae-pagination></ae-pagination>`);

    expect(el.currentPage).to.equal(1);
    expect(el.totalPages).to.equal(1);
    expect(el.showFirstLast).to.be.false;
    expect(el.showPrevNext).to.be.true;
    expect(el.size).to.equal('md');
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="5" total-pages="10" size="lg"></ae-pagination>
    `);

    expect(el.currentPage).to.equal(5);
    expect(el.totalPages).to.equal(10);
    expect(el.size).to.equal('lg');
  });

  it('emits ae-page-change event when page changes', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="1" total-pages="5"></ae-pagination>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const nextButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('Next'),
    );

    setTimeout(() => nextButton?.click());

    const event = await oneEvent(el, 'ae-page-change');
    expect(event).to.exist;
    expect(event.detail.page).to.equal(2);
  });

  it('disables previous button on first page', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="1" total-pages="5"></ae-pagination>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const prevButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('Previous'),
    );

    expect(prevButton?.disabled).to.be.true;
  });

  it('disables next button on last page', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="5" total-pages="5"></ae-pagination>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const nextButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('Next'),
    );

    expect(nextButton?.disabled).to.be.true;
  });

  it('shows first and last buttons when showFirstLast is true', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="3" total-pages="10" show-first-last></ae-pagination>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const firstButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('First'),
    );
    const lastButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('Last'),
    );

    expect(firstButton).to.exist;
    expect(lastButton).to.exist;
  });

  it('hides first and last buttons when showFirstLast is false', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="3" total-pages="10"></ae-pagination>
    `);

    el.showFirstLast = false;
    await el.updateComplete;

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const firstButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('First'),
    );
    const lastButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('Last'),
    );

    expect(firstButton).to.not.exist;
    expect(lastButton).to.not.exist;
  });

  it('navigates to first page when first button is clicked', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="5" total-pages="10" show-first-last></ae-pagination>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const firstButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('First'),
    );

    setTimeout(() => firstButton?.click());

    const event = await oneEvent(el, 'ae-page-change');
    expect(event.detail.page).to.equal(1);
  });

  it('navigates to last page when last button is clicked', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="1" total-pages="10" show-first-last></ae-pagination>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('button');
    const lastButton = Array.from(buttons).find((btn) =>
      btn.getAttribute('aria-label')?.includes('Last'),
    );

    setTimeout(() => lastButton?.click());

    const event = await oneEvent(el, 'ae-page-change');
    expect(event.detail.page).to.equal(10);
  });

  it('applies size attribute correctly', async () => {
    const el = await fixture<AePagination>(html` <ae-pagination size="sm"></ae-pagination> `);

    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('renders page number buttons', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="3" total-pages="10"></ae-pagination>
    `);

    const pageButtons = el.shadowRoot!.querySelectorAll('[part="button"]');
    expect(pageButtons.length).to.be.greaterThan(0);
  });

  it('highlights current page button', async () => {
    const el = await fixture<AePagination>(html`
      <ae-pagination current-page="3" total-pages="10"></ae-pagination>
    `);

    const pageButtons = el.shadowRoot!.querySelectorAll('[part="button"]');
    const currentButton = Array.from(pageButtons).find((btn) => btn.classList.contains('active'));

    expect(currentButton).to.exist;
  });

  it('supports all size types', async () => {
    const sizes = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<AePagination>(html`
        <ae-pagination size="${size}"></ae-pagination>
      `);

      expect(el.getAttribute('size')).to.equal(size);
    }
  });

  describe('Theme Integration', () => {
    it('uses CSS variables for pagination styling', async () => {
      const el = await fixture<AePagination>(html`<ae-pagination></ae-pagination>`);
      const stylesText = getComponentStyles(el);

      // Check that theme variables are used
      assertCSSVariablesUsed(
        stylesText,
        ['--ae-pagination-border', '--ae-pagination-bg', '--ae-pagination-color'],
        'Pagination',
      );
    });

    it('does not have hardcoded color fallbacks', async () => {
      const el = await fixture<AePagination>(html`<ae-pagination></ae-pagination>`);
      const stylesText = getComponentStyles(el);

      // Ensure no hardcoded colors in styles
      assertNoHardcodedColors(stylesText, { componentName: 'Pagination' });
    });

    it('computed styles exist at runtime', async () => {
      const el = await fixture<AePagination>(html`<ae-pagination></ae-pagination>`);
      await el.updateComplete;

      const base = el.shadowRoot!.querySelector('[part="base"]');
      expect(base).to.exist;

      const styles = window.getComputedStyle(base!);
      expect(styles).to.exist;
    });
  });
});
