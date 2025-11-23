import { createRequire } from "node:module";
/** @type { import('@storybook/web-components-vite').StorybookConfig } */
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);

const config = {
  stories: [
    '../src/stories/Debug.stories.js',
    '../src/stories/AeAlert.stories.js',
    '../src/stories/AeAutocomplete.stories.js',
    '../src/stories/AeCombo.stories.js',
    '../src/stories/AeTabs.stories.js',
    '../src/stories/AeToast.stories.js',
    '../src/stories/AeTreeView.stories.js',
    '../src/stories/AeTooltip.stories.js',
    // New components
    '../src/stories/AeInput.stories.js',
    '../src/stories/AeSelect.stories.js',
    '../src/stories/AeTextarea.stories.js',
    '../src/stories/AeBadge.stories.js',
    '../src/stories/AeSpinner.stories.js',
    '../src/stories/AeSwitch.stories.js',
    '../src/stories/AeProgress.stories.js',
    '../src/stories/AeBreadcrumb.stories.js',
    '../src/stories/AePagination.stories.js',
    '../src/stories/AeDrawer.stories.js',
    '../src/stories/AePopover.stories.js',
    '../src/stories/AeMenu.stories.js',
    // Exclude data table stories temporarily as they had dependency issues
    // '../src/stories/AeDataTable.stories.js',
    // '../src/stories/AeDataTableComplete.stories.js',
  ],

  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@storybook/addon-docs")],

  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },

  // Simplified Vite configuration
  async viteFinal(config) {
    // Import external Vite config for simpler setup
    try {
      // Using dynamic import for ESM compatibility
      const overrideConfig = await import('./vite.config.override.js')
        .then((module) => module.default || module)
        .catch((err) => {
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
            STORYBOOK_DESCRIPTION: 'AetherUI Component Library',
          }),
        },
      };
    } catch (error) {
      console.error('Failed to load vite.config.override.js, using fallback config', error);
      // Fallback to basic configuration
      return {
        ...config,
        define: {
          'process.env': JSON.stringify({
            NODE_ENV: 'development',
            STORYBOOK_DESCRIPTION: 'AetherUI Component Library',
          }),
        },
        resolve: {
          dedupe: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element']
        },
      };
    }
  }
};

export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
