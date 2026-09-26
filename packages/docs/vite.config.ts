import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@aetherui-kit/core', 'lit', '@lit/reactive-element'],
    exclude: [],
  },
  ssr: {
    noExternal: ['@aetherui-kit/core', 'lit', '@lit/reactive-element'],
  },
});
