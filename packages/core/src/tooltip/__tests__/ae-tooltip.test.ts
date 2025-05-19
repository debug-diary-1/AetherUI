/**
 * Web component test for the ae-tooltip component using @open-wc/testing
 */
import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../ae-tooltip.js';
import { AeTooltip } from '../ae-tooltip.js';

describe('AeTooltip', () => {
  it('should render with default values', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Default tooltip">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    expect(el).to.exist;
    expect(el.text).to.equal('Default tooltip');
    expect(el.open).to.be.false;
    expect(el.placement).to.equal('top');
    expect(el.disabled).to.be.false;
    expect(el.showArrow).to.be.true;
  });

  it('should show tooltip on mouse enter', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" hover-delay="0">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    const button = el.querySelector('button')!;
    
    // Trigger mouse enter
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await elementUpdated(el);

    expect(el.open).to.be.true;
    const overlay = el.shadowRoot!.querySelector('[part="overlay"]');
    expect(overlay).to.exist;
  });

  it('should hide tooltip on mouse leave', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" hover-delay="0" hide-delay="0">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    const button = el.querySelector('button')!;
    
    // Show tooltip
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await elementUpdated(el);
    expect(el.open).to.be.true;

    // Hide tooltip
    button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });

  it('should show tooltip on focus', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" hover-delay="0">
        <button>Focus me</button>
      </ae-tooltip>
    `);

    const button = el.querySelector('button')!;
    
    // Trigger focus
    button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await elementUpdated(el);

    expect(el.open).to.be.true;
  });

  it('should hide tooltip on blur', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" hover-delay="0" hide-delay="0">
        <button>Focus me</button>
      </ae-tooltip>
    `);

    const button = el.querySelector('button')!;
    
    // Show tooltip
    button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await elementUpdated(el);
    expect(el.open).to.be.true;

    // Hide tooltip
    button.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });

  it('should hide on Escape key', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" open>
        <button>Click me</button>
      </ae-tooltip>
    `);

    expect(el.open).to.be.true;

    // Trigger Escape key
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await elementUpdated(el);

    expect(el.open).to.be.false;
  });

  it('should not show when disabled', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" disabled hover-delay="0">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    const button = el.querySelector('button')!;
    
    // Try to show tooltip
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await elementUpdated(el);

    expect(el.open).to.be.false;
  });

  it('should emit ae-open-change event', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    setTimeout(() => el.show());
    const event = await oneEvent(el, 'ae-open-change');

    expect(event).to.exist;
    expect(event.detail).to.deep.equal({ open: true });
  });

  it('should support different animations', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" animation="scale">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    expect(el.animation).to.equal('scale');
    expect(el).to.have.attribute('animation', 'scale');
  });

  it('should render arrow when showArrow is true', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" open show-arrow>
        <button>Hover me</button>
      </ae-tooltip>
    `);

    const arrow = el.shadowRoot!.querySelector('[part="arrow"]');
    expect(arrow).to.exist;
  });

  it('should not render arrow when showArrow is false', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" open show-arrow="false">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    const arrow = el.shadowRoot!.querySelector('[part="arrow"]');
    expect(arrow).to.not.exist;
  });
});