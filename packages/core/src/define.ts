import { defineAeAccordion } from './accordion';
import { defineAeButton } from './button';
import { defineAeRadio, defineAeRadioGroup } from './radio';
import { defineAeModal } from './modal/define';
import { defineAeCheckbox } from './checkbox';
import { defineAeTabs } from './tabs';
import { defineAeAlert } from './alert';
import { defineAeDropdown } from './dropdown';
import { defineAeTreeView } from './treeview';
import { defineAeAutocomplete } from './autocomplete';
import { defineAeCombo } from './combo';
import { defineAeToast } from './toast';

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
}