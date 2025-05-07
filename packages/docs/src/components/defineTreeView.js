/**
 * This file is used to define the TreeView component for the documentation site.
 * It imports the component directly from the core package and defines it in the browser.
 */

// Import TreeView component and its dependencies
import { defineAeTreeView } from '@aetherui/core';

// Define the TreeView component
defineAeTreeView();

console.log('TreeView component has been defined');

// Export for use in other files
export { defineAeTreeView }; 