/**
 * This script defines a basic TreeView custom element that can be used
 * when the full AetherUI implementation fails to load.
 */
(function () {
  // Only define if the element doesn't already exist
  if (customElements.get('ae-treeview')) {
    console.log('ae-treeview is already defined, skipping inline definition');
    return;
  }

  // Create a simple TreeView implementation
  class SimpleTreeView extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      // Internal state
      this._data = [];
      this._expanded = [];
      this._selected = [];

      // Initialize
      this.render();
    }

    // API properties
    get data() {
      return this._data;
    }
    set data(value) {
      console.log('SimpleTreeView: setting data', value);
      this._data = Array.isArray(value) ? value : [];
      this.render();
    }

    get expanded() {
      return this._expanded;
    }
    set expanded(value) {
      console.log('SimpleTreeView: setting expanded', value);
      this._expanded = Array.isArray(value) ? value : [];
      this.render();
    }

    get selected() {
      return this._selected;
    }
    set selected(value) {
      console.log('SimpleTreeView: setting selected', value);
      this._selected = Array.isArray(value) ? value : [];
      this.render();
    }

    // Connected callback
    connectedCallback() {
      // Parse attributes if they exist
      if (this.hasAttribute('data')) {
        try {
          this.data = JSON.parse(this.getAttribute('data'));
        } catch (e) {
          console.error('SimpleTreeView: Invalid data attribute', e);
        }
      }

      if (this.hasAttribute('expanded')) {
        try {
          this.expanded = JSON.parse(this.getAttribute('expanded'));
        } catch (e) {
          console.error('SimpleTreeView: Invalid expanded attribute', e);
        }
      }

      if (this.hasAttribute('selected')) {
        try {
          this.selected = JSON.parse(this.getAttribute('selected'));
        } catch (e) {
          console.error('SimpleTreeView: Invalid selected attribute', e);
        }
      }

      // Add click event listener for interaction
      this.shadowRoot.addEventListener('click', this.handleClick.bind(this));
    }

    // Click handler
    handleClick(event) {
      const target = event.target;

      // Handle caret click (expand/collapse)
      if (target.classList.contains('caret')) {
        const nodeId = target.dataset.nodeId;
        if (nodeId) {
          if (this._expanded.includes(nodeId)) {
            this._expanded = this._expanded.filter((id) => id !== nodeId);
          } else {
            this._expanded = [...this._expanded, nodeId];
          }
          this.render();
        }
      }

      // Handle node click (selection)
      if (target.classList.contains('node') || target.classList.contains('label')) {
        const nodeId = target.dataset.nodeId || target.parentElement.dataset.nodeId;
        if (nodeId) {
          if (this._selected.includes(nodeId)) {
            this._selected = this._selected.filter((id) => id !== nodeId);
          } else {
            this._selected = [...this._selected, nodeId];
          }
          this.render();
        }
      }
    }

    // Render the tree
    render() {
      console.log('SimpleTreeView: rendering', {
        data: this._data,
        expanded: this._expanded,
        selected: this._selected,
      });

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: system-ui, sans-serif;
            color: var(--ae-treeview-color, #333);
          }
          
          .treeview {
            border: 1px solid var(--ae-treeview-border-color, #e2e8f0);
            border-radius: var(--ae-treeview-node-radius, 4px);
            padding: 8px;
          }
          
          .node {
            display: flex;
            align-items: center;
            padding: 4px 8px;
            cursor: pointer;
            border-radius: var(--ae-treeview-node-radius, 4px);
            margin: 2px 0;
          }
          
          .node:hover {
            background-color: var(--ae-treeview-row-hover-bg, #f3f4f6);
          }
          
          .node[aria-selected="true"] {
            background-color: var(--ae-treeview-row-selected-bg, #e0e7ff);
            color: var(--ae-treeview-row-selected-fg, #3730a3);
          }
          
          .caret {
            display: inline-block;
            width: var(--ae-treeview-caret-size, 16px);
            height: var(--ae-treeview-caret-size, 16px);
            margin-right: 4px;
            color: var(--ae-treeview-caret-color, currentColor);
            transition: transform 120ms ease;
            text-align: center;
            cursor: pointer;
          }
          
          .caret-expanded {
            transform: rotate(90deg);
            color: var(--ae-treeview-caret-open, currentColor);
          }
          
          .caret-spacer {
            width: var(--ae-treeview-caret-size, 16px);
            height: var(--ae-treeview-caret-size, 16px);
            margin-right: 4px;
          }
          
          .label {
            flex: 1;
          }
          
          .icon {
            margin-right: 4px;
          }
          
          .subtree {
            margin-left: var(--ae-treeview-indent, 16px);
          }
          
          /* Empty state */
          .empty-state {
            padding: 16px;
            text-align: center;
            color: var(--ae-treeview-empty-color, #6b7280);
            font-style: italic;
          }
        </style>
        
        <div class="treeview" role="tree" tabindex="0">
          ${
            this._data.length > 0
              ? this.renderNodes(this._data, 1)
              : '<div class="empty-state">No items</div>'
          }
        </div>
      `;
    }

    // Render tree nodes recursively
    renderNodes(nodes, level) {
      return nodes
        .map((node) => {
          const hasChildren = node.children && node.children.length > 0;
          const isExpanded = hasChildren && this._expanded.includes(node.id);
          const isSelected = this._selected.includes(node.id);

          // Build node HTML
          let html = `
          <div class="node" data-node-id="${node.id}" role="treeitem" aria-level="${level}" aria-selected="${isSelected}">
        `;

          // Add caret or spacer
          if (hasChildren) {
            html += `
            <span class="caret ${isExpanded ? 'caret-expanded' : ''}" data-node-id="${node.id}">
              ▶
            </span>
          `;
          } else {
            html += `<span class="caret-spacer"></span>`;
          }

          // Add icon if present
          if (node.icon) {
            html += `<span class="icon">${node.icon}</span>`;
          }

          // Add label
          html += `<span class="label" data-node-id="${node.id}">${node.label || ''}</span>`;

          // Close the node div
          html += `</div>`;

          // Add children if expanded
          if (hasChildren && isExpanded) {
            html += `
            <div class="subtree" role="group">
              ${this.renderNodes(node.children, level + 1)}
            </div>
          `;
          }

          return html;
        })
        .join('');
    }
  }

  // Register the element
  customElements.define('ae-treeview', SimpleTreeView);
  console.log('Defined inline ae-treeview element');
})();
