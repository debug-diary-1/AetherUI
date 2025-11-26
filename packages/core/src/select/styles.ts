import { css } from 'lit';

/**
 * Select component styles
 */
export const selectStyles = css`
  :host {
    display: block;
  }

  .select-base {
    display: flex;
    flex-direction: column;
    gap: var(--ae-select-gap, 0.5rem);
  }

  .select-label {
    display: block;
    font-size: var(--ae-select-label-font-size, 0.875rem);
    font-weight: var(--ae-select-label-font-weight, 500);
    color: var(--ae-select-label-color);
    line-height: 1.25rem;
  }

  .required-indicator {
    color: var(--ae-select-required-color);
    margin-left: 0.125rem;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: var(--ae-select-border);
    border-radius: var(--ae-select-border-radius, 0.375rem);
    background: var(--ae-select-bg);
    transition: all 0.2s ease;
  }

  .select-wrapper:hover:not(.disabled) {
    border-color: var(--ae-select-border-hover);
  }

  .select-wrapper.focused {
    outline: 2px solid var(--ae-select-focus-ring);
    outline-offset: 0;
    border-color: var(--ae-select-border-focus);
  }

  .select-wrapper.error {
    border-color: var(--ae-select-border-error);
  }

  .select-wrapper.error.focused {
    outline-color: var(--ae-select-focus-ring-error);
    border-color: var(--ae-select-border-error);
  }

  .select-wrapper.disabled {
    background: var(--ae-select-bg-disabled);
    border-color: var(--ae-select-border-disabled);
    cursor: not-allowed;
  }

  .select-control {
    flex: 1;
    width: 100%;
    padding: var(--ae-select-padding, 0.5rem 0.75rem);
    border: none;
    outline: none;
    background: transparent;
    font-size: var(--ae-select-font-size, 1rem);
    color: var(--ae-select-color);
    line-height: 1.5;
    font-family: inherit;
    cursor: pointer;
    appearance: none;
  }

  .select-control:disabled {
    color: var(--ae-select-color-disabled);
    cursor: not-allowed;
  }

  .select-control[multiple] {
    padding: var(--ae-select-multiple-padding, 0.5rem);
    min-height: var(--ae-select-multiple-min-height, 120px);
  }

  .select-control option {
    padding: var(--ae-select-option-padding, 0.5rem);
  }

  .select-icon {
    position: absolute;
    right: 0.75rem;
    pointer-events: none;
    color: var(--ae-select-icon-color);
  }

  .disabled .select-icon {
    color: var(--ae-select-icon-color-disabled);
  }

  .help-text {
    font-size: var(--ae-select-help-text-font-size, 0.875rem);
    color: var(--ae-select-help-text-color);
    line-height: 1.25rem;
  }

  .error-text {
    font-size: var(--ae-select-error-text-font-size, 0.875rem);
    color: var(--ae-select-error-text-color);
    line-height: 1.25rem;
  }
`;
