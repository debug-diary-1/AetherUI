import { AeTreeView } from './ae-treeview';
export { AeTreeView } from './ae-treeview';
export type { TreeNode } from './node';
export { TreeViewKeyboardController } from './keyboard';

/**
 * Define the TreeView custom element
 */
export function defineAeTreeView() {
  if (!customElements.get('ae-treeview')) {
    customElements.define('ae-treeview', AeTreeView);
  }
} 