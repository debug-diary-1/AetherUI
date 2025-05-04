import { defineAeButton } from '@aetherui/core';
import { SvelteComponentTyped } from 'svelte';

// Define the custom element
defineAeButton();

interface AeButtonProps {
  disabled?: boolean;
}

export class AeButton extends SvelteComponentTyped<AeButtonProps> {
  constructor(options: { target: HTMLElement; props?: AeButtonProps }) {
    super(options);
  }
} 