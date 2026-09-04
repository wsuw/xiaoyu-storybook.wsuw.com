import { addons } from 'storybook/internal/manager-api';
import customTheme from './theme';

addons.setConfig({
  theme: customTheme,
  panelPosition: 'right',
  layout: {
    panelPosition: 'right',
  },
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});

