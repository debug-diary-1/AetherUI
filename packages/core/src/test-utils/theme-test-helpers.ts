import { expect } from '@open-wc/testing';
import type { LitElement } from 'lit';

/**
 * Common hardcoded color values that should NOT appear in component styles
 * These are typical light-mode colors that break dark mode
 */
export const FORBIDDEN_HARDCODED_COLORS = [
  '#111827', // Dark text
  '#1f2937', // Dark gray
  '#374151', // Medium dark gray
  '#4b5563', // Gray
  '#6b7280', // Medium gray
  '#9ca3af', // Light gray
  '#d1d5db', // Light border
  '#e5e7eb', // Very light border
  '#f3f4f6', // Light background
  '#f9fafb', // Very light background
  '#ffffff', // White
  '#4f46e5', // Indigo/Primary
  '#dc2626', // Red/Error
  '#10b981', // Green/Success
  '#f59e0b', // Amber/Warning
  '#3b82f6', // Blue/Info
];

/**
 * Gets the static styles from a Lit component as a string
 */
export function getComponentStyles(element: LitElement): string {
  const constructor = element.constructor as typeof LitElement & { styles?: unknown };
  const styles = constructor.styles;

  if (!styles) return '';

  if (Array.isArray(styles)) {
    return styles.map((s) => s?.toString() || '').join('\n');
  }

  return styles.toString() || '';
}

/**
 * Checks that a component uses CSS variables and doesn't have hardcoded colors
 */
export function assertNoHardcodedColors(
  stylesText: string,
  options: {
    allowedPatterns?: RegExp[];
    componentName?: string;
  } = {},
): void {
  const { allowedPatterns = [], componentName = 'Component' } = options;

  for (const color of FORBIDDEN_HARDCODED_COLORS) {
    // Check if color appears in styles
    if (stylesText.includes(color)) {
      // Check if it matches any allowed pattern (like in comments)
      const isAllowed = allowedPatterns.some((pattern) => {
        const matches = stylesText.match(new RegExp(`.*${color}.*`, 'g')) || [];
        return matches.every((match) => pattern.test(match));
      });

      if (!isAllowed) {
        expect.fail(
          `${componentName} styles contain hardcoded color ${color}. ` +
            `Use CSS variables from the theme system instead.`,
        );
      }
    }
  }
}

/**
 * Asserts that specific CSS variables are used in the component styles
 */
export function assertCSSVariablesUsed(
  stylesText: string,
  variables: string[],
  componentName = 'Component',
): void {
  for (const variable of variables) {
    expect(stylesText, `${componentName} should use CSS variable ${variable}`).to.include(variable);
  }
}
