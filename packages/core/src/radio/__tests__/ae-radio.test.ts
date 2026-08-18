import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import type { AeRadio, AeRadioGroup } from '../index.js';
import '../index.js';

describe('ae-radio', () => {
  it('uses radio semantics and reports user selection', async () => {
    const element = await fixture<AeRadio>(html`<ae-radio value="daily">Daily</ae-radio>`);
    const selected = oneEvent(element, 'ae-radio-change');

    element
      .shadowRoot!.querySelector<HTMLInputElement>('input')!
      .dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    const event = (await selected) as CustomEvent<{ checked: boolean; value: string }>;

    expect(event.detail).to.deep.equal({ checked: true, value: 'daily' });
    expect(element.checked).to.be.true;
  });

  it('coordinates name, value, and disabled state through a group', async () => {
    const group = await fixture<AeRadioGroup>(html`
      <ae-radio-group name="frequency" value="weekly" disabled>
        <ae-radio value="daily">Daily</ae-radio>
        <ae-radio value="weekly">Weekly</ae-radio>
      </ae-radio-group>
    `);
    await group.updateComplete;
    const radios = Array.from(group.querySelectorAll('ae-radio'));
    await Promise.all(radios.map((radio) => radio.updateComplete));

    expect(radios[0].name).to.equal('frequency');
    expect(radios[0].disabled).to.be.true;
    expect(radios[0].checked).to.be.false;
    expect(radios[1].checked).to.be.true;
  });
});
