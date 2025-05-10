import { html } from 'lit';

// Import directly from the main package
import { AeRadio, AeRadioGroup } from '@aetherui/core';

// Make sure components are defined
if (!customElements.get('ae-radio')) {
  customElements.define('ae-radio', AeRadio);
}
if (!customElements.get('ae-radio-group')) {
  customElements.define('ae-radio-group', AeRadioGroup);
}

export default {
  title: 'Components/Radio',
  component: 'ae-radio',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the radio is checked',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio is disabled',
    },
    name: {
      control: { type: 'text' },
      description: 'The radio button group name',
    },
    value: {
      control: { type: 'text' },
      description: 'The radio button value',
    },
    label: {
      control: { type: 'text' },
      description: 'The radio label',
    },
    onAeRadioChange: { action: 'ae-radio-change' },
  },
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
    name: 'radio-group',
    value: 'default',
    label: 'Default Radio',
  },
  render: (args) => html`
    <ae-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      name=${args.name}
      value=${args.value}
      @ae-radio-change=${args.onAeRadioChange}
    >
      ${args.label}
    </ae-radio>
  `,
};

export const Checked = {
  args: {
    checked: true,
    disabled: false,
    name: 'radio-group',
    value: 'checked',
    label: 'Checked Radio',
  },
  render: (args) => html`
    <ae-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      name=${args.name}
      value=${args.value}
      @ae-radio-change=${args.onAeRadioChange}
    >
      ${args.label}
    </ae-radio>
  `,
};

export const Disabled = {
  args: {
    checked: false,
    disabled: true,
    name: 'radio-group',
    value: 'disabled',
    label: 'Disabled Radio',
  },
  render: (args) => html`
    <ae-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      name=${args.name}
      value=${args.value}
      @ae-radio-change=${args.onAeRadioChange}
    >
      ${args.label}
    </ae-radio>
  `,
};

export const DisabledChecked = {
  args: {
    checked: true,
    disabled: true,
    name: 'radio-group',
    value: 'disabled-checked',
    label: 'Disabled Checked Radio',
  },
  render: (args) => html`
    <ae-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      name=${args.name}
      value=${args.value}
      @ae-radio-change=${args.onAeRadioChange}
    >
      ${args.label}
    </ae-radio>
  `,
};

export const RadioGroup = {
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the radio group',
    },
    value: {
      control: { type: 'select' },
      options: ['option-a', 'option-b', 'option-c'],
      description: 'The selected value',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is disabled',
    },
    onAeRadioGroupChange: { action: 'ae-radio-group-change' },
  },
  args: {
    orientation: 'vertical',
    value: 'option-a',
    disabled: false,
  },
  render: (args) => html`
    <ae-radio-group
      name="radio-group-example"
      value=${args.value}
      orientation=${args.orientation}
      ?disabled=${args.disabled}
      @ae-radio-group-change=${args.onAeRadioGroupChange}
    >
      <div style="display: flex; flex-direction: ${args.orientation === 'horizontal' ? 'row' : 'column'}; gap: 12px;">
        <ae-radio value="option-a">Option A</ae-radio>
        <ae-radio value="option-b">Option B</ae-radio>
        <ae-radio value="option-c">Option C</ae-radio>
        <ae-radio value="option-d" disabled>Option D (Disabled)</ae-radio>
      </div>
    </ae-radio-group>
  `,
};

export const HorizontalRadioGroup = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => html`
    <ae-radio-group
      name="horizontal-radio-group"
      orientation=${args.orientation}
      @ae-radio-group-change=${(e) => console.log('Radio group change:', e.detail)}
    >
      <div style="display: flex; flex-direction: row; gap: 24px;">
        <ae-radio value="horizontal-a">Option A</ae-radio>
        <ae-radio value="horizontal-b">Option B</ae-radio>
        <ae-radio value="horizontal-c">Option C</ae-radio>
      </div>
    </ae-radio-group>
  `,
};

export const WithEvents = {
  render: () => {
    // Event handlers
    const handleRadioChange = (e) => {
      console.log('Radio change event:', e.detail);
    };
    
    const handleGroupChange = (e) => {
      console.log('Radio group change event:', e.detail);
    };
    
    return html`
      <div>
        <h3>Radio with Events</h3>
        <p>Open the browser console to see events logged</p>
        
        <ae-radio-group
          name="event-example"
          @ae-radio-group-change=${handleGroupChange}
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ae-radio 
              value="option-1" 
              @ae-radio-change=${handleRadioChange}
            >
              Option 1
            </ae-radio>
            <ae-radio 
              value="option-2"
              @ae-radio-change=${handleRadioChange}
            >
              Option 2
            </ae-radio>
            <ae-radio 
              value="option-3"
              @ae-radio-change=${handleRadioChange}
            >
              Option 3
            </ae-radio>
          </div>
        </ae-radio-group>
      </div>
    `;
  }
};