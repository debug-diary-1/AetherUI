/**
 * Registers the components used in the landing page's live demo.
 *
 * The demo markup is written as plain custom elements in index.html, so if this
 * bundle fails to load the page still renders readable content — the elements
 * simply stay unupgraded rather than disappearing.
 */
import lightTheme from '@aetherui/tokens/light.css?inline';
import darkTheme from '@aetherui/tokens/dark.css?inline';

import { defineAeButton } from '@aetherui/core/button';
import { defineAeBadge } from '@aetherui/core/badge';
import { defineAeInput } from '@aetherui/core/input';
import { defineAeSwitch } from '@aetherui/core/switch';
import { defineAeProgress } from '@aetherui/core/progress';
import { defineAeAlert } from '@aetherui/core/alert';

// Both themes define tokens on :root, so importing them normally would make
// whichever loaded last win. Attaching them as media-scoped stylesheets lets the
// demo follow the same colour scheme as the rest of the page.
const addTheme = (css: string, media?: string) => {
  const style = document.createElement('style');
  if (media) style.media = media;
  style.textContent = css;
  document.head.append(style);
};

addTheme(lightTheme);
addTheme(darkTheme, '(prefers-color-scheme: dark)');

defineAeButton();
defineAeBadge();
defineAeInput();
defineAeSwitch();
defineAeProgress();
defineAeAlert();

// Reveal the demo only once the elements are defined, so nothing flashes
// unstyled while the bundle is still upgrading them.
void Promise.all(
  ['ae-button', 'ae-badge', 'ae-input', 'ae-switch', 'ae-progress', 'ae-alert'].map((tag) =>
    customElements.whenDefined(tag),
  ),
).then(() => {
  document.documentElement.dataset.componentsReady = 'true';
});
