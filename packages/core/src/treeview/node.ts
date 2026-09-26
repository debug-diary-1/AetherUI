import { html, TemplateResult } from 'lit';

/**
 * TreeNode data structure
 */
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: string | TemplateResult;
}

/**
 * Options for rendering tree nodes
 */
export interface TreeNodeRenderOptions {
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  selectionMode: 'single' | 'multiple' | 'none';
}

/**
 * Render a single tree node with its children
 */
export function renderTreeNode(node: TreeNode, options: TreeNodeRenderOptions): TemplateResult {
  const { level, isExpanded, isSelected, selectionMode } = options;
  const hasChildren = (node.children?.length ?? 0) > 0;

  return html`
    <div class="tree-node-container">
      <div
        role="treeitem"
        aria-expanded="${hasChildren ? isExpanded : 'false'}"
        aria-selected="${isSelected}"
        aria-level="${level}"
        data-node-id="${node.id}"
        tabindex="${level === 1 ? '0' : '-1'}"
        ?disabled="${node.disabled}"
        class="tree-node"
      >
        ${
          hasChildren
            ? html`<span class="tree-caret" part="caret">▶</span>`
            : html`<span class="tree-caret-spacer" part="caret-spacer"></span>`
        }
        ${node.icon ? html`<span class="tree-icon" part="icon">${node.icon}</span>` : null}
        ${
          selectionMode !== 'none'
            ? html`<span
                class="tree-checkbox"
                part="checkbox"
                role="checkbox"
                aria-checked="${isSelected}"
                aria-label="Select ${node.label}"
              ></span>`
            : null
        }

        <span class="tree-label" part="label">${node.label}</span>
      </div>

      ${
        hasChildren && isExpanded
          ? html`
              <div role="group" class="tree-children">
                ${node.children!.map((child) =>
                  renderTreeNode(child, {
                    ...options,
                    level: level + 1,
                  }),
                )}
              </div>
            `
          : null
      }
    </div>
  `;
}

/**
 * Render empty state for the tree
 */
export function renderEmptyState(message: string): TemplateResult {
  return html` <div class="tree-empty" part="empty">${message}</div> `;
}

/**
 * Render loading state for the tree
 */
export function renderLoadingState(): TemplateResult {
  return html`
    <div class="tree-loading" part="loading" role="status" aria-live="polite">
      <span class="tree-spinner" part="spinner" aria-hidden="true"></span>
      Loading...
    </div>
  `;
}
