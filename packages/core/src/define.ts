import { defineAeAccordion } from './accordion';
import { defineAeButton } from './button';
import { defineAeRadio, defineAeRadioGroup } from './radio';
import { defineAeModal } from './modal/define';
import { defineAeCheckbox } from './checkbox';
import { defineAeTabs } from './tabs';
import { defineAeAlert } from './alert';

export {
  defineAeAccordion,
  defineAeButton,
  defineAeModal,
  defineAeRadio,
  defineAeRadioGroup,
  defineAeCheckbox,
  defineAeTabs,
  defineAeAlert,
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
} 