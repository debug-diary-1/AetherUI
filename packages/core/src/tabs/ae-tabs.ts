import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { tabStyles } from './styles';

/**
 * A tabbed interface component with keyboard navigation and ARIA compliant behavior.
 *
 * @element ae-tabs
 *
 * @property {string} value - The ID of the currently active tab
 * @property {'horizontal' | 'vertical'} orientation - The orientation of the tabs layout
 * @property {'auto' | 'manual'} activation - How tab selection works with keyboard navigation (auto: selects on focus, manual: selects on Enter/Space)
 *
 * @fires {CustomEvent<{tab: string}>} ae-tab-change - Fired when the active tab changes
 *
 * @slot tab - The tab elements (ae-tab)
 * @slot panel - The panel elements (ae-tab-panel)
 *
 * @csspart base - The component's base wrapper
 * @csspart tablist - The tab list container
 * @csspart panels - The panels container
 *
 * @cssproperty --ae-tabs-gap - The gap between tabs
 * @cssproperty --ae-tabs-border - The border style for the tab list
 * @cssproperty --ae-tabs-padding - The padding around the tab list
 *
 * @example
 * ```html
 * <ae-tabs value="tab-1">
 *   <ae-tab slot="tab" tab-id="tab-1">Tab 1</ae-tab>
 *   <ae-tab-panel slot="panel" panel-id="tab-1">Panel 1 content</ae-tab-panel>
 *   <ae-tab slot="tab" tab-id="tab-2">Tab 2</ae-tab>
 *   <ae-tab-panel slot="panel" panel-id="tab-2">Panel 2 content</ae-tab-panel>
 * </ae-tabs>
 *
 * <ae-tabs orientation="vertical" activation="manual">
 *   <ae-tab slot="tab">Settings</ae-tab>
 *   <ae-tab-panel slot="panel">Settings content</ae-tab-panel>
 *   <ae-tab slot="tab">Profile</ae-tab>
 *   <ae-tab-panel slot="panel">Profile content</ae-tab-panel>
 * </ae-tabs>
 * ```
 */
@customElement('ae-tabs')
export class AeTabs extends LitElement {
  static styles = tabStyles;

  /**
   * The ID of the active tab
   */
  @property({ type: String, reflect: true })
  accessor value: string = '';

  /**
   * Orientation of the tabs layout
   */
  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * How tab selection works with keyboard navigation
   */
  @property({ type: String })
  accessor activation: 'auto' | 'manual' = 'auto';

  /**
   * Accessible label for the tablist
   */
  @property({ type: String })
  accessor label: string = '';

  @query('slot[name="tab"]')
  private tabSlot!: HTMLSlotElement;

  @query('slot[name="panel"]')
  private panelSlot!: HTMLSlotElement;

  private tabs: HTMLElement[] = [];
  private panels: HTMLElement[] = [];
  private _tabClickHandlers = new WeakMap<HTMLElement, EventListener>();

  constructor() {
    super();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  connectedCallback() {
    super.connectedCallback();
    // Always enforce orientation attribute to match property
    this.setAttribute('orientation', this.orientation);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.tabs.forEach((tab) => {
      const handler = this._tabClickHandlers.get(tab);
      if (handler) {
        tab.removeEventListener('click', handler);
        this._tabClickHandlers.delete(tab);
      }
    });
  }

  firstUpdated() {
    // Set up slot change listeners
    this.tabSlot.addEventListener('slotchange', () => this._updateTabs());
    this.panelSlot.addEventListener('slotchange', () => this._updateTabs());

    // Initial configuration
    this._updateTabs();
  }

  updated(changedProps: PropertyValues) {
    // If orientation changes, make sure attribute is updated
    if (changedProps.has('orientation')) {
      this.setAttribute('orientation', this.orientation);

      // Update tabs to set vertical-tab attribute
      const isVertical = this.orientation === 'vertical';
      this.tabs.forEach((tab) => {
        if (isVertical) {
          tab.setAttribute('data-vertical-tab', '');
        } else {
          tab.removeAttribute('data-vertical-tab');
        }
      });
    }

    // Update active tab when value changes
    if (changedProps.has('value')) {
      this._updateActiveTab();
    }
  }

  private _updateTabs() {
    // Get tabs and panels from slots
    this.tabs = Array.from(this.tabSlot.assignedElements()) as HTMLElement[];
    this.panels = Array.from(this.panelSlot.assignedElements()) as HTMLElement[];

    const isVertical = this.orientation === 'vertical';

    // Set up relations between tabs and panels
    this.tabs.forEach((tab, index) => {
      const panel = this.panels[index];
      if (!tab || !panel) return;

      // Generate IDs if needed
      const tabId = tab.id || `tab-${index}`;
      const panelId = panel.id || `panel-${index}`;

      // Set IDs and ARIA attributes
      tab.id = tabId;
      panel.id = panelId;
      tab.setAttribute('aria-controls', panelId);
      panel.setAttribute('aria-labelledby', tabId);

      // Set vertical tab attribute for styling
      if (isVertical) {
        tab.setAttribute('data-vertical-tab', '');
      } else {
        tab.removeAttribute('data-vertical-tab');
      }

      // Add click handler (skip if already registered)
      if (!this._tabClickHandlers.has(tab)) {
        const handler = () => this._activateTab(tab.id);
        tab.addEventListener('click', handler);
        this._tabClickHandlers.set(tab, handler);
      }
    });

    // Select first tab if no tab is active
    if (!this.value && this.tabs.length > 0) {
      this.value = this.tabs[0].id;
    }

    this._updateActiveTab();
  }

  private _updateActiveTab() {
    // Update selected state for tabs
    this.tabs.forEach((tab) => {
      const isSelected = tab.id === this.value;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      // Use data-tabindex attribute to set internal tab index (avoids nested interactive elements)
      tab.setAttribute('data-tabindex', isSelected ? '0' : '-1');
    });

    // Show/hide panels
    this.panels.forEach((panel) => {
      panel.hidden = panel.getAttribute('aria-labelledby') !== this.value;
    });
  }

  private _activateTab(tabId: string) {
    if (tabId !== this.value) {
      this.value = tabId;
      this.dispatchEvent(
        new CustomEvent('ae-tab-change', {
          detail: { tab: tabId },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.tabs.length === 0) return;

    // Find current tab index
    const currentIndex = this.tabs.findIndex((tab) => tab.id === this.value);
    if (currentIndex === -1) return;

    const isHorizontal = this.orientation !== 'vertical';
    let nextIndex: number | null = null;

    // Handle navigation based on orientation
    switch (e.key) {
      case isHorizontal ? 'ArrowRight' : 'ArrowDown':
        nextIndex = (currentIndex + 1) % this.tabs.length;
        break;
      case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
        nextIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = this.tabs.length - 1;
        break;
      default:
        return; // Not a key we handle
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = this.tabs[nextIndex];

      // Focus the tab
      nextTab.focus();

      // Auto-activate if in auto mode
      if (this.activation === 'auto') {
        this._activateTab(nextTab.id);
      }
    }
  };

  render() {
    return html`
      <div
        class="tablist"
        role="tablist"
        aria-orientation="${this.orientation}"
        aria-label="${this.label || 'Tabs'}"
      >
        <slot name="tab"></slot>
      </div>
      <div class="panels">
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

export type AeTabsElement = AeTabs;
