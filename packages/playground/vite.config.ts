import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/playground/',
  build: {
    outDir: 'dist',
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        webmcp: resolve(import.meta.dirname, 'webmcp.html'),
      },
      output: {
        codeSplitting: {
          // Only Prism core: its CommonJS wrapper runs lazily, so the language components
          // must stay with the code that initializes core before they run.
          groups: [{ name: 'prism', test: /node_modules[\\/]prismjs[\\/]prism\.js$/ }],
        },
      },
    },
  },
  server: {
    port: 3001,
  },
});
