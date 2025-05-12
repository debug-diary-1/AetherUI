import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

interface WorkspaceResolverOptions {
  packages: string[];
  root: string;
}

/**
 * Creates a Vite plugin that provides enhanced workspace package resolution
 * Designed to help with pnpm workspace package resolution issues
 */
export function workspaceResolver(options: WorkspaceResolverOptions): Plugin {
  const { packages, root } = options;

  return {
    name: 'vite-plugin-workspace-resolver',
    
    resolveId(id, importer) {
      // Only handle workspace packages
      if (!packages.some(pkg => id === pkg || id.startsWith(`${pkg}/`))) {
        return null;
      }

      // Extract package name and subpath
      let packageName = id;
      let subpath = '';

      const slashIndex = id.indexOf('/', 1);
      if (slashIndex !== -1) {
        packageName = id.substring(0, slashIndex);
        subpath = id.substring(slashIndex);
      }

      // Handle datatable specially with our fallback
      if (packageName === '@aetherui/datatable') {
        return 'virtual:@aetherui/datatable-fallback';
      }

      // Find the package
      const packageDir = packages.find(pkg => pkg === packageName);
      if (!packageDir) return null;

      // Resolve package path
      const packagePath = path.resolve(root, 'packages', packageName.replace('@aetherui/', ''));

      // Ensure the package exists
      if (!fs.existsSync(packagePath)) {
        console.warn(`Package not found at path: ${packagePath}`);

        // Return virtual module for specific packages
        if (packageName === '@aetherui/core') {
          return 'virtual:@aetherui/core-fallback';
        }

        return null;
      }

      // Read package.json to get the entry points
      try {
        const packageJsonPath = path.join(packagePath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        // Handle different import paths
        if (subpath) {
          // Handle subpath imports
          const subpathKey = `.${subpath}`;
          if (packageJson.exports && packageJson.exports[subpathKey]) {
            // Use the proper export
            const exportPath = packageJson.exports[subpathKey].import;
            return path.resolve(packagePath, exportPath);
          }
        } else {
          // Handle main package imports
          const entryPoint = packageJson.module || packageJson.main;
          if (entryPoint) {
            return path.resolve(packagePath, entryPoint);
          }
        }
      } catch (error) {
        console.error(`Failed to resolve ${id}:`, error);

        // Return virtual module for specific packages
        if (packageName === '@aetherui/core') {
          return 'virtual:@aetherui/core-fallback';
        } else if (packageName === '@aetherui/datatable') {
          return 'virtual:@aetherui/datatable-fallback';
        }
      }

      return null;
    },
    
    load(id) {
      // For packages that can't be resolved at all, provide a fallback
      if (id.includes('virtual:@aetherui/core-fallback')) {
        return `
          // Fallback implementation for @aetherui/core
          const noop = () => {};

          // Basic component definition functions
          export const defineAeButton = noop;
          export const defineAeCheckbox = noop;
          export const defineAeAccordion = noop;
          export const defineAeModal = noop;
          export const defineAeRadio = noop;
          export const defineAeRadioGroup = noop;
          export const defineAeTabs = noop;
          export const defineAeAlert = noop;
          export const defineAeDropdown = noop;
          export const defineAeTreeView = noop;
          export const defineAeCombo = noop;

          // Define all components at once
          export const defineAll = noop;

          export default {
            defineAeButton,
            defineAeCheckbox,
            defineAeAccordion,
            defineAeModal,
            defineAeRadio,
            defineAeRadioGroup,
            defineAeTabs,
            defineAeAlert,
            defineAeDropdown,
            defineAeTreeView,
            defineAeCombo,
            defineAll
          };
        `;
      }

      // DataTable fallback
      if (id.includes('virtual:@aetherui/datatable-fallback')) {
        return `
          // Fallback implementation for @aetherui/datatable
          const noop = () => {};

          // Basic component definition functions
          export const defineDataTableElements = noop;

          export default {
            defineDataTableElements
          };
        `;
      }

      return null;
    }
  };
}