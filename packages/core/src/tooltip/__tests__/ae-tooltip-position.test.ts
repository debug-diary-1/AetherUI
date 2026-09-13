import { html, fixture, expect, waitUntil } from '@open-wc/testing';
import { AeTooltip, defineAeTooltip } from '../index.js';

defineAeTooltip();

async function overlayFor(tooltip: AeTooltip) {
  await waitUntil(() => {
    const overlay = tooltip.shadowRoot?.querySelector<HTMLElement>('[role="tooltip"]');
    return !!overlay && getComputedStyle(overlay).visibility === 'visible';
  });
  return tooltip.shadowRoot!.querySelector<HTMLElement>('[role="tooltip"]')!;
}

function isAbove(tooltip: AeTooltip, overlay: HTMLElement) {
  const anchor = tooltip.querySelector('button')!.getBoundingClientRect();
  const box = overlay.getBoundingClientRect();
  return (
    Math.abs(box.x + box.width / 2 - anchor.x - anchor.width / 2) < 2 &&
    Math.abs(anchor.top - box.bottom - 8) < 2
  );
}

for (const strategy of ['absolute', 'fixed']) {
  it(`keeps a ${strategy} tooltip anchored inside a transformed, offset container`, async () => {
    const container = await fixture<HTMLElement>(html`
      <div style="position: relative; margin: 160px 0 0 200px; transform: translate(20px, 15px);">
        <ae-tooltip text="This is a tooltip" strategy=${strategy} hover-delay="0" hide-delay="0">
          <button>Hover me</button>
        </ae-tooltip>
      </div>
    `);
    const tooltip = container.querySelector<AeTooltip>('ae-tooltip')!;
    const button = tooltip.querySelector('button')!;
    await tooltip.updateComplete;
    button.dispatchEvent(new MouseEvent('mouseenter'));
    const overlay = await overlayFor(tooltip);
    await waitUntil(() => isAbove(tooltip, overlay), 'tooltip must stay next to its anchor');
    expect(overlay.getBoundingClientRect().width).to.be.greaterThan(90);
    container.style.marginLeft = '280px';
    await waitUntil(() => isAbove(tooltip, overlay), 'tooltip must follow layout movement');
    button.dispatchEvent(new MouseEvent('mouseleave'));
    await waitUntil(() => !tooltip.shadowRoot!.querySelector('[role="tooltip"]'));
  });
}

it('has legible default colors when optional theme tokens are absent', async () => {
  const tooltip = await fixture<AeTooltip>(html`
    <ae-tooltip
      text="Readable tooltip"
      style="--ae-text-primary: rgb(17, 24, 39); --ae-bg-primary: initial; color: black;"
    >
      <button>Focus me</button>
    </ae-tooltip>
  `);
  tooltip.show();
  const overlay = await overlayFor(tooltip);
  expect(getComputedStyle(overlay).color).to.equal('rgb(255, 255, 255)');
  expect(getComputedStyle(overlay).backgroundColor).to.equal('rgb(17, 24, 39)');
});

it('repositions when placement and strategy change while open', async () => {
  const tooltip = await fixture<AeTooltip>(html`
    <ae-tooltip text="Moving tooltip" strategy="absolute" style="margin: 180px 0 0 200px;">
      <button>Anchor</button>
    </ae-tooltip>
  `);
  tooltip.show();
  const overlay = await overlayFor(tooltip);
  await waitUntil(() => isAbove(tooltip, overlay));
  tooltip.placement = 'bottom';
  tooltip.strategy = 'fixed';
  await waitUntil(() => {
    const anchor = tooltip.querySelector('button')!.getBoundingClientRect();
    const box = overlay.getBoundingClientRect();
    return (
      Math.abs(box.top - anchor.bottom - 8) < 2 &&
      Math.abs(box.x + box.width / 2 - anchor.x - anchor.width / 2) < 2
    );
  });
});

it('opens on focus, announces its description, and dismisses with Escape', async () => {
  const tooltip = await fixture<AeTooltip>(html`
    <ae-tooltip text="Keyboard help" hover-delay="0" style="margin: 160px;">
      <button>Focus me</button>
    </ae-tooltip>
  `);
  let shown = 0;
  tooltip.addEventListener('ae-tooltip-show', () => shown++);
  const button = tooltip.querySelector('button')!;
  button.focus();
  const overlay = await overlayFor(tooltip);
  expect(button.getAttribute('aria-describedby')).to.equal(overlay.id);
  expect(shown).to.equal(1);
  await expect(tooltip).to.be.accessible();
  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await waitUntil(() => !tooltip.shadowRoot!.querySelector('[role="tooltip"]'));
  expect(button.hasAttribute('aria-describedby')).to.be.false;
});

it('keeps one description reference when initially open and preserves author descriptions on close', async () => {
  const tooltip = await fixture<AeTooltip>(html`
    <ae-tooltip text="Additional help" open style="margin: 160px;">
      <button aria-describedby="author-help">Anchor</button>
    </ae-tooltip>
  `);
  const overlay = await overlayFor(tooltip);
  const button = tooltip.querySelector('button')!;
  expect(button.getAttribute('aria-describedby')).to.equal(`author-help ${overlay.id}`);
  tooltip.placement = 'bottom';
  await tooltip.updateComplete;
  expect(button.getAttribute('aria-describedby')).to.equal(`author-help ${overlay.id}`);
  tooltip.hide();
  await tooltip.updateComplete;
  expect(button.getAttribute('aria-describedby')).to.equal('author-help');
});
