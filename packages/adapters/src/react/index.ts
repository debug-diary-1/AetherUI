import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

// Import the custom elements to ensure they are registered
import '@aetherui/core';

// Define props interface for the button component
interface AeButtonProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
}

// Create React wrapper for ae-button custom element
export const AeButton = forwardRef<HTMLElement, AeButtonProps>((props, ref) => {
  const { disabled, ...rest } = props;
  return React.createElement('ae-button', {
    ref,
    disabled,
    ...rest
  });
});

AeButton.displayName = 'AeButton'; 