import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TreeNode, renderTreeNode, renderEmptyState, renderLoadingState } from './node';
import { TreeViewKeyboardController } from './keyboard';
import { treeviewStyles } from './styles';

/**
 * @element ae-treeview
 * @summary Hierarchical navigation component with expand/collapse and selection capabilities
 * @fires {CustomEvent<{selected: string[]}>} ae-select - Fired when selection changes
 * @fires {CustomEvent<{expanded: string[]}>} ae-expand-change - Fired when expansion state changes
 * 
 * @example
 * ```html
 * <ae-treeview 
 *   .data="${myTreeData}" 
 *   .expanded="${['node1', 'node3']}"
 *   .selected="${['node2']}"
 *   selection-mode="multiple"
 *   @ae-select="${handleSelection}"
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

  @property({ type: Array })
  data: TreeNode[] = [];

  @property({ type: Array })
  expanded: string[] = [];

  @property({ type: Array })
  selected: string[] = [];

  @property({ type: String })
  selectionMode: 'single' | 'multiple' = 'single';

  @property({ type: Number })
  indentSize = 20;

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  emptyMessage = 'No items';

  @state()
  private keyboardController: TreeViewKeyboardController;

  constructor() {
    super();
    this.keyboardController = new TreeViewKeyboardController(this);
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('data') || changedProperties.has('expanded')) {
      // Update keyboard controller with new nodes
      requestAnimationFrame(() => {
        const nodes = Array.from(this.renderRoot.querySelectorAll('.tree-node'));
        this.keyboardController.setNodes(nodes as HTMLElement[]);
      });
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
    const isExpanded = this.expanded.includes(nodeId);
    const newExpanded = isExpanded
      ? this.expanded.filter(id => id !== nodeId)
      : [...this.expanded, nodeId];

    this.expanded = newExpanded;
    this.dispatchEvent(new CustomEvent('ae-expand-change', {
      detail: { expanded: newExpanded },
      bubbles: true,
      composed: true,
    }));
  }

  private toggleSelected(nodeId: string) {
    const isSelected = this.selected.includes(nodeId);
    let newSelected: string[];

    if (this.selectionMode === 'single') {
      newSelected = isSelected ? [] : [nodeId];
    } else {
      newSelected = isSelected
        ? this.selected.filter(id => id !== nodeId)
        : [...this.selected, nodeId];
    }

    this.selected = newSelected;
    this.dispatchEvent(new CustomEvent('ae-select', {
      detail: { selected: newSelected },
      bubbles: true,
      composed: true,
    }));
  }

  private renderNodes(nodes: TreeNode[], level = 1): unknown {
    return nodes.map(node => renderTreeNode(node, {
      level,
      isExpanded: this.expanded.includes(node.id),
      isSelected: this.selected.includes(node.id),
      selectionMode: this.selectionMode,
    }));
  }

  render() {
    if (this.loading) {
      return renderLoadingState();
    }

    if (!this.data.length) {
      return renderEmptyState(this.emptyMessage);
    }

    return html`
      <div
        role="tree"
        tabindex="0"
        aria-multiselectable="${this.selectionMode === 'multiple'}"
        style="--ae-treeview-indent: ${this.indentSize}px;"
        @click="${this.handleNodeClick}"
      >
        ${this.renderNodes(this.data)}
      </div>
    `;
  }
} 