import { css } from 'lit';

export const modalStyles = css`
  :host {
    --ae-modal-width: 32rem;
    --ae-modal-max-width: calc(100vw - 2rem);
    --ae-modal-height: auto;
    --ae-modal-max-height: calc(100vh - 2rem);
    --ae-modal-background: var(--ae-modal-bg, var(--ae-bg-primary));
    --ae-modal-text-color: var(--ae-text-primary);
    --ae-modal-border-radius: var(--ae-border-radius, 0.5rem);
    --ae-modal-padding: 1.5rem;
    --ae-modal-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --ae-modal-backdrop-color: rgba(0, 0, 0, 0.4);
    --ae-modal-backdrop-blur: 2px;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background-color: var(--ae-modal-backdrop-color);
    backdrop-filter: blur(var(--ae-modal-backdrop-blur));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .panel {
    position: relative;
    width: var(--ae-modal-width);
    max-width: var(--ae-modal-max-width);
    height: var(--ae-modal-height);
    max-height: var(--ae-modal-max-height);
    background: var(--ae-modal-background);
    color: var(--ae-modal-text-color);
    border-radius: var(--ae-modal-border-radius);
    box-shadow: var(--ae-modal-shadow);
    overflow: auto;
  }

  .header {
    padding: var(--ae-modal-padding);
    padding-bottom: 0.75rem;
    border-bottom: var(--ae-modal-header-border, 1px solid var(--ae-border-primary));
    position: relative;
    color: var(--ae-modal-text-color);
  }

  .body {
    padding: var(--ae-modal-padding);
    color: var(--ae-modal-text-color);
  }

  .footer {
    padding: var(--ae-modal-padding);
    padding-top: 0.75rem;
    border-top: var(--ae-modal-footer-border, 1px solid var(--ae-border-primary));
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    color: var(--ae-modal-text-color);
  }

  .close-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--ae-modal-text-color);
    opacity: 0.5;
    transition: opacity 200ms ease;
  }

  .close-button:hover {
    opacity: 1;
  }

  .close-icon {
    display: block;
  }

  /* Ensure slotted content inherits text color */
  ::slotted(*) {
    color: inherit;
  }

  /* Size variants */
  .panel[data-size="small"] {
    --ae-modal-width: 24rem;
  }

  .panel[data-size="medium"] {
    --ae-modal-width: 32rem;
  }

  .panel[data-size="large"] {
    --ae-modal-width: 48rem;
  }
`; 