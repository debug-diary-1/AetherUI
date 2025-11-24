import { html } from 'lit';
import { expect, within, userEvent } from '@storybook/test';

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helpText: {
      control: 'text',
      description: 'Help text',
    },
  },
};

export const Default = {
  args: {
    type: 'text',
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: '',
    disabled: false,
    required: false,
    readonly: false,
    clearable: false,
    error: '',
    helpText: '',
  },
  render: (args) => html`
    <ae-input
      type="${args.type}"
      label="${args.label}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?clearable="${args.clearable}"
      error="${args.error}"
      help-text="${args.helpText}"
      @ae-input-change="${(e) => console.log('Input changed:', e.detail)}"
    ></ae-input>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the ae-input element and access its shadow DOM
    const aeInput = canvasElement.querySelector('ae-input');
    expect(aeInput).toBeInTheDocument();

    // Get the input element from shadow DOM
    const input = aeInput.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();

    // Type into the input
    await userEvent.type(input, 'test@example.com', { delay: 50 });
    expect(input.value).toBe('test@example.com');

    // Clear the input
    await userEvent.clear(input);
    expect(input.value).toBe('');

    // Verify label is present in shadow DOM
    const label = aeInput.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Email Address');

    // Verify placeholder
    expect(input.getAttribute('placeholder')).toBe('Enter your email');
  },
};

export const WithError = {
  args: {
    ...Default.args,
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
  render: Default.render,
};

export const WithHelpText = {
  args: {
    ...Default.args,
    label: 'Username',
    helpText: 'Choose a unique username',
  },
  render: Default.render,
};

export const Clearable = {
  args: {
    ...Default.args,
    label: 'Search',
    type: 'search',
    value: 'example search',
    clearable: true,
  },
  render: Default.render,
};

export const Password = {
  args: {
    ...Default.args,
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    required: true,
  },
  render: Default.render,
};

export const WithPrefixSuffix = {
  args: {
    ...Default.args,
    label: 'Website URL',
    type: 'url',
    value: 'example.com',
  },
  render: (args) => html`
    <ae-input
      type="${args.type}"
      label="${args.label}"
      value="${args.value}"
    >
      <span slot="prefix">https://</span>
      <span slot="suffix">.com</span>
    </ae-input>
  `,
};
