import { css } from 'lit';

/**
 * Progress component styles
 */
export const progressStyles = css`
  :host {
    display: block;
  }

  .progress-base {
    display: flex;
    align-items: center;
    gap: var(--ae-progress-gap, 0.5rem);
    width: 100%;
  }

  .progress-track {
    flex: 1;
    overflow: hidden;
    background: var(--ae-progress-track-bg);
    border-radius: var(--ae-progress-border-radius, 9999px);
  }

  /* Sizes */
  :host([size='sm']) .progress-track {
    height: var(--ae-progress-height-sm, 4px);
  }

  :host([size='md']) .progress-track {
    height: var(--ae-progress-height-md, 8px);
  }

  :host([size='lg']) .progress-track {
    height: var(--ae-progress-height-lg, 12px);
  }

  .progress-bar {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: inherit;
  }

  /* Variants */
  :host([variant='primary']) .progress-bar {
    background: var(--ae-progress-bg-primary);
  }

  :host([variant='secondary']) .progress-bar {
    background: var(--ae-progress-bg-secondary);
  }

  :host([variant='success']) .progress-bar {
    background: var(--ae-progress-bg-success);
  }

  :host([variant='warning']) .progress-bar {
    background: var(--ae-progress-bg-warning);
  }

  :host([variant='error']) .progress-bar {
    background: var(--ae-progress-bg-error);
  }

  :host([variant='info']) .progress-bar {
    background: var(--ae-progress-bg-info);
  }

  /* Indeterminate */
  :host([indeterminate]) .progress-bar {
    width: 100% !important;
    animation: progress-indeterminate 1.5s ease-in-out infinite;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
  }

  @keyframes progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* Striped */
  :host([striped]) .progress-bar {
    background-image: linear-gradient(
      45deg,
      var(--ae-progress-stripe-color, rgba(255, 255, 255, 0.15)) 25%,
      transparent 25%,
      transparent 50%,
      var(--ae-progress-stripe-color, rgba(255, 255, 255, 0.15)) 50%,
      var(--ae-progress-stripe-color, rgba(255, 255, 255, 0.15)) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }

  /* Animated stripes */
  :host([animated]) .progress-bar {
    animation: progress-stripes 1s linear infinite;
  }

  @keyframes progress-stripes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 1rem 0;
    }
  }

  .progress-label {
    font-size: var(--ae-progress-label-font-size, 0.875rem);
    font-weight: var(--ae-progress-label-font-weight, 500);
    color: var(--ae-progress-label-color);
    white-space: nowrap;
    min-width: 3rem;
    text-align: right;
  }
`;
