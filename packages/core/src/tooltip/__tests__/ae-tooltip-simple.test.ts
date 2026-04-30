/**
 * Simplified tooltip test to verify basic functionality
 */
import { html, fixture, expect } from '@open-wc/testing';
import { defineAeTooltip, AeTooltip } from '../index.js';

// Define the custom element before tests
defineAeTooltip();

describe('AeTooltip Basic Tests', () => {
  it('should create element', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('ae-tooltip');
  });

  it('should have default properties', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    expect(el.text).to.equal('Test tooltip');
    expect(el.open).to.be.false;
    expect(el.placement).to.equal('top');
    expect(el.disabled).to.be.false;
    expect(el.showArrow).to.be.true;
  });

  it('should show and hide programmatically', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip">
        <button>Hover me</button>
      </ae-tooltip>
    `);

    expect(el.open).to.be.false;

    el.show();
    expect(el.open).to.be.true;

    el.hide();
    expect(el.open).to.be.false;
  });

  it('should not show when disabled', async () => {
    const el = await fixture<AeTooltip>(html`
      <ae-tooltip text="Test tooltip" disabled>
        <button>Hover me</button>
      </ae-tooltip>
    `);

    el.show();
    expect(el.open).to.be.false;
  });
});
