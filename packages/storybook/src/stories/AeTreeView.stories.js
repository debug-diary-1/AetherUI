import { html } from 'lit';

// Import directly from the main package
import { AeTreeView } from '@aetherui/core';

// Make sure the component is defined
if (!customElements.get('ae-treeview')) {
  customElements.define('ae-treeview', AeTreeView);
}

// Simple action logger instead of using @storybook/addon-actions
const action = (name) => (event) => {
  console.log(`Action: ${name}`, event);
};

export default {
  title: 'Components/TreeView',
  component: 'ae-treeview',
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: { type: 'select', options: ['single', 'multiple'] },
      description: 'Type of selection mode to use',
      defaultValue: 'single',
    },
    indentSize: {
      control: { type: 'number' },
      description: 'Pixels to indent each depth level',
      defaultValue: 16,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
      defaultValue: false,
    },
    emptyMessage: {
      control: { type: 'text' },
      description: 'Message to show when the tree is empty',
      defaultValue: 'No items',
    },
    'ae-treeview-select': { 
      action: 'ae-treeview-select',
      description: 'Fired when selection changes',
      table: { category: 'Events', type: { summary: 'CustomEvent<{selected: string[]}>'}  }
    },
    'ae-treeview-expand': { 
      action: 'ae-treeview-expand',
      description: 'Fired when expansion state changes',
      table: { category: 'Events', type: { summary: 'CustomEvent<{expanded: string[]}>'}  }
    }
  },
};

const fileSystemData = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button.js', label: 'button.js', icon: '📄' },
          { id: 'dropdown.js', label: 'dropdown.js', icon: '📄' },
          { id: 'treeview.js', label: 'treeview.js', icon: '📄' },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        children: [
          { id: 'helpers.js', label: 'helpers.js', icon: '📄' },
          { id: 'constants.js', label: 'constants.js', icon: '📄' },
        ],
      },
      { id: 'index.js', label: 'index.js', icon: '📄' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'index.html', label: 'index.html', icon: '📄' },
      { id: 'favicon.ico', label: 'favicon.ico', icon: '🖼️' },
    ],
  },
  {
    id: 'package.json',
    label: 'package.json',
    icon: '📄',
  },
  {
    id: 'README.md',
    label: 'README.md',
    icon: '📝',
  },
];

const menuData = [
  {
    id: 'file',
    label: 'File',
    children: [
      { id: 'new', label: 'New' },
      { id: 'open', label: 'Open' },
      { id: 'save', label: 'Save' },
      { id: 'save-as', label: 'Save As...' },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    children: [
      { id: 'undo', label: 'Undo' },
      { id: 'redo', label: 'Redo' },
      { id: 'cut', label: 'Cut' },
      { id: 'copy', label: 'Copy' },
      { id: 'paste', label: 'Paste' },
    ],
  },
  {
    id: 'view',
    label: 'View',
    children: [
      { id: 'zoom-in', label: 'Zoom In' },
      { id: 'zoom-out', label: 'Zoom Out' },
      { id: 'reset-zoom', label: 'Reset Zoom' },
    ],
  },
];

export const Basic = {
  render: () => {
    return html`
      <ae-treeview
        .data=${fileSystemData}
        @ae-treeview-select=${action('ae-treeview-select')}
        @ae-treeview-expand=${action('ae-treeview-expand')}
      ></ae-treeview>
    `;
  },
};

export const WithIcons = {
  render: () => {
    return html`
      <style>
        ae-treeview {
          width: 300px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px;
        }
      </style>
      <ae-treeview
        .data=${fileSystemData}
        .expanded=${['src', 'components']}
        @ae-treeview-select=${action('ae-treeview-select')}
        @ae-treeview-expand=${action('ae-treeview-expand')}
      ></ae-treeview>
    `;
  },
};

export const MultiSelect = {
  render: () => {
    return html`
      <style>
        ae-treeview {
          width: 300px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px;
        }
      </style>
      <ae-treeview
        .data=${fileSystemData}
        .expanded=${['src']}
        selectionMode="multiple"
        .selected=${['button.js', 'index.js']}
        @ae-treeview-select=${action('ae-treeview-select')}
        @ae-treeview-expand=${action('ae-treeview-expand')}
      ></ae-treeview>
    `;
  },
};

export const Menu = {
  render: () => {
    return html`
      <style>
        ae-treeview {
          width: 200px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px;
          --ae-treeview-row-hover-bg: rgba(79, 70, 229, 0.1);
          --ae-treeview-row-selected-bg: rgba(79, 70, 229, 0.2);
          --ae-treeview-row-selected-fg: rgb(67, 56, 202);
        }
      </style>
      <ae-treeview
        .data=${menuData}
        @ae-treeview-select=${action('ae-treeview-select')}
        @ae-treeview-expand=${action('ae-treeview-expand')}
      ></ae-treeview>
    `;
  },
};

export const CustomTheme = {
  render: () => {
    return html`
      <style>
        ae-treeview {
          width: 300px;
          border: 1px solid #1e293b;
          border-radius: 4px;
          padding: 8px;
          color: #f8fafc;
          background-color: #0f172a;
          --ae-treeview-row-hover-bg: rgba(255, 255, 255, 0.1);
          --ae-treeview-row-selected-bg: rgba(56, 189, 248, 0.2);
          --ae-treeview-row-selected-fg: rgb(186, 230, 253);
          --ae-treeview-caret-color: #94a3b8;
          --ae-treeview-caret-open: #e2e8f0;
          --ae-treeview-focus-color: #38bdf8;
        }
      </style>
      <ae-treeview
        .data=${fileSystemData}
        .expanded=${['src']}
        @ae-treeview-select=${action('ae-treeview-select')}
        @ae-treeview-expand=${action('ae-treeview-expand')}
      ></ae-treeview>
    `;
  },
};

export const EmptyAndLoading = {
  render: () => {
    return html`
      <style>
        .container {
          display: flex;
          gap: 16px;
        }
        ae-treeview {
          width: 300px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px;
        }
      </style>
      <div class="container">
        <ae-treeview .data=${[]} emptyMessage="No files found"></ae-treeview>

        <ae-treeview .data=${[]} loading></ae-treeview>
      </div>
    `;
  },
};

export const LargeDataSet = {
  render: () => {
    // Generate a large dataset for performance testing
    const generateLargeData = (count) => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push({
          id: `item-${i}`,
          label: `Item ${i}`,
          children:
            i % 5 === 0
              ? [
                  { id: `item-${i}-child-1`, label: `Child 1 of Item ${i}` },
                  { id: `item-${i}-child-2`, label: `Child 2 of Item ${i}` },
                ]
              : undefined,
        });
      }
      return result;
    };

    return html`
      <style>
        ae-treeview {
          width: 300px;
          height: 400px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px;
          overflow: auto;
        }
      </style>
      <ae-treeview
        .data=${generateLargeData(100)}
        @ae-treeview-select=${action('ae-treeview-select')}
        @ae-treeview-expand=${action('ae-treeview-expand')}
      ></ae-treeview>
    `;
  },
};