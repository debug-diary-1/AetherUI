// Register the components we need
import '../src/register-components.js';
import { html } from 'lit-html';

// Try source components as a fallback if needed
const useSourceImports = true; // Set to false to disable
if (useSourceImports) {
  import('../src/source-components.js')
    .then(() => console.log('Source components loaded'))
    .catch(e => console.warn('Failed to load source components:', e));
}

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: 'AetherUI Components Library'
      }
    },
    options: {
      storySort: {
        order: [
          'Debug',
          'Components',
          ['Autocomplete', 'Alert', 'Button', 'Checkbox', 'Combo', 'Dropdown', 'Modal', 'Radio', 'Tabs', 'Toast', 'Tooltip', 'TreeView'],
        ],
      },
    },
    // Enable dark mode
    darkMode: {
      // Override the default dark theme
      dark: {
        appBg: '#1a1a1a',
        appContentBg: '#2b2b2b',
        barBg: '#333333',
        barTextColor: '#ffffff',
        colorPrimary: '#3b82f6',
        colorSecondary: '#2563eb',
        textColor: '#ffffff',
        textInverseColor: '#111111',
        barSelectedColor: '#3b82f6',
        inputBg: '#333333',
        inputBorder: '#666666',
        inputTextColor: '#ffffff',
        brandTextColor: '#ffffff',
      },
      // Override the default light theme
      light: {
        appBg: '#f6f9fc',
        appContentBg: '#ffffff',
        barBg: '#ffffff',
        barTextColor: '#333333',
        colorPrimary: '#3b82f6',
        colorSecondary: '#2563eb',
        textColor: '#333333',
        textInverseColor: '#ffffff',
        barSelectedColor: '#3b82f6',
        inputBg: '#ffffff',
        inputBorder: '#cccccc',
        inputTextColor: '#333333',
        brandTextColor: '#333333',
      },
      // Set the current theme
      current: 'light',
      // Auto-detect preferred color scheme
      darkClass: 'dark-theme',
      lightClass: 'light-theme',
      stylePreview: true,
    },
    // Add backgrounds for component previews
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
        { name: 'gray', value: '#f0f0f0' },
        { name: 'blue', value: '#f0f8ff' },
      ],
    },
  },
  // Add global decorators to apply themes to all stories
  decorators: [
    (Story, context) => {
      // Get the current theme
      const isDark = context.globals.theme === 'dark';
      
      // Use lit-html to wrap the story
      return html`
        <div class="${isDark ? 'dark-theme' : 'light-theme'}"
             style="padding: 20px; transition: all 0.3s;">
          ${Story()}
        </div>
      `;
    },
  ],
  // Define global variables that can be changed in the Storybook UI
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light Theme' },
          { value: 'dark', icon: 'moon', title: 'Dark Theme' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;