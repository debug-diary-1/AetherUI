import { css } from 'lit';

/**
 * Popover component styles
 */
export const popoverStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .popover-trigger {
    display: inline-block;
  }

  .popover-content {
    position: fixed;
    z-index: var(--ae-popover-z-index, 1000);
    background: var(--ae-popover-bg);
    border: var(--ae-popover-border);
    border-radius: var(--ae-popover-border-radius, 0.5rem);
    box-shadow: var(--ae-popover-shadow);
    padding: var(--ae-popover-padding, 0.75rem 1rem);
    max-width: var(--ae-popover-max-width, 300px);
    animation: popoverFadeIn 0.2s ease;
  }

  .popover-arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--ae-popover-bg);
    border: var(--ae-popover-border);
    transform: rotate(45deg);
  }

  /* Arrow positions */
  :host([placement^="bottom"]) .popover-arrow {
    top: -5px;
    border-bottom: none;
    border-right: none;
  }

  :host([placement="bottom"]) .popover-arrow {
    left: 50%;
    margin-left: -5px;
  }

  :host([placement="bottom-start"]) .popover-arrow {
    left: 1rem;
  }

  :host([placement="bottom-end"]) .popover-arrow {
    right: 1rem;
  }

  :host([placement^="top"]) .popover-arrow {
    bottom: -5px;
    border-top: none;
    border-left: none;
  }

  :host([placement="top"]) .popover-arrow {
    left: 50%;
    margin-left: -5px;
  }

  :host([placement="top-start"]) .popover-arrow {
    left: 1rem;
  }

  :host([placement="top-end"]) .popover-arrow {
    right: 1rem;
  }

  :host([placement^="left"]) .popover-arrow {
    right: -5px;
    border-left: none;
    border-bottom: none;
  }

  :host([placement="left"]) .popover-arrow {
    top: 50%;
    margin-top: -5px;
  }

  :host([placement="left-start"]) .popover-arrow {
    top: 1rem;
  }

  :host([placement="left-end"]) .popover-arrow {
    bottom: 1rem;
  }

  :host([placement^="right"]) .popover-arrow {
    left: -5px;
    border-right: none;
    border-top: none;
  }

  :host([placement="right"]) .popover-arrow {
    top: 50%;
    margin-top: -5px;
  }

  :host([placement="right-start"]) .popover-arrow {
    top: 1rem;
  }

  :host([placement="right-end"]) .popover-arrow {
    bottom: 1rem;
  }

  @keyframes popoverFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
