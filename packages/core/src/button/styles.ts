import { css } from 'lit';

/**
 * Button component styles following standardized pattern
 * CSS Variables follow: --ae-button-{property}-{variant?}
 *
 * Note: This component requires a theme (light.css, dark.css, or custom) to be imported.
 * Alternatively, use the `unstyled` attribute for complete custom styling.
 */
export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  /* Base button styles for all variants */
  :host(:not([unstyled])) button {
    display: inline-flex;
    align-items: center;
    gap: var(--ae-button-gap);
    padding: var(--ae-button-padding-y) var(--ae-button-padding-x);
    border-radius: var(--ae-button-radius);
    cursor: pointer;
    font: inherit;
    transition-property: background-color, box-shadow, border-color, transform;
    transition-duration: var(--ae-button-transition-duration);
    transition-timing-function: var(--ae-button-transition-timing);
    border: 1px solid;
  }

  /* Unstyled mode: minimal structural styles only */
  :host([unstyled]) button {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font: inherit;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
  }

  /* Primary variant */
  :host(:not([unstyled])[variant="primary"]) button,
  :host(:not([unstyled]):not([variant])) button {
    background-color: var(--ae-button-bg-primary);
    color: var(--ae-button-fg-primary);
    border-color: var(--ae-button-border-primary);
  }

  :host(:not([unstyled])[variant="primary"]) button:hover,
  :host(:not([unstyled]):not([variant])) button:hover {
    background-color: var(--ae-button-bg-primary-hover);
    border-color: var(--ae-button-border-primary-hover);
  }

  /* Secondary variant */
  :host(:not([unstyled])[variant="secondary"]) button {
    background-color: var(--ae-button-bg-secondary);
    color: var(--ae-button-fg-secondary);
    border-color: var(--ae-button-border-secondary);
  }

  :host(:not([unstyled])[variant="secondary"]) button:hover {
    background-color: var(--ae-button-bg-secondary-hover);
  }

  /* Ghost variant */
  :host(:not([unstyled])[variant="ghost"]) button {
    background-color: var(--ae-button-bg-ghost);
    color: var(--ae-button-fg-ghost);
    border-color: var(--ae-button-border-ghost);
  }

  :host(:not([unstyled])[variant="ghost"]) button:hover {
    background-color: var(--ae-button-bg-ghost-hover);
  }

  /* Active state for all variants */
  :host(:not([unstyled])) button:active {
    transform: translateY(1px);
  }

  /* Sizes */
  :host(:not([unstyled])[size='sm']) button {
    padding: calc(var(--ae-button-padding-y) * 0.75) calc(var(--ae-button-padding-x) * 0.75);
    font-size: var(--ae-button-font-sm);
  }

  :host(:not([unstyled])[size='md']) button {
    /* Default size, already set */
    font-size: var(--ae-button-font-md);
  }

  :host(:not([unstyled])[size='lg']) button {
    padding: calc(var(--ae-button-padding-y) * 1.25) calc(var(--ae-button-padding-x) * 1.25);
    font-size: var(--ae-button-font-lg);
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
  :host(:not([unstyled])[icon-only]) button {
    aspect-ratio: 1;
    padding: var(--ae-button-padding-icon-only);
  }

  /* Hide label in icon-only mode */
  :host([icon-only]) [part="label"] {
    display: none;
  }

  /* Disabled state */
  :host(:not([unstyled])) button:disabled {
    opacity: var(--ae-button-disabled-opacity);
    cursor: not-allowed;
  }

  :host([unstyled]) button:disabled {
    cursor: not-allowed;
  }

  /* Focus state */
  :host(:not([unstyled])) button:focus-visible {
    outline: 2px solid var(--ae-focus-ring-color);
    outline-offset: var(--ae-focus-ring-offset);
  }
`;
