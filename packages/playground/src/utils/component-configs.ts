// Component configuration for the playground
// Defines editable CSS variables for each component

export interface CSSVariable {
  name: string;
  label: string;
  type: 'color' | 'size' | 'number' | 'select';
  default: string;
  options?: string[]; // For select type
  min?: number;
  max?: number;
  unit?: string;
}

export interface ComponentConfig {
  name: string;
  tag: string;
  description: string;
  category: 'Form' | 'Feedback' | 'Navigation' | 'Layout' | 'Overlay' | 'Data';
  cssVariables: CSSVariable[];
  defaultHtml: string;
  variants?: { name: string; html: string }[];
}

export const componentConfigs: ComponentConfig[] = [
  {
    name: 'Button',
    tag: 'ae-button',
    description: 'Interactive button with multiple variants and sizes',
    category: 'Form',
    cssVariables: [
      { name: '--ae-button-bg', label: 'Background', type: 'color', default: '#6366f1' },
      { name: '--ae-button-text', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: '--ae-button-hover-bg', label: 'Hover Background', type: 'color', default: '#4f46e5' },
      { name: '--ae-button-border-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
      { name: '--ae-button-padding-x', label: 'Horizontal Padding', type: 'size', default: '16', unit: 'px', min: 4, max: 48 },
      { name: '--ae-button-padding-y', label: 'Vertical Padding', type: 'size', default: '10', unit: 'px', min: 4, max: 24 },
      { name: '--ae-button-font-size', label: 'Font Size', type: 'size', default: '14', unit: 'px', min: 10, max: 24 },
      { name: '--ae-button-font-weight', label: 'Font Weight', type: 'select', default: '500', options: ['400', '500', '600', '700'] },
    ],
    defaultHtml: `<ae-button>Click Me</ae-button>`,
    variants: [
      { name: 'Primary', html: `<ae-button variant="primary">Primary</ae-button>` },
      { name: 'Secondary', html: `<ae-button variant="secondary">Secondary</ae-button>` },
      { name: 'Outline', html: `<ae-button variant="outline">Outline</ae-button>` },
      { name: 'Ghost', html: `<ae-button variant="ghost">Ghost</ae-button>` },
    ],
  },
  {
    name: 'Input',
    tag: 'ae-input',
    description: 'Text input field with label and validation',
    category: 'Form',
    cssVariables: [
      { name: '--ae-input-bg', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-input-text', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-input-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-input-focus-border', label: 'Focus Border', type: 'color', default: '#6366f1' },
      { name: '--ae-input-placeholder', label: 'Placeholder Color', type: 'color', default: '#666666' },
      { name: '--ae-input-border-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
      { name: '--ae-input-padding-x', label: 'Horizontal Padding', type: 'size', default: '12', unit: 'px', min: 4, max: 32 },
      { name: '--ae-input-padding-y', label: 'Vertical Padding', type: 'size', default: '10', unit: 'px', min: 4, max: 24 },
    ],
    defaultHtml: `<ae-input label="Email" placeholder="Enter your email"></ae-input>`,
    variants: [
      { name: 'With Helper', html: `<ae-input label="Username" helper-text="Choose a unique username"></ae-input>` },
      { name: 'Error State', html: `<ae-input label="Password" error="Password is required"></ae-input>` },
      { name: 'Disabled', html: `<ae-input label="Disabled" disabled value="Cannot edit"></ae-input>` },
    ],
  },
  {
    name: 'Checkbox',
    tag: 'ae-checkbox',
    description: 'Checkbox input with label',
    category: 'Form',
    cssVariables: [
      { name: '--ae-checkbox-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-checkbox-checked-bg', label: 'Checked Background', type: 'color', default: '#6366f1' },
      { name: '--ae-checkbox-check-color', label: 'Check Color', type: 'color', default: '#ffffff' },
      { name: '--ae-checkbox-size', label: 'Size', type: 'size', default: '20', unit: 'px', min: 14, max: 32 },
      { name: '--ae-checkbox-border-radius', label: 'Border Radius', type: 'size', default: '4', unit: 'px', min: 0, max: 16 },
    ],
    defaultHtml: `<ae-checkbox>Accept terms and conditions</ae-checkbox>`,
    variants: [
      { name: 'Checked', html: `<ae-checkbox checked>Remember me</ae-checkbox>` },
      { name: 'Disabled', html: `<ae-checkbox disabled>Disabled option</ae-checkbox>` },
    ],
  },
  {
    name: 'Switch',
    tag: 'ae-switch',
    description: 'Toggle switch for boolean settings',
    category: 'Form',
    cssVariables: [
      { name: '--ae-switch-track-bg', label: 'Track Background', type: 'color', default: '#333333' },
      { name: '--ae-switch-track-active', label: 'Active Track', type: 'color', default: '#6366f1' },
      { name: '--ae-switch-thumb-bg', label: 'Thumb Color', type: 'color', default: '#ffffff' },
      { name: '--ae-switch-width', label: 'Width', type: 'size', default: '44', unit: 'px', min: 32, max: 64 },
      { name: '--ae-switch-height', label: 'Height', type: 'size', default: '24', unit: 'px', min: 16, max: 40 },
    ],
    defaultHtml: `<ae-switch>Enable notifications</ae-switch>`,
    variants: [
      { name: 'Checked', html: `<ae-switch checked>Dark mode</ae-switch>` },
      { name: 'Disabled', html: `<ae-switch disabled>Disabled switch</ae-switch>` },
    ],
  },
  {
    name: 'Radio',
    tag: 'ae-radio-group',
    description: 'Radio button group for single selection',
    category: 'Form',
    cssVariables: [
      { name: '--ae-radio-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-radio-checked-bg', label: 'Checked Color', type: 'color', default: '#6366f1' },
      { name: '--ae-radio-size', label: 'Size', type: 'size', default: '20', unit: 'px', min: 14, max: 32 },
    ],
    defaultHtml: `<ae-radio-group label="Select option">
  <ae-radio value="1">Option 1</ae-radio>
  <ae-radio value="2">Option 2</ae-radio>
  <ae-radio value="3">Option 3</ae-radio>
</ae-radio-group>`,
  },
  {
    name: 'Alert',
    tag: 'ae-alert',
    description: 'Alert message for user feedback',
    category: 'Feedback',
    cssVariables: [
      { name: '--ae-alert-bg', label: 'Background', type: 'color', default: '#1e3a5f' },
      { name: '--ae-alert-text', label: 'Text Color', type: 'color', default: '#93c5fd' },
      { name: '--ae-alert-border', label: 'Border Color', type: 'color', default: '#3b82f6' },
      { name: '--ae-alert-border-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
      { name: '--ae-alert-padding', label: 'Padding', type: 'size', default: '16', unit: 'px', min: 8, max: 32 },
    ],
    defaultHtml: `<ae-alert variant="info">This is an informational alert.</ae-alert>`,
    variants: [
      { name: 'Success', html: `<ae-alert variant="success">Operation completed successfully!</ae-alert>` },
      { name: 'Warning', html: `<ae-alert variant="warning">Please review your input.</ae-alert>` },
      { name: 'Error', html: `<ae-alert variant="error">An error occurred. Please try again.</ae-alert>` },
      { name: 'Closable', html: `<ae-alert variant="info" closable>You can dismiss this alert.</ae-alert>` },
    ],
  },
  {
    name: 'Badge',
    tag: 'ae-badge',
    description: 'Small status indicator or label',
    category: 'Feedback',
    cssVariables: [
      { name: '--ae-badge-bg', label: 'Background', type: 'color', default: '#6366f1' },
      { name: '--ae-badge-text', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: '--ae-badge-border-radius', label: 'Border Radius', type: 'size', default: '9999', unit: 'px', min: 0, max: 9999 },
      { name: '--ae-badge-padding-x', label: 'Horizontal Padding', type: 'size', default: '8', unit: 'px', min: 4, max: 24 },
      { name: '--ae-badge-padding-y', label: 'Vertical Padding', type: 'size', default: '2', unit: 'px', min: 0, max: 12 },
      { name: '--ae-badge-font-size', label: 'Font Size', type: 'size', default: '12', unit: 'px', min: 8, max: 18 },
    ],
    defaultHtml: `<ae-badge>New</ae-badge>`,
    variants: [
      { name: 'Success', html: `<ae-badge variant="success">Active</ae-badge>` },
      { name: 'Warning', html: `<ae-badge variant="warning">Pending</ae-badge>` },
      { name: 'Error', html: `<ae-badge variant="error">Failed</ae-badge>` },
    ],
  },
  {
    name: 'Spinner',
    tag: 'ae-spinner',
    description: 'Loading spinner indicator',
    category: 'Feedback',
    cssVariables: [
      { name: '--ae-spinner-color', label: 'Color', type: 'color', default: '#6366f1' },
      { name: '--ae-spinner-track-color', label: 'Track Color', type: 'color', default: '#333333' },
      { name: '--ae-spinner-size', label: 'Size', type: 'size', default: '32', unit: 'px', min: 16, max: 64 },
      { name: '--ae-spinner-thickness', label: 'Thickness', type: 'size', default: '3', unit: 'px', min: 1, max: 8 },
    ],
    defaultHtml: `<ae-spinner></ae-spinner>`,
    variants: [
      { name: 'Small', html: `<ae-spinner size="sm"></ae-spinner>` },
      { name: 'Large', html: `<ae-spinner size="lg"></ae-spinner>` },
    ],
  },
  {
    name: 'Progress',
    tag: 'ae-progress',
    description: 'Progress bar indicator',
    category: 'Feedback',
    cssVariables: [
      { name: '--ae-progress-bg', label: 'Track Background', type: 'color', default: '#333333' },
      { name: '--ae-progress-fill', label: 'Fill Color', type: 'color', default: '#6366f1' },
      { name: '--ae-progress-height', label: 'Height', type: 'size', default: '8', unit: 'px', min: 2, max: 24 },
      { name: '--ae-progress-border-radius', label: 'Border Radius', type: 'size', default: '9999', unit: 'px', min: 0, max: 9999 },
    ],
    defaultHtml: `<ae-progress value="60"></ae-progress>`,
    variants: [
      { name: '25%', html: `<ae-progress value="25"></ae-progress>` },
      { name: '75%', html: `<ae-progress value="75"></ae-progress>` },
      { name: 'Indeterminate', html: `<ae-progress indeterminate></ae-progress>` },
    ],
  },
  {
    name: 'Tabs',
    tag: 'ae-tabs',
    description: 'Tabbed navigation component',
    category: 'Navigation',
    cssVariables: [
      { name: '--ae-tabs-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-tabs-active-color', label: 'Active Color', type: 'color', default: '#6366f1' },
      { name: '--ae-tabs-text', label: 'Text Color', type: 'color', default: '#888888' },
      { name: '--ae-tabs-active-text', label: 'Active Text', type: 'color', default: '#ffffff' },
    ],
    defaultHtml: `<ae-tabs>
  <ae-tab slot="tabs" panel="tab1">Tab 1</ae-tab>
  <ae-tab slot="tabs" panel="tab2">Tab 2</ae-tab>
  <ae-tab slot="tabs" panel="tab3">Tab 3</ae-tab>
  <ae-tab-panel name="tab1">Content for Tab 1</ae-tab-panel>
  <ae-tab-panel name="tab2">Content for Tab 2</ae-tab-panel>
  <ae-tab-panel name="tab3">Content for Tab 3</ae-tab-panel>
</ae-tabs>`,
  },
  {
    name: 'Accordion',
    tag: 'ae-accordion',
    description: 'Expandable accordion sections',
    category: 'Layout',
    cssVariables: [
      { name: '--ae-accordion-bg', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-accordion-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-accordion-header-bg', label: 'Header Background', type: 'color', default: '#242424' },
      { name: '--ae-accordion-text', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-accordion-border-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
    ],
    defaultHtml: `<ae-accordion>
  <ae-accordion-item>
    <span slot="header">Section 1</span>
    <p>Content for section 1. This is expandable content.</p>
  </ae-accordion-item>
  <ae-accordion-item>
    <span slot="header">Section 2</span>
    <p>Content for section 2. Click to expand or collapse.</p>
  </ae-accordion-item>
</ae-accordion>`,
  },
  {
    name: 'Modal',
    tag: 'ae-modal',
    description: 'Modal dialog overlay',
    category: 'Overlay',
    cssVariables: [
      { name: '--ae-modal-bg', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-modal-text', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-modal-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-modal-backdrop', label: 'Backdrop Color', type: 'color', default: 'rgba(0,0,0,0.7)' },
      { name: '--ae-modal-border-radius', label: 'Border Radius', type: 'size', default: '12', unit: 'px', min: 0, max: 32 },
      { name: '--ae-modal-padding', label: 'Padding', type: 'size', default: '24', unit: 'px', min: 8, max: 48 },
    ],
    defaultHtml: `<ae-button onclick="document.querySelector('ae-modal').open = true">Open Modal</ae-button>
<ae-modal>
  <h3 slot="header">Modal Title</h3>
  <p>This is the modal content. You can put any content here.</p>
  <div slot="footer">
    <ae-button variant="ghost" onclick="this.closest('ae-modal').open = false">Cancel</ae-button>
    <ae-button>Confirm</ae-button>
  </div>
</ae-modal>`,
  },
  {
    name: 'Tooltip',
    tag: 'ae-tooltip',
    description: 'Contextual tooltip on hover',
    category: 'Overlay',
    cssVariables: [
      { name: '--ae-tooltip-bg', label: 'Background', type: 'color', default: '#333333' },
      { name: '--ae-tooltip-text', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-tooltip-border-radius', label: 'Border Radius', type: 'size', default: '6', unit: 'px', min: 0, max: 16 },
      { name: '--ae-tooltip-padding', label: 'Padding', type: 'size', default: '8', unit: 'px', min: 4, max: 24 },
      { name: '--ae-tooltip-font-size', label: 'Font Size', type: 'size', default: '13', unit: 'px', min: 10, max: 18 },
    ],
    defaultHtml: `<ae-tooltip content="This is helpful information">
  <ae-button>Hover me</ae-button>
</ae-tooltip>`,
    variants: [
      { name: 'Top', html: `<ae-tooltip content="Top tooltip" placement="top"><ae-button>Top</ae-button></ae-tooltip>` },
      { name: 'Bottom', html: `<ae-tooltip content="Bottom tooltip" placement="bottom"><ae-button>Bottom</ae-button></ae-tooltip>` },
      { name: 'Left', html: `<ae-tooltip content="Left tooltip" placement="left"><ae-button>Left</ae-button></ae-tooltip>` },
      { name: 'Right', html: `<ae-tooltip content="Right tooltip" placement="right"><ae-button>Right</ae-button></ae-tooltip>` },
    ],
  },
  {
    name: 'Dropdown',
    tag: 'ae-dropdown',
    description: 'Dropdown menu with items',
    category: 'Overlay',
    cssVariables: [
      { name: '--ae-dropdown-bg', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-dropdown-text', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-dropdown-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-dropdown-hover-bg', label: 'Item Hover', type: 'color', default: '#333333' },
      { name: '--ae-dropdown-border-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
    ],
    defaultHtml: `<ae-dropdown>
  <ae-button slot="trigger">Options</ae-button>
  <ae-menu-item>Edit</ae-menu-item>
  <ae-menu-item>Duplicate</ae-menu-item>
  <ae-menu-divider></ae-menu-divider>
  <ae-menu-item>Delete</ae-menu-item>
</ae-dropdown>`,
  },
];

export function getComponentByName(name: string): ComponentConfig | undefined {
  return componentConfigs.find(c => c.name === name);
}

export function getComponentsByCategory(category: string): ComponentConfig[] {
  return componentConfigs.filter(c => c.category === category);
}

export const categories = ['Form', 'Feedback', 'Navigation', 'Layout', 'Overlay'] as const;
