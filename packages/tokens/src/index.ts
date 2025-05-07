// Design tokens for Aether UI
export const tokens = {
  colors: {
    primary: 'var(--ae-color-primary, #0066cc)',
    secondary: 'var(--ae-color-secondary, #666666)',
    success: 'var(--ae-color-success, #28a745)',
    warning: 'var(--ae-color-warning, #ffc107)',
    error: 'var(--ae-color-error, #dc3545)',
    info: 'var(--ae-color-info, #17a2b8)',
  },
  spacing: {
    xs: 'var(--ae-spacing-xs, 0.25rem)',
    sm: 'var(--ae-spacing-sm, 0.5rem)',
    md: 'var(--ae-spacing-md, 1rem)',
    lg: 'var(--ae-spacing-lg, 1.5rem)',
    xl: 'var(--ae-spacing-xl, 2rem)',
  },
  typography: {
    fontFamily: 'var(--ae-font-family, system-ui, -apple-system, sans-serif)',
    fontSize: {
      xs: 'var(--ae-font-size-xs, 0.75rem)',
      sm: 'var(--ae-font-size-sm, 0.875rem)',
      md: 'var(--ae-font-size-md, 1rem)',
      lg: 'var(--ae-font-size-lg, 1.125rem)',
      xl: 'var(--ae-font-size-xl, 1.25rem)',
    },
  },
  borderRadius: {
    sm: 'var(--ae-border-radius-sm, 0.25rem)',
    md: 'var(--ae-border-radius-md, 0.5rem)',
    lg: 'var(--ae-border-radius-lg, 1rem)',
    full: 'var(--ae-border-radius-full, 9999px)',
  },
  shadows: {
    sm: 'var(--ae-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
    md: 'var(--ae-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
    lg: 'var(--ae-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
  },
  transitions: {
    fast: 'var(--ae-transition-fast, 150ms)',
    normal: 'var(--ae-transition-normal, 250ms)',
    slow: 'var(--ae-transition-slow, 350ms)',
  },
}; 