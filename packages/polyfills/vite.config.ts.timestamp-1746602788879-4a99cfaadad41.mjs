// vite.config.ts
import { defineConfig } from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite@5.4.19_@types+node@20.17.32/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.32_rollup@4.40.1_typescript@5.8.3_vite@5.4.19_@types+node@20.17.32_/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/paull/projects/oss/aetherUi/packages/polyfills";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts"),
        constructable: resolve(__vite_injected_original_dirname, "src/constructable.ts"),
        "focus-visible": resolve(__vite_injected_original_dirname, "src/focus-visible.ts")
      },
      formats: ["es"]
    },
    rollupOptions: {
      external: []
    }
  },
  plugins: [dts()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGF1bGwvcHJvamVjdHMvb3NzL2FldGhlclVpL3BhY2thZ2VzL3BvbHlmaWxsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3BhdWxsL3Byb2plY3RzL29zcy9hZXRoZXJVaS9wYWNrYWdlcy9wb2x5ZmlsbHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3BhdWxsL3Byb2plY3RzL29zcy9hZXRoZXJVaS9wYWNrYWdlcy9wb2x5ZmlsbHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICBjb25zdHJ1Y3RhYmxlOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb25zdHJ1Y3RhYmxlLnRzJyksXG4gICAgICAgICdmb2N1cy12aXNpYmxlJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZm9jdXMtdmlzaWJsZS50cycpLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbZHRzKCldLFxufSk7ICJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsUUFDTCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ3hDLGVBQWUsUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxRQUN4RCxpQkFBaUIsUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxNQUM1RDtBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDakIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
