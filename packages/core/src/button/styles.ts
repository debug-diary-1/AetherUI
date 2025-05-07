import { css } from 'lit';

/**
 * Button component styles
 * Includes styles for:
 * - Base button styling
 * - Variants (primary, secondary, ghost)
 * - Sizes (sm, md, lg)
 * - Icon positioning
 * - States (disabled, focus)
 */
export const styles = css`
  :host {
    display: inline-block;
    --_focus-ring-color: var(--ae-focus-ring-color, var(--ae-color-primary));
    --_focus-ring-width: var(--ae-focus-ring-width, 2px);
    --_focus-ring-offset: var(--ae-focus-ring-offset, 2px);
  }

  .base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: var(--ae-border-radius, 0.375rem);
    font-family: var(--ae-font-family);
    font-weight: var(--ae-font-weight, 500);
    cursor: pointer;
    transition: all var(--ae-transition-duration, 200ms) ease;
    position: relative;
    margin: 0;
    padding: 0;
    line-height: 1;
    text-align: center;
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    min-width: 0;
  }

  /* Variants */
  .base--primary {
    background: var(--ae-color-primary);
    color: var(--ae-color-primary-foreground);
  }

  .base--primary:hover:not(:disabled) {
    background: var(--ae-color-primary-hover);
  }

  .base--secondary {
    background: var(--ae-color-secondary);
    color: var(--ae-color-secondary-foreground);
  }

  .base--secondary:hover:not(:disabled) {
    background: var(--ae-color-secondary-hover);
  }

  .base--ghost {
    background: transparent;
    color: var(--ae-color-text);
  }

  .base--ghost:hover:not(:disabled) {
    background: var(--ae-color-surface-hover);
  }

  /* Sizes */
  .base--sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1;
    height: 2rem;
  }

  .base--md {
    padding: 0.625rem 1rem;
    font-size: 1rem;
    line-height: 1;
    height: 2.5rem;
  }

  .base--lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
    line-height: 1;
    height: 3rem;
  }

  /* Icon positioning */
  ::slotted([slot="icon"]) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  :host([icon-position="end"]) .base {
    flex-direction: row-reverse;
  }

  /* Icon-only state */
  :host([icon-only]) .base {
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1;
  }

  :host([icon-only]) ::slotted([slot="icon"]) {
    width: 1.25em;
    height: 1.25em;
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([disabled]) .base {
    cursor: not-allowed;
  }

  /* Focus state */
  .base:focus-visible {
    outline: var(--_focus-ring-width) solid var(--_focus-ring-color);
    outline-offset: var(--_focus-ring-offset);
  }
`; 