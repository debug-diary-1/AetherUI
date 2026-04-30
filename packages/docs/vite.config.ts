import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@aetherui/core', 'lit', '@lit/reactive-element'],
    exclude: [],
  },
  ssr: {
    noExternal: ['@aetherui/core', 'lit', '@lit/reactive-element'],
  },
});
