import { defineAeAutocomplete } from '@aetherui/core';

// Register the component
defineAeAutocomplete();

// This file should now be renamed to AeAutocomplete.stories.js
// Since we've replaced the combo component with autocomplete

export default {
  title: 'Components/AeAutocomplete',
  component: 'ae-autocomplete',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An input control that presents type-ahead suggestions with both static and async data support.'
      },
    },
  },
  argTypes: {
    placeholder: { 
      control: 'text',
      description: 'Placeholder text for the input'
    },
    value: { 
      control: 'text',
      description: 'Current value of the input' 
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    throttle: { 
      control: 'number', 
      description: 'Debounce time in milliseconds before triggering search/filter'
    },
    isAsync: { 
      control: 'boolean',
      description: 'Whether to use async loading or static options'
    },
    options: {
      description: 'Static list of options to show in the dropdown'
    },
    onAutocompleteSelect: {
      action: 'ae-autocomplete-select',
      description: 'Fired when an item is selected'
    },
    onAutocompleteInput: {
      action: 'ae-autocomplete-input',
      description: 'Fired on each keystroke (after debounce for async)'
    },
    onAutocompleteLoad: {
      action: 'ae-autocomplete-load',
      description: 'Fired before loadOptions promise'
    },
    onAutocompleteLoadEnd: {
      action: 'ae-autocomplete-load-end',
      description: 'Fired after options are loaded'
    }
  },
};

const Template = (args) => {
  return `
    <div style="width: 300px; margin: 20px;">
      <ae-autocomplete
        id="autocomplete-example"
        placeholder="${args.placeholder || ''}"
        value="${args.value || ''}"
        ${args.disabled ? 'disabled' : ''}
        throttle="${args.throttle || 200}"
      ></ae-autocomplete>
    </div>
    <script>
      const autocomplete = document.getElementById('autocomplete-example');
      
      ${args.isAsync ? `
        // Set async loader
        autocomplete.loadOptions = async (query) => {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Filter based on query
          if (!query) return [];
          
          const fruits = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 
                         'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango'];
          
          return fruits
            .filter(fruit => fruit.toLowerCase().includes(query.toLowerCase()))
            .map(fruit => ({ id: fruit.toLowerCase(), label: fruit }));
        };
      ` : `
        // Set static options
        autocomplete.options = ${JSON.stringify(args.options || [])};
      `}
      
      autocomplete.addEventListener('ae-autocomplete-select', (e) => {
        console.log('Selected:', e.detail);
      });
      
      autocomplete.addEventListener('ae-autocomplete-input', (e) => {
        console.log('Input:', e.detail);
      });
      
      autocomplete.addEventListener('ae-autocomplete-load', (e) => {
        console.log('Loading options for:', e.detail.query);
      });
      
      autocomplete.addEventListener('ae-autocomplete-load-end', (e) => {
        console.log('Loaded options:', e.detail.items.length);
      });
    </script>
  `;
};

export const StaticData = Template.bind({});
StaticData.args = {
  placeholder: 'Type a country name...',
  options: [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Brazil',
    'India',
    'China'
  ],
  isAsync: false
};

export const WithObjects = Template.bind({});
WithObjects.args = {
  placeholder: 'Select a color...',
  options: [
    { id: 'red', label: 'Red' },
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'yellow', label: 'Yellow' },
    { id: 'purple', label: 'Purple' },
    { id: 'orange', label: 'Orange' },
    { id: 'black', label: 'Black', disabled: true }
  ],
  isAsync: false
};

export const Preselected = Template.bind({});
Preselected.args = {
  placeholder: 'Select a country...',
  value: 'France',
  options: ['Australia', 'Brazil', 'Canada', 'Denmark', 'France', 'Germany', 'Italy', 'Japan', 'Mexico'],
  isAsync: false
};

export const AsyncLoading = Template.bind({});
AsyncLoading.args = {
  placeholder: 'Type to search fruits...',
  throttle: 400,
  isAsync: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'This field is disabled',
  options: ['Option 1', 'Option 2', 'Option 3'],
  disabled: true,
  isAsync: false
};