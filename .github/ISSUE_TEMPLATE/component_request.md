---
name: Component request
about: Request a new component for AetherUI
title: '[COMPONENT] '
labels: component-request
assignees: ''
---

**Component name**
What should this component be called? (e.g., `ae-date-picker`)

**Use case**
Describe the use case for this component. Why is it needed?

**API Design**

```html
<!-- Proposed API -->
<ae-component property="value" @ae-component-change="handleChange">
  <span slot="label">Label</span>
</ae-component>
```

**Properties**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string | '' | The component value |
| disabled | boolean | false | Whether the component is disabled |

**Events**
| Event | Detail | Description |
|-------|---------|-------------|
| ae-component-change | `{ value: string }` | Fired when value changes |

**Slots**
| Slot | Description |
|------|-------------|
| default | Main content |
| label | Component label |

**Accessibility Requirements**

- ARIA role:
- Keyboard navigation:
- Screen reader support:

**Similar components in other libraries**

- Material UI: [link]
- Ant Design: [link]
- Other: [link]

**Additional context**
Add any other context or screenshots about the component request here.
