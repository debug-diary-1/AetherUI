/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/stories/Debug.stories.js',
    '../src/stories/AeAlert.stories.js',
    '../src/stories/AeAutocomplete.stories.js',
    '../src/stories/AeCombo.stories.js',
    '../src/stories/AeTabs.stories.js',
    '../src/stories/AeToast.stories.js',
    '../src/stories/AeTreeView.stories.js',
    // Exclude data table stories temporarily as they had dependency issues
    // '../src/stories/AeDataTable.stories.js',
    // '../src/stories/AeDataTableComplete.stories.js',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  
  // Simple Vite configuration
  viteFinal(config) {
    return {
      ...config,
      define: {
        'process.env': JSON.stringify({
          NODE_ENV: 'development',
          STORYBOOK_DESCRIPTION: 'AetherUI Component Library'
        })
      },
      resolve: {
        dedupe: ['lit-html', 'lit-element', 'lit'],
      },
      optimizeDeps: {
        include: ['lit-html', 'lit'],
        exclude: ['@aether-ui/datatable', '@aetherui/datatable']
      }
    };
  },
};

export default config;