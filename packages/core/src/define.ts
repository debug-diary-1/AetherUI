import { defineAeAccordion } from './accordion';
import { defineAeButton } from './button';
import { defineAeRadio, defineAeRadioGroup } from './radio';
import { defineAeModal } from './modal/define';

export {
  defineAeAccordion,
  defineAeButton,
  defineAeModal,
  defineAeRadio,
  defineAeRadioGroup,
};

export function defineAll() {
  defineAeAccordion();
  defineAeButton();
  defineAeRadio();
  defineAeRadioGroup();
  defineAeModal();
} 