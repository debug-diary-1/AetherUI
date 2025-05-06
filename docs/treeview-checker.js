// TreeView interactive example loader
(function () {
  console.log('TreeView example loader running...');

  // Try different paths to load the TreeView component
  const POSSIBLE_PATHS = [
    '/node_modules/@aetherui/core/dist/index.js',
    '/node_modules/@aether/core/dist/index.js',
    '/@fs/Users/paull/projects/oss/aetherUi/packages/core/dist/index.js',
    '../../../core/dist/index.js',
  ];

  async function attemptToLoadTreeView() {
    // First check if TreeView is already defined
    if (customElements.get('ae-treeview')) {
      console.log('TreeView is already defined');
      processExamples();
      return;
    }

    // Try to load TreeView from one of the paths
    for (const path of POSSIBLE_PATHS) {
      try {
        console.log(`Trying to load from: ${path}`);
        const module = await import(path);

        if (module && typeof module.defineAeTreeView === 'function') {
          console.log(`Successfully loaded TreeView from: ${path}`);
          module.defineAeTreeView();
          break;
        }
      } catch (err) {
        console.log(`Failed to load from: ${path}`, err.message);
      }
    }

    // Define TreeView directly if it's still not defined
    if (!customElements.get('ae-treeview')) {
      console.log('Defining TreeView manually');

      // Inline basic TreeView definition as a fallback
      class BasicTreeView extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' });
          this._data = [];
          this._expanded = [];
          this._selected = [];
        }

        set data(value) {
          this._data = value;
          this.render();
        }

        set expanded(value) {
          this._expanded = value;
          this.render();
        }

        set selected(value) {
          this._selected = value;
          this.render();
        }

        render() {
          this.shadowRoot.innerHTML = `
            <style>
              :host { display: block; }
              .treeview { padding: 8px; }
              .node { padding: 4px; cursor: pointer; }
              .node:hover { background-color: #f5f5f5; }
              .node[aria-selected="true"] { background-color: #e0e7ff; }
              .caret { display: inline-block; width: 16px; margin-right: 4px; }
              .label { margin-left: 4px; }
              .subtree { margin-left: 16px; }
            </style>
            <div class="treeview">
              ${this._renderNodes(this._data || [], 1)}
            </div>
          `;
        }

        _renderNodes(nodes, level) {
          return nodes
            .map((node) => {
              const hasChildren = node.children && node.children.length > 0;
              const isExpanded = this._expanded.includes(node.id);
              const isSelected = this._selected.includes(node.id);

              return `
              <div class="node" role="treeitem" aria-level="${level}" aria-selected="${isSelected}">
                <span class="caret">${hasChildren ? '▶' : ''}</span>
                <span class="label">${node.label || ''}</span>
              </div>
              ${
                hasChildren && isExpanded
                  ? `<div class="subtree" role="group">${this._renderNodes(node.children, level + 1)}</div>`
                  : ''
              }
            `;
            })
            .join('');
        }
      }

      // Register the fallback TreeView
      customElements.define('ae-treeview', BasicTreeView);
    }

    // Process examples
    processExamples();
  }

  function processExamples() {
    // Find all placeholders
    const placeholders = document.querySelectorAll('.placeholder');
    console.log(`Found ${placeholders.length} placeholders`);

    placeholders.forEach((placeholder, index) => {
      const codeElement = placeholder.querySelector('.hidden-code');
      if (!codeElement) {
        console.log(`No code element found in placeholder ${index}`);
        return;
      }

      const codeContent = codeElement.textContent || '';
      if (!codeContent.trim()) {
        console.log(`Empty code content in placeholder ${index}`);
        return;
      }

      console.log(`Processing example ${index}`);

      // Replace the placeholder with the actual HTML
      placeholder.innerHTML = codeContent;

      // Process all TreeView elements
      const treeViews = placeholder.querySelectorAll('ae-treeview');
      console.log(`Found ${treeViews.length} TreeView elements in example ${index}`);

      treeViews.forEach((treeview, tvIndex) => {
        try {
          console.log(`Processing TreeView ${tvIndex} in example ${index}`);

          // Handle data attribute
          if (treeview.hasAttribute('data')) {
            try {
              const dataStr = treeview.getAttribute('data');
              const data = JSON.parse(dataStr);
              console.log(`Setting data for TreeView ${tvIndex}`, data);
              setTimeout(() => {
                treeview.data = data;
              }, 0);
            } catch (e) {
              console.error(`Error parsing data attribute for TreeView ${tvIndex}:`, e);
            }
          }

          // Handle expanded attribute
          if (treeview.hasAttribute('expanded')) {
            try {
              const expandedStr = treeview.getAttribute('expanded');
              const expanded = JSON.parse(expandedStr);
              console.log(`Setting expanded for TreeView ${tvIndex}`, expanded);
              setTimeout(() => {
                treeview.expanded = expanded;
              }, 100);
            } catch (e) {
              console.error(`Error parsing expanded attribute for TreeView ${tvIndex}:`, e);
            }
          }

          // Handle selected attribute
          if (treeview.hasAttribute('selected')) {
            try {
              const selectedStr = treeview.getAttribute('selected');
              const selected = JSON.parse(selectedStr);
              console.log(`Setting selected for TreeView ${tvIndex}`, selected);
              setTimeout(() => {
                treeview.selected = selected;
              }, 200);
            } catch (e) {
              console.error(`Error parsing selected attribute for TreeView ${tvIndex}:`, e);
            }
          }

          // Force a re-render
          setTimeout(() => {
            if (typeof treeview.requestUpdate === 'function') {
              treeview.requestUpdate();
              console.log(`Requested update for TreeView ${tvIndex}`);
            }
          }, 300);
        } catch (e) {
          console.error(`Error processing TreeView ${tvIndex}:`, e);
        }
      });
    });
  }

  // Run immediately and also on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attemptToLoadTreeView);
  } else {
    attemptToLoadTreeView();
  }
})();
