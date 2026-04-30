// Debug stories for testing Storybook features
import { html } from 'lit-html';

export default {
  title: 'Debug/Testing',
};

export const BasicText = () => {
  console.log('Debug story rendering');
  return html`
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Debug Story</h2>
      <p>This is a simple debug story with no external dependencies</p>
      <p>If you can see this, Storybook is working correctly!</p>
    </div>
  `;
};

export const ThemeTest = (args, { globals }) => {
  const isDark = globals.theme === 'dark';

  return html`
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Theme Test</h2>
      <p>Current theme: <strong>${isDark ? 'Dark' : 'Light'}</strong></p>
      <p>
        This story shows how theme variables are applied. Use the theme toggle in the toolbar to
        switch between light and dark modes.
      </p>

      <div
        style="margin: 20px 0; padding: 20px; border: 1px solid var(--ae-border-color); border-radius: 4px; background: var(--ae-background); color: var(--ae-text-primary);"
      >
        <h3>Theme Variables</h3>
        <div>
          Primary Color:
          <span
            style="display: inline-block; width: 20px; height: 20px; background: var(--ae-primary); vertical-align: middle; border-radius: 4px;"
          ></span>
          var(--ae-primary)
        </div>
        <div>
          Background:
          <span
            style="display: inline-block; width: 20px; height: 20px; background: var(--ae-background); vertical-align: middle; border-radius: 4px; border: 1px solid #ccc;"
          ></span>
          var(--ae-background)
        </div>
        <div>
          Text Color:
          <span
            style="display: inline-block; width: 20px; height: 20px; background: var(--ae-text-primary); vertical-align: middle; border-radius: 4px;"
          ></span>
          var(--ae-text-primary)
        </div>
        <div>
          Border Color:
          <span
            style="display: inline-block; width: 20px; height: 20px; background: var(--ae-border-color); vertical-align: middle; border-radius: 4px;"
          ></span>
          var(--ae-border-color)
        </div>
      </div>
    </div>
  `;
};

export const JsonData = () => {
  const data = {
    storybook: 'working',
    components: ['lit-html is working'],
    timestamp: new Date().toISOString(),
  };

  return html`
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>JSON Test</h2>
      <pre
        style="background: var(--ae-background-tertiary); padding: 10px; border-radius: 4px; color: var(--ae-text-primary);"
      >
        ${JSON.stringify(data, null, 2)}
      </pre
      >
    </div>
  `;
};
