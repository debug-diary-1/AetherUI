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

      // Create a basic mock implementation if real component is not available
      class MockTreeView extends HTMLElement {
        constructor() {
          super();
          this._data = [];
          this.attachShadow({ mode: 'open' });
          this.render();
        }

        setData(data) {
          this._data = data;
          this.render();
        }

        render() {
          // Create a basic tree structure
          this.shadowRoot.innerHTML = `
            <style>
              :host {
                display: block;
                font-family: system-ui, sans-serif;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                padding: 1rem;
                color: #333;
              }
              .tree-node {
                margin-bottom: 8px;
              }
              .tree-parent {
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
              }
              .tree-parent:before {
                content: '▶';
                display: inline-block;
                margin-right: 6px;
                font-size: 10px;
                transition: transform 0.15s ease;
              }
              .tree-parent.expanded:before {
                transform: rotate(90deg);
              }
              .tree-children {
                padding-left: 1.5rem;
                margin-top: 4px;
                display: none;
              }
              .tree-parent.expanded + .tree-children {
                display: block;
              }
              .tree-leaf {
                padding-left: 1rem;
              }
            </style>
            <div class="tree-container">
              ${this._renderNodes(this._data)}
            </div>
          `;

          // Add event listeners
          this.shadowRoot.querySelectorAll('.tree-parent').forEach((node) => {
            node.addEventListener('click', () => {
              node.classList.toggle('expanded');
            });
          });
        }

        _renderNodes(nodes) {
          if (!nodes || !nodes.length) {
            return '<div class="tree-node">No items to display</div>';
          }

          return nodes
            .map((node) => {
              if (node.children && node.children.length) {
                return `
                <div class="tree-node">
                  <div class="tree-parent" data-id="${node.id}">${node.label}</div>
                  <div class="tree-children">
                    ${this._renderNodes(node.children)}
                  </div>
                </div>
              `;
              } else {
                return `
                <div class="tree-node">
                  <div class="tree-leaf" data-id="${node.id}">${node.label}</div>
                </div>
              `;
              }
            })
            .join('');
        }
      }

      // Register the mock component
      customElements.define('ae-treeview', MockTreeView);
      console.log('Mock TreeView component registered for demo purposes');
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
                treeview.setData(data);
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
