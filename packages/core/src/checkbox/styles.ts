import { css } from 'lit';

/**
 * Checkbox component styles
 * Includes styles for:
 * - Base container styling
 * - Hidden native input
 * - Custom control with states
 * - Indicator for checked/indeterminate
 * - Label styling
 */
export const checkboxStyles = css`
  :host {
    display: inline-block;
  }

  .checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkbox-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--ae-checkbox-size, 18px);
    height: var(--ae-checkbox-size, 18px);
    border: 2px solid var(--ae-checkbox-border-color, #d1d5db);
    border-radius: var(--ae-checkbox-border-radius, 4px);
    background: var(--ae-checkbox-bg, white);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .checkbox-icon, .indeterminate-icon {
    width: calc(var(--ae-checkbox-size, 18px) - 6px);
    height: calc(var(--ae-checkbox-size, 18px) - 6px);
    color: var(--ae-checkbox-checked-icon-color, white);
  }

  /* Checked state */
  .checkbox-input:checked + .checkbox-control {
    border-color: var(--ae-checkbox-checked-border-color, #4f46e5);
    background: var(--ae-checkbox-checked-bg, #4f46e5);
  }

  /* Indeterminate state - with higher specificity than checked state */
  :host([indeterminate]) .checkbox-control {
    border-color: var(--ae-checkbox-indeterminate-border-color, #4f46e5);
    background: var(--ae-checkbox-indeterminate-bg, #4f46e5);
  }

  /* Icon colors */
  :host([indeterminate]) .indeterminate-icon {
    color: var(--ae-checkbox-indeterminate-icon-color, white);
  }

  /* Focus state */
  .checkbox-input:focus-visible + .checkbox-control {
    outline: 2px solid var(--ae-checkbox-focus-ring-color, #4f46e5);
    outline-offset: 2px;
  }

  /* Disabled state */
  .checkbox-input:disabled + .checkbox-control {
    border-color: var(--ae-checkbox-disabled-border-color, #e5e7eb);
    background: var(--ae-checkbox-disabled-bg, #f3f4f6);
    cursor: not-allowed;
  }

  /* Disabled indeterminate state */
  :host([disabled][indeterminate]) .checkbox-control {
    border-color: var(--ae-checkbox-disabled-border-color, #e5e7eb); 
    background: var(--ae-checkbox-disabled-bg, #f3f4f6);
  }

  :host([disabled][indeterminate]) .checkbox-control .indeterminate-icon {
    opacity: 0.6;
    color: var(--ae-checkbox-disabled-text-color, #9ca3af);
  }

  /* Disabled checked state */
  :host([disabled][checked]) .checkbox-control .checkbox-icon {
    opacity: 0.6;
    color: var(--ae-checkbox-disabled-text-color, #9ca3af);
  }

  .checkbox-input:disabled ~ .checkbox-label-text {
    color: var(--ae-checkbox-disabled-text-color, #9ca3af);
    cursor: not-allowed;
  }

  .checkbox-label-text {
    color: var(--ae-checkbox-text-color, inherit);
    font-size: var(--ae-checkbox-font-size, inherit);
  }
`; 