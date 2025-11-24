import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { action } from 'storybook/actions';
import { expect, within, userEvent, waitFor } from '@storybook/test';

export default {
  title: 'Components/Combo',
  component: 'ae-combo',
  argTypes: {
    value: { control: 'text', description: 'Current input value' },
    placeholder: { control: 'text', description: 'Placeholder text for the input' },
    disabled: { control: 'boolean', description: 'Whether the input is disabled' },
    freeInput: { 
      control: 'boolean',
      description: 'Whether user can enter values not in the list',
      table: { category: 'Behavior' }
    },
    items: { 
      control: 'object', 
      description: 'Items to display in the dropdown (string[] or {id, label, disabled?}[])',
      table: { type: { summary: 'Array<string | ComboItem>' } }
    },
    'ae-combo-select': { 
      action: 'ae-combo-select',
      description: 'Fired when an item is selected',
      table: { category: 'Events', type: { summary: 'CustomEvent<{value: string, item: ComboItem | null}>' } }
    },
    'ae-combo-input': { 
      action: 'ae-combo-input',
      description: 'Fired on each keystroke',
      table: { category: 'Events', type: { summary: 'CustomEvent<{value: string}>' } }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'An autocomplete dropdown that allows free-text input or selection from a filtered list, following the ARIA Listbox Combobox pattern.'
      }
    }
  }
};

const Template = (args) => html`
  <ae-combo
    value="${ifDefined(args.value)}"
    placeholder="${ifDefined(args.placeholder)}"
    ?disabled="${args.disabled}"
    ?free-input="${args.freeInput}"
    .items="${args.items || []}"
    @ae-combo-select="${(e) => action('ae-combo-select')(e.detail)}"
    @ae-combo-input="${(e) => action('ae-combo-input')(e.detail)}"
  ></ae-combo>
`;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Select a fruit...',
  items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
};
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Get the combo element and access its shadow DOM
  const combo = canvasElement.querySelector('ae-combo');
  expect(combo).toBeInTheDocument();

  const input = combo.shadowRoot.querySelector('input[role="combobox"]');
  expect(input).toBeTruthy();

  // Type to trigger filtering and highlighting
  await userEvent.type(input, 'app', { delay: 100 });

  // Wait for the dropdown to appear
  await waitFor(() => {
    const listbox = combo.shadowRoot.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
  });

  // Find the option with "Apple" in shadow DOM
  const options = combo.shadowRoot.querySelectorAll('[role="option"]');
  const appleOption = Array.from(options).find(opt => opt.textContent.includes('Apple'));
  expect(appleOption).toBeTruthy();

  // CRITICAL: Verify highlight is rendered as HTML, not escaped text
  const highlight = appleOption.querySelector('.highlight');
  expect(highlight).toBeTruthy();
  expect(highlight.textContent).toBe('App');

  // Verify it's not showing escaped HTML
  const innerHTML = appleOption.innerHTML;
  expect(innerHTML).not.toContain('&lt;span');
  expect(innerHTML).not.toContain('&gt;');
  expect(innerHTML).toContain('<span class="highlight"');
};

export const WithObjectItems = Template.bind({});
WithObjectItems.args = {
  placeholder: 'Select a fruit...',
  items: [
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'cherry', label: 'Cherry' },
    { id: 'date', label: 'Date', disabled: true },
    { id: 'elderberry', label: 'Elderberry' }
  ]
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  placeholder: 'Select a fruit...',
  value: 'Banana',
  items: ['Apple', 'Banana', 'Cherry', 'Date']
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Select a fruit...',
  value: 'Banana',
  items: ['Apple', 'Banana', 'Cherry', 'Date'],
  disabled: true
};

export const NoFreeInput = Template.bind({});
NoFreeInput.args = {
  placeholder: 'Select a fruit from the list...',
  items: ['Apple', 'Banana', 'Cherry', 'Date'],
  freeInput: false
};