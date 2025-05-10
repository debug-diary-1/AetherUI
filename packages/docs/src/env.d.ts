/// <reference types="astro/client" />

// Declare custom element types for AetherUI components
declare namespace JSX {
  interface IntrinsicElements {
    'ae-button': any;
    'ae-accordion': any;
    'ae-alert': any;
    'ae-checkbox': any;
    'ae-dropdown': any;
    'ae-modal': any;
    'ae-radio': any;
    'ae-radio-group': any;
    'ae-tabs': any;
    'ae-treeview': any;
  }
}
EOF < /dev/null