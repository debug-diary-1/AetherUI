import { html } from 'lit';
import { expect, within, userEvent } from 'storybook/test';

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['tab1', 'tab2', 'tab3'],
      description: 'Active tab ID',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation for layout and keyboard navigation',
    },
    activation: {
      control: { type: 'select' },
      options: ['auto', 'manual'],
      description: 'Auto focus vs. manual selection',
    },
    customStyles: {
      control: 'boolean',
      description: 'Apply custom styles',
    },
  },
};

export const Default = {
  args: {
    value: 'tab1',
    orientation: 'horizontal',
    activation: 'auto',
    customStyles: false,
  },
  render: (args) => {
    const styles = args.customStyles
      ? html`
          <style>
            .custom-tabs {
              --ae-tabs-indicator-color: #0066ff;
              --ae-tabs-gap: 1.5rem;
              --ae-tabs-padding-x: 1rem;
              --ae-tabs-padding-y: 0.5rem;
            }

            .custom-tabs::part(tab) {
              border-radius: 4px 4px 0 0;
              transition: all 0.2s ease;
            }

            .custom-tabs::part(tab):hover {
              background-color: #f0f4ff;
            }

            .custom-tabs::part(tab)[aria-selected='true'] {
              background-color: #f0f4ff;
              font-weight: bold;
              color: #0066ff;
            }

            .custom-tabs::part(panel) {
              padding: 1.5rem;
              background-color: #f9fafb;
              border-radius: 0 0 4px 4px;
              border: 1px solid #e5e7eb;
              border-top: none;
              margin-top: -1px;
            }
          </style>
        `
      : '';

    const handleChange = (e) => {
      console.log('Tab changed:', e.detail.tab);
      
      // Debug - verify the tab is actually getting selected
      const tabs = document.querySelectorAll(`#${e.currentTarget.id} ae-tab`);
      tabs.forEach(tab => {
        if (tab.id === e.detail.tab) {
          console.log('Setting selected tab:', tab.id);
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.setAttribute('aria-selected', 'false');
        }
      });
    };

    return html`
      ${styles}
      <div style="width: 100%; max-width: 600px; font-family: system-ui, sans-serif;">
        <h3>Horizontal Tabs</h3>
        <ae-tabs
          class="custom-tabs"
          id="demo-tabs"
          value=${args.value}
          orientation=${args.orientation}
          activation=${args.activation}
          @ae-tab-change=${handleChange}
        >
          <ae-tab slot="tab" id="tab1">First Tab</ae-tab>
          <ae-tab slot="tab" id="tab2">Second Tab</ae-tab>
          <ae-tab slot="tab" id="tab3">Third Tab</ae-tab>

          <ae-tab-panel slot="panel" id="panel1">
            <h3>First Tab Content</h3>
            <p>
              This is the content for the first tab panel. It demonstrates a basic implementation of
              the accessible tabs pattern.
            </p>
          </ae-tab-panel>

          <ae-tab-panel slot="panel" id="panel2">
            <h3>Second Tab Content</h3>
            <p>Content for the second tab panel with some example text.</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </ae-tab-panel>

          <ae-tab-panel slot="panel" id="panel3">
            <h3>Third Tab Content</h3>
            <p>
              Content for the third tab panel. This component implements the WAI-ARIA tabs pattern
              for proper accessibility.
            </p>
            <button
              style="
              padding: 8px 16px;
              background: #0066FF;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
            >
              Example Button
            </button>
          </ae-tab-panel>
        </ae-tabs>
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the tabs element
    const aeTabs = canvasElement.querySelector('ae-tabs');
    expect(aeTabs).toBeInTheDocument();

    // Verify initial value
    expect(aeTabs.value).toBe('tab1');

    // Get all tab elements
    const tabs = canvasElement.querySelectorAll('ae-tab');
    expect(tabs.length).toBe(3);

    // Click on the second tab
    const secondTab = tabs[1];
    const secondTabButton = secondTab.shadowRoot.querySelector('[role="tab"]');
    expect(secondTabButton).toBeTruthy();

    await userEvent.click(secondTabButton);

    // Verify active tab changed
    expect(aeTabs.value).toBe('tab2');

    // Verify aria-selected attributes
    expect(secondTabButton.getAttribute('aria-selected')).toBe('true');
  },
};

export const Vertical = {
  args: {
    value: 'tab1',
    orientation: 'vertical',
    activation: 'auto',
    customStyles: false,
  },
  render: (args) => {
    const styles = args.customStyles
      ? html`
          <style>
            .vertical-tabs {
              --ae-tabs-indicator-color: #0066ff;
              --ae-tabs-gap: 0.75rem;
              --ae-tabs-padding-x: 1rem;
              --ae-tabs-padding-y: 0.75rem;
            }

            .vertical-tabs::part(tab) {
              border-radius: 4px 0 0 4px;
              transition: all 0.2s ease;
            }

            .vertical-tabs::part(tab):hover {
              background-color: #f0f4ff;
            }

            .vertical-tabs::part(tab)[aria-selected='true'] {
              background-color: #f0f4ff;
              color: #0066ff;
              border-right: 3px solid #0066ff !important;
            }

            .vertical-tabs::part(panel) {
              padding: 1.5rem;
              background-color: #f9fafb;
              border-radius: 4px;
              height: 100%;
            }
          </style>
        `
      : '';

    const handleChange = (e) => {
      console.log('Tab changed:', e.detail.tab);
      
      // Debug - verify the tab is actually getting selected
      const tabs = document.querySelectorAll(`#${e.currentTarget.id} ae-tab`);
      tabs.forEach(tab => {
        if (tab.id === e.detail.tab) {
          console.log('Setting selected tab:', tab.id);
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.setAttribute('aria-selected', 'false');
        }
      });
    };

    return html`
      ${styles}
      <div style="width: 100%; max-width: 700px; font-family: system-ui, sans-serif;">
        <h3>Vertical Tabs</h3>
        <ae-tabs
          class="vertical-tabs"
          id="vertical-tabs"
          value=${args.value}
          orientation="vertical"
          activation=${args.activation}
          @ae-tab-change=${handleChange}
        >
          <ae-tab slot="tab" id="tab1">First Tab</ae-tab>
          <ae-tab slot="tab" id="tab2">Second Tab</ae-tab>
          <ae-tab slot="tab" id="tab3">Third Tab</ae-tab>

          <ae-tab-panel slot="panel" id="panel1">
            <h3>First Tab Content</h3>
            <p>
              This is a vertical tabs layout, where tabs are displayed in a column rather than a
              row.
            </p>
          </ae-tab-panel>

          <ae-tab-panel slot="panel" id="panel2">
            <h3>Second Tab Content</h3>
            <p>Vertical tabs are useful when:</p>
            <ul>
              <li>You have many tabs</li>
              <li>Tab labels are long</li>
              <li>You want to maximize vertical space</li>
            </ul>
          </ae-tab-panel>

          <ae-tab-panel slot="panel" id="panel3">
            <h3>Third Tab Content</h3>
            <p>
              Keyboard navigation for vertical tabs uses Up/Down arrow keys instead of Left/Right.
            </p>
            <button
              style="
              padding: 8px 16px;
              background: #0066FF;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
            >
              Example Button
            </button>
          </ae-tab-panel>
        </ae-tabs>
      </div>
    `;
  },
};

export const ManualActivation = {
  args: {
    value: 'tab1',
    orientation: 'horizontal',
    activation: 'manual',
    customStyles: false,
  },
  render: (args) => {
    const handleChange = (e) => {
      console.log('Tab changed:', e.detail.tab);
      
      // Debug - verify the tab is actually getting selected
      const tabs = document.querySelectorAll(`#${e.currentTarget.id} ae-tab`);
      tabs.forEach(tab => {
        if (tab.id === e.detail.tab) {
          console.log('Setting selected tab:', tab.id);
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.setAttribute('aria-selected', 'false');
        }
      });
    };

    return html`
      <div style="width: 100%; max-width: 600px; font-family: system-ui, sans-serif;">
        <p style="margin-bottom: 1rem; color: #666;">
          In manual activation mode, focusing a tab with keyboard navigation doesn't automatically
          select it. You need to press Enter or Space to activate the tab.
        </p>

        <ae-tabs
          id="manual-tabs"
          value=${args.value}
          orientation="horizontal"
          activation="manual"
          @ae-tab-change=${handleChange}
        >
          <ae-tab slot="tab" id="tab1">First Tab</ae-tab>
          <ae-tab slot="tab" id="tab2">Second Tab</ae-tab>
          <ae-tab slot="tab" id="tab3">Third Tab</ae-tab>

          <ae-tab-panel slot="panel" id="panel1">
            <h3>Manual Activation Example</h3>
            <p>Use keyboard arrow keys to navigate between tabs, then press Enter to activate.</p>
          </ae-tab-panel>

          <ae-tab-panel slot="panel" id="panel2">
            <h3>Second Tab Content</h3>
            <p>This tab was activated manually.</p>
          </ae-tab-panel>

          <ae-tab-panel slot="panel" id="panel3">
            <h3>Third Tab Content</h3>
            <p>
              Manual activation can be better for certain interfaces where inadvertent tab switching
              would be disruptive.
            </p>
          </ae-tab-panel>
        </ae-tabs>
      </div>
    `;
  },
};

export const Both = {
  render: () => {
    return html`
      <div
        style="width: 100%; font-family: system-ui, sans-serif; display: flex; flex-direction: column; gap: 60px;"
      >
        <section>
          <h2>Default/Horizontal Tabs</h2>
          <div style="max-width: 600px;">
            <!-- Not specifying orientation to verify default is horizontal -->
            <ae-tabs value="tab1">
              <ae-tab slot="tab" id="tab1">First Tab</ae-tab>
              <ae-tab slot="tab" id="tab2">Second Tab</ae-tab>
              <ae-tab slot="tab" id="tab3">Third Tab</ae-tab>

              <ae-tab-panel slot="panel" id="panel1">
                <h3>Default Horizontal Tabs</h3>
                <p>This is using the default orientation which should be horizontal (tabs in a row).</p>
              </ae-tab-panel>

              <ae-tab-panel slot="panel" id="panel2">
                <h3>Second Tab Content</h3>
                <p>Content for the second tab in horizontal orientation.</p>
              </ae-tab-panel>

              <ae-tab-panel slot="panel" id="panel3">
                <h3>Third Tab Content</h3>
                <p>Content for the third tab in horizontal orientation.</p>
              </ae-tab-panel>
            </ae-tabs>
          </div>
        </section>

        <section>
          <h2>Explicit Horizontal Tabs</h2>
          <div style="max-width: 600px;">
            <ae-tabs orientation="horizontal" value="tab1">
              <ae-tab slot="tab" id="tab1">First Tab</ae-tab>
              <ae-tab slot="tab" id="tab2">Second Tab</ae-tab>
              <ae-tab slot="tab" id="tab3">Third Tab</ae-tab>

              <ae-tab-panel slot="panel" id="panel1">
                <h3>Explicit Horizontal Tabs</h3>
                <p>These tabs have orientation="horizontal" explicitly set.</p>
              </ae-tab-panel>

              <ae-tab-panel slot="panel" id="panel2">
                <h3>Second Tab Content</h3>
                <p>Content for the second tab in horizontal orientation.</p>
              </ae-tab-panel>

              <ae-tab-panel slot="panel" id="panel3">
                <h3>Third Tab Content</h3>
                <p>Content for the third tab in horizontal orientation.</p>
              </ae-tab-panel>
            </ae-tabs>
          </div>
        </section>

        <section>
          <h2>Vertical Tabs</h2>
          <div style="max-width: 700px;">
            <ae-tabs orientation="vertical" value="tab1">
              <ae-tab slot="tab" id="tab1">First Tab</ae-tab>
              <ae-tab slot="tab" id="tab2">Second Tab</ae-tab>
              <ae-tab slot="tab" id="tab3">Third Tab</ae-tab>

              <ae-tab-panel slot="panel" id="panel1">
                <h3>Vertical Tabs Example</h3>
                <p>This is a vertical tabs layout with tabs arranged in a column.</p>
              </ae-tab-panel>

              <ae-tab-panel slot="panel" id="panel2">
                <h3>Second Tab Content</h3>
                <p>Content for the second tab in vertical orientation.</p>
              </ae-tab-panel>

              <ae-tab-panel slot="panel" id="panel3">
                <h3>Third Tab Content</h3>
                <p>Content for the third tab in vertical orientation.</p>
              </ae-tab-panel>
            </ae-tabs>
          </div>
        </section>
      </div>
    `;
  },
};
