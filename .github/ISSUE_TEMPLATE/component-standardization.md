---
name: Component Standardization
about: Track work to standardize a component according to the project standards
title: 'Standardize: [Component Name]'
labels: 'enhancement, standardization'
assignees: ''
---

## Component to Standardize

**Component Name:** <!-- e.g., ae-checkbox -->

## Current Status

- [ ] Component exists but needs standardization
- [ ] Component is partially implemented
- [ ] Component needs to be created from scratch

## Standardization Checklist

### API Naming

- [ ] Properties follow naming conventions in STANDARDS.md
- [ ] Events follow `ae-component-action` pattern
- [ ] Backward compatibility maintained for renamed properties/events
- [ ] Type exports follow `AeComponentElement` pattern

### Documentation

- [ ] JSDoc comments are complete (properties, events, slots, parts)
- [ ] CSS custom properties are documented
- [ ] Example usage is provided
- [ ] Accessibility information is included

### HTML Structure

- [ ] Shadow parts follow naming conventions
- [ ] Slots follow naming conventions
- [ ] ARIA attributes properly implemented
- [ ] Semantic HTML elements used appropriately

### CSS Styling

- [ ] CSS custom properties follow `--ae-component-property-variant` pattern
- [ ] Default styling is minimal and focuses on behavior
- [ ] Themeable aspects exposed through CSS custom properties
- [ ] States (hover, focus, disabled) properly styled

### Behavior

- [ ] Keyboard navigation implemented
- [ ] Focus management handled correctly
- [ ] Event details follow standardized patterns
- [ ] Controlled and uncontrolled modes supported

### Testing

- [ ] Unit tests cover key functionality
- [ ] Accessibility tests included
- [ ] Visual regression tests (if applicable)
- [ ] Interactive examples work correctly

## Implementation Notes

<!-- Any specific notes or challenges related to this component -->

## Related Components

<!-- List any related components that might be affected by these changes -->