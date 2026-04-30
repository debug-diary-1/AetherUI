export * from './ae-radio';
export * from './ae-radio-group';

import { AeRadio } from './ae-radio';
import { AeRadioGroup } from './ae-radio-group';

export const defineAeRadio = () => {
  if (!customElements.get('ae-radio')) {
    customElements.define('ae-radio', AeRadio);
  }
};

export const defineAeRadioGroup = () => {
  if (!customElements.get('ae-radio-group')) {
    customElements.define('ae-radio-group', AeRadioGroup);
  }
};
