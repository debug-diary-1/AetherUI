import { ComponentConfig, CSSVariable } from './component-configs';

export interface GeneratedCode {
  html: string;
  css: string;
  fullExample: string;
}

export function generateCSS(
  component: ComponentConfig,
  values: Record<string, string>
): string {
  const cssVars = component.cssVariables
    .map((variable) => {
      const value = values[variable.name] || variable.default;
      const finalValue = variable.unit ? `${value}${variable.unit}` : value;
      return `  ${variable.name}: ${finalValue};`;
    })
    .join('\n');

  return `/* Custom styles for ${component.name} */
${component.tag} {
${cssVars}
}`;
}

export function generateHTML(component: ComponentConfig, selectedVariant?: string): string {
  if (selectedVariant) {
    const variant = component.variants?.find(v => v.name === selectedVariant);
    if (variant) {
      return variant.html;
    }
  }
  return component.defaultHtml;
}

export function generateFullExample(
  component: ComponentConfig,
  values: Record<string, string>,
  selectedVariant?: string
): string {
  const html = generateHTML(component, selectedVariant);
  const css = generateCSS(component, values);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${component.name} Example - AetherUI</title>

  <!-- AetherUI Core -->
  <script type="module">
    import { defineAll } from '@aetherui/core';
    defineAll();
  </script>

  <style>
    /* Base styles */
    :root {
      color-scheme: dark;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f0f;
      color: #f5f5f5;
      padding: 2rem;
      margin: 0;
    }

${css.split('\n').map(line => '    ' + line).join('\n')}
  </style>
</head>
<body>
  ${html.split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')}
</body>
</html>`;
}

export function generateCode(
  component: ComponentConfig,
  values: Record<string, string>,
  selectedVariant?: string
): GeneratedCode {
  return {
    html: generateHTML(component, selectedVariant),
    css: generateCSS(component, values),
    fullExample: generateFullExample(component, values, selectedVariant),
  };
}

export function formatVariableValue(variable: CSSVariable, value: string): string {
  if (variable.unit) {
    return `${value}${variable.unit}`;
  }
  return value;
}

export function parseVariableValue(variable: CSSVariable, value: string): string {
  if (variable.unit && value.endsWith(variable.unit)) {
    return value.slice(0, -variable.unit.length);
  }
  return value;
}
