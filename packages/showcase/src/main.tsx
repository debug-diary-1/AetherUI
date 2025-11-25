import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import AetherUI tokens
import '@aetherui/tokens/light.css';

// Register all web components
import {
  defineAeAccordion,
  defineAeAlert,
  defineAeAutocomplete,
  defineAeBadge,
  defineAeBreadcrumb,
  defineAeButton,
  defineAeCheckbox,
  defineAeCombo,
  defineAeDrawer,
  defineAeDropdown,
  defineAeInput,
  defineAeMenu,
  defineAeModal,
  defineAePagination,
  defineAePopover,
  defineAeProgress,
  defineAeRadio,
  defineAeSelect,
  defineAeSpinner,
  defineAeSwitch,
  defineAeTabs,
  defineAeTextarea,
  defineAeToast,
  defineAeTooltip,
  defineAeTreeView,
  defineAeTreeItem,
} from '@aetherui/core';

// Define all components
defineAeAccordion();
defineAeAlert();
defineAeAutocomplete();
defineAeBadge();
defineAeBreadcrumb();
defineAeButton();
defineAeCheckbox();
defineAeCombo();
defineAeDrawer();
defineAeDropdown();
defineAeInput();
defineAeMenu();
defineAeModal();
defineAePagination();
defineAePopover();
defineAeProgress();
defineAeRadio();
defineAeSelect();
defineAeSpinner();
defineAeSwitch();
defineAeTabs();
defineAeTextarea();
defineAeToast();
defineAeTooltip();
defineAeTreeView();
defineAeTreeItem();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
