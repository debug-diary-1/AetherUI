import { css } from 'lit';

/**
 * Button component styles following standardized pattern
 * CSS Variables follow: --ae-button-{property}-{variant?}
 */
export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  /* Base button styles for all variants */
  button {
    display: inline-flex;
    align-items: center;
    gap: var(--ae-button-gap, 0.5rem);
    padding: var(--ae-button-padding-y, 0.5rem) var(--ae-button-padding-x, 1rem);
    border-radius: var(--ae-button-radius, 0.375rem);
    cursor: pointer;
    font: inherit;
    transition-property: background-color, box-shadow, border-color, transform;
    transition-duration: var(--ae-button-transition-duration, 200ms);
    transition-timing-function: var(--ae-button-transition-timing, ease);
    border: 1px solid;
  }
  
  /* Primary variant */
  :host([variant="primary"]) button, 
  :host(:not([variant])) button {
    background-color: var(--ae-button-bg-primary, #5e7ce2);
    color: var(--ae-button-fg-primary, white);
    border-color: var(--ae-button-border-primary, var(--ae-button-bg-primary, #5e7ce2));
  }
  
  :host([variant="primary"]) button:hover, 
  :host(:not([variant])) button:hover {
    background-color: var(--ae-button-bg-primary-hover, #4b69c8);
    border-color: var(--ae-button-border-primary-hover, var(--ae-button-bg-primary-hover, #4b69c8));
  }
  
  /* Secondary variant */
  :host([variant="secondary"]) button {
    background-color: var(--ae-button-bg-secondary, #f3f4f6);
    color: var(--ae-button-fg-secondary, #333333);
    border-color: var(--ae-button-border-secondary, #d4d4d4);
  }
  
  :host([variant="secondary"]) button:hover {
    background-color: var(--ae-button-bg-secondary-hover, #e5e7eb);
  }
  
  /* Ghost variant */
  :host([variant="ghost"]) button {
    background-color: var(--ae-button-bg-ghost, transparent);
    color: var(--ae-button-fg-ghost, #5e7ce2);
    border-color: var(--ae-button-border-ghost, transparent);
  }
  
  :host([variant="ghost"]) button:hover {
    background-color: var(--ae-button-bg-ghost-hover, rgba(94, 124, 226, 0.1));
  }
  
  /* Active state for all variants */
  button:active {
    transform: translateY(1px);
  }

  /* Sizes */
  :host([size='sm']) button {
    padding: calc(var(--ae-button-padding-y, 0.5rem) * 0.75) calc(var(--ae-button-padding-x, 1rem) * 0.75);
    font-size: var(--ae-button-font-sm, 0.875rem);
  }

  :host([size='md']) button {
    /* Default size, already set */
    font-size: var(--ae-button-font-md, 1rem);
  }

  :host([size='lg']) button {
    padding: calc(var(--ae-button-padding-y, 0.5rem) * 1.25) calc(var(--ae-button-padding-x, 1rem) * 1.25);
    font-size: var(--ae-button-font-lg, 1.125rem);
  }

  /* Icon positioning */
  ::slotted([slot="icon"]) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
  }

  :host([icon-position="end"]) button {
    flex-direction: row-reverse;
  }

  /* Icon-only state */
  :host([icon-only]) button {
    aspect-ratio: 1;
    padding: var(--ae-button-padding-icon-only, 0.5rem);
  }

  /* Hide label in icon-only mode */
  :host([icon-only]) [part="label"] {
    display: none;
  }

  /* Disabled state */
  button:disabled {
    opacity: var(--ae-button-disabled-opacity, 0.6);
    cursor: not-allowed;
  }

  /* Focus state */
  button:focus-visible {
    outline: 2px solid var(--ae-focus-ring-color, var(--ae-color-brand-600, #2563eb));
    outline-offset: var(--ae-focus-ring-offset, 2px);
  }
`; 