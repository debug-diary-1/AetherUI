import { html } from 'lit';

// Import the checkbox component class
// Note: We don't need to import AeCheckbox directly, just register it
import '@aetherui/core/checkbox';

export default {
  title: 'Components/Checkbox',
  component: 'ae-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in an indeterminate state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is required',
    },
    name: {
      control: { type: 'text' },
      description: 'Input name for form association',
    },
    value: {
      control: { type: 'text' },
      description: 'Value attribute for the checkbox input',
    },
    label: {
      control: { type: 'text' },
      description: 'The checkbox label',
    },
    onAeCheckboxChange: { action: 'ae-checkbox-change' },
  },
};

export const Default = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Default Checkbox',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const Checked = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    label: 'Checked Checkbox',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const Indeterminate = {
  args: {
    checked: false,
    indeterminate: true,
    disabled: false,
    label: 'Indeterminate Checkbox',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const Disabled = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: true,
    label: 'Disabled Checkbox',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const DisabledChecked = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: true,
    label: 'Disabled Checked Checkbox',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const WithRequiredState = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: true,
    label: 'Required Checkbox',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      ?required=${args.required}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const WithValueAttribute = {
  args: {
    checked: true,
    value: 'custom-value',
    name: 'options',
    label: 'Checkbox with value attribute',
  },
  render: (args) => html`
    <ae-checkbox
      ?checked=${args.checked}
      value=${args.value}
      name=${args.name}
      @ae-checkbox-change=${args.onAeCheckboxChange}
    >
      ${args.label}
    </ae-checkbox>
  `,
};

export const WithEvents = {
  render: () => {
    const handleChange = (e) => {
      console.log('Checkbox change event:', e.detail);
    };
    
    return html`
      <div>
        <h3>Checkbox with Events</h3>
        <p>Open the browser console to see events logged</p>
        <ae-checkbox @ae-checkbox-change=${handleChange}>Click to trigger event</ae-checkbox>
      </div>
    `;
  }
};

export const CheckboxGroup = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <p style="font-weight: bold; margin: 0 0 4px 0;">Select options:</p>
      <ae-checkbox name="option-group" value="option1">Option 1</ae-checkbox>
      <ae-checkbox name="option-group" value="option2" checked>Option 2</ae-checkbox>
      <ae-checkbox name="option-group" value="option3">Option 3</ae-checkbox>
      <ae-checkbox name="option-group" value="option4" disabled>Option 4 (Disabled)</ae-checkbox>
    </div>
  `,
};