// vite.config.ts
import { defineConfig } from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite@5.4.19_@types+node@20.17.32/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.32_rollup@4.40.1_typescript@5.8.3_vite@5.4.19_@types+node@20.17.32_/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/paull/projects/oss/aetherUi/packages/accordion";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "AetherUIAccordion",
      fileName: "index",
      formats: ["es"]
    },
    target: "es2019",
    outDir: "dist",
    rollupOptions: {
      external: ["lit"]
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  server: {
    port: 3002
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGF1bGwvcHJvamVjdHMvb3NzL2FldGhlclVpL3BhY2thZ2VzL2FjY29yZGlvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3BhdWxsL3Byb2plY3RzL29zcy9hZXRoZXJVaS9wYWNrYWdlcy9hY2NvcmRpb24vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3BhdWxsL3Byb2plY3RzL29zcy9hZXRoZXJVaS9wYWNrYWdlcy9hY2NvcmRpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ0FldGhlclVJQWNjb3JkaW9uJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgIH0sXG4gICAgdGFyZ2V0OiAnZXMyMDE5JyxcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWydsaXQnXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZHRzKHtcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICByb2xsdXBUeXBlczogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMixcbiAgfSxcbn0pOyAiXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsTUFDbEIsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
