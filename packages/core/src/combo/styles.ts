import { css } from 'lit';

export const comboStyles = css`
  :host {
    display: inline-block;
    position: relative;
    width: 100%;
    --ae-combo-transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Use direct element selectors for internal styling */
  input {
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: 1px solid var(--ae-combo-border);
    border-radius: var(--ae-combo-radius, 0.375rem);
    background: var(--ae-combo-bg);
    color: var(--ae-combo-fg);
    font: inherit;
    transition:
      border-color var(--ae-combo-transition),
      box-shadow var(--ae-combo-transition),
      background-color var(--ae-combo-transition);
  }

  input:hover:not(:disabled) {
    border-color: var(--ae-combo-border-hover);
  }

  input:focus {
    outline: none;
    border-color: var(--ae-focus-border);
    box-shadow: var(--ae-focus-shadow, 0 0 0 3px rgba(94, 124, 226, 0.2));
  }

  input[disabled] {
    opacity: 0.65;
    cursor: not-allowed;
    background-color: var(--ae-color-base-50);
  }

  .caret {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--ae-combo-caret-color);
    opacity: 0.8;
  }

  input:focus + .caret,
  .caret[data-expanded] {
    color: var(--ae-focus-border);
    opacity: 1;
  }

  .caret[data-expanded] {
    transform: translateY(-50%) rotate(180deg);
  }

  .overlay {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: var(--ae-combo-bg);
    border: 1px solid var(--ae-combo-border-hover);
    border-radius: var(--ae-combo-radius, 0.375rem);
    box-shadow: var(
      --ae-combo-shadow,
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06)
    );
    margin-top: 0.4rem;
    display: none;
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
    transform-origin: top center;
    transition:
      opacity 120ms ease-out,
      transform 120ms ease-out;
  }

  .overlay[data-open] {
    display: block;
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .listbox {
    max-height: 15rem;
    overflow: auto;
    outline: none;
    padding: 0.25rem 0;
  }

  .empty-message {
    padding: 0.75rem 1rem;
    color: var(--ae-color-text-muted);
    font-style: italic;
    text-align: center;
    font-size: 0.9em;
  }

  .option {
    padding: 0.5rem 0.85rem;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition:
      background-color var(--ae-combo-transition),
      color var(--ae-combo-transition);
  }

  .option:hover {
    background: var(--ae-combo-option-hover-bg);
  }

  .option[data-highlighted] {
    background: var(--ae-combo-option-hover-bg);
  }

  .option[data-selected] {
    background: var(--ae-combo-option-selected-bg);
    color: var(--ae-combo-option-selected-fg);
    font-weight: 500;
  }

  .option[data-selected]:hover,
  .option[data-selected][data-highlighted] {
    background: var(--ae-combo-option-selected-hover-bg);
  }

  .option[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .highlight {
    background-color: var(--ae-combo-highlight-bg);
    font-weight: var(--ae-combo-highlight-weight, 600);
    border-radius: 2px;
    padding: 0 2px;
    margin: 0 -2px;
  }
`;
