import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { type AeButton, defineAeButton } from '../index.js';

defineAeButton();

describe('ae-button', () => {
  it('renders its public variants onto a native button', async () => {
    const element = await fixture<AeButton>(html`
      <ae-button variant="secondary" size="lg">Save</ae-button>
    `);

    expect(element.variant).to.equal('secondary');
    expect(element.size).to.equal('lg');
    expect(element.shadowRoot!.querySelector('button')).to.exist;
  });

  it('emits the standardized action event', async () => {
    const element = await fixture<AeButton>(html`<ae-button>Save</ae-button>`);
    const clicked = oneEvent(element, 'ae-button-click');

    element.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    const event = (await clicked) as CustomEvent<{ sourceEvent: Event }>;

    expect(event.detail.sourceEvent).to.be.instanceOf(Event);
  });

  it('does not emit actions while disabled', async () => {
    const element = await fixture<AeButton>(html`<ae-button disabled>Save</ae-button>`);
    let actions = 0;
    element.addEventListener('ae-button-click', () => actions++);

    element.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();

    expect(actions).to.equal(0);
  });
});
