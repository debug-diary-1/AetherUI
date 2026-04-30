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
    border: 2px solid var(--ae-radio-border-color);
    border-radius: 50%;
    background: var(--ae-radio-bg);
    transition: all 0.2s ease;
  }

  .dot {
    width: calc(var(--ae-radio-size, 18px) * 0.5);
    height: calc(var(--ae-radio-size, 18px) * 0.5);
    border-radius: 50%;
    background: var(--ae-radio-checked-dot-color);
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  input:checked + .control {
    border-color: var(--ae-radio-checked-border-color);
    background: var(--ae-radio-checked-bg);
  }

  input:focus-visible + .control {
    outline: 2px solid var(--ae-radio-focus-ring-color);
    outline-offset: 2px;
  }

  input:disabled + .control {
    border-color: var(--ae-radio-disabled-border-color);
    background: var(--ae-radio-disabled-bg);
    cursor: not-allowed;
  }

  input:disabled ~ .label {
    color: var(--ae-radio-disabled-text-color);
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

  [part='base'] {
    display: flex;
    flex-direction: column;
    gap: var(--ae-radio-group-gap, 0.5rem);
  }

  :host([orientation='horizontal']) [part='base'] {
    flex-direction: row;
    align-items: center;
  }
`;
