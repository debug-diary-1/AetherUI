import { AeTreeView } from './ae-treeview';
import { AeTreeItem } from './ae-tree-item';

export { AeTreeView } from './ae-treeview';
export { AeTreeItem } from './ae-tree-item';
export type { TreeNode } from './node';
export { TreeViewKeyboardController } from './keyboard';

// Event type definitions
export interface AeTreeviewSelectEvent extends CustomEvent {
  detail: {
    selected: string[];
  };
}

export interface AeTreeviewExpandEvent extends CustomEvent {
  detail: {
    expanded: string[];
  };
}

export interface AeTreeItemExpandEvent extends CustomEvent {
  detail: {
    item: AeTreeItem;
  };
}

export interface AeTreeItemCollapseEvent extends CustomEvent {
  detail: {
    item: AeTreeItem;
  };
}

export interface AeTreeItemSelectEvent extends CustomEvent {
  detail: {
    item: AeTreeItem;
    selected: boolean;
  };
}

declare global {
  interface HTMLElementEventMap {
    'ae-treeview-select': AeTreeviewSelectEvent;
    'ae-treeview-expand': AeTreeviewExpandEvent;
    'ae-tree-item-expand': AeTreeItemExpandEvent;
    'ae-tree-item-collapse': AeTreeItemCollapseEvent;
    'ae-tree-item-select': AeTreeItemSelectEvent;
  }
}

/**
 * Define the TreeView custom element
 */
export function defineAeTreeView() {
  if (!customElements.get('ae-treeview')) {
    customElements.define('ae-treeview', AeTreeView);
  }
}

/**
 * Define the TreeItem custom element
 */
export function defineAeTreeItem() {
  if (!customElements.get('ae-tree-item')) {
    customElements.define('ae-tree-item', AeTreeItem);
  }
}
