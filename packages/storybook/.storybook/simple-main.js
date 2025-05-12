/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/stories/Debug.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // Minimal configuration
  viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        dedupe: ['lit-html', 'lit'],
      },
      // Exclude all components for testing
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [
          '@aether-ui/datatable',
          '@aetherui/datatable',
          '@aetherui/core'
        ]
      },
    };
  },
};

export default config;