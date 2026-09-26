import { defineConfig } from 'vite';

export default defineConfig({
  base: '/playground/',
  build: {
    outDir: 'dist',
    rolldownOptions: {
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
