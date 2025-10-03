import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // Do not prebundle the entire core library; allow on-demand chunks
    exclude: ['@aetherui/core'],
    include: ['lit', '@lit/reactive-element'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/@aetherui/core/')) {
            // Create per-component chunks for better code-splitting
            const match = id.match(/@aetherui\/core\/(.*?)(\/|\\)/);
            if (match && match[1]) return `aetherui-${match[1]}`;
            return 'aetherui-core';
          }
          if (id.includes('/lit/')) return 'lit';
        }
      }
    }
  },
  ssr: {
    // Let Vite bundle core for SSR to avoid external resolution issues
    // We dynamically import subpaths in the browser only
    noExternal: ['lit', '@lit/reactive-element'],
  },
}); 