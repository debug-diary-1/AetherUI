import { defineAeAccordion } from './accordion';
import { defineAeButton } from './button';
import { defineAeRadio, defineAeRadioGroup } from './radio';
import { defineAeModal } from './modal';
import { defineAeCheckbox } from './checkbox';
import { defineAeTabs } from './tabs';
import { defineAeAlert } from './alert';
import { defineAeDropdown } from './dropdown';
import { defineAeTreeView } from './treeview';
import { defineAeAutocomplete } from './autocomplete';
import { defineAeCombo } from './combo';
import { defineAeToast } from './toast';
import { defineAeTooltip } from './tooltip';
import { defineAeInput } from './input';
import { defineAeSelect } from './select';
import { defineAeTextarea } from './textarea';
import { defineAeBadge } from './badge';
import { defineAeSpinner } from './spinner';
import { defineAeSwitch } from './switch';
import { defineAeProgress } from './progress';
import { defineAeBreadcrumb } from './breadcrumb';
import { defineAePagination } from './pagination';
import { defineAeDrawer } from './drawer';
import { defineAePopover } from './popover';
import { defineAeMenu } from './menu';

export {
  defineAeAccordion,
  defineAeButton,
  defineAeModal,
  defineAeRadio,
  defineAeRadioGroup,
  defineAeCheckbox,
  defineAeTabs,
  defineAeAlert,
  defineAeDropdown,
  defineAeTreeView,
  defineAeAutocomplete,
  defineAeCombo,
  defineAeToast,
  defineAeTooltip,
  defineAeInput,
  defineAeSelect,
  defineAeTextarea,
  defineAeBadge,
  defineAeSpinner,
  defineAeSwitch,
  defineAeProgress,
  defineAeBreadcrumb,
  defineAePagination,
  defineAeDrawer,
  defineAePopover,
  defineAeMenu,
};

export function defineAll() {
  defineAeAccordion();
  defineAeButton();
  defineAeRadio();
  defineAeRadioGroup();
  defineAeModal();
  defineAeCheckbox();
  defineAeTabs();
  defineAeAlert();
  defineAeDropdown();
  defineAeTreeView();
  defineAeAutocomplete();
  defineAeCombo();
  defineAeToast();
  defineAeTooltip();
  defineAeInput();
  defineAeSelect();
  defineAeTextarea();
  defineAeBadge();
  defineAeSpinner();
  defineAeSwitch();
  defineAeProgress();
  defineAeBreadcrumb();
  defineAePagination();
  defineAeDrawer();
  defineAePopover();
  defineAeMenu();
}