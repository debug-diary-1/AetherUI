import { html } from 'lit';

export default {
  title: 'Examples/Simple Checkbox',
  tags: ['autodocs'],
  render: (args) => html`
    <label
      style="
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: ${args.disabled ? 'not-allowed' : 'pointer'};
      opacity: ${args.disabled ? '0.7' : '1'};
      font-family: system-ui, sans-serif;
    "
    >
      <span
        style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${args.size};
        height: ${args.size};
        border: 2px solid ${args.disabled ? '#aaa' : '#0066FF'};
        border-radius: 4px;
        background-color: ${args.checked ? '#0066FF' : 'transparent'};
        position: relative;
      "
      >
        ${args.checked && !args.indeterminate
          ? html`
              <svg
                width="70%"
                height="70%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `
          : ''}
        ${args.indeterminate
          ? html`
              <svg
                width="70%"
                height="70%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="3"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            `
          : ''}
      </span>
      <input
        type="checkbox"
        style="position: absolute; opacity: 0;"
        ?checked=${args.checked}
        ?disabled=${args.disabled}
      />
      ${args.label}
    </label>
  `,
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
    size: {
      control: { type: 'text' },
      description: 'The size of the checkbox (CSS value)',
    },
    label: {
      control: { type: 'text' },
      description: 'The checkbox label',
    },
  },
};

export const Default = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: '1rem',
    label: 'Default Checkbox',
  },
};

export const Checked = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    size: '1rem',
    label: 'Checked Checkbox',
  },
};

export const Indeterminate = {
  args: {
    checked: false,
    indeterminate: true,
    disabled: false,
    size: '1rem',
    label: 'Indeterminate Checkbox',
  },
};

export const Disabled = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: true,
    size: '1rem',
    label: 'Disabled Checkbox',
  },
};

export const DisabledChecked = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: true,
    size: '1rem',
    label: 'Disabled Checked Checkbox',
  },
};

export const Small = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: '0.875rem',
    label: 'Small Checkbox',
  },
};

export const Large = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: '1.5rem',
    label: 'Large Checkbox',
  },
};

export const CheckboxGroup = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui, sans-serif;"
    >
      <p style="font-weight: bold; margin: 0 0 4px 0;">Select options:</p>
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <span
          style="display: inline-flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; border: 2px solid #0066FF; border-radius: 4px;"
        >
        </span>
        <input type="checkbox" style="position: absolute; opacity: 0;" />
        Option 1
      </label>
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <span
          style="display: inline-flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; border: 2px solid #0066FF; border-radius: 4px; background-color: #0066FF;"
        >
          <svg
            width="70%"
            height="70%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="3"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <input type="checkbox" style="position: absolute; opacity: 0;" checked />
        Option 2
      </label>
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <span
          style="display: inline-flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; border: 2px solid #0066FF; border-radius: 4px;"
        >
        </span>
        <input type="checkbox" style="position: absolute; opacity: 0;" />
        Option 3
      </label>
    </div>
  `,
};
