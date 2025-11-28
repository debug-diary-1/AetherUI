import { css } from 'lit';

export const tooltipStyles = css`
  :host {
    position: relative;
    display: inline-block;
  }

  /* Hidden state */
  :host([hidden]) {
    display: none !important;
  }

  /* Overlay container */
  [part="overlay"] {
    position: fixed;
    background: var(--ae-tooltip-bg, #1e293b);
    color: var(--ae-tooltip-fg, #ffffff);
    padding: var(--ae-tooltip-padding, 0.375rem 0.5rem);
    border-radius: var(--ae-tooltip-radius, 4px);
    font-size: var(--ae-tooltip-font-size, 0.8125rem);
    box-shadow: var(--ae-tooltip-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
    max-width: 20rem;
    pointer-events: none;
    line-height: 1.4;
    opacity: 0;
    transition: opacity 150ms ease-in-out;
    z-index: var(--ae-tooltip-z-index, 1200);
  }

  :host([open]) [part="overlay"] {
    opacity: 1;
  }

  /* Arrow indicator */
  [part="arrow"] {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    transform: rotate(45deg);
  }

  /* Content wrapper */
  [part="content"] {
    position: relative;
    z-index: 1;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    [part="overlay"] {
      border: 1px solid;
    }
  }

  /* Animations */
  :host([animation="fade"]) [part="overlay"] {
    transition: opacity 150ms ease-in-out;
  }

  :host([animation="scale"]) [part="overlay"] {
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    transform: scale(0.95);
  }

  :host([animation="scale"][open]) [part="overlay"] {
    transform: scale(1);
  }
`;
