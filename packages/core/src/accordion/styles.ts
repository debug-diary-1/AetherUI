import { css } from 'lit';

/**
 * Accordion container styles
 */
export const accordionStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--ae-font-family, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif);
    border-radius: var(--ae-accordion-radius, var(--ae-radius, 0.375rem));
    overflow: hidden;
    background: var(--ae-accordion-bg, Canvas);
    /* Add subtle shadow for depth */
    box-shadow: var(--ae-accordion-shadow, none);
    /* Optional border */
    border: var(--ae-accordion-border, 1px solid color-mix(in srgb, currentColor 20%, transparent));
  }

  .accordion {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  ::slotted(ae-accordion-item:not(:last-child)) {
    border-bottom: var(
      --ae-accordion-divider,
      1px solid color-mix(in srgb, currentColor 15%, transparent)
    );
  }
`;

/**
 * Accordion item/panel styles
 */
export const accordionItemStyles = css`
  :host {
    display: block;
  }

  .accordion-item {
    width: 100%;
  }

  /* Header styling */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: var(--ae-accordion-header-bg, transparent);
    padding: var(--ae-accordion-header-padding, 0.875rem 1rem);
    cursor: pointer;
    border: none;
    text-align: left;
    color: var(--ae-accordion-header-color, var(--ae-text-primary, CanvasText));
    font-weight: var(--ae-accordion-header-font-weight, 500);
    font-family: inherit;
    font-size: var(--ae-accordion-header-font-size, 0.875rem);
    line-height: 1.5;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .header-content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Header hover & focus states */
  .header:hover {
    background: var(
      --ae-accordion-header-hover-bg,
      color-mix(in srgb, currentColor 8%, transparent)
    );
  }

  .header:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--ae-focus-ring-color, Highlight);
  }

  /* Icon styling & animation */
  .icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    color: var(--ae-accordion-icon-color, currentColor);
    transition: transform 0.2s ease;
    margin-left: 0.5rem;
  }

  :host([open]) .icon {
    transform: rotate(90deg);
    color: var(--ae-accordion-icon-active-color, currentColor);
  }

  /* Panel styling & animation */
  .panel {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition:
      max-height 0.3s ease,
      opacity 0.2s ease;
  }

  .panel-content {
    padding: var(--ae-accordion-panel-padding, 1rem);
    background: var(--ae-accordion-panel-bg, Canvas);
    color: var(--ae-accordion-panel-color, var(--ae-text-primary, CanvasText));
    font-size: var(--ae-accordion-panel-font-size, 0.875rem);
  }

  /* Open state */
  :host([open]) .panel {
    max-height: var(--panel-height, 1000px);
    opacity: 1;
  }

  :host([open]) .header {
    background: var(
      --ae-accordion-header-active-bg,
      color-mix(in srgb, currentColor 12%, transparent)
    );
    color: var(--ae-accordion-header-active-color, CanvasText);
  }

  /* Disabled state */
  :host([disabled]) .header {
    cursor: not-allowed;
    opacity: 0.6;
    color: var(--ae-accordion-header-disabled-color, GrayText);
  }

  :host([disabled]) .icon {
    color: var(--ae-accordion-icon-disabled-color, GrayText);
  }
`;
