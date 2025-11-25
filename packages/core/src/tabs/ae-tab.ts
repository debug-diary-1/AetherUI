import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element ae-tab
 * @summary Individual tab component for use with ae-tabs
 */
@customElement('ae-tab')
export class AeTab extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      box-sizing: border-box;
      position: relative;
      padding-bottom: 2px; /* Space for the indicator */
    }
    
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: var(--ae-tabs-padding, 0.75rem 1rem);
      background: transparent;
      border: none;
      font: inherit;
      color: var(--ae-tabs-inactive-color, inherit);
      cursor: pointer;
      transition: color 0.2s ease, background-color 0.2s ease;
    }

    button:hover {
      background-color: var(--ae-tabs-hover-bg, transparent);
    }

    :host([aria-selected="true"]) button {
      color: var(--ae-tabs-active-color);
      font-weight: var(--ae-tabs-selected-weight, 500);
      background-color: transparent;
    }

    /* Remove hover background from selected tabs */
    :host([aria-selected="true"]) button:hover {
      background-color: transparent;
    }
    
    /* The indicator for selected tab - horizontal (default) */
    .indicator {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: transparent;
      transition: background-color 0.2s ease;
    }
    
    /* Special indicator for vertical tabs - applied via custom attribute */
    :host([data-vertical-tab]) .indicator {
      left: auto;
      right: 0;
      top: 0;
      bottom: auto;
      width: 2px;
      height: 100%;
    }
    
    /* Indicator color when selected */
    :host([aria-selected="true"]) .indicator {
      background-color: var(--ae-tabs-active-color);
    }

    button:focus-visible {
      outline: 2px solid var(--ae-tabs-active-color);
      outline-offset: -2px;
    }
  `;

  /**
   * ID of the tab
   */
  @property({ type: String, reflect: true })
  accessor id: string = '';

  /**
   * Whether tab is selected
   */
  @property({ type: String, reflect: true, attribute: 'aria-selected' })
  accessor ariaSelected: string = 'false';

  /**
   * ID of the panel this tab controls
   */
  @property({ type: String, reflect: true, attribute: 'aria-controls' })
  accessor ariaControls: string = '';

  /**
   * Tab index for keyboard navigation
   */
  @property({ type: Number, reflect: true })
  accessor tabIndex: number = -1;

  render() {
    return html`
      <button
        role="tab"
        part="tab"
        aria-selected="${this.ariaSelected}"
        aria-controls="${this.ariaControls}"
        tabindex="${this.tabIndex}"
      >
        <slot></slot>
      </button>
      <div class="indicator" part="indicator"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tab': AeTab;
  }
}

export type AeTabElement = AeTab;