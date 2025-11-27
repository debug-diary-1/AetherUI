import { css } from 'lit';

/**
 * Textarea component styles
 */
export const textareaStyles = css`
  :host {
    display: block;
  }

  .textarea-base {
    display: flex;
    flex-direction: column;
    gap: var(--ae-textarea-gap, 0.5rem);
  }

  .textarea-label {
    display: block;
    font-size: var(--ae-textarea-label-font-size, 0.875rem);
    font-weight: var(--ae-textarea-label-font-weight, 500);
    color: var(--ae-textarea-label-color);
    line-height: 1.25rem;
  }

  .required-indicator {
    color: var(--ae-textarea-required-color);
    margin-left: 0.125rem;
  }

  .textarea-wrapper {
    display: flex;
    border: var(--ae-textarea-border);
    border-radius: var(--ae-textarea-border-radius, 0.375rem);
    background: var(--ae-textarea-bg);
    transition: all 0.2s ease;
  }

  .textarea-wrapper:hover:not(.disabled) {
    border-color: var(--ae-textarea-border-hover);
  }

  .textarea-wrapper.focused {
    outline: 2px solid var(--ae-textarea-focus-ring);
    outline-offset: 0;
    border-color: var(--ae-textarea-border-focus);
  }

  .textarea-wrapper.error {
    border-color: var(--ae-textarea-border-error);
  }

  .textarea-wrapper.error.focused {
    outline-color: var(--ae-textarea-focus-ring-error);
    border-color: var(--ae-textarea-border-error);
  }

  .textarea-wrapper.disabled {
    background: var(--ae-textarea-bg-disabled);
    border-color: var(--ae-textarea-border-disabled);
    cursor: not-allowed;
  }

  .textarea-control {
    flex: 1;
    width: 100%;
    padding: var(--ae-textarea-padding, 0.5rem 0.75rem);
    border: none;
    outline: none;
    background: transparent;
    font-size: var(--ae-textarea-font-size, 1rem);
    color: var(--ae-textarea-color);
    line-height: 1.5;
    font-family: inherit;
  }

  .textarea-control::placeholder {
    color: var(--ae-textarea-placeholder-color);
  }

  .textarea-control:disabled {
    color: var(--ae-textarea-color-disabled);
    cursor: not-allowed;
  }

  .textarea-control[readonly] {
    cursor: default;
  }

  .resize-none {
    resize: none;
  }

  .resize-vertical {
    resize: vertical;
  }

  .resize-horizontal {
    resize: horizontal;
  }

  .resize-both {
    resize: both;
  }

  :host([auto-resize]) .textarea-control {
    resize: none;
    overflow: hidden;
  }

  .textarea-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .help-text {
    flex: 1;
    font-size: var(--ae-textarea-help-text-font-size, 0.875rem);
    color: var(--ae-textarea-help-text-color);
    line-height: 1.25rem;
  }

  .char-count {
    font-size: var(--ae-textarea-char-count-font-size, 0.875rem);
    color: var(--ae-textarea-char-count-color);
    line-height: 1.25rem;
    white-space: nowrap;
  }

  .error-text {
    font-size: var(--ae-textarea-error-text-font-size, 0.875rem);
    color: var(--ae-textarea-error-text-color);
    line-height: 1.25rem;
  }
`;
