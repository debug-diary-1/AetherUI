// Basic theme without using any color manipulation
import { create } from 'storybook/theming/create';

export default create({
  base: 'light',
  
  // UI
  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 4,
  
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  
  // Text colors
  textColor: '#333333',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#666666',
  
  // Brand
  brandTitle: 'AetherUI Components',
  brandUrl: 'https://github.com/yourusername/aetherui',
  brandTarget: '_blank',
  brandImage: null,
  
  // Colors
  colorPrimary: '#3B82F6',
  colorSecondary: '#2563EB',
  
  // Toolbar
  barTextColor: '#666666',
  barSelectedColor: '#3B82F6',
  barBg: '#FFFFFF',
});