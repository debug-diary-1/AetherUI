import { css } from 'lit';

const autoStyles = css`
  :host { 
    display: inline-block; 
    position: relative;
    width: 100%;
    --ae-auto-transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  input {
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: var(--ae-auto-border, 1px solid #d1d5db);
    border-radius: var(--ae-auto-radius, 0.375rem);
    background: var(--ae-auto-bg, #fff);
    color: var(--ae-auto-fg, #111);
    font: inherit;
    transition: border-color var(--ae-auto-transition), 
                box-shadow var(--ae-auto-transition);
  }

  input:hover:not(:disabled) {
    border-color: var(--ae-auto-border-hover, #bbc1cc);
  }

  input:focus {
    outline: none;
    border-color: var(--ae-focus-border, #5e7ce2);
    box-shadow: var(--ae-focus-shadow, 0 0 0 3px rgba(94, 124, 226, 0.2));
  }

  input[disabled] {
    opacity: 0.65;
    cursor: not-allowed;
    background-color: var(--ae-color-base-50, #f9fafb);
  }

  .overlay {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: var(--ae-auto-bg, #fff);
    border: var(--ae-auto-border, 1px solid #d1d5db);
    border-radius: var(--ae-auto-radius, 0.375rem);
    box-shadow: var(--ae-auto-shadow, 0 4px 12px rgba(0,0,0,0.1));
    margin-top: 0.4rem;
    display: none;
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
    transform-origin: top center;
    transition: opacity 120ms ease-out, transform 120ms ease-out;
  }

  .overlay[data-open] {
    display: block;
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .listbox {
    max-height: 14rem;
    overflow: auto;
    outline: none;
    padding: 0.25rem 0;
    position: relative;
  }

  .empty-message {
    padding: 0.75rem 1rem;
    color: var(--ae-color-text-muted, #6b7280);
    font-style: italic;
    text-align: center;
    font-size: 0.9em;
  }

  .option {
    padding: 0.5rem 0.85rem;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color var(--ae-auto-transition),
                color var(--ae-auto-transition);
  }

  .option:hover {
    background: var(--ae-auto-option-hover-bg, #f3f4f6);
  }

  .option[data-highlighted] {
    background: var(--ae-auto-option-hover-bg, #f3f4f6);
  }

  .option[data-selected] {
    background: var(--ae-auto-option-selected-bg, #ebeffd);
    color: var(--ae-auto-option-selected-fg, #3730a3);
    font-weight: 500;
  }

  .option[data-selected]:hover,
  .option[data-selected][data-highlighted] {
    background: var(--ae-auto-option-selected-hover-bg, #dce1fb);
  }

  .option[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .highlight {
    background-color: var(--ae-auto-highlight-bg, rgba(94, 124, 226, 0.15));
    font-weight: var(--ae-auto-highlight-weight, 600);
    border-radius: 2px;
    padding: 0 2px;
    margin: 0 -2px;
  }

  .spinner {
    width: var(--ae-auto-spinner-size, 16px);
    height: var(--ae-auto-spinner-size, 16px);
    border: 2px solid transparent;
    border-top-color: var(--ae-auto-spinner-color, #5e7ce2);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0.75rem auto;
    display: none;
  }

  .spinner[data-loading] {
    display: block;
  }

  @keyframes spin { 
    to { transform: rotate(360deg); } 
  }
`;

export { autoStyles };