import { css } from 'lit';

/**
 * Spinner component styles
 */
export const spinnerStyles = css`
  :host {
    display: inline-block;
  }

  .spinner-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .spinner-svg {
    animation: spinner-rotate 2s linear infinite;
  }

  /* Sizes */
  :host([size='xs']) .spinner-svg {
    width: var(--ae-spinner-size-xs, 16px);
    height: var(--ae-spinner-size-xs, 16px);
  }

  :host([size='sm']) .spinner-svg {
    width: var(--ae-spinner-size-sm, 20px);
    height: var(--ae-spinner-size-sm, 20px);
  }

  :host([size='md']) .spinner-svg {
    width: var(--ae-spinner-size-md, 24px);
    height: var(--ae-spinner-size-md, 24px);
  }

  :host([size='lg']) .spinner-svg {
    width: var(--ae-spinner-size-lg, 32px);
    height: var(--ae-spinner-size-lg, 32px);
  }

  :host([size='xl']) .spinner-svg {
    width: var(--ae-spinner-size-xl, 48px);
    height: var(--ae-spinner-size-xl, 48px);
  }

  .spinner-track {
    stroke: var(--ae-spinner-track-color);
    opacity: 0.25;
  }

  .spinner-indicator {
    stroke: var(--ae-spinner-color);
    stroke-linecap: round;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    animation: spinner-dash 1.5s ease-in-out infinite;
  }

  /* Variant colors */
  :host([variant='primary']) .spinner-indicator {
    stroke: var(--ae-spinner-color-primary);
  }

  :host([variant='secondary']) .spinner-indicator {
    stroke: var(--ae-spinner-color-secondary);
  }

  :host([variant='success']) .spinner-indicator {
    stroke: var(--ae-spinner-color-success);
  }

  :host([variant='warning']) .spinner-indicator {
    stroke: var(--ae-spinner-color-warning);
  }

  :host([variant='error']) .spinner-indicator {
    stroke: var(--ae-spinner-color-error);
  }

  :host([variant='info']) .spinner-indicator {
    stroke: var(--ae-spinner-color-info);
  }

  /* Animations */
  @keyframes spinner-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
