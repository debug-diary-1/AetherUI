# `@aetherui/agent`

Validated rendering for agent-generated AetherUI documents. The module exposes two interfaces:

- `validateAgentUi(input, policy)` validates structure, component and property allowlists, declared events, URL protocols, depth, and node count.
- `renderAgentUi(container, input, options)` validates first, replaces the container contents, and converts declared component events into structured action data.

Register the AetherUI elements your application allows before rendering:

```ts
import { defineAeButton, defineAeInput } from '@aetherui/core';
import { renderAgentUi } from '@aetherui/agent';

defineAeButton();
defineAeInput();

renderAgentUi(document.querySelector('#surface')!, {
  version: '1',
  root: {
    component: 'ae-button',
    id: 'save',
    children: ['Save'],
    actions: { 'ae-button-click': 'save-profile' },
  },
}, {
  allowedComponents: ['ae-button', 'ae-input'],
  onAction(action) {
    console.log(action.actionId, action.detail);
  },
});
```

Agent documents are JSON data. The renderer rejects unknown interface fields and never evaluates handlers, scripts, or HTML. Use `agent-ui.schema.json` for structured model output and keep the runtime validator at the rendering seam.
