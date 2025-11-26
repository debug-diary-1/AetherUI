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
      { name: '--ae-button-bg-primary', label: 'Background', type: 'color', default: '#5e7ce2' },
      { name: '--ae-button-fg-primary', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: '--ae-button-bg-primary-hover', label: 'Hover Background', type: 'color', default: '#4b69c8' },
      { name: '--ae-button-border-primary', label: 'Border Color', type: 'color', default: '#5e7ce2' },
      { name: '--ae-button-radius', label: 'Border Radius', type: 'size', default: '6', unit: 'px', min: 0, max: 24 },
      { name: '--ae-button-padding-x', label: 'Horizontal Padding', type: 'size', default: '16', unit: 'px', min: 4, max: 48 },
      { name: '--ae-button-padding-y', label: 'Vertical Padding', type: 'size', default: '8', unit: 'px', min: 4, max: 24 },
      { name: '--ae-button-gap', label: 'Icon Gap', type: 'size', default: '8', unit: 'px', min: 0, max: 16 },
    ],
    defaultHtml: `<ae-button>Click Me</ae-button>`,
    variants: [
      { name: 'Primary', html: `<ae-button variant="primary">Primary</ae-button>` },
      { name: 'Secondary', html: `<ae-button variant="secondary">Secondary</ae-button>` },
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
      { name: '--ae-input-color', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-input-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-input-border-focus', label: 'Focus Border', type: 'color', default: '#5e7ce2' },
      { name: '--ae-input-placeholder-color', label: 'Placeholder Color', type: 'color', default: '#666666' },
      { name: '--ae-input-label-color', label: 'Label Color', type: 'color', default: '#e5e5e5' },
      { name: '--ae-input-border-radius', label: 'Border Radius', type: 'size', default: '6', unit: 'px', min: 0, max: 24 },
      { name: '--ae-input-padding', label: 'Padding', type: 'size', default: '10', unit: 'px', min: 4, max: 24 },
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
      { name: '--ae-checkbox-bg', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-checkbox-border-color', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-checkbox-checked-bg', label: 'Checked Background', type: 'color', default: '#5e7ce2' },
      { name: '--ae-checkbox-checked-icon-color', label: 'Check Color', type: 'color', default: '#ffffff' },
      { name: '--ae-checkbox-text-color', label: 'Text Color', type: 'color', default: '#e5e5e5' },
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
      { name: '--ae-switch-bg', label: 'Track Background', type: 'color', default: '#333333' },
      { name: '--ae-switch-bg-checked', label: 'Active Track', type: 'color', default: '#5e7ce2' },
      { name: '--ae-switch-thumb-bg', label: 'Thumb Color', type: 'color', default: '#ffffff' },
      { name: '--ae-switch-text-color', label: 'Text Color', type: 'color', default: '#e5e5e5' },
      { name: '--ae-switch-width-md', label: 'Width', type: 'size', default: '44', unit: 'px', min: 32, max: 64 },
      { name: '--ae-switch-height-md', label: 'Height', type: 'size', default: '24', unit: 'px', min: 16, max: 40 },
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
      { name: '--ae-radio-bg', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-radio-border-color', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-radio-checked-bg', label: 'Checked Background', type: 'color', default: '#5e7ce2' },
      { name: '--ae-radio-checked-dot-color', label: 'Checked Dot', type: 'color', default: '#ffffff' },
      { name: '--ae-radio-text-color', label: 'Text Color', type: 'color', default: '#e5e5e5' },
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
      { name: '--ae-alert-bg-info', label: 'Background', type: 'color', default: '#1e3a5f' },
      { name: '--ae-alert-fg-info', label: 'Text Color', type: 'color', default: '#93c5fd' },
      { name: '--ae-alert-border-info', label: 'Border Color', type: 'color', default: '#3b82f6' },
      { name: '--ae-alert-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
      { name: '--ae-alert-padding-md', label: 'Padding', type: 'size', default: '16', unit: 'px', min: 8, max: 32 },
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
      { name: '--ae-badge-bg-primary', label: 'Background', type: 'color', default: '#5e7ce2' },
      { name: '--ae-badge-color-primary', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: '--ae-badge-border-radius', label: 'Border Radius', type: 'size', default: '9999', unit: 'px', min: 0, max: 9999 },
      { name: '--ae-badge-padding-md', label: 'Padding', type: 'size', default: '8', unit: 'px', min: 2, max: 24 },
      { name: '--ae-badge-font-size-md', label: 'Font Size', type: 'size', default: '12', unit: 'px', min: 8, max: 18 },
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
      { name: '--ae-spinner-color', label: 'Color', type: 'color', default: '#5e7ce2' },
      { name: '--ae-spinner-track-color', label: 'Track Color', type: 'color', default: '#333333' },
      { name: '--ae-spinner-size-md', label: 'Size', type: 'size', default: '32', unit: 'px', min: 16, max: 64 },
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
      { name: '--ae-progress-track-bg', label: 'Track Background', type: 'color', default: '#333333' },
      { name: '--ae-progress-bg-primary', label: 'Fill Color', type: 'color', default: '#5e7ce2' },
      { name: '--ae-progress-height-md', label: 'Height', type: 'size', default: '8', unit: 'px', min: 2, max: 24 },
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
      { name: '--ae-tabs-border-color', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-tabs-active-color', label: 'Active Color', type: 'color', default: '#5e7ce2' },
      { name: '--ae-tabs-gap', label: 'Tab Gap', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
    ],
    defaultHtml: `<ae-tabs>
  <ae-tab slot="tab">Tab 1</ae-tab>
  <ae-tab slot="tab">Tab 2</ae-tab>
  <ae-tab slot="tab">Tab 3</ae-tab>
  <ae-tab-panel slot="panel">Content for Tab 1</ae-tab-panel>
  <ae-tab-panel slot="panel">Content for Tab 2</ae-tab-panel>
  <ae-tab-panel slot="panel">Content for Tab 3</ae-tab-panel>
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
      { name: '--ae-accordion-header-color', label: 'Header Text', type: 'color', default: '#f5f5f5' },
      { name: '--ae-accordion-panel-color', label: 'Panel Text', type: 'color', default: '#e5e5e5' },
      { name: '--ae-accordion-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
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
      { name: '--ae-modal-background', label: 'Background', type: 'color', default: '#1a1a1a' },
      { name: '--ae-modal-text-color', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-modal-backdrop-color', label: 'Backdrop Color', type: 'color', default: 'rgba(0,0,0,0.7)' },
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
      { name: '--ae-tooltip-fg', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-tooltip-radius', label: 'Border Radius', type: 'size', default: '6', unit: 'px', min: 0, max: 16 },
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
      { name: '--ae-dropdown-fg', label: 'Text Color', type: 'color', default: '#f5f5f5' },
      { name: '--ae-dropdown-border', label: 'Border Color', type: 'color', default: '#333333' },
      { name: '--ae-dropdown-item-hover-bg', label: 'Item Hover', type: 'color', default: '#333333' },
      { name: '--ae-dropdown-radius', label: 'Border Radius', type: 'size', default: '8', unit: 'px', min: 0, max: 24 },
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
