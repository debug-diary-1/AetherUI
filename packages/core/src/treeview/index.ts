import { AeTreeView } from './ae-treeview';
export { AeTreeView } from './ae-treeview';
export type { TreeNode } from './node';
export { TreeViewKeyboardController } from './keyboard';

// Event type definitions
export interface AeTreeviewSelectEvent extends CustomEvent {
  detail: {
    selected: string[];
  }
}

export interface AeTreeviewExpandEvent extends CustomEvent {
  detail: {
    expanded: string[];
  }
}

declare global {
  interface HTMLElementEventMap {
    'ae-treeview-select': AeTreeviewSelectEvent;
    'ae-treeview-expand': AeTreeviewExpandEvent;
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