import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ae-accordion')
export class AeAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: var(--ae-accordion-border, 1px solid #ccc);
      border-radius: var(--ae-accordion-radius, 4px);
    }

    ::slotted(ae-accordion-panel) {
      border-bottom: var(--ae-accordion-border, 1px solid #ccc);
    }

    ::slotted(ae-accordion-panel:last-child) {
      border-bottom: none;
    }
  `;

  @property({ type: Boolean })
  accessor multiselectable = false;

  @property({ type: Array })
  accessor defaultOpen: string[] = [];

  @state()
  private accessor _openPanels = new Set<string>();

  connectedCallback() {
    super.connectedCallback();
    this._openPanels = new Set(this.defaultOpen);
    this.addEventListener('ae-toggle', this._handleToggle);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ae-toggle', this._handleToggle);
  }

  private _handleToggle(event: Event) {
    const panel = event.target as HTMLElement;
    const panelId = panel.id;

    if (this.multiselectable) {
      if (this._openPanels.has(panelId)) {
        this._openPanels.delete(panelId);
      } else {
        this._openPanels.add(panelId);
      }
    } else {
      this._openPanels.clear();
      this._openPanels.add(panelId);
    }

    this._updatePanels();

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('ae-change', {
      detail: { open: Array.from(this._openPanels) },
      bubbles: true,
      composed: true
    }));
  }

  private _updatePanels() {
    const panels = this.querySelectorAll('ae-accordion-panel');
    panels.forEach(panel => {
      const panelId = panel.id;
      if (this._openPanels.has(panelId)) {
        panel.setAttribute('open', '');
      } else {
        panel.removeAttribute('open');
      }
    });
  }

  render() {
    return html`
      <div class="accordion" role="presentation">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }

  private _handleSlotChange() {
    const panels = this.querySelectorAll('ae-accordion-panel');
    panels.forEach(panel => {
      const panelId = panel.id || `panel-${Math.random().toString(36).substr(2, 9)}`;
      panel.id = panelId;
      if (this._openPanels.has(panelId)) {
        panel.setAttribute('open', '');
      } else {
        panel.removeAttribute('open');
      }
    });
  }
}
