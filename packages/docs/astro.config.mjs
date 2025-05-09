import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://aetherui.dev',
  integrations: [
    starlight({
      title: 'Aether UI',
      description: 'A headless, framework-agnostic Web Component library built on Lit',
      defaultLocale: 'root',
      locales: {
        root: {
          lang: 'en',
          label: 'English',
        },
      },
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: 'Aether UI Documentation' },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:description',
            content: 'A headless, framework-agnostic Web Component library built on Lit',
          },
        },
        // Import the monospace fonts
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'anonymous',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap',
          },
        },
        // Simple style for code elements
        {
          tag: 'style',
          content: `:root { --sl-font-mono: 'JetBrains Mono', monospace; }`,
        },
      ],
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Aether UI logo',
      },
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/your-org/aetherui',
          icon: 'github',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/your-org/aetherui/edit/main/packages/docs/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/' },
            { label: 'Installation', link: '/getting-started/installation/' },
            { label: 'Framework Integration', link: '/getting-started/framework-integration/' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Accordion', link: '/components/accordion/' },
            { label: 'Alert', link: '/components/alert/' },
            { label: 'Autocomplete', link: '/components/autocomplete/' },
            { label: 'Button', link: '/components/button/' },
            { label: 'Checkbox', link: '/components/checkbox/' },
            { label: 'Dropdown', link: '/components/dropdown/' },
            { label: 'Modal', link: '/components/modal/' },
            { label: 'Radio', link: '/components/radio/' },
            { label: 'Tabs', link: '/components/tabs/' },
            { label: 'TreeView', link: '/components/treeview/' },
          ],
        },
      ],
      components: {
        PageTitle: './src/components/PageTitle.astro',
        Hero: './src/components/Hero.astro',
        InteractiveExample: './src/components/InteractiveExample.astro',
        DropdownExample: './src/components/DropdownExample.astro',
        TreeViewExample: './src/components/TreeViewExample.astro',
        AutocompleteExample: './src/components/AutocompleteExample.astro',
      },
      customCss: [
        './src/styles/custom.css', 
        './src/styles/global.css'
      ],
      lastUpdated: true,
      pagination: true,
    }),
  ],
});
