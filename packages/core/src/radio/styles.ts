import { css } from 'lit';

export const radioStyles = css`
  :host {
    display: inline-block;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--ae-radio-size, 18px);
    height: var(--ae-radio-size, 18px);
    border: 2px solid var(--ae-radio-border-color, #d1d5db);
    border-radius: 50%;
    background: var(--ae-radio-bg, white);
    transition: all 0.2s ease;
  }

  .control::after {
    content: '';
    width: calc(var(--ae-radio-size, 18px) * 0.5);
    height: calc(var(--ae-radio-size, 18px) * 0.5);
    border-radius: 50%;
    background: var(--ae-radio-checked-dot-color, white);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  input:checked + .control {
    border-color: var(--ae-radio-checked-border-color, #4f46e5);
    background: var(--ae-radio-checked-bg, #4f46e5);
  }

  input:checked + .control::after {
    opacity: 1;
    transform: scale(1);
  }

  input:focus-visible + .control {
    outline: 2px solid var(--ae-radio-focus-ring-color, #4f46e5);
    outline-offset: 2px;
  }

  input:disabled + .control {
    border-color: var(--ae-radio-disabled-border-color, #e5e7eb);
    background: var(--ae-radio-disabled-bg, #f3f4f6);
    cursor: not-allowed;
  }

  input:disabled ~ .label {
    color: var(--ae-radio-disabled-text-color, #9ca3af);
    cursor: not-allowed;
  }

  .label {
    color: var(--ae-radio-text-color, inherit);
    font-size: var(--ae-radio-font-size, inherit);
  }
`;

export const radioGroupStyles = css`
  :host {
    display: block;
  }

  [part="base"] {
    display: flex;
    flex-direction: column;
    gap: var(--ae-radio-group-gap, 0.5rem);
  }

  :host([orientation="horizontal"]) [part="base"] {
    flex-direction: row;
    align-items: center;
  }
`; 