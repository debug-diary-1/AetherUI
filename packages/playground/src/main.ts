import './styles/global.css';
import { defineAll } from '@aetherui/core';
import { componentConfigs, ComponentConfig, categories, CSSVariable } from './utils/component-configs';
import { generateCode, GeneratedCode, formatVariableValue } from './utils/code-generator';

// Register all AetherUI components
defineAll();

// State
let selectedComponent: ComponentConfig = componentConfigs[0];
let selectedVariant: string | undefined;
let cssValues: Record<string, string> = {};
let generatedCode: GeneratedCode;
let activeCodeTab: 'html' | 'css' | 'full' = 'css';
let activeControlTab: 'style' | 'variants' = 'style';

// Initialize CSS values from defaults
function initializeCSSValues() {
  cssValues = {};
  selectedComponent.cssVariables.forEach((variable) => {
    cssValues[variable.name] = variable.default;
  });
}

// Apply CSS variables to preview
function applyCSS() {
  const previewWrapper = document.querySelector('.pg-preview-component');
  if (!previewWrapper) return;

  selectedComponent.cssVariables.forEach((variable) => {
    const value = cssValues[variable.name] || variable.default;
    const finalValue = formatVariableValue(variable, value);

    // Apply to the wrapper for CSS inheritance
    (previewWrapper as HTMLElement).style.setProperty(variable.name, finalValue);

    // Also apply directly to all AetherUI web components inside
    // This ensures Shadow DOM components receive the CSS variables
    previewWrapper.querySelectorAll('*').forEach(el => {
      if (el.tagName.toLowerCase().startsWith('ae-')) {
        (el as HTMLElement).style.setProperty(variable.name, finalValue);
      }
    });
  });
}

// Update code
function updateCode() {
  generatedCode = generateCode(selectedComponent, cssValues, selectedVariant);
  renderCodePanel();
}

// Copy to clipboard
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  } catch {
    showToast('Failed to copy');
  }
}

// Show toast notification
function showToast(message: string) {
  const existing = document.querySelector('.pg-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'pg-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

// Export as file
function exportAsFile() {
  const blob = new Blob([generatedCode.fullExample], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedComponent.name.toLowerCase()}-example.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('File downloaded!');
}

// Render component list
function renderComponentList(): string {
  return categories.map(category => {
    const components = componentConfigs.filter(c => c.category === category);
    return `
      <div class="pg-sidebar-section">
        <div class="pg-sidebar-title">${category}</div>
        <div class="pg-component-list">
          ${components.map(comp => `
            <div class="pg-component-item ${comp.name === selectedComponent.name ? 'active' : ''}"
                 data-component="${comp.name}">
              ${comp.name}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Render control for a CSS variable
function renderControl(variable: CSSVariable): string {
  const value = cssValues[variable.name] || variable.default;

  switch (variable.type) {
    case 'color':
      return `
        <div class="pg-control">
          <div class="pg-control-label">
            <span>${variable.label}</span>
            <span class="pg-control-value">${value}</span>
          </div>
          <div class="pg-color-control">
            <div class="pg-color-swatch" style="background: ${value}">
              <input type="color" value="${value}" data-var="${variable.name}">
            </div>
            <input type="text" class="pg-control-input pg-color-input"
                   value="${value}" data-var="${variable.name}">
          </div>
        </div>
      `;

    case 'size':
      return `
        <div class="pg-control">
          <div class="pg-control-label">
            <span>${variable.label}</span>
            <span class="pg-control-value">${value}${variable.unit || ''}</span>
          </div>
          <input type="range" class="pg-range"
                 min="${variable.min || 0}"
                 max="${variable.max || 100}"
                 value="${value}"
                 data-var="${variable.name}">
        </div>
      `;

    case 'select':
      return `
        <div class="pg-control">
          <div class="pg-control-label">
            <span>${variable.label}</span>
          </div>
          <select class="pg-select" data-var="${variable.name}">
            ${variable.options?.map(opt => `
              <option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>
            `).join('')}
          </select>
        </div>
      `;

    default:
      return `
        <div class="pg-control">
          <div class="pg-control-label">
            <span>${variable.label}</span>
          </div>
          <input type="text" class="pg-control-input"
                 value="${value}" data-var="${variable.name}">
        </div>
      `;
  }
}

// Render controls panel
function renderControls(): string {
  if (activeControlTab === 'variants' && selectedComponent.variants) {
    return `
      <div class="pg-controls-section">
        <div class="pg-controls-section-title">Component Variants</div>
        <div class="pg-component-list">
          <div class="pg-component-item ${!selectedVariant ? 'active' : ''}" data-variant="">
            Default
          </div>
          ${selectedComponent.variants.map(v => `
            <div class="pg-component-item ${selectedVariant === v.name ? 'active' : ''}"
                 data-variant="${v.name}">
              ${v.name}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Group variables by type
  const colorVars = selectedComponent.cssVariables.filter(v => v.type === 'color');
  const sizeVars = selectedComponent.cssVariables.filter(v => v.type === 'size' || v.type === 'number');
  const otherVars = selectedComponent.cssVariables.filter(v => v.type === 'select');

  return `
    ${colorVars.length > 0 ? `
      <div class="pg-controls-section">
        <div class="pg-controls-section-title">Colors</div>
        ${colorVars.map(v => renderControl(v)).join('')}
      </div>
    ` : ''}

    ${sizeVars.length > 0 ? `
      <div class="pg-controls-section">
        <div class="pg-controls-section-title">Sizing</div>
        ${sizeVars.map(v => renderControl(v)).join('')}
      </div>
    ` : ''}

    ${otherVars.length > 0 ? `
      <div class="pg-controls-section">
        <div class="pg-controls-section-title">Options</div>
        ${otherVars.map(v => renderControl(v)).join('')}
      </div>
    ` : ''}
  `;
}

// Render code panel
function renderCodePanel() {
  const codeContent = document.querySelector('.pg-code-content');
  if (!codeContent) return;

  let code = '';
  switch (activeCodeTab) {
    case 'html':
      code = generatedCode.html;
      break;
    case 'css':
      code = generatedCode.css;
      break;
    case 'full':
      code = generatedCode.fullExample;
      break;
  }

  codeContent.textContent = code;

  // Update active tab
  document.querySelectorAll('.pg-code-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === activeCodeTab);
  });
}

// Render preview
function renderPreview(): string {
  const html = selectedVariant
    ? selectedComponent.variants?.find(v => v.name === selectedVariant)?.html || selectedComponent.defaultHtml
    : selectedComponent.defaultHtml;

  return html;
}

// Main render function
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Header -->
    <header class="pg-header">
      <div class="pg-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g fill="url(#aeGradient)">
            <path d="M 4 25 Q 3 25 3 24 Q 3 23.5 3.5 22.5 L 11 7 Q 11.5 6 12.5 6 Q 13.5 6 14 7 L 21.5 22.5 Q 22 23.5 22 24 Q 22 25 21 25 Q 20 25 19.5 24 L 17.5 19 L 7.5 19 L 5.5 24 Q 5 25 4 25 Z M 9 16 L 16 16 L 12.5 8 Z" />
            <path d="M 18 11 Q 18 10 19 10 L 28 10 Q 29 10 29 11 Q 29 12 28 12 L 20.5 12 L 20.5 15 L 27 15 Q 28 15 28 16 Q 28 17 27 17 L 20.5 17 L 20.5 20 L 28 20 Q 29 20 29 21 Q 29 22 28 22 L 19 22 Q 18 22 18 21 Z" />
            <path d="M 18 8 Q 18 7 19 7 L 27 7 Q 28 7 28.5 7.5 Q 29 8 29 8.5 Q 29 9 28.5 9 Q 28 9 27 9 L 19.5 9 Q 18.5 9 18 8.5 Q 18 8 18 8 Z" />
            <path d="M 3 26 Q 3 25.5 3.5 25.5 Q 4 25.5 5 25.5 L 27 25.5 Q 28 25.5 28.5 25.5 Q 29 25.5 29 26 Q 29 26.5 28.5 26.5 Q 28 26.5 27 26.5 L 5 26.5 Q 4 26.5 3.5 26.5 Q 3 26.5 3 26 Z" opacity="0.3" />
          </g>
        </svg>
        <span>AetherUI Playground</span>
      </div>
      <div class="pg-header-actions">
        <button class="pg-btn pg-btn-secondary" id="btn-reset">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Reset
        </button>
        <button class="pg-btn pg-btn-secondary" id="btn-copy-css">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy CSS
        </button>
        <button class="pg-btn pg-btn-primary" id="btn-export">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <aside class="pg-sidebar">
      ${renderComponentList()}
    </aside>

    <!-- Preview -->
    <main class="pg-preview">
      <div class="pg-preview-header">
        <span class="pg-preview-title">${selectedComponent.name}</span>
        <span style="color: var(--pg-text-muted); font-size: 0.8125rem;">
          ${selectedComponent.description}
        </span>
      </div>
      <div class="pg-preview-canvas">
        <div class="pg-preview-component">
          ${renderPreview()}
        </div>
      </div>

      <!-- Code Panel -->
      <div class="pg-code-panel">
        <div class="pg-code-header">
          <div class="pg-code-tabs">
            <button class="pg-code-tab ${activeCodeTab === 'css' ? 'active' : ''}" data-tab="css">CSS</button>
            <button class="pg-code-tab ${activeCodeTab === 'html' ? 'active' : ''}" data-tab="html">HTML</button>
            <button class="pg-code-tab ${activeCodeTab === 'full' ? 'active' : ''}" data-tab="full">Full Example</button>
          </div>
          <button class="pg-btn pg-btn-secondary pg-btn-icon" id="btn-copy-code" title="Copy code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
        <pre class="pg-code-content">${generatedCode?.css || ''}</pre>
      </div>
    </main>

    <!-- Controls -->
    <aside class="pg-controls">
      <div class="pg-controls-tabs">
        <button class="pg-controls-tab ${activeControlTab === 'style' ? 'active' : ''}" data-control-tab="style">
          Style
        </button>
        ${selectedComponent.variants ? `
          <button class="pg-controls-tab ${activeControlTab === 'variants' ? 'active' : ''}" data-control-tab="variants">
            Variants
          </button>
        ` : ''}
      </div>
      <div class="pg-controls-content">
        ${renderControls()}
      </div>
    </aside>
  `;

  applyCSS();
  updateCode();
  attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
  // Component selection
  document.querySelectorAll('.pg-component-item[data-component]').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-component');
      const component = componentConfigs.find(c => c.name === name);
      if (component) {
        selectedComponent = component;
        selectedVariant = undefined;
        activeControlTab = 'style';
        initializeCSSValues();
        render();
      }
    });
  });

  // Variant selection
  document.querySelectorAll('.pg-component-item[data-variant]').forEach(item => {
    item.addEventListener('click', () => {
      const variant = item.getAttribute('data-variant');
      selectedVariant = variant || undefined;
      render();
    });
  });

  // Control tabs
  document.querySelectorAll('.pg-controls-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeControlTab = tab.getAttribute('data-control-tab') as 'style' | 'variants';
      render();
    });
  });

  // Code tabs
  document.querySelectorAll('.pg-code-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeCodeTab = tab.getAttribute('data-tab') as 'html' | 'css' | 'full';
      renderCodePanel();
    });
  });

  // Color inputs
  document.querySelectorAll('input[type="color"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const varName = target.getAttribute('data-var');
      if (varName) {
        cssValues[varName] = target.value;
        // Update text input
        const textInput = document.querySelector(`.pg-color-input[data-var="${varName}"]`) as HTMLInputElement;
        if (textInput) textInput.value = target.value;
        // Update swatch
        const swatch = target.closest('.pg-color-swatch') as HTMLElement;
        if (swatch) swatch.style.background = target.value;
        // Update value display
        const label = target.closest('.pg-control')?.querySelector('.pg-control-value');
        if (label) label.textContent = target.value;
        applyCSS();
        updateCode();
      }
    });
  });

  // Text inputs for colors
  document.querySelectorAll('.pg-color-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const varName = target.getAttribute('data-var');
      if (varName) {
        cssValues[varName] = target.value;
        // Update color picker
        const colorInput = document.querySelector(`input[type="color"][data-var="${varName}"]`) as HTMLInputElement;
        if (colorInput && target.value.match(/^#[0-9A-Fa-f]{6}$/)) {
          colorInput.value = target.value;
        }
        // Update swatch
        const swatch = target.closest('.pg-color-control')?.querySelector('.pg-color-swatch') as HTMLElement;
        if (swatch) swatch.style.background = target.value;
        // Update value display
        const label = target.closest('.pg-control')?.querySelector('.pg-control-value');
        if (label) label.textContent = target.value;
        applyCSS();
        updateCode();
      }
    });
  });

  // Range inputs
  document.querySelectorAll('.pg-range').forEach(input => {
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const varName = target.getAttribute('data-var');
      if (varName) {
        cssValues[varName] = target.value;
        const variable = selectedComponent.cssVariables.find(v => v.name === varName);
        const label = target.closest('.pg-control')?.querySelector('.pg-control-value');
        if (label && variable) {
          label.textContent = `${target.value}${variable.unit || ''}`;
        }
        applyCSS();
        updateCode();
      }
    });
  });

  // Select inputs
  document.querySelectorAll('.pg-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const varName = target.getAttribute('data-var');
      if (varName) {
        cssValues[varName] = target.value;
        applyCSS();
        updateCode();
      }
    });
  });

  // Button actions
  document.getElementById('btn-reset')?.addEventListener('click', () => {
    initializeCSSValues();
    render();
    showToast('Reset to defaults');
  });

  document.getElementById('btn-copy-css')?.addEventListener('click', () => {
    copyToClipboard(generatedCode.css);
  });

  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    let code = '';
    switch (activeCodeTab) {
      case 'html': code = generatedCode.html; break;
      case 'css': code = generatedCode.css; break;
      case 'full': code = generatedCode.fullExample; break;
    }
    copyToClipboard(code);
  });

  document.getElementById('btn-export')?.addEventListener('click', exportAsFile);
}

// Initialize
initializeCSSValues();
render();
