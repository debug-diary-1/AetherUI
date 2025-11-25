import { css } from 'lit';

export const alertStyles = css`
  :host {
    display: block;
  }

  :host(:not([open])) {
    display: none;
  }

  /* Base alert container */
  ::part(base) {
    display: flex;
    align-items: flex-start;
    gap: var(--ae-space-3, 0.75rem);
    padding: var(--ae-alert-padding, 1rem);
    border-radius: var(--ae-alert-radius, 0.375rem);
    border: var(--ae-alert-border-width, 1px) solid var(--ae-alert-border-info);
    background: var(--ae-alert-bg-info);
    color: var(--ae-alert-fg-info);
    font-size: var(--ae-alert-font-size, 0.875rem);
  }

  /* Size variants */
  :host([size='sm']) ::part(base) {
    padding: var(--ae-alert-padding-sm, 0.75rem);
    gap: var(--ae-alert-gap-sm, 0.5rem);
    font-size: var(--ae-alert-font-size-sm, 0.8125rem);
  }

  :host([size='sm']) ::part(icon) {
    width: 18px;
    height: 18px;
  }

  :host([size='md']) ::part(base) {
    padding: var(--ae-alert-padding-md, 1rem);
    gap: var(--ae-alert-gap-md, 0.75rem);
    font-size: var(--ae-alert-font-size-md, 0.875rem);
  }

  :host([size='md']) ::part(icon) {
    width: 24px;
    height: 24px;
  }

  :host([size='lg']) ::part(base) {
    padding: var(--ae-alert-padding-lg, 1.25rem);
    gap: var(--ae-alert-gap-lg, 1rem);
    font-size: var(--ae-alert-font-size-lg, 1rem);
  }

  :host([size='lg']) ::part(icon) {
    width: 28px;
    height: 28px;
  }

  /* Variant styles */
  :host([variant='success']) ::part(base) {
    border-color: var(--ae-alert-border-success);
    background: var(--ae-alert-bg-success);
    color: var(--ae-alert-fg-success);
  }

  :host([variant='warning']) ::part(base) {
    border-color: var(--ae-alert-border-warning);
    background: var(--ae-alert-bg-warning);
    color: var(--ae-alert-fg-warning);
  }

  :host([variant='error']) ::part(base) {
    border-color: var(--ae-alert-border-error);
    background: var(--ae-alert-bg-error);
    color: var(--ae-alert-fg-error);
  }

  /* Icon styling */
  ::part(icon) {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: var(--ae-alert-icon-info);
  }

  :host([variant='success']) ::part(icon) {
    color: var(--ae-alert-icon-success);
  }

  :host([variant='warning']) ::part(icon) {
    color: var(--ae-alert-icon-warning);
  }

  :host([variant='error']) ::part(icon) {
    color: var(--ae-alert-icon-error);
  }

  /* Content area */
  ::part(content) {
    flex: 1;
  }

  /* Close button */
  ::part(close) {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    color: inherit;
    opacity: 0.7;
    border-radius: 50%;
  }

  ::part(close):hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }

  ::part(close):focus {
    outline: 2px solid var(--ae-focus-ring-color);
    outline-offset: 2px;
  }
`; 