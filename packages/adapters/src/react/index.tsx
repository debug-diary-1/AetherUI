import { forwardRef } from 'react';
import { defineAeButton } from '@aetherui/core';

// Define the custom element
defineAeButton();

interface AeButtonProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
}

export const AeButton = forwardRef<HTMLElement, AeButtonProps>((props, ref) => {
  const { disabled, ...rest } = props;
  return (
    <ae-button
      ref={ref}
      disabled={disabled}
      {...rest}
    />
  );
});

AeButton.displayName = 'AeButton'; 