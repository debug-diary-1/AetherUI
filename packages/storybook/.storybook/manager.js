import { addons } from 'storybook/manager-api';
import theme from './theme';

// Use the imported theme instead of inline configuration
addons.setConfig({
  sidebar: {
    showRoots: true,
  },
  theme: theme,
});
