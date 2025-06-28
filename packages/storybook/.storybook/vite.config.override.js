/**
 * This file provides a simplified Vite configuration for Storybook
 * when the default one doesn't work with the lit shims.
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  resolve: {
    alias: {
      // Key aliases for lit and its subpackages
      'lit': path.resolve(__dirname, '../node_modules/lit'),
      'lit-html': path.resolve(__dirname, '../node_modules/lit-html'),
      'lit-element': path.resolve(__dirname, '../node_modules/lit-element'),
      '@lit/reactive-element': path.resolve(__dirname, '../node_modules/@lit/reactive-element'),
      // Specific aliases for decorator imports
      'lit/decorators.js': path.resolve(__dirname, '../node_modules/lit/decorators.js'),
      'lit/directive-helpers.js': path.resolve(__dirname, '../node_modules/lit/directive-helpers.js')
    }
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
    }
  },
  optimizeDeps: {
    include: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element']
  }
};
