import type { JSX } from 'react';

const button: JSX.IntrinsicElements['ae-button'] = {
  variant: 'primary',
  'onae-button-click': (event) => {
    const source: Event = event.detail.sourceEvent;
    void source;
    // @ts-expect-error A button event does not carry checkbox state.
    event.detail.checked;
  },
};

const checkbox: JSX.IntrinsicElements['ae-checkbox'] = {
  checked: false,
  'onae-checkbox-change': (event) => {
    const checked: boolean = event.detail.checked;
    void checked;
  },
};

const invalidButton: JSX.IntrinsicElements['ae-button'] = {
  // @ts-expect-error React does not translate camelCase custom event names.
  onAeButtonClick: () => {},
};

void [button, checkbox, invalidButton];
