import { defineConfig } from 'vite';

export default defineConfig({
  base: '/playground/',
  build: {
    outDir: 'dist',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'prism', test: /node_modules[\\/]prismjs[\\/]/ }],
        },
      },
    },
  },
  server: {
    port: 3001,
  },
});
