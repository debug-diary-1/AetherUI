import { html } from 'lit';
import { expect, within, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder option',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    multiple: {
      control: 'boolean',
      description: 'Multiple selection',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helpText: {
      control: 'text',
      description: 'Help text',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label (used when no visible label is provided)',
    },
  },
};

export const Default = {
  args: {
    label: 'Select Country',
    placeholder: 'Choose a country',
    disabled: false,
    required: false,
    multiple: false,
    error: '',
    helpText: '',
  },
  render: (args) => html`
    <ae-select
      label="${args.label}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?multiple="${args.multiple}"
      error="${args.error}"
      help-text="${args.helpText}"
      aria-label="${args.ariaLabel || ''}"
      @ae-select-change="${(e) => console.log('Selection changed:', e.detail)}"
    >
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
      <option value="fr">France</option>
    </ae-select>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the ae-select element and access its shadow DOM
    const aeSelect = canvasElement.querySelector('ae-select');
    expect(aeSelect).toBeInTheDocument();

    // Get the select element from shadow DOM
    const select = aeSelect.shadowRoot.querySelector('select');
    expect(select).toBeTruthy();

    // Verify label is present
    const label = aeSelect.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Select Country');

    // Verify options are present
    const options = select.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(1);

    // Select a value
    select.value = 'us';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await aeSelect.updateComplete;

    expect(select.value).toBe('us');

    // Change selection
    select.value = 'uk';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await aeSelect.updateComplete;

    expect(select.value).toBe('uk');
  },
};

export const Multiple = {
  args: {
    ...Default.args,
    label: 'Select Tags',
    placeholder: '',
    multiple: true,
    helpText: 'Hold Ctrl/Cmd to select multiple',
  },
  render: (args) => html`
    <ae-select label="${args.label}" ?multiple="${args.multiple}" help-text="${args.helpText}">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="rust">Rust</option>
      <option value="go">Go</option>
    </ae-select>
  `,
};

export const WithError = {
  args: {
    ...Default.args,
    required: true,
    error: 'Please select a country',
  },
  render: Default.render,
};
