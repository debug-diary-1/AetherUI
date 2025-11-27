import { css } from 'lit';

/**
 * Input component styles
 * Includes styles for:
 * - Base container styling
 * - Label styling
 * - Input wrapper and control
 * - Prefix and suffix slots
 * - Clear button
 * - Help text and error messages
 * - Focus, disabled, and error states
 */
export const inputStyles = css`
  :host {
    display: block;
  }

  .input-base {
    display: flex;
    flex-direction: column;
    gap: var(--ae-input-gap, 0.5rem);
  }

  .input-label {
    display: block;
    font-size: var(--ae-input-label-font-size, 0.875rem);
    font-weight: var(--ae-input-label-font-weight, 500);
    color: var(--ae-input-label-color);
    line-height: 1.25rem;
  }

  .required-indicator {
    color: var(--ae-input-required-color);
    margin-left: 0.125rem;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--ae-input-wrapper-gap, 0.5rem);
    padding: var(--ae-input-padding, 0.5rem 0.75rem);
    border: var(--ae-input-border);
    border-radius: var(--ae-input-border-radius, 0.375rem);
    background: var(--ae-input-bg);
    transition: all 0.2s ease;
  }

  .input-wrapper:hover:not(.disabled) {
    border-color: var(--ae-input-border-hover);
  }

  .input-wrapper.focused {
    outline: 2px solid var(--ae-input-focus-ring);
    outline-offset: 0;
    border-color: var(--ae-input-border-focus);
  }

  .input-wrapper.error {
    border-color: var(--ae-input-border-error);
  }

  .input-wrapper.error.focused {
    outline-color: var(--ae-input-focus-ring-error);
    border-color: var(--ae-input-border-error);
  }

  .input-wrapper.disabled {
    background: var(--ae-input-bg-disabled);
    border-color: var(--ae-input-border-disabled);
    cursor: not-allowed;
  }

  .input-control {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: var(--ae-input-font-size, 1rem);
    color: var(--ae-input-color);
    line-height: 1.5;
    font-family: inherit;
  }

  .input-control::placeholder {
    color: var(--ae-input-placeholder-color);
  }

  .input-control:disabled {
    color: var(--ae-input-color-disabled);
    cursor: not-allowed;
  }

  .input-control[readonly] {
    cursor: default;
  }

  /* Remove number input spinners */
  .input-control::-webkit-outer-spin-button,
  .input-control::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input-control[type="number"] {
    -moz-appearance: textfield;
  }

  /* Clear search button in Chrome */
  .input-control[type="search"]::-webkit-search-cancel-button {
    display: none;
  }

  .clear-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border: none;
    background: transparent;
    color: var(--ae-input-clear-button-color);
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .clear-button:hover {
    color: var(--ae-input-clear-button-hover);
    background: var(--ae-input-clear-button-bg-hover);
  }

  .clear-button:focus-visible {
    outline: 2px solid var(--ae-input-focus-ring);
    outline-offset: 0;
  }

  ::slotted([slot="prefix"]),
  ::slotted([slot="suffix"]) {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--ae-input-affix-color);
  }

  .help-text {
    font-size: var(--ae-input-help-text-font-size, 0.875rem);
    color: var(--ae-input-help-text-color);
    line-height: 1.25rem;
  }

  .error-text {
    font-size: var(--ae-input-error-text-font-size, 0.875rem);
    color: var(--ae-input-error-text-color);
    line-height: 1.25rem;
  }
`;
