import { css } from 'lit';

/**
 * Accordion component styles
 */
export const accordionStyles = css`
  :host {
    display: block;
    border: 1px solid var(--ae-accordion-border, #e5e7eb);
    border-radius: var(--ae-border-radius, 0.375rem);
    background: var(--ae-accordion-bg, white);
    overflow: hidden;
  }
`;

/**
 * Accordion item/panel styles
 */
export const accordionItemStyles = css`
  :host {
    display: block;
    border-bottom: 1px solid var(--ae-accordion-border, #e5e7eb);
  }

  :host(:last-child) {
    border-bottom: none;
  }

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font: inherit;
  }

  .header:focus-visible {
    outline: 2px solid var(--ae-focus-ring-color, #3b82f6);
    outline-offset: -2px;
    position: relative;
    z-index: 1;
  }

  .header-content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .panel {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height var(--ae-accordion-duration, 300ms) ease,
                opacity var(--ae-accordion-duration, 300ms) ease,
                visibility var(--ae-accordion-duration, 300ms) ease;
    visibility: hidden;
  }

  .content {
    padding: 1rem;
  }

  :host([open]) .panel {
    max-height: var(--panel-height, 1000px);
    opacity: 1;
    visibility: visible;
  }

  .icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-left: auto;
    transition: transform var(--ae-accordion-duration, 300ms) ease;
  }

  :host([open]) .icon {
    transform: rotate(90deg);
  }
`; 