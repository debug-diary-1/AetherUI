import { css } from 'lit';

export const modalStyles = css`
  :host {
    --ae-modal-width: 32rem;
    --ae-modal-max-width: calc(100vw - 2rem);
    --ae-modal-height: auto;
    --ae-modal-max-height: calc(100vh - 2rem);
    --ae-modal-background: var(--ae-color-surface, #ffffff);
    --ae-modal-border-radius: var(--ae-border-radius, 0.5rem);
    --ae-modal-padding: 1.5rem;
    --ae-modal-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }

  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .modal {
    position: relative;
    width: var(--ae-modal-width);
    max-width: var(--ae-modal-max-width);
    height: var(--ae-modal-height);
    max-height: var(--ae-modal-max-height);
    background: var(--ae-modal-background);
    border-radius: var(--ae-modal-border-radius);
    padding: var(--ae-modal-padding);
    box-shadow: var(--ae-modal-shadow);
    overflow: auto;
  }

  .close-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--ae-color-text, #000000);
    opacity: 0.5;
    transition: opacity 200ms ease;
  }

  .close-button:hover {
    opacity: 1;
  }
`; 