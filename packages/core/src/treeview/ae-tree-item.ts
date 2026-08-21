import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { treeItemStyles } from './tree-item-styles';

/**
 * @element ae-tree-item
 * @summary A tree item component for hierarchical data structures
 *
 * @slot - The default slot for nested tree items
 * @slot icon - Custom icon to display before the label
 *
 * @property {string} label - The text label for this tree item
 * @property {boolean} expanded - Whether the tree item is expanded
 * @property {boolean} selected - Whether the tree item is selected
 * @property {boolean} disabled - Whether the tree item is disabled
 * @property {boolean} lazy - Enable lazy loading for child items
 *
 * @fires {CustomEvent} ae-tree-item-expand - Fired when the item is expanded
 * @fires {CustomEvent} ae-tree-item-collapse - Fired when the item is collapsed
 * @fires {CustomEvent} ae-tree-item-select - Fired when the item is selected
 *
 * @csspart base - The component's base wrapper
 * @csspart item - The tree item's main container
 * @csspart indentation - The indentation element
 * @csspart expand-button - The expand/collapse button
 * @csspart label - The label element
 * @csspart children - The children container
 * @csspart checkbox - The checkbox element (if selectable)
 *
 * @cssproperty --indent-size - The indentation size (default: 1rem)
 * @cssproperty --indent-guide-width - The width of the indentation guide (default: 0)
 *
 * @example
 * ```html
 * <ae-tree-item label="Documents" expanded>
 *   <ae-tree-item label="Work">
 *     <ae-tree-item label="Project A.docx"></ae-tree-item>
 *     <ae-tree-item label="Project B.pdf"></ae-tree-item>
 *   </ae-tree-item>
 *   <ae-tree-item label="Personal"></ae-tree-item>
 * </ae-tree-item>
 * ```
 */
@customElement('ae-tree-item')
export class AeTreeItem extends LitElement {
  static styles = treeItemStyles;

  @property({ type: String })
  accessor label = '';

  @property({ type: Boolean, reflect: true })
  accessor expanded = false;

  @property({ type: Boolean, reflect: true })
  accessor selected = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor lazy = false;

  @query('slot:not([name])')
  private defaultSlot!: HTMLSlotElement;

  @state()
  private hasChildren = false;

  private handleSlotChange() {
    if (!this.defaultSlot) return;
    const nodes = this.defaultSlot.assignedElements({ flatten: true });
    this.hasChildren = nodes.some((node) => node.tagName.toLowerCase() === 'ae-tree-item');
  }

  private get indentLevel(): number {
    let level = 0;
    let parent = this.parentElement;

    while (parent) {
      if (parent.tagName.toLowerCase() === 'ae-tree-item') {
        level++;
      }
      parent = parent.parentElement;
    }

    return level;
  }

  private handleExpandClick(e: Event) {
    e.stopPropagation();

    if (this.disabled || !this.hasChildren) return;

    this.expanded = !this.expanded;

    const event = new CustomEvent(this.expanded ? 'ae-tree-item-expand' : 'ae-tree-item-collapse', {
      bubbles: true,
      composed: true,
      detail: { item: this },
    });
    this.dispatchEvent(event);
  }

  private handleItemClick(e: Event) {
    if (this.disabled) return;

    // Don't select if clicking the expand button
    if ((e.target as HTMLElement).closest('.expand-button')) {
      return;
    }

    // Get the tree parent to check selection mode
    const tree = this.closest('ae-treeview');
    if (!tree) return;

    const selectionMode = tree.getAttribute('selection-mode') || 'single';

    if (selectionMode !== 'none') {
      this.selected = !this.selected;

      this.dispatchEvent(
        new CustomEvent('ae-tree-item-select', {
          bubbles: true,
          composed: true,
          detail: {
            item: this,
            selected: this.selected,
          },
        }),
      );
    }
  }

  render() {
    const indent = this.indentLevel;

    return html`
      <div
        part="base"
        class="tree-item-base"
        role="treeitem"
        aria-expanded="${ifDefined(this.hasChildren ? String(this.expanded) : undefined)}"
        aria-selected="${this.selected}"
        aria-disabled="${this.disabled}"
        aria-level="${indent + 1}"
      >
        <div
          part="item"
          class="tree-item ${this.selected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}"
          @click="${this.handleItemClick}"
          style="padding-left: calc(${indent} * var(--indent-size, 1.5rem))"
        >
          ${this.hasChildren
            ? html`
                <button
                  part="expand-button"
                  class="expand-button ${this.expanded ? 'expanded' : ''}"
                  @click="${this.handleExpandClick}"
                  aria-label="${this.expanded ? 'Collapse' : 'Expand'}"
                  tabindex="-1"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 3L7.5 6L4.5 9"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              `
            : html`<span class="expand-spacer"></span>`}

          <slot name="icon"></slot>

          <span part="label" class="label"> ${this.label} </span>
        </div>

        <div part="children" class="children ${this.expanded ? 'expanded' : ''}" role="group">
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tree-item': AeTreeItem;
  }
}
