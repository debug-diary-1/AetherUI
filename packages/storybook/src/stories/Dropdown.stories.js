import { html } from 'lit';
import { AeDropdown, AeMenuItem, AeMenuSeparator, defineAeDropdown } from '@aetherui/core';

// Register the dropdown components
defineAeDropdown();

export default {
  title: 'Components/Dropdown',
  component: 'ae-dropdown',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'Placement of the dropdown relative to the trigger',
      defaultValue: 'bottom-start',
    },
    strategy: {
      control: 'radio',
      options: ['absolute', 'fixed'],
      description: 'Positioning strategy',
      defaultValue: 'absolute',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      defaultValue: false,
    },
    open: {
      control: 'boolean',
      description: 'Whether the dropdown is open (controlled mode)',
      defaultValue: false,
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled mode)',
      defaultValue: false,
    },
  },
};

// Basic dropdown
export const Basic = {
  render: (args) => html`
    <ae-dropdown
      ?open=${args.open}
      ?default-open=${args.defaultOpen}
      ?disabled=${args.disabled}
      placement=${args.placement}
      strategy=${args.strategy}
      @ae-select=${(e) => console.log('Selected:', e.detail.value)}
    >
      <ae-button>Open Menu</ae-button>

      <ae-menu-item slot="item" value="edit">Edit</ae-menu-item>
      <ae-menu-item slot="item" value="duplicate">Duplicate</ae-menu-item>
      <ae-menu-item slot="item" value="archive">Archive</ae-menu-item>
      <ae-menu-separator slot="item"></ae-menu-separator>
      <ae-menu-item slot="item" value="delete">Delete</ae-menu-item>
    </ae-dropdown>
  `,
  args: {
    placement: 'bottom-start',
    strategy: 'absolute',
    disabled: false,
    open: false,
    defaultOpen: false,
  },
};

// Dropdown with custom trigger
export const CustomTrigger = {
  render: (args) => html`
    <ae-dropdown
      ?open=${args.open}
      ?default-open=${args.defaultOpen}
      ?disabled=${args.disabled}
      placement=${args.placement}
      strategy=${args.strategy}
    >
      <button
        style="padding: 8px 16px; background: #eee; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 4px;"
      >
        Options
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>

      <ae-menu-item slot="item" value="item1">Menu item 1</ae-menu-item>
      <ae-menu-item slot="item" value="item2">Menu item 2</ae-menu-item>
      <ae-menu-item slot="item" value="item3">Menu item 3</ae-menu-item>
    </ae-dropdown>
  `,
  args: {
    placement: 'bottom-start',
    strategy: 'absolute',
    disabled: false,
    open: false,
    defaultOpen: false,
  },
};

// Dropdown with icons and hints
export const WithIconsAndHints = {
  render: (args) => html`
    <ae-dropdown
      ?open=${args.open}
      ?default-open=${args.defaultOpen}
      ?disabled=${args.disabled}
      placement=${args.placement}
      strategy=${args.strategy}
    >
      <ae-button>More Actions</ae-button>

      <ae-menu-item slot="item" value="cut">
        <span slot="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4L12 10M12 4L6 10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
            <circle cx="4" cy="4" r="1.5" stroke="currentColor"></circle>
            <circle cx="4" cy="10" r="1.5" stroke="currentColor"></circle>
          </svg>
        </span>
        Cut
        <span slot="hint">⌘X</span>
      </ae-menu-item>

      <ae-menu-item slot="item" value="copy">
        <span slot="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor"></rect>
            <path
              d="M7 7V11C7 11.5523 7.44772 12 8 12H12C12.5523 12 13 11.5523 13 11V7C13 6.44772 12.5523 6 12 6H8"
              stroke="currentColor"
            ></path>
          </svg>
        </span>
        Copy
        <span slot="hint">⌘C</span>
      </ae-menu-item>

      <ae-menu-item slot="item" value="paste">
        <span slot="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5H11V12C11 12.5523 10.5523 13 10 13H6C5.44772 13 5 12.5523 5 12V5Z"
              stroke="currentColor"
            ></path>
            <path
              d="M6 2.5C6 2.22386 6.22386 2 6.5 2H9.5C9.77614 2 10 2.22386 10 2.5V5H6V2.5Z"
              stroke="currentColor"
            ></path>
          </svg>
        </span>
        Paste
        <span slot="hint">⌘V</span>
      </ae-menu-item>
    </ae-dropdown>
  `,
  args: {
    placement: 'bottom-start',
    strategy: 'absolute',
    disabled: false,
    open: false,
    defaultOpen: false,
  },
};

// Dropdown with disabled items
export const WithDisabledItems = {
  render: (args) => html`
    <ae-dropdown
      ?open=${args.open}
      ?default-open=${args.defaultOpen}
      ?disabled=${args.disabled}
      placement=${args.placement}
      strategy=${args.strategy}
    >
      <ae-button>Select an Option</ae-button>

      <ae-menu-item slot="item" value="option1">Option 1</ae-menu-item>
      <ae-menu-item slot="item" value="option2" disabled>Option 2 (Disabled)</ae-menu-item>
      <ae-menu-item slot="item" value="option3">Option 3</ae-menu-item>
      <ae-menu-separator slot="item"></ae-menu-separator>
      <ae-menu-item slot="item" value="option4" disabled>Option 4 (Disabled)</ae-menu-item>
      <ae-menu-item slot="item" value="option5">Option 5</ae-menu-item>
    </ae-dropdown>
  `,
  args: {
    placement: 'bottom-start',
    strategy: 'absolute',
    disabled: false,
    open: false,
    defaultOpen: false,
  },
};

// Dropdown with different placements
export const DifferentPlacements = {
  render: (args) => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
      <ae-dropdown placement="top-start">
        <ae-button>Top Start</ae-button>
        <ae-menu-item slot="item" value="item1">Item 1</ae-menu-item>
        <ae-menu-item slot="item" value="item2">Item 2</ae-menu-item>
        <ae-menu-item slot="item" value="item3">Item 3</ae-menu-item>
      </ae-dropdown>

      <ae-dropdown placement="top">
        <ae-button>Top</ae-button>
        <ae-menu-item slot="item" value="item1">Item 1</ae-menu-item>
        <ae-menu-item slot="item" value="item2">Item 2</ae-menu-item>
        <ae-menu-item slot="item" value="item3">Item 3</ae-menu-item>
      </ae-dropdown>

      <ae-dropdown placement="top-end">
        <ae-button>Top End</ae-button>
        <ae-menu-item slot="item" value="item1">Item 1</ae-menu-item>
        <ae-menu-item slot="item" value="item2">Item 2</ae-menu-item>
        <ae-menu-item slot="item" value="item3">Item 3</ae-menu-item>
      </ae-dropdown>

      <ae-dropdown placement="bottom-start">
        <ae-button>Bottom Start</ae-button>
        <ae-menu-item slot="item" value="item1">Item 1</ae-menu-item>
        <ae-menu-item slot="item" value="item2">Item 2</ae-menu-item>
        <ae-menu-item slot="item" value="item3">Item 3</ae-menu-item>
      </ae-dropdown>

      <ae-dropdown placement="bottom">
        <ae-button>Bottom</ae-button>
        <ae-menu-item slot="item" value="item1">Item 1</ae-menu-item>
        <ae-menu-item slot="item" value="item2">Item 2</ae-menu-item>
        <ae-menu-item slot="item" value="item3">Item 3</ae-menu-item>
      </ae-dropdown>

      <ae-dropdown placement="bottom-end">
        <ae-button>Bottom End</ae-button>
        <ae-menu-item slot="item" value="item1">Item 1</ae-menu-item>
        <ae-menu-item slot="item" value="item2">Item 2</ae-menu-item>
        <ae-menu-item slot="item" value="item3">Item 3</ae-menu-item>
      </ae-dropdown>
    </div>
  `,
};

// Nested Dropdowns
export const NestedExample = {
  render: (args) => html`
    <div style="display: flex; justify-content: center; padding: 50px;">
      <ae-dropdown ?open=${args.open} ?default-open=${args.defaultOpen} ?disabled=${args.disabled}>
        <ae-button>File</ae-button>

        <ae-menu-item slot="item" value="new">New</ae-menu-item>
        <ae-menu-item slot="item" value="open">Open</ae-menu-item>
        <ae-menu-item slot="item" value="save">Save</ae-menu-item>
        <ae-menu-separator slot="item"></ae-menu-separator>
        <ae-menu-item slot="item" value="print">Print</ae-menu-item>
        <ae-menu-separator slot="item"></ae-menu-separator>
        <ae-menu-item slot="item" value="exit">Exit</ae-menu-item>
      </ae-dropdown>
    </div>
  `,
  args: {
    disabled: false,
    open: false,
    defaultOpen: false,
  },
};
