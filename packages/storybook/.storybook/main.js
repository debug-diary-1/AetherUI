/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
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
        include: ['lit-html', 'lit']
      }
    };
  },
};

export default config;