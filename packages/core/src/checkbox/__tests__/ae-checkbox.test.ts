import { html, fixture, expect } from '@open-wc/testing';
import { AeCheckbox } from '../ae-checkbox.js';
import '../ae-checkbox.js';

describe('ae-checkbox', () => {
  it('renders with default properties', async () => {
    const el = await fixture<AeCheckbox>(html`<ae-checkbox></ae-checkbox>`);
    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('reflects ARIA state via ElementInternals', async () => {
    const el = await fixture<AeCheckbox>(html`<ae-checkbox checked></ae-checkbox>`);
    expect((el as unknown as { _internals: ElementInternals })._internals.role).to.equal(
      'checkbox',
    );
    expect((el as unknown as { _internals: ElementInternals })._internals.ariaChecked).to.equal(
      'true',
    );
  });

  describe('keyboard accessibility', () => {
    it('attaches its shadow root with delegatesFocus', async () => {
      const el = await fixture<AeCheckbox>(html`<ae-checkbox></ae-checkbox>`);
      expect(el.shadowRoot!.delegatesFocus).to.be.true;
    });

    it('inner input is in the focus order (no tabindex="-1")', async () => {
      const el = await fixture<AeCheckbox>(html`<ae-checkbox></ae-checkbox>`);
      const inner = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(inner).to.exist;
      expect(inner.hasAttribute('tabindex')).to.be.false;
    });

    it('focusing the host moves focus to the inner input', async () => {
      const el = await fixture<AeCheckbox>(html`<ae-checkbox></ae-checkbox>`);
      el.focus();
      const inner = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(el.shadowRoot!.activeElement).to.equal(inner);
    });

    it('inner input remains aria-hidden so the host carries the semantics', async () => {
      const el = await fixture<AeCheckbox>(html`<ae-checkbox></ae-checkbox>`);
      const inner = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(inner.getAttribute('aria-hidden')).to.equal('true');
    });
  });
});
