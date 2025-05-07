import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { tabStyles } from './styles';

/**
 * @element ae-tabs
 * @summary A tabbed interface component with keyboard navigation
 * @fires {CustomEvent<{tab: string}>} ae-tab-change - Fired when the active tab changes
 * 
 * @example
 * ```html
 * <ae-tabs>
 *   <ae-tab slot="tab">Tab 1</ae-tab>
 *   <ae-tab-panel>Panel 1</ae-tab-panel>
 *   <ae-tab slot="tab">Tab 2</ae-tab>
 *   <ae-tab-panel>Panel 2</ae-tab-panel>
 * </ae-tabs>
 * ```
 */
@customElement('ae-tabs')
export class AeTabs extends LitElement {
  static styles = [
    tabStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      
      :host([orientation="vertical"]) {
        display: flex;
        width: 100%;
      }
      
      .panel-container {
        flex: 1;
      }
      
      /* Vertical layout specific styles */
      :host([orientation="vertical"]) [part="tablist"] {
        min-width: 150px;
        border-right: 1px solid #ddd;
        margin-right: 1rem;
      }
    `
  ];

  /**
   * The currently active tab's id
   */
  @property({ type: String, reflect: true })
  accessor value: string = '';

  /**
   * Orientation of the tabs
   */
  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * How tab selection works with keyboard navigation
   */
  @property({ type: String })
  accessor activation: 'auto' | 'manual' = 'auto';

  @query('[role="tablist"]')
  private accessor tabList!: HTMLElement;

  @query('slot[name="tab"]')
  private accessor tabSlot!: HTMLSlotElement;

  @query('slot[name="panel"]')
  private accessor panelSlot!: HTMLSlotElement;

  private _tabs: HTMLElement[] = [];
  private _panels: HTMLElement[] = [];

  constructor() {
    super();
    // Explicitly set default orientation
    this.orientation = 'horizontal';
  }

  connectedCallback() {
    super.connectedCallback();
    // Ensure orientation attribute is set
    if (!this.hasAttribute('orientation')) {
      this.setAttribute('orientation', 'horizontal');
    }
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  firstUpdated() {
    // Set up slot change listeners to handle dynamically added tabs and panels
    this.tabSlot.addEventListener('slotchange', () => this._handleSlotChange());
    this.panelSlot.addEventListener('slotchange', () => this._handleSlotChange());
    
    // Initial setup
    this._handleSlotChange();
    
    // Set ARIA orientation
    if (this.tabList) {
      this.tabList.setAttribute('aria-orientation', this.orientation);
    }
  }

  private _handleSlotChange() {
    // Get assigned elements from slots
    this._tabs = this.tabSlot.assignedElements() as HTMLElement[];
    this._panels = this.panelSlot.assignedElements() as HTMLElement[];
    
    // Initialize tab and panel relationships
    this._tabs.forEach((tab, index) => {
      const panel = this._panels[index];
      if (tab && panel) {
        const tabId = tab.id || `tab-${index}`;
        const panelId = panel.id || `panel-${index}`;
        
        tab.id = tabId;
        panel.id = panelId;
        
        tab.setAttribute('aria-controls', panelId);
        panel.setAttribute('aria-labelledby', tabId);
        
        // Add click handler to each tab
        tab.addEventListener('click', (e) => this.handleTabClick(e));
      }
    });

    // If no tab is active, activate the first tab
    if (!this.value && this._tabs.length > 0) {
      this.value = this._tabs[0].id;
    }

    this.updateActiveTab();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('value')) {
      this.updateActiveTab();
    }
    
    if (changedProps.has('orientation') && this.tabList) {
      this.tabList.setAttribute('aria-orientation', this.orientation);
      
      // Force style refresh when orientation changes
      this.requestUpdate();
    }
  }

  private updateActiveTab() {
    if (!this._tabs.length) return;

    this._tabs.forEach(tab => {
      const isSelected = tab.id === this.value;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      
      // Find the tab button element
      const button = tab.shadowRoot?.querySelector('[role="tab"]') || tab;
      if (button instanceof HTMLElement) {
        button.tabIndex = isSelected ? 0 : -1;
      }
    });

    this._panels.forEach(panel => {
      panel.hidden = panel.getAttribute('aria-labelledby') !== this.value;
    });
  }

  private handleTabClick(e: Event) {
    const tab = e.currentTarget as HTMLElement;
    const newValue = tab.id;
    
    if (newValue !== this.value) {
      this.value = newValue;
      
      this.dispatchEvent(new CustomEvent('ae-tab-change', {
        detail: { tab: newValue },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this._tabs.length === 0) return;

    // Find index of current tab
    const currentIndex = this._tabs.findIndex(tab => tab.id === this.value);
    if (currentIndex === -1) return;
    
    let newIndex: number | null = null;
    const isHorizontal = this.orientation === 'horizontal';

    // Handle keyboard navigation based on orientation
    switch (e.key) {
      case isHorizontal ? 'ArrowRight' : 'ArrowDown':
        newIndex = (currentIndex + 1) % this._tabs.length;
        break;
      case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
        newIndex = (currentIndex - 1 + this._tabs.length) % this._tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this._tabs.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== null) {
      e.preventDefault();
      const newTab = this._tabs[newIndex];
      
      // In auto activation mode, activate the tab automatically
      if (this.activation === 'auto') {
        this.value = newTab.id;
        
        this.dispatchEvent(new CustomEvent('ae-tab-change', {
          detail: { tab: newTab.id },
          bubbles: true,
          composed: true
        }));
      }
      
      // Focus the new tab
      const button = newTab.shadowRoot?.querySelector('[role="tab"]') || newTab;
      if (button instanceof HTMLElement) {
        button.focus();
      }
    }
  }

  render() {
    return html`
      <div 
        role="tablist" 
        aria-orientation=${this.orientation} 
        @keydown=${this.handleKeyDown}
        part="tablist"
      >
        <slot name="tab"></slot>
      </div>
      <div part="panels" class="panel-container">
        <slot name="panel"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tabs': AeTabs;
  }
} 