import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { type AeAutocomplete, defineAeAutocomplete } from '../index.js';

defineAeAutocomplete();

describe('ae-autocomplete', () => {
  it('renders an accessible combobox with consumer-provided options', async () => {
    const element = await fixture<AeAutocomplete>(html`<ae-autocomplete></ae-autocomplete>`);
    element.options = ['Alpha', 'Beta'];
    element.ariaLabel = 'Search destinations';
    await element.updateComplete;

    const input = element.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    expect(input.getAttribute('role')).to.equal('combobox');
    expect(input.getAttribute('aria-label')).to.equal('Search destinations');
    expect(element.options.map((option) => option.text)).to.deep.equal(['Alpha', 'Beta']);
  });

  it('emits a structured change event when the user types', async () => {
    const element = await fixture<AeAutocomplete>(html`<ae-autocomplete></ae-autocomplete>`);
    const input = element.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    const changed = oneEvent(element, 'ae-autocomplete-change');

    input.value = 'Al';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    const event = (await changed) as CustomEvent<{ value: string }>;

    expect(event.detail.value).to.equal('Al');
    expect(element.value).to.equal('Al');
  });
});
