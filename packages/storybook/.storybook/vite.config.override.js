/**
 * This file provides a simplified Vite configuration for Storybook
 * to handle lit dependencies in a pnpm monorepo.
 */
export default {
  resolve: {
    dedupe: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
    },
  },
};
