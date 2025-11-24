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
    background: var(--ae-alert-bg-info, #e8f4fd);
    color: var(--ae-alert-fg-info, #055160);
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
    background: var(--ae-alert-bg-success, #edf7ed);
    color: var(--ae-alert-fg-success, #065f46);
  }

  :host([variant='warning']) ::part(base) {
    background: var(--ae-alert-bg-warning, #fff8e1);
    color: var(--ae-alert-fg-warning, #7a4d00);
  }

  :host([variant='error']) ::part(base) {
    background: var(--ae-alert-bg-error, #fdecea);
    color: var(--ae-alert-fg-error, #b71c1c);
  }

  /* Icon styling */
  ::part(icon) {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
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
    outline: 2px solid var(--ae-focus-ring-color, rgba(0, 0, 0, 0.2));
    outline-offset: 2px;
  }
`; 