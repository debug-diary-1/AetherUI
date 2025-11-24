import { html } from 'lit';
import { expect, within, userEvent } from '@storybook/test';

export default {
  title: 'Components/Switch',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
  },
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
    required: false,
    size: 'md',
    label: 'Enable notifications',
  },
  render: (args) => html`
    <ae-switch
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      size="${args.size}"
      @ae-switch-change="${(e) => console.log('Switch toggled:', e.detail)}"
    >
      ${args.label}
    </ae-switch>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the ae-switch element and access its shadow DOM
    const aeSwitch = canvasElement.querySelector('ae-switch');
    expect(aeSwitch).toBeInTheDocument();

    // Get the input element from shadow DOM
    const input = aeSwitch.shadowRoot.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();

    // Initially unchecked
    expect(input.checked).toBe(false);

    // Click to toggle
    await userEvent.click(input);
    expect(input.checked).toBe(true);

    // Click again to toggle back
    await userEvent.click(input);
    expect(input.checked).toBe(false);
  },
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ae-switch size="sm" checked>Small switch</ae-switch>
      <ae-switch size="md" checked>Medium switch</ae-switch>
      <ae-switch size="lg" checked>Large switch</ae-switch>
    </div>
  `,
};

export const Checked = {
  args: {
    ...Default.args,
    checked: true,
  },
  render: Default.render,
};

export const Disabled = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ae-switch disabled>Disabled off</ae-switch>
      <ae-switch disabled checked>Disabled on</ae-switch>
    </div>
  `,
};
