// vite.config.ts
import { defineConfig } from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite@5.4.19_@types+node@20.17.32/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.32_rollup@4.40.1_typescript@5.8.3_vite@5.4.19_@types+node@20.17.32_/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/paull/projects/oss/aetherUi/packages/adapters";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts"),
        react: resolve(__vite_injected_original_dirname, "src/react/index.ts"),
        angular: resolve(__vite_injected_original_dirname, "src/angular/index.ts"),
        vue: resolve(__vite_injected_original_dirname, "src/vue/index.ts"),
        svelte: resolve(__vite_injected_original_dirname, "src/svelte/index.ts")
      },
      formats: ["es"]
    },
    target: "es2019",
    outDir: "dist",
    rollupOptions: {
      external: [/^lit/, /^react/, /^@angular/, /^vue/, /^svelte/]
    }
  },
  plugins: [
    dts({
      entryRoot: "src",
      include: ["src/**/*.ts", "src/**/*.tsx"]
    })
  ],
  server: {
    port: 3003
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGF1bGwvcHJvamVjdHMvb3NzL2FldGhlclVpL3BhY2thZ2VzL2FkYXB0ZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGF1bGwvcHJvamVjdHMvb3NzL2FldGhlclVpL3BhY2thZ2VzL2FkYXB0ZXJzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wYXVsbC9wcm9qZWN0cy9vc3MvYWV0aGVyVWkvcGFja2FnZXMvYWRhcHRlcnMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICByZWFjdDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcmVhY3QvaW5kZXgudHMnKSxcbiAgICAgICAgYW5ndWxhcjogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYW5ndWxhci9pbmRleC50cycpLFxuICAgICAgICB2dWU6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3Z1ZS9pbmRleC50cycpLFxuICAgICAgICBzdmVsdGU6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N2ZWx0ZS9pbmRleC50cycpXG4gICAgICB9LFxuICAgICAgZm9ybWF0czogWydlcyddXG4gICAgfSxcbiAgICB0YXJnZXQ6ICdlczIwMTknLFxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbL15saXQvLCAvXnJlYWN0LywgL15AYW5ndWxhci8sIC9ednVlLywgL15zdmVsdGUvXVxuICAgIH1cbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGR0cyh7XG4gICAgICBlbnRyeVJvb3Q6ICdzcmMnLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50cycsICdzcmMvKiovKi50c3gnXVxuICAgIH0pXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDNcbiAgfVxufSk7ICJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsU0FBUyxvQkFBb0I7QUFDM1csT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsUUFDTCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ3hDLE9BQU8sUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxRQUM5QyxTQUFTLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsUUFDbEQsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQzFDLFFBQVEsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxNQUNsRDtBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFFBQVEsVUFBVSxhQUFhLFFBQVEsU0FBUztBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLE1BQ1gsU0FBUyxDQUFDLGVBQWUsY0FBYztBQUFBLElBQ3pDLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
