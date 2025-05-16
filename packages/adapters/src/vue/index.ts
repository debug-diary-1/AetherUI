import { defineAeButton } from '@aetherui/core';
import { defineComponent, PropType } from 'vue';

// Define the custom element
defineAeButton();

interface AeButtonProps {
  disabled?: boolean;
}

export const AeButton = defineComponent<AeButtonProps>({
  name: 'AeButton',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  template: '<ae-button :disabled="disabled"><slot></slot></ae-button>'
}); 