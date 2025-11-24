import { css } from 'lit';

/**
 * Styles for the Toast component
 */
export const toastStyles = css`
  :host {
    display: block;
    --ae-toast-bg-info: #e8f4fd;
    --ae-toast-bg-success: #edf7ed;
    --ae-toast-bg-warning: #fff8e1;
    --ae-toast-bg-error: #fdecea;
    --ae-toast-fg-info: #055160;
    --ae-toast-fg-success: #065f46;
    --ae-toast-fg-warning: #7a4d00;
    --ae-toast-fg-error: #b71c1c;
    --ae-toast-radius: var(--ae-border-radius-lg, 0.5rem);
    --ae-toast-shadow: var(--ae-elevation-4, 0 6px 20px rgba(0,0,0,.12));
    --ae-toast-progress-height: 3px;
    --ae-toast-z-index: 1100;
    box-sizing: border-box;
  }

  :host(:not([open])) {
    display: none;
  }

  /* Prevent transition animation on first render */
  :host(.no-animation) [part="toast"] {
    animation: none;
  }

  /* Main toast container */
  [part="toast"] {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: var(--ae-toast-radius);
    box-shadow: var(--ae-toast-shadow);
    background: var(--ae-toast-bg-info);
    color: var(--ae-toast-fg-info);
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 22rem;
    box-sizing: border-box;
    animation: toast-in 0.2s ease-out;
    cursor: pointer;
    margin-bottom: 0.5rem;
    pointer-events: auto;
    position: relative;
    z-index: var(--ae-toast-z-index);
    font-size: 0.875rem;
  }

  /* Size variants */
  :host([size='sm']) [part="toast"] {
    padding: 0.625rem 0.75rem;
    gap: 0.375rem;
    font-size: 0.8125rem;
  }

  :host([size='sm']) [part="icon"] {
    width: 16px;
    height: 16px;
  }

  :host([size='md']) [part="toast"] {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  :host([size='md']) [part="icon"] {
    width: 20px;
    height: 20px;
  }

  :host([size='lg']) [part="toast"] {
    padding: 1rem 1.25rem;
    gap: 0.625rem;
    font-size: 1rem;
  }

  :host([size='lg']) [part="icon"] {
    width: 24px;
    height: 24px;
  }

  :host([exiting]) [part="toast"] {
    animation: toast-out 0.15s ease-in forwards;
  }

  /* Variant styles */
  :host([variant="success"]) [part="toast"] {
    background: var(--ae-toast-bg-success);
    color: var(--ae-toast-fg-success);
  }

  :host([variant="warning"]) [part="toast"] {
    background: var(--ae-toast-bg-warning);
    color: var(--ae-toast-fg-warning);
  }

  :host([variant="error"]) [part="toast"] {
    background: var(--ae-toast-bg-error);
    color: var(--ae-toast-fg-error);
  }

  /* Icon styling */
  [part="icon"] {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 0.125rem;
  }

  /* Content area */
  [part="content"] {
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  /* Close button */
  [part="close"] {
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
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  [part="close"]:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }

  [part="close"]:focus-visible {
    outline: 2px solid var(--ae-focus-ring-color, rgba(0, 0, 0, 0.2));
    outline-offset: 2px;
  }

  /* Progress bar */
  [part="progress"] {
    position: absolute;
    left: 0;
    bottom: 0;
    height: var(--ae-toast-progress-height);
    width: 100%;
    background: currentColor;
    transform-origin: left;
    opacity: 0.3;
    animation: progress-bar var(--ae-toast-duration, 5s) linear forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    [part="progress"] {
      animation-duration: calc(var(--ae-toast-duration, 5s) * 0.01);
    }
  }

  /* Toast entrance animation */
  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Toast exit animation */
  @keyframes toast-out {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  /* Progress bar animation */
  @keyframes progress-bar {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }

  /* Make sure toasts are visually distinct when using high contrast mode */
  @media (forced-colors: active) {
    [part="toast"] {
      outline: 2px solid CanvasText;
      outline-offset: -2px;
    }
  }
`;

/**
 * Container styles for the toast manager
 */
export const toastContainerStyles = css`
  .ae-toast-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: var(--ae-toast-z-index, 1100);
    padding: 1rem;
    max-width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    pointer-events: none;
    box-sizing: border-box;
  }

  /* Top right placement */
  .ae-toast-container[data-placement="top-right"] {
    top: 0;
    right: 0;
    align-items: flex-end;
  }

  /* Bottom right placement */
  .ae-toast-container[data-placement="bottom-right"] {
    bottom: 0;
    right: 0;
    align-items: flex-end;
  }

  /* Top left placement */
  .ae-toast-container[data-placement="top-left"] {
    top: 0;
    left: 0;
    align-items: flex-start;
  }

  /* Bottom left placement */
  .ae-toast-container[data-placement="bottom-left"] {
    bottom: 0;
    left: 0;
    align-items: flex-start;
  }
`;