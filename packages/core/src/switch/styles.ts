import { css } from 'lit';

/**
 * Switch component styles
 */
export const switchStyles = css`
  :host {
    display: inline-block;
  }

  .switch-label {
    display: inline-flex;
    align-items: center;
    gap: var(--ae-switch-gap, 0.5rem);
    cursor: pointer;
    user-select: none;
  }

  .switch-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch-control {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ae-switch-border-radius, 9999px);
    background: var(--ae-switch-bg, #d1d5db);
    transition: background-color 0.2s ease;
  }

  /* Sizes */
  :host([size="sm"]) .switch-control {
    width: var(--ae-switch-width-sm, 32px);
    height: var(--ae-switch-height-sm, 18px);
    padding: 2px;
  }

  :host([size="sm"]) .switch-thumb {
    width: 14px;
    height: 14px;
  }

  :host([size="sm"]) .switch-input:checked + .switch-control .switch-thumb {
    transform: translateX(14px);
  }

  :host([size="md"]) .switch-control {
    width: var(--ae-switch-width-md, 44px);
    height: var(--ae-switch-height-md, 24px);
    padding: 2px;
  }

  :host([size="md"]) .switch-thumb {
    width: 20px;
    height: 20px;
  }

  :host([size="md"]) .switch-input:checked + .switch-control .switch-thumb {
    transform: translateX(20px);
  }

  :host([size="lg"]) .switch-control {
    width: var(--ae-switch-width-lg, 56px);
    height: var(--ae-switch-height-lg, 30px);
    padding: 3px;
  }

  :host([size="lg"]) .switch-thumb {
    width: 24px;
    height: 24px;
  }

  :host([size="lg"]) .switch-input:checked + .switch-control .switch-thumb {
    transform: translateX(26px);
  }

  .switch-thumb {
    border-radius: 50%;
    background: var(--ae-switch-thumb-bg, white);
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Checked state */
  .switch-input:checked + .switch-control {
    background: var(--ae-switch-bg-checked, #4f46e5);
  }

  /* Focus state */
  .switch-input:focus-visible + .switch-control {
    outline: 2px solid var(--ae-switch-focus-ring, #4f46e5);
    outline-offset: 2px;
  }

  /* Disabled state */
  .switch-input:disabled + .switch-control {
    background: var(--ae-switch-bg-disabled, #e5e7eb);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .switch-input:disabled:checked + .switch-control {
    background: var(--ae-switch-bg-checked-disabled, #9ca3af);
  }

  .switch-input:disabled ~ .switch-label-text {
    color: var(--ae-switch-text-disabled, #9ca3af);
    cursor: not-allowed;
  }

  .switch-label-text {
    color: var(--ae-switch-text-color, inherit);
    font-size: var(--ae-switch-font-size, inherit);
  }
`;
