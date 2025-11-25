import type { AeAccordion, AeAlert, AeAutocomplete, AeBadge, AeBreadcrumb, AeButton, AeCheckbox, AeCombo, AeDrawer, AeDropdown, AeInput, AeMenu, AeModal, AePagination, AePopover, AeProgress, AeRadio, AeRadioGroup, AeSelect, AeSpinner, AeSwitch, AeTabs, AeTextarea, AeToast, AeTooltip, AeTreeView, AeTreeItem } from '@aetherui/core';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ae-accordion': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeAccordion>, HTMLElement>;
      'ae-accordion-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        header?: string;
        expanded?: boolean;
        disabled?: boolean;
      }, HTMLElement>;

      'ae-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeAlert>, HTMLElement>;

      'ae-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeAutocomplete>, HTMLElement>;

      'ae-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeBadge>, HTMLElement>;

      'ae-breadcrumb': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeBreadcrumb>, HTMLElement>;
      'ae-breadcrumb-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        href?: string;
        current?: boolean;
      }, HTMLElement>;

      'ae-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeButton> & {
        onAeButtonClick?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeCheckbox> & {
        onAeCheckboxChange?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-combo': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeCombo>, HTMLElement>;

      'ae-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeDrawer> & {
        onAeDrawerClose?: (e: CustomEvent) => void;
        onAeDrawerOpen?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-dropdown': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeDropdown>, HTMLElement>;
      'ae-dropdown-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        value?: string;
        disabled?: boolean;
      }, HTMLElement>;
      'ae-dropdown-separator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      'ae-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeInput> & {
        onAeInputChange?: (e: CustomEvent) => void;
        onAeInputInput?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeMenu>, HTMLElement>;
      'ae-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        value?: string;
        disabled?: boolean;
        onAeMenuItemClick?: (e: CustomEvent) => void;
      }, HTMLElement>;
      'ae-menu-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      'ae-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeModal> & {
        onAeModalClose?: (e: CustomEvent) => void;
        onAeModalOpen?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AePagination> & {
        onAePaginationChange?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-popover': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AePopover>, HTMLElement>;

      'ae-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeProgress>, HTMLElement>;

      'ae-radio': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeRadio> & {
        onAeRadioChange?: (e: CustomEvent) => void;
      }, HTMLElement>;
      'ae-radio-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeRadioGroup> & {
        onAeRadioGroupChange?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeSelect> & {
        onAeSelectChange?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-spinner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeSpinner>, HTMLElement>;

      'ae-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeSwitch> & {
        onAeSwitchChange?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeTabs> & {
        onAeTabsChange?: (e: CustomEvent) => void;
      }, HTMLElement>;
      'ae-tab': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        id?: string;
        active?: boolean;
        disabled?: boolean;
      }, HTMLElement>;
      'ae-tab-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'tab-id'?: string;
      }, HTMLElement>;

      'ae-textarea': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeTextarea> & {
        onAeTextareaChange?: (e: CustomEvent) => void;
        onAeTextareaInput?: (e: CustomEvent) => void;
      }, HTMLElement>;

      'ae-toast': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeToast> & {
        onAeToastClose?: (e: CustomEvent) => void;
      }, HTMLElement>;
      'ae-toast-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
      }, HTMLElement>;

      'ae-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeTooltip>, HTMLElement>;

      'ae-treeview': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeTreeView>, HTMLElement>;

      'ae-tree-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Partial<AeTreeItem>, HTMLElement>;
    }
  }
}

export {};
