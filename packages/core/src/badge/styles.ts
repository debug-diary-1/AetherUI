import { css } from 'lit';

/**
 * Badge component styles
 */
export const badgeStyles = css`
  :host {
    display: inline-block;
  }

  .badge-base,
  .badge-dot {
    display: inline-flex;
    align-items: center;
    gap: var(--ae-badge-gap, 0.25rem);
    font-family: var(--ae-badge-font-family, inherit);
    font-weight: var(--ae-badge-font-weight, 500);
    line-height: 1;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .badge-base {
    padding: var(--ae-badge-padding, 0.25rem 0.5rem);
    border-radius: var(--ae-badge-border-radius, 0.375rem);
    border: 1px solid transparent;
  }

  /* Sizes */
  :host([size="sm"]) .badge-base {
    font-size: var(--ae-badge-font-size-sm, 0.75rem);
    padding: var(--ae-badge-padding-sm, 0.125rem 0.375rem);
  }

  :host([size="md"]) .badge-base {
    font-size: var(--ae-badge-font-size-md, 0.875rem);
    padding: var(--ae-badge-padding-md, 0.25rem 0.5rem);
  }

  :host([size="lg"]) .badge-base {
    font-size: var(--ae-badge-font-size-lg, 1rem);
    padding: var(--ae-badge-padding-lg, 0.375rem 0.75rem);
  }

  /* Variant: Primary (Solid) */
  :host([variant="primary"]:not([outline])) .badge-base {
    background: var(--ae-badge-bg-primary, #4f46e5);
    color: var(--ae-badge-color-primary, white);
  }

  /* Variant: Primary (Outline) */
  :host([variant="primary"][outline]) .badge-base {
    background: transparent;
    color: var(--ae-badge-color-primary-outline, #4f46e5);
    border-color: var(--ae-badge-border-primary-outline, #4f46e5);
  }

  /* Variant: Secondary (Solid) */
  :host([variant="secondary"]:not([outline])) .badge-base {
    background: var(--ae-badge-bg-secondary, #6b7280);
    color: var(--ae-badge-color-secondary, white);
  }

  /* Variant: Secondary (Outline) */
  :host([variant="secondary"][outline]) .badge-base {
    background: transparent;
    color: var(--ae-badge-color-secondary-outline, #6b7280);
    border-color: var(--ae-badge-border-secondary-outline, #6b7280);
  }

  /* Variant: Success (Solid) */
  :host([variant="success"]:not([outline])) .badge-base {
    background: var(--ae-badge-bg-success, #10b981);
    color: var(--ae-badge-color-success, white);
  }

  /* Variant: Success (Outline) */
  :host([variant="success"][outline]) .badge-base {
    background: transparent;
    color: var(--ae-badge-color-success-outline, #10b981);
    border-color: var(--ae-badge-border-success-outline, #10b981);
  }

  /* Variant: Warning (Solid) */
  :host([variant="warning"]:not([outline])) .badge-base {
    background: var(--ae-badge-bg-warning, #f59e0b);
    color: var(--ae-badge-color-warning, white);
  }

  /* Variant: Warning (Outline) */
  :host([variant="warning"][outline]) .badge-base {
    background: transparent;
    color: var(--ae-badge-color-warning-outline, #f59e0b);
    border-color: var(--ae-badge-border-warning-outline, #f59e0b);
  }

  /* Variant: Error (Solid) */
  :host([variant="error"]:not([outline])) .badge-base {
    background: var(--ae-badge-bg-error, #ef4444);
    color: var(--ae-badge-color-error, white);
  }

  /* Variant: Error (Outline) */
  :host([variant="error"][outline]) .badge-base {
    background: transparent;
    color: var(--ae-badge-color-error-outline, #ef4444);
    border-color: var(--ae-badge-border-error-outline, #ef4444);
  }

  /* Variant: Info (Solid) */
  :host([variant="info"]:not([outline])) .badge-base {
    background: var(--ae-badge-bg-info, #3b82f6);
    color: var(--ae-badge-color-info, white);
  }

  /* Variant: Info (Outline) */
  :host([variant="info"][outline]) .badge-base {
    background: transparent;
    color: var(--ae-badge-color-info-outline, #3b82f6);
    border-color: var(--ae-badge-border-info-outline, #3b82f6);
  }

  /* Close button */
  .close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  .close-button:hover {
    opacity: 1;
  }

  .close-button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Dot indicator */
  .badge-dot {
    padding: 0;
  }

  .dot-indicator {
    width: var(--ae-badge-dot-size, 8px);
    height: var(--ae-badge-dot-size, 8px);
    border-radius: 50%;
    display: inline-block;
  }

  :host([variant="primary"][dot]) .dot-indicator {
    background: var(--ae-badge-bg-primary, #4f46e5);
  }

  :host([variant="secondary"][dot]) .dot-indicator {
    background: var(--ae-badge-bg-secondary, #6b7280);
  }

  :host([variant="success"][dot]) .dot-indicator {
    background: var(--ae-badge-bg-success, #10b981);
  }

  :host([variant="warning"][dot]) .dot-indicator {
    background: var(--ae-badge-bg-warning, #f59e0b);
  }

  :host([variant="error"][dot]) .dot-indicator {
    background: var(--ae-badge-bg-error, #ef4444);
  }

  :host([variant="info"][dot]) .dot-indicator {
    background: var(--ae-badge-bg-info, #3b82f6);
  }
`;
