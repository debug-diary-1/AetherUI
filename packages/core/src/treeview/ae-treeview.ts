import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { TreeNode, renderTreeNode, renderEmptyState, renderLoadingState } from './node';
import { TreeViewKeyboardController } from './keyboard';
import { treeviewStyles } from './styles';
import { arraysShallowEqual, toArrayCopy } from '../internal/array-props';

/**
 * @element ae-treeview
 * @summary Hierarchical navigation component with expand/collapse and selection capabilities
 *
 * Supports two modes:
 * 1. Slot-based: Use nested ae-tree-item elements (declarative HTML)
 * 2. Data-driven: Pass TreeNode[] array via .data property (dynamic data)
 *
 * @slot - Default slot for ae-tree-item elements (slot-based mode)
 *
 * @property {TreeNode[]} data - Nodes to display in the tree view (data-driven mode)
 * @property {string[]} expanded - List of node IDs that should be expanded
 * @property {string[]} selected - List of node IDs that should be selected
 * @property {'single'|'multiple'|'none'} selectionMode - Selection behavior
 * @property {number} indentSize - Pixels to indent each depth level
 * @property {boolean} loading - Shows a loading state when true
 * @property {string} emptyMessage - Message to display when there are no items
 * @property {string} label - Accessible label for the tree (defaults to "Tree")
 *
 * @fires {CustomEvent<{selected: string[]}>} ae-treeview-select - Fired when selection changes
 * @fires {CustomEvent<{expanded: string[]}>} ae-treeview-expand - Fired when expansion state changes
 *
 * @csspart node - Focusable row for each item
 * @csspart caret - Toggle icon wrapper
 * @csspart caret-spacer - Placeholder for caret on leaf nodes
 * @csspart icon - Node icon wrapper
 * @csspart checkbox - Checkbox indicator
 * @csspart label - Text label
 * @csspart empty - Empty state container
 * @csspart loading - Loading state container
 * @csspart spinner - Loading spinner
 *
 * @cssproperty --ae-treeview-indent - Pixel indent per depth (default: 16px)
 * @cssproperty --ae-treeview-caret-size - Caret icon size (default: 12px)
 * @cssproperty --ae-treeview-row-hover-bg - Hover background color
 * @cssproperty --ae-treeview-row-selected-bg - Selected row background color
 * @cssproperty --ae-treeview-row-selected-fg - Selected text color
 * @cssproperty --ae-treeview-caret-color - Caret icon color
 * @cssproperty --ae-treeview-caret-open - Expanded caret icon color
 * @cssproperty --ae-treeview-focus-color - Focus outline color
 *
 * @example Slot-based (declarative HTML)
 * ```html
 * <ae-treeview>
 *   <ae-tree-item label="Documents" expanded>
 *     <ae-tree-item label="Work">
 *       <ae-tree-item label="Project A.docx"></ae-tree-item>
 *       <ae-tree-item label="Project B.pdf"></ae-tree-item>
 *     </ae-tree-item>
 *     <ae-tree-item label="Personal"></ae-tree-item>
 *   </ae-tree-item>
 *   <ae-tree-item label="Pictures"></ae-tree-item>
 * </ae-treeview>
 * ```
 *
 * @example Data-driven (dynamic data)
 * ```html
 * <ae-treeview
 *   .data="${myTreeData}"
 *   .expanded="${['node1', 'node3']}"
 *   .selected="${['node2']}"
 *   selection-mode="multiple"
 *   @ae-treeview-select="${handleSelection}"
 * ></ae-treeview>
 * ```
 *
 * @example TypeScript data structure
 * ```typescript
 * const treeData: TreeNode[] = [
 *   {
 *     id: 'node1',
 *     label: 'Parent Node',
 *     children: [
 *       { id: 'node2', label: 'Child Node' }
 *     ]
 *   }
 * ];
 * ```
 */
@customElement('ae-treeview')
export class AeTreeView extends LitElement {
  static styles = treeviewStyles;

  @property({
    type: Array,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return [];
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      },
    },
  })
  accessor data: TreeNode[] = [];

  private _expanded: string[] = [];

  /** @default [] */
  @property({ type: Array })
  set expanded(next: string[]) {
    const expanded = toArrayCopy<string>(next);
    const previous = this._expanded;
    if (arraysShallowEqual(previous, expanded)) return;
    this._expanded = expanded;
    this.requestUpdate('expanded', previous);
  }
  get expanded(): string[] {
    return [...this._expanded];
  }

  private _selected: string[] = [];

  /** @default [] */
  @property({ type: Array })
  set selected(next: string[]) {
    const selected = toArrayCopy<string>(next);
    const previous = this._selected;
    if (arraysShallowEqual(previous, selected)) return;
    this._selected = selected;
    this.requestUpdate('selected', previous);
  }
  get selected(): string[] {
    return [...this._selected];
  }

  @property({ type: String, attribute: 'selection-mode' })
  accessor selectionMode: 'single' | 'multiple' | 'none' = 'single';

  @property({ type: Number, attribute: 'indent-size' })
  accessor indentSize = 20;

  @property({ type: Boolean })
  accessor loading = false;

  @property({ type: String, attribute: 'empty-message' })
  accessor emptyMessage = 'No items';

  @property({ type: String })
  accessor label = '';

  @query('slot:not([name])')
  private defaultSlot!: HTMLSlotElement;

  private keyboardController: TreeViewKeyboardController;

  @state()
  private isSlotMode = false;

  constructor() {
    super();
    this.keyboardController = new TreeViewKeyboardController(this);
  }

  private handleSlotChange() {
    if (!this.defaultSlot) return;

    const assignedElements = this.defaultSlot.assignedElements({ flatten: true });
    this.isSlotMode = assignedElements.some((el) => el.tagName.toLowerCase() === 'ae-tree-item');
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('data') || changedProperties.has('expanded')) {
      // Update keyboard controller with new nodes
      const nodes = Array.from(this.renderRoot.querySelectorAll('.tree-node'));
      this.keyboardController.setNodes(nodes as HTMLElement[]);
    }
  }

  private handleNodeClick(event: Event) {
    const target = event.target as HTMLElement;
    const nodeId = target.closest('[data-node-id]')?.getAttribute('data-node-id');

    if (!nodeId) return;

    if (target.closest('.tree-caret')) {
      this.toggleExpanded(nodeId);
    } else if (target.closest('.tree-checkbox') || target.closest('.tree-label')) {
      this.toggleSelected(nodeId);
    }
  }

  private toggleExpanded(nodeId: string) {
    const isExpanded = this._expanded.includes(nodeId);
    const newExpanded = isExpanded
      ? this._expanded.filter((id) => id !== nodeId)
      : [...this._expanded, nodeId];

    this.expanded = newExpanded;
    this.dispatchEvent(
      new CustomEvent('ae-treeview-expand', {
        detail: { expanded: newExpanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private toggleSelected(nodeId: string) {
    const isSelected = this._selected.includes(nodeId);
    let newSelected: string[];

    if (this.selectionMode === 'single') {
      newSelected = isSelected ? [] : [nodeId];
    } else {
      newSelected = isSelected
        ? this._selected.filter((id) => id !== nodeId)
        : [...this._selected, nodeId];
    }

    this.selected = newSelected;
    this.dispatchEvent(
      new CustomEvent('ae-treeview-select', {
        detail: { selected: newSelected },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderNodes(nodes: TreeNode[], level = 1): unknown {
    // Read the backing fields: the public getters copy on read (so callers
    // cannot mutate internal state), which would allocate two arrays per node.
    const expanded = new Set(this._expanded);
    const selected = new Set(this._selected);
    return nodes.map((node) =>
      renderTreeNode(node, {
        level,
        isExpanded: expanded.has(node.id),
        isSelected: selected.has(node.id),
        selectionMode: this.selectionMode,
      }),
    );
  }

  render() {
    if (this.loading) {
      return html`
        <div
          role="tree"
          aria-label="${this.label || 'Tree'}"
          aria-busy="true"
          class="tree-data-mode"
        >
          ${renderLoadingState()}
        </div>
      `;
    }

    // Slot-based mode: use slotted ae-tree-item elements
    if (this.isSlotMode) {
      return html`
        <div
          role="tree"
          tabindex="0"
          aria-label="${this.label || 'Tree'}"
          aria-multiselectable="${this.selectionMode === 'multiple'}"
          class="tree-slot-mode"
        >
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
      `;
    }

    // Data-driven mode: render from data property
    if (!this.data.length) {
      return html`
        <div role="tree" aria-label="${this.label || 'Tree'}" class="tree-data-mode">
          <slot @slotchange="${this.handleSlotChange}"></slot>
          ${renderEmptyState(this.emptyMessage)}
        </div>
      `;
    }

    return html`
      <div
        role="tree"
        tabindex="0"
        aria-label="${this.label || 'Tree'}"
        aria-multiselectable="${this.selectionMode === 'multiple'}"
        style="--ae-treeview-indent: ${this.indentSize}px;"
        class="tree-data-mode"
        @click="${this.handleNodeClick}"
      >
        <slot @slotchange="${this.handleSlotChange}" style="display: none;"></slot>
        ${this.renderNodes(this.data)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-treeview': AeTreeView;
  }
}
