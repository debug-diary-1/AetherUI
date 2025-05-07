import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'Examples/Simple Tabs',
  tags: ['autodocs'],
  render: (args) => {
    // Handle tab selection
    const selectTab = (e) => {
      // Find all tabs and panels in the component
      const tabsContainer = e.currentTarget.closest('.tabs-container');
      const tabs = tabsContainer.querySelectorAll('[role="tab"]');
      const panels = tabsContainer.querySelectorAll('[role="tabpanel"]');

      // Get the selected tab's id
      const selectedId = e.currentTarget.id;
      const panelId = e.currentTarget.getAttribute('aria-controls');

      // Update ARIA attributes and styling for all tabs
      tabs.forEach((tab) => {
        const selected = tab.id === selectedId;
        tab.setAttribute('aria-selected', selected);
        tab.setAttribute('tabindex', selected ? '0' : '-1');
      });

      // Hide all panels and show the selected one
      panels.forEach((panel) => {
        panel.hidden = panel.id !== panelId;
      });
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      const isHorizontal = args.orientation === 'horizontal';
      const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'));
      const currentIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');

      let newIndex;

      // Handle arrow keys based on orientation
      switch (e.key) {
        case isHorizontal ? 'ArrowRight' : 'ArrowDown':
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = tabs.length - 1;
          break;
        default:
          return; // Exit if not a navigation key
      }

      // Focus and select the new tab
      e.preventDefault();
      tabs[newIndex].click();
      tabs[newIndex].focus();
    };

    // Initial active tab
    const activeTab = args.value || 'tab1';

    return html`
      <div
        class="tabs-container"
        style="
        width: 100%;
        max-width: 600px;
        font-family: system-ui, sans-serif;
        --ae-tabs-indicator-color: ${args.indicatorColor || 'currentColor'};
        --ae-tabs-gap: ${args.gap || '1rem'};
        --ae-tabs-padding-x: ${args.paddingX || '0.75rem'};
        --ae-tabs-padding-y: ${args.paddingY || '0.25rem'};
      "
      >
        <div
          role="tablist"
          @keydown=${handleKeyDown}
          aria-label="Sample tabs"
          style="
            display: flex;
            flex-direction: ${args.orientation === 'vertical' ? 'column' : 'row'};
            gap: var(--ae-tabs-gap);
            border-bottom: ${args.orientation === 'vertical' ? 'none' : '1px solid #ddd'};
            border-right: ${args.orientation === 'vertical' ? '1px solid #ddd' : 'none'};
            margin-bottom: ${args.orientation === 'vertical' ? '0' : '1rem'};
            margin-right: ${args.orientation === 'vertical' ? '1rem' : '0'};
          "
          part="tablist"
        >
          <button
            id="tab1"
            role="tab"
            aria-selected=${activeTab === 'tab1' ? 'true' : 'false'}
            aria-controls="panel1"
            tabindex=${activeTab === 'tab1' ? '0' : '-1'}
            @click=${selectTab}
            style="
              background: transparent;
              padding: var(--ae-tabs-padding-y) var(--ae-tabs-padding-x);
              border: none;
              font: inherit;
              cursor: pointer;
              position: relative;
              text-align: ${args.orientation === 'vertical' ? 'left' : 'center'};
              border-bottom: ${args.orientation === 'vertical'
              ? 'none'
              : activeTab === 'tab1'
                ? '2px solid var(--ae-tabs-indicator-color)'
                : 'none'};
              border-right: ${args.orientation === 'vertical'
              ? activeTab === 'tab1'
                ? '2px solid var(--ae-tabs-indicator-color)'
                : 'none'
              : 'none'};
              font-weight: ${activeTab === 'tab1' ? 'bold' : 'normal'};
            "
            part="tab"
          >
            First Tab
          </button>
          <button
            id="tab2"
            role="tab"
            aria-selected=${activeTab === 'tab2' ? 'true' : 'false'}
            aria-controls="panel2"
            tabindex=${activeTab === 'tab2' ? '0' : '-1'}
            @click=${selectTab}
            style="
              background: transparent;
              padding: var(--ae-tabs-padding-y) var(--ae-tabs-padding-x);
              border: none;
              font: inherit;
              cursor: pointer;
              position: relative;
              text-align: ${args.orientation === 'vertical' ? 'left' : 'center'};
              border-bottom: ${args.orientation === 'vertical'
              ? 'none'
              : activeTab === 'tab2'
                ? '2px solid var(--ae-tabs-indicator-color)'
                : 'none'};
              border-right: ${args.orientation === 'vertical'
              ? activeTab === 'tab2'
                ? '2px solid var(--ae-tabs-indicator-color)'
                : 'none'
              : 'none'};
              font-weight: ${activeTab === 'tab2' ? 'bold' : 'normal'};
            "
            part="tab"
          >
            Second Tab
          </button>
          <button
            id="tab3"
            role="tab"
            aria-selected=${activeTab === 'tab3' ? 'true' : 'false'}
            aria-controls="panel3"
            tabindex=${activeTab === 'tab3' ? '0' : '-1'}
            @click=${selectTab}
            style="
              background: transparent;
              padding: var(--ae-tabs-padding-y) var(--ae-tabs-padding-x);
              border: none;
              font: inherit;
              cursor: pointer;
              position: relative;
              text-align: ${args.orientation === 'vertical' ? 'left' : 'center'};
              border-bottom: ${args.orientation === 'vertical'
              ? 'none'
              : activeTab === 'tab3'
                ? '2px solid var(--ae-tabs-indicator-color)'
                : 'none'};
              border-right: ${args.orientation === 'vertical'
              ? activeTab === 'tab3'
                ? '2px solid var(--ae-tabs-indicator-color)'
                : 'none'
              : 'none'};
              font-weight: ${activeTab === 'tab3' ? 'bold' : 'normal'};
            "
            part="tab"
          >
            Third Tab
          </button>
        </div>

        <div
          style="
          ${args.orientation === 'vertical' ? 'display: flex; flex-grow: 1;' : ''}
        "
        >
          <section
            id="panel1"
            role="tabpanel"
            aria-labelledby="tab1"
            hidden=${activeTab !== 'tab1'}
            tabindex="0"
            style="padding: 1rem 0;"
            part="panel"
          >
            <h3>First Tab Content</h3>
            <p>
              This is the content for the first tab panel. It demonstrates a basic implementation of
              the accessible tabs pattern.
            </p>
          </section>

          <section
            id="panel2"
            role="tabpanel"
            aria-labelledby="tab2"
            hidden=${activeTab !== 'tab2'}
            tabindex="0"
            style="padding: 1rem 0;"
            part="panel"
          >
            <h3>Second Tab Content</h3>
            <p>Content for the second tab panel with some example text.</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </section>

          <section
            id="panel3"
            role="tabpanel"
            aria-labelledby="tab3"
            hidden=${activeTab !== 'tab3'}
            tabindex="0"
            style="padding: 1rem 0;"
            part="panel"
          >
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
          </section>
        </div>
      </div>
    `;
  },
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
    indicatorColor: {
      control: { type: 'color' },
      description: 'Color of the active tab indicator',
    },
    gap: {
      control: { type: 'text' },
      description: 'Space between tabs',
    },
    paddingX: {
      control: { type: 'text' },
      description: 'Horizontal padding inside tabs',
    },
    paddingY: {
      control: { type: 'text' },
      description: 'Vertical padding inside tabs',
    },
  },
};

export const HorizontalTabs = {
  args: {
    value: 'tab1',
    orientation: 'horizontal',
    activation: 'auto',
    indicatorColor: '#0066FF',
    gap: '1rem',
    paddingX: '0.75rem',
    paddingY: '0.25rem',
  },
};

export const VerticalTabs = {
  args: {
    value: 'tab1',
    orientation: 'vertical',
    activation: 'auto',
    indicatorColor: '#0066FF',
    gap: '0.5rem',
    paddingX: '0.75rem',
    paddingY: '0.5rem',
  },
};

export const CustomStyles = {
  args: {
    value: 'tab1',
    orientation: 'horizontal',
    activation: 'auto',
    indicatorColor: '#8b5cf6',
    gap: '2rem',
    paddingX: '1rem',
    paddingY: '0.5rem',
  },
  render: (args) => {
    // Use the same handler functions as the main story
    const selectTab = (e) => {
      const tabsContainer = e.currentTarget.closest('.tabs-container');
      const tabs = tabsContainer.querySelectorAll('[role="tab"]');
      const panels = tabsContainer.querySelectorAll('[role="tabpanel"]');
      const selectedId = e.currentTarget.id;
      const panelId = e.currentTarget.getAttribute('aria-controls');

      tabs.forEach((tab) => {
        const selected = tab.id === selectedId;
        tab.setAttribute('aria-selected', selected);
        tab.setAttribute('tabindex', selected ? '0' : '-1');
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== panelId;
      });
    };

    const handleKeyDown = (e) => {
      const isHorizontal = args.orientation === 'horizontal';
      const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'));
      const currentIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');

      let newIndex;

      switch (e.key) {
        case isHorizontal ? 'ArrowRight' : 'ArrowDown':
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      tabs[newIndex].click();
      tabs[newIndex].focus();
    };

    const activeTab = args.value || 'tab1';

    return html`
      <style>
        .custom-tabs-container {
          --ae-tabs-indicator-color: ${args.indicatorColor};
          --ae-tabs-gap: ${args.gap};
          --ae-tabs-padding-x: ${args.paddingX};
          --ae-tabs-padding-y: ${args.paddingY};

          width: 100%;
          max-width: 600px;
          font-family: system-ui, sans-serif;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
        }

        .custom-tablist {
          display: flex;
          gap: var(--ae-tabs-gap);
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 1rem;
        }

        .custom-tab {
          background: transparent;
          padding: var(--ae-tabs-padding-y) var(--ae-tabs-padding-x);
          border: none;
          border-radius: 4px 4px 0 0;
          font: inherit;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .custom-tab[aria-selected='true'] {
          background: #f0f4ff;
          font-weight: bold;
          color: var(--ae-tabs-indicator-color);
        }

        .custom-tab[aria-selected='true']::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--ae-tabs-indicator-color);
        }

        .custom-panel {
          padding: 1rem;
          background: white;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      </style>

      <div class="custom-tabs-container tabs-container">
        <div
          class="custom-tablist"
          role="tablist"
          @keydown=${handleKeyDown}
          aria-label="Custom styled tabs"
          part="tablist"
        >
          <button
            id="custom-tab1"
            class="custom-tab"
            role="tab"
            aria-selected=${activeTab === 'tab1' ? 'true' : 'false'}
            aria-controls="custom-panel1"
            tabindex=${activeTab === 'tab1' ? '0' : '-1'}
            @click=${selectTab}
            part="tab"
          >
            First Tab
          </button>
          <button
            id="custom-tab2"
            class="custom-tab"
            role="tab"
            aria-selected=${activeTab === 'tab2' ? 'true' : 'false'}
            aria-controls="custom-panel2"
            tabindex=${activeTab === 'tab2' ? '0' : '-1'}
            @click=${selectTab}
            part="tab"
          >
            Second Tab
          </button>
          <button
            id="custom-tab3"
            class="custom-tab"
            role="tab"
            aria-selected=${activeTab === 'tab3' ? 'true' : 'false'}
            aria-controls="custom-panel3"
            tabindex=${activeTab === 'tab3' ? '0' : '-1'}
            @click=${selectTab}
            part="tab"
          >
            Third Tab
          </button>
        </div>

        <section
          id="custom-panel1"
          class="custom-panel"
          role="tabpanel"
          aria-labelledby="custom-tab1"
          hidden=${activeTab !== 'tab1'}
          tabindex="0"
          part="panel"
        >
          <h3 style="margin-top: 0; color: ${args.indicatorColor}">Custom Tab Panel 1</h3>
          <p>
            This example demonstrates custom styling with CSS. Notice how we're applying the CSS
            tokens like indicator color, gap, and padding.
          </p>
        </section>

        <section
          id="custom-panel2"
          class="custom-panel"
          role="tabpanel"
          aria-labelledby="custom-tab2"
          hidden=${activeTab !== 'tab2'}
          tabindex="0"
          part="panel"
        >
          <h3 style="margin-top: 0; color: ${args.indicatorColor}">Custom Tab Panel 2</h3>
          <p>The tabs in this example have:</p>
          <ul>
            <li>Custom background when active</li>
            <li>Animation effects</li>
            <li>Different styling for the indicator</li>
            <li>Rounded corners</li>
          </ul>
        </section>

        <section
          id="custom-panel3"
          class="custom-panel"
          role="tabpanel"
          aria-labelledby="custom-tab3"
          hidden=${activeTab !== 'tab3'}
          tabindex="0"
          part="panel"
        >
          <h3 style="margin-top: 0; color: ${args.indicatorColor}">Custom Tab Panel 3</h3>
          <p>
            This example shows how consumers can customize the appearance using CSS variables and
            shadow parts.
          </p>
          <button
            style="
            padding: 8px 16px;
            background: ${args.indicatorColor};
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
          >
            Styled Button
          </button>
        </section>
      </div>
    `;
  },
};
