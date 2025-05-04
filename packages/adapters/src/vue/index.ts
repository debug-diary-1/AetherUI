import { defineAeButton } from '@aetherui/core';
import { defineComponent } from 'vue';

// Define the custom element
defineAeButton();

interface AeButtonProps {
  disabled?: boolean;
}

export const AeButton = defineComponent({
  name: 'AeButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  template: '<ae-button :disabled="disabled"><slot></slot></ae-button>'
}); 