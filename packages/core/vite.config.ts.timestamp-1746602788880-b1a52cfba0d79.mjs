// vite.config.ts
import { defineConfig } from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite@5.4.19_@types+node@20.17.32/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/paull/projects/oss/aetherUi/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.32_rollup@4.40.1_typescript@5.8.3_vite@5.4.19_@types+node@20.17.32_/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/paull/projects/oss/aetherUi/packages/core";
var components = [
  "accordion",
  "alert",
  "button",
  "checkbox",
  "dropdown",
  "modal",
  "radio",
  "tabs",
  "treeview"
];
var entries = {
  "index": resolve(__vite_injected_original_dirname, "src/index.ts"),
  ...Object.fromEntries(
    components.map((component) => [
      `${component}/index`,
      resolve(__vite_injected_original_dirname, `src/${component}/index.ts`)
    ])
  ),
  ...Object.fromEntries(
    components.map((component) => [
      `${component}/define`,
      resolve(__vite_injected_original_dirname, `src/${component}/define.ts`)
    ])
  )
};
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`
    },
    rollupOptions: {
      external: [/^lit/, "@floating-ui/dom"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src"
      }
    },
    target: "es2022",
    sourcemap: true
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ["src/**/*.ts"]
    })
  ],
  esbuild: {
    target: "es2022",
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
        experimentalDecorators: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGF1bGwvcHJvamVjdHMvb3NzL2FldGhlclVpL3BhY2thZ2VzL2NvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9wYXVsbC9wcm9qZWN0cy9vc3MvYWV0aGVyVWkvcGFja2FnZXMvY29yZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcGF1bGwvcHJvamVjdHMvb3NzL2FldGhlclVpL3BhY2thZ2VzL2NvcmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuLy8gRGVmaW5lIGNvbXBvbmVudCBlbnRyaWVzXG5jb25zdCBjb21wb25lbnRzID0gW1xuICAnYWNjb3JkaW9uJyxcbiAgJ2FsZXJ0JyxcbiAgJ2J1dHRvbicsXG4gICdjaGVja2JveCcsXG4gICdkcm9wZG93bicsXG4gICdtb2RhbCcsXG4gICdyYWRpbycsXG4gICd0YWJzJyxcbiAgJ3RyZWV2aWV3J1xuXTtcblxuLy8gQ3JlYXRlIGVudHJpZXMgb2JqZWN0IHdpdGggaW5kZXggYW5kIGFsbCBjb21wb25lbnRzXG5jb25zdCBlbnRyaWVzID0ge1xuICAnaW5kZXgnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAuLi5PYmplY3QuZnJvbUVudHJpZXMoXG4gICAgY29tcG9uZW50cy5tYXAoY29tcG9uZW50ID0+IFtcbiAgICAgIGAke2NvbXBvbmVudH0vaW5kZXhgLFxuICAgICAgcmVzb2x2ZShfX2Rpcm5hbWUsIGBzcmMvJHtjb21wb25lbnR9L2luZGV4LnRzYClcbiAgICBdKVxuICApLFxuICAuLi5PYmplY3QuZnJvbUVudHJpZXMoXG4gICAgY29tcG9uZW50cy5tYXAoY29tcG9uZW50ID0+IFtcbiAgICAgIGAke2NvbXBvbmVudH0vZGVmaW5lYCxcbiAgICAgIHJlc29sdmUoX19kaXJuYW1lLCBgc3JjLyR7Y29tcG9uZW50fS9kZWZpbmUudHNgKVxuICAgIF0pXG4gIClcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0ID09PSAnZXMnID8gJ2pzJyA6ICdjanMnfWAsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWy9ebGl0LywgJ0BmbG9hdGluZy11aS9kb20nXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICdzcmMnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldDogJ2VzMjAyMicsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiB0cnVlLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50cyddLFxuICAgIH0pLFxuICBdLFxuICBlc2J1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDIyJyxcbiAgICB0c2NvbmZpZ1Jhdzoge1xuICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgIHVzZURlZmluZUZvckNsYXNzRmllbGRzOiBmYWxzZSxcbiAgICAgICAgZXhwZXJpbWVudGFsRGVjb3JhdG9yczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pOyAiXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSxhQUFhO0FBQUEsRUFDakI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBR0EsSUFBTSxVQUFVO0FBQUEsRUFDZCxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLEVBQzFDLEdBQUcsT0FBTztBQUFBLElBQ1IsV0FBVyxJQUFJLGVBQWE7QUFBQSxNQUMxQixHQUFHLFNBQVM7QUFBQSxNQUNaLFFBQVEsa0NBQVcsT0FBTyxTQUFTLFdBQVc7QUFBQSxJQUNoRCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsR0FBRyxPQUFPO0FBQUEsSUFDUixXQUFXLElBQUksZUFBYTtBQUFBLE1BQzFCLEdBQUcsU0FBUztBQUFBLE1BQ1osUUFBUSxrQ0FBVyxPQUFPLFNBQVMsWUFBWTtBQUFBLElBQ2pELENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyxTQUFTLFdBQVcsT0FBTyxPQUFPLEtBQUs7QUFBQSxJQUMvRDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFFBQVEsa0JBQWtCO0FBQUEsTUFDckMsUUFBUTtBQUFBLFFBQ04saUJBQWlCO0FBQUEsUUFDakIscUJBQXFCO0FBQUEsTUFDdkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLGFBQWE7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsUUFDZix5QkFBeUI7QUFBQSxRQUN6Qix3QkFBd0I7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
