/** @type { import('@storybook/web-components-vite').StorybookConfig } */
import path from 'path';

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
  
  // Simplified Vite configuration
  async viteFinal(config) {
    // Import external Vite config for simpler setup
    try {
      // Using dynamic import for ESM compatibility
      const overrideConfig = await import('./vite.config.override.js')
        .then(module => module.default || module)
        .catch(err => {
          console.error('Failed to import vite.config.override.js:', err);
          return {};
        });
      
      console.log('Using vite.config.override.js');
      return {
        ...config,
        ...overrideConfig,
        define: {
          'process.env': JSON.stringify({
            NODE_ENV: 'development',
            STORYBOOK_DESCRIPTION: 'AetherUI Component Library'
          })
        }
      };
    } catch (error) {
      console.error('Failed to load vite.config.override.js, using fallback config', error);
      // Fallback to basic configuration
      return {
        ...config,
        define: {
          'process.env': JSON.stringify({
            NODE_ENV: 'development',
            STORYBOOK_DESCRIPTION: 'AetherUI Component Library'
          })
        },
        resolve: {
          alias: {
            'lit': path.resolve('../node_modules/lit'),
            'lit/decorators.js': path.resolve('../node_modules/lit/decorators.js'),
            'lit/directive-helpers.js': path.resolve('../node_modules/lit/directive-helpers.js')
          }
        },
        optimizeDeps: {
          // Simplified include without shims
          include: ['lit-html', 'lit-element', 'lit']
        }
      };
    }
  },
};

export default config;