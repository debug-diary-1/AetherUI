/**
 * Package resolver utility for AetherUI
 * This helps ensure proper resolution of workspace packages in both dev and build
 */

// Mock implementation for SSR
const mockComponents = {
  // Core component mocks
  defineAeButton: () => {},
  defineAeCheckbox: () => {},
  defineAeAccordion: () => {},
  defineAeModal: () => {},
  defineAeRadio: () => {},
  defineAeRadioGroup: () => {},
  defineAeTabs: () => {},
  defineAeAlert: () => {},
  defineAeDropdown: () => {},
  defineAeTreeView: () => {},
  defineAeCombo: () => {},
  defineAll: () => {},
};

// Mock implementation for DataTable
const mockDataTable = {
  defineDataTableElements: () => {}
};

/**
 * Safely import the core package with fallbacks
 * This ensures the build doesn't fail when @aetherui/core can't be resolved
 */
export async function safeImportCore() {
  try {
    // Try to import the actual package
    return await import('@aetherui/core');
  } catch (error) {
    console.warn('Failed to import @aetherui/core, using mock implementation:', error);

    // Return mock implementation in SSR or when package fails to load
    return mockComponents;
  }
}

/**
 * Safely import the datatable package with fallbacks
 * This ensures the build doesn't fail when @aetherui/datatable can't be resolved
 */
export async function safeImportDataTable() {
  try {
    // Try to import the actual package
    return await import('@aetherui/datatable');
  } catch (error) {
    console.warn('Failed to import @aetherui/datatable, using mock implementation:', error);

    // Return mock implementation in SSR or when package fails to load
    return mockDataTable;
  }
}

/**
 * Safely register all components with fallbacks
 */
export async function safeRegisterComponents() {
  try {
    const core = await safeImportCore();
    core.defineAll();
    return { success: true, core };
  } catch (error) {
    console.warn('Failed to register components:', error);
    return { success: false, error };
  }
}

// Export the mock components for direct usage in SSR contexts
export const mockCore = mockComponents;
export const mockDatatable = mockDataTable;