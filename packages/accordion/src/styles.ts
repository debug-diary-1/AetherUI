import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    border: 1px solid var(--ae-accordion-border, #e5e7eb);
    border-radius: 0.375rem;
  }

  .accordion {
    display: flex;
    flex-direction: column;
  }

  ::slotted(ae-accordion-panel) {
    border-bottom: 1px solid var(--ae-accordion-border, #e5e7eb);
  }

  ::slotted(ae-accordion-panel:last-child) {
    border-bottom: none;
  }
`; 