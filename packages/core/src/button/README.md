# Button Component in AetherUI

## Shadow DOM Styling Guidelines

When styling components that use Shadow DOM, keep these important principles in mind:

### Internal Component Styling

When writing styles _inside_ the component (in `styles.ts`):

1. Use direct element selectors for internal elements:

```css
/* ✅ CORRECT - Use direct element selectors */
button {
  display: inline-flex;
  /* other styles... */
}

/* ❌ INCORRECT - Don't use ::part() for internal styling */
::part(base) {
  display: inline-flex;
  /* this won't work properly for internal styling */
}
```

2. Use `:host()` selectors to apply styles based on host element attributes:

```css
/* Styling based on component attributes */
:host([variant='primary']) button {
  background-color: blue;
}
```

3. Use `::slotted()` to style content provided through slots:

```css
/* Styling slotted content */
::slotted([slot='icon']) {
  width: 1em;
  height: 1em;
}
```

### External Component Styling

When styling components from outside (in your application CSS):

1. Use `::part()` to target exposed shadow parts:

```css
/* Styling from outside the component */
ae-button::part(base) {
  background-color: purple;
}
```

2. Combine with attribute selectors for variant-specific styling:

```css
ae-button[variant='ghost']::part(base) {
  background: transparent;
  color: red;
}
```

## Understanding Shadow DOM Encapsulation

The Shadow DOM provides style encapsulation, which means:

- Styles inside the Shadow DOM don't leak out
- Styles outside don't leak in
- `part` attributes create explicit "style hooks" for external styling

This distinction between internal and external styling is critical for correctly implementing and using Web Components.
