// Lightweight, on-demand component registration for docs
// Detects used custom elements and dynamically imports only those modules

declare global {
  interface Window {
    __aetherui_initialized?: boolean;
  }
}

if (typeof window !== 'undefined') {
  type Loader = () => Promise<void>;

  const once = <T extends Loader>(fn: T): T => {
    let ran = false;
    return (async () => {
      if (ran) return;
      ran = true;
      await fn();
    }) as T;
  };

  const loaders: Record<string, Loader> = {
    'ae-button': once(async () => {
      const m = await import('@aetherui/core/button');
      if (m.defineAeButton && !customElements.get('ae-button')) m.defineAeButton();
    }),
    'ae-checkbox': once(async () => {
      const m = await import('@aetherui/core/checkbox');
      if (m.defineAeCheckbox && !customElements.get('ae-checkbox')) m.defineAeCheckbox();
    }),
    'ae-radio': once(async () => {
      const m = await import('@aetherui/core/radio');
      if (m.defineAeRadio && !customElements.get('ae-radio')) m.defineAeRadio();
      if (m.defineAeRadioGroup && !customElements.get('ae-radio-group')) m.defineAeRadioGroup();
    }),
    'ae-radio-group': once(async () => {
      const m = await import('@aetherui/core/radio');
      if (m.defineAeRadio && !customElements.get('ae-radio')) m.defineAeRadio();
      if (m.defineAeRadioGroup && !customElements.get('ae-radio-group')) m.defineAeRadioGroup();
    }),
    'ae-tabs': once(async () => {
      const m = await import('@aetherui/core/tabs');
      if (m.defineAeTabs && !customElements.get('ae-tabs')) m.defineAeTabs();
    }),
    'ae-tab': once(async () => {
      const m = await import('@aetherui/core/tabs');
      if (m.defineAeTabs) m.defineAeTabs();
    }),
    'ae-tab-panel': once(async () => {
      const m = await import('@aetherui/core/tabs');
      if (m.defineAeTabs) m.defineAeTabs();
    }),
    'ae-accordion': once(async () => {
      const m = await import('@aetherui/core/accordion');
      if (m.defineAeAccordion && !customElements.get('ae-accordion')) m.defineAeAccordion();
    }),
    'ae-accordion-item': once(async () => {
      const m = await import('@aetherui/core/accordion');
      if (m.defineAeAccordion) m.defineAeAccordion();
    }),
    'ae-dropdown': once(async () => {
      const m = await import('@aetherui/core/dropdown');
      if (m.defineAeDropdown && !customElements.get('ae-dropdown')) m.defineAeDropdown();
    }),
    'ae-menu-item': once(async () => {
      const m = await import('@aetherui/core/dropdown');
      if (m.defineAeDropdown) m.defineAeDropdown();
    }),
    'ae-menu-separator': once(async () => {
      const m = await import('@aetherui/core/dropdown');
      if (m.defineAeDropdown) m.defineAeDropdown();
    }),
    'ae-menu-section': once(async () => {
      const m = await import('@aetherui/core/dropdown');
      if (m.defineAeDropdown) m.defineAeDropdown();
    }),
    'ae-modal': once(async () => {
      const m = await import('@aetherui/core/modal');
      if (m.defineAeModal && !customElements.get('ae-modal')) m.defineAeModal();
    }),
    'ae-treeview': once(async () => {
      const m = await import('@aetherui/core/treeview');
      if (m.defineAeTreeView && !customElements.get('ae-treeview')) m.defineAeTreeView();
    }),
    'ae-tooltip': once(async () => {
      const m = await import('@aetherui/core/tooltip');
      if (m.defineAeTooltip && !customElements.get('ae-tooltip')) m.defineAeTooltip();
    }),
    'ae-autocomplete': once(async () => {
      const m = await import('@aetherui/core/autocomplete');
      if (m.defineAeAutocomplete && !customElements.get('ae-autocomplete')) m.defineAeAutocomplete();
    }),
    'ae-combo': once(async () => {
      const m = await import('@aetherui/core/combo');
      if (m.defineAeCombo && !customElements.get('ae-combo')) m.defineAeCombo();
    }),
    'ae-toast': once(async () => {
      // Importing the module ensures the custom element class is registered
      const m = await import('@aetherui/core/toast');
      if (m.defineAeToast && !customElements.get('ae-toast')) m.defineAeToast();
    }),
  };

  function detectAndLoad() {
    try {
      const tags = new Set<string>();
      // Scan for any custom element starting with ae-
      document.querySelectorAll('*').forEach((el) => {
        const tag = el.tagName.toLowerCase();
        if (tag.startsWith('ae-')) tags.add(tag);
      });

      const promises: Promise<void>[] = [];
      tags.forEach((tag) => {
        const loader = loaders[tag];
        if (loader) promises.push(loader());
      });

      Promise.all(promises).then(() => {
        window.dispatchEvent(new CustomEvent('aetherui:ready'));
        window.__aetherui_initialized = true;
      });
    } catch (error) {
      console.error('[AetherUI] Error during dynamic registration:', error);
    }
  }

  // Initial detection
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectAndLoad, { once: true });
  } else {
    detectAndLoad();
  }

  // Re-detect on Astro navigation swaps
  document.addEventListener('astro:page-load', detectAndLoad);
  document.addEventListener('astro:after-swap', detectAndLoad);
}