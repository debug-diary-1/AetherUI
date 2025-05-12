import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Autocomplete',
  component: 'ae-autocomplete',
  argTypes: {
    value: { control: 'text', description: 'Current input value' },
    placeholder: { control: 'text', description: 'Placeholder text for the input' },
    disabled: { control: 'boolean', description: 'Whether the input is disabled' },
    'min-chars': { 
      control: 'number', 
      description: 'Minimum characters before showing suggestions',
      table: { category: 'Behavior' }
    },
    'max-items': { 
      control: 'number', 
      description: 'Maximum number of items to show in dropdown',
      table: { category: 'Behavior' }
    },
    options: { 
      control: 'object', 
      description: 'Options to display in the dropdown (string[] or {id, text, group?, disabled?, data?}[])',
      table: { type: { summary: 'Array<string | AutocompleteOption>' } }
    },
    'ae-autocomplete-change': { 
      action: 'ae-autocomplete-change',
      description: 'Fired when the value changes',
      table: { 
        category: 'Events', 
        type: { summary: 'CustomEvent<{value: string, option: AutocompleteOption | null}>' } 
      }
    },
    'ae-autocomplete-select': { 
      action: 'ae-autocomplete-select',
      description: 'Fired when an option is selected',
      table: { 
        category: 'Events', 
        type: { summary: 'CustomEvent<{value: string, option: AutocompleteOption}>' } 
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A text input with dropdown suggestions as users type, helping them quickly find and select items from a list of options.'
      }
    }
  }
};

const Template = (args) => html`
  <ae-autocomplete
    value="${ifDefined(args.value)}"
    placeholder="${ifDefined(args.placeholder)}"
    ?disabled="${args.disabled}"
    min-chars="${ifDefined(args['min-chars'])}"
    max-items="${ifDefined(args['max-items'])}"
    .options="${args.options || []}"
    @ae-autocomplete-change="${(e) => action('ae-autocomplete-change')(e.detail)}"
    @ae-autocomplete-select="${(e) => action('ae-autocomplete-select')(e.detail)}"
  ></ae-autocomplete>
`;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Search countries...',
  options: [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados'
  ]
};

export const WithMinChars = Template.bind({});
WithMinChars.args = {
  placeholder: 'Type at least 2 characters...',
  'min-chars': 2,
  options: [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria'
  ]
};

export const WithObjectOptions = Template.bind({});
WithObjectOptions.args = {
  placeholder: 'Search countries...',
  options: [
    { id: 'af', text: 'Afghanistan' },
    { id: 'al', text: 'Albania' },
    { id: 'dz', text: 'Algeria' },
    { id: 'ad', text: 'Andorra' },
    { id: 'ao', text: 'Angola', disabled: true },
    { id: 'ag', text: 'Antigua and Barbuda' }
  ]
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  placeholder: 'Search countries...',
  options: [
    { id: 'us', text: 'United States', group: 'North America' },
    { id: 'ca', text: 'Canada', group: 'North America' },
    { id: 'mx', text: 'Mexico', group: 'North America' },
    { id: 'br', text: 'Brazil', group: 'South America' },
    { id: 'ar', text: 'Argentina', group: 'South America' },
    { id: 'pe', text: 'Peru', group: 'South America' },
    { id: 'gb', text: 'United Kingdom', group: 'Europe' },
    { id: 'de', text: 'Germany', group: 'Europe' },
    { id: 'fr', text: 'France', group: 'Europe' }
  ]
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  placeholder: 'Search countries...',
  value: 'Canada',
  options: [
    'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 
    'United Kingdom', 'Germany', 'France', 'Spain', 'Italy'
  ]
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Search countries...',
  value: 'Canada',
  options: [
    'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina'
  ],
  disabled: true
};