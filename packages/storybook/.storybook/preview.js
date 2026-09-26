import { defineAll } from '@aetherui-kit/core';
import { html } from 'lit';
import lightTheme from '@aetherui-kit/tokens/light.css?inline';
import darkTheme from '@aetherui-kit/tokens/dark.css?inline';

// Apply the complete theme at the document root, including body-mounted overlays.
const themeStyle = document.createElement('style');
themeStyle.dataset.aetheruiTheme = '';
document.head.append(themeStyle);

// Register synchronously before Storybook renders or binds story properties.
defineAll();

/** @type { import('@storybook/web-components-vite').Preview } */
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
        component: 'AetherUI Components Library',
      },
    },
    options: {
      storySort: {
        order: [
          'Debug',
          'Components',
          [
            'Autocomplete',
            'Alert',
            'Button',
            'Checkbox',
            'Combo',
            'Dropdown',
            'Modal',
            'Radio',
            'Tabs',
            'Toast',
            'Tooltip',
            'TreeView',
          ],
        ],
      },
    },
    // Add backgrounds for component previews
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#333333' },
        gray: { name: 'gray', value: '#f0f0f0' },
        blue: { name: 'blue', value: '#f0f8ff' },
      },
    },
  },

  // Add global decorators to apply themes to all stories
  decorators: [
    (Story, context) => {
      // Get the current theme
      const isDark = context.globals.theme === 'dark';

      const theme = isDark ? 'dark' : 'light';
      if (themeStyle.dataset.aetheruiTheme !== theme) {
        themeStyle.textContent = isDark ? darkTheme : lightTheme;
        themeStyle.dataset.aetheruiTheme = theme;
      }

      // Use lit-html to wrap the story
      return html`
        <div
          class="${isDark ? 'dark-theme' : 'light-theme'}"
          style="padding: 20px; background: var(--ae-bg-primary); color: var(--ae-text-primary);"
        >
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

  initialGlobals: {
    theme: 'light',
    backgrounds: {
      value: 'light',
    },
  },
};

export default preview;
