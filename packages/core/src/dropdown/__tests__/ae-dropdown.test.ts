import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import type { AeDropdown } from '../index.js';
import '../index.js';

describe('ae-dropdown', () => {
  it('opens in uncontrolled mode from its trigger', async () => {
    const element = await fixture<AeDropdown>(html`<ae-dropdown>Actions</ae-dropdown>`);
    const trigger = element.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!;

    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
    trigger.click();
    await element.updateComplete;

    expect(element.shadowRoot!.querySelector('[role="menu"]')).to.exist;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
  });

  it('emits a selection with the item value', async () => {
    const element = await fixture<AeDropdown>(html`
      <ae-dropdown default-open>
        Actions
        <ae-dropdown-item slot="item" value="archive">Archive</ae-dropdown-item>
      </ae-dropdown>
    `);
    await element.updateComplete;
    const item = element.querySelector('ae-dropdown-item')!;
    await item.updateComplete;
    const selected = oneEvent(element, 'ae-select');

    item.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    const event = (await selected) as CustomEvent<{ value: string }>;

    expect(event.detail.value).to.equal('archive');
  });
});
