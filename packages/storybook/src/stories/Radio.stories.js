import { html } from 'lit';

export default {
  title: 'Examples/Simple Radio',
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
        border-radius: 50%;
        background-color: transparent;
        position: relative;
      "
      >
        ${args.checked
          ? html`
              <span
                style="
            width: calc(${args.size} / 2);
            height: calc(${args.size} / 2);
            background-color: #0066FF;
            border-radius: 50%;
          "
              ></span>
            `
          : ''}
      </span>
      <input
        type="radio"
        style="position: absolute; opacity: 0;"
        ?checked=${args.checked}
        ?disabled=${args.disabled}
        name=${args.name}
      />
      ${args.label}
    </label>
  `,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the radio is checked',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio is disabled',
    },
    size: {
      control: { type: 'text' },
      description: 'The size of the radio (CSS value)',
    },
    label: {
      control: { type: 'text' },
      description: 'The radio label',
    },
    name: {
      control: { type: 'text' },
      description: 'The radio button group name',
    },
  },
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
    size: '1rem',
    label: 'Default Radio',
    name: 'radio-group',
  },
};

export const Checked = {
  args: {
    checked: true,
    disabled: false,
    size: '1rem',
    label: 'Checked Radio',
    name: 'radio-group',
  },
};

export const Disabled = {
  args: {
    checked: false,
    disabled: true,
    size: '1rem',
    label: 'Disabled Radio',
    name: 'radio-group',
  },
};

export const DisabledChecked = {
  args: {
    checked: true,
    disabled: true,
    size: '1rem',
    label: 'Disabled Checked Radio',
    name: 'radio-group',
  },
};

export const Small = {
  args: {
    checked: false,
    disabled: false,
    size: '0.875rem',
    label: 'Small Radio',
    name: 'radio-group',
  },
};

export const Large = {
  args: {
    checked: false,
    disabled: false,
    size: '1.5rem',
    label: 'Large Radio',
    name: 'radio-group',
  },
};

export const RadioGroup = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui, sans-serif;"
    >
      <p style="font-weight: bold; margin: 0 0 4px 0;">Select one option:</p>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <span
          style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
          height: 1rem;
          border: 2px solid #0066FF;
          border-radius: 50%;
        "
        >
          <span
            style="
            width: 0.5rem;
            height: 0.5rem;
            background-color: #0066FF;
            border-radius: 50%;
          "
          ></span>
        </span>
        <input
          type="radio"
          style="position: absolute; opacity: 0;"
          name="radio-group-example"
          checked
        />
        Option A
      </label>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <span
          style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
          height: 1rem;
          border: 2px solid #0066FF;
          border-radius: 50%;
        "
        ></span>
        <input type="radio" style="position: absolute; opacity: 0;" name="radio-group-example" />
        Option B
      </label>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <span
          style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
          height: 1rem;
          border: 2px solid #0066FF;
          border-radius: 50%;
        "
        ></span>
        <input type="radio" style="position: absolute; opacity: 0;" name="radio-group-example" />
        Option C
      </label>

      <label
        style="display: flex; align-items: center; gap: 8px; cursor: not-allowed; opacity: 0.7;"
      >
        <span
          style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
          height: 1rem;
          border: 2px solid #aaa;
          border-radius: 50%;
        "
        ></span>
        <input
          type="radio"
          style="position: absolute; opacity: 0;"
          name="radio-group-example"
          disabled
        />
        Option D (Disabled)
      </label>
    </div>
  `,
};
