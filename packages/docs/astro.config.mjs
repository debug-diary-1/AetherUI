import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Defaults match the Vercel preview layout (site root + /docs/). The GitHub Pages
// workflow (.github/workflows/deploy.yml) overrides these because project pages are
// served from https://debug-diary-1.github.io/AetherUI/ and need the repo prefix.
const site = process.env.DOCS_SITE ?? 'https://aetherui-seven.vercel.app';
const base = process.env.DOCS_BASE ?? '/docs/';

export default defineConfig({
  site,
  base,
  outDir: './dist',
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
      ],
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Aether UI logo',
      },
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/debug-diary-1/AetherUI',
          icon: 'github',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            {
              label: 'Framework integrations',
              items: [
                { label: 'React', slug: 'getting-started/integrations/react' },
                {
                  label: 'Vue, Angular, Svelte, Solid, Vanilla',
                  slug: 'getting-started/integrations/other-frameworks',
                },
              ],
            },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Accordion', slug: 'components/accordion' },
            { label: 'Alert', slug: 'components/alert' },
            { label: 'Autocomplete', slug: 'components/autocomplete' },
            { label: 'Badge', slug: 'components/badge' },
            { label: 'Breadcrumb', slug: 'components/breadcrumb' },
            { label: 'Button', slug: 'components/button' },
            { label: 'Checkbox', slug: 'components/checkbox' },
            { label: 'Combo', slug: 'components/combo' },
            { label: 'Drawer', slug: 'components/drawer' },
            { label: 'Dropdown', slug: 'components/dropdown' },
            { label: 'Input', slug: 'components/input' },
            { label: 'Menu', slug: 'components/menu' },
            { label: 'Modal', slug: 'components/modal' },
            { label: 'Pagination', slug: 'components/pagination' },
            { label: 'Popover', slug: 'components/popover' },
            { label: 'Progress', slug: 'components/progress' },
            { label: 'Radio', slug: 'components/radio' },
            { label: 'Select', slug: 'components/select' },
            { label: 'Spinner', slug: 'components/spinner' },
            { label: 'Switch', slug: 'components/switch' },
            { label: 'Tabs', slug: 'components/tabs' },
            { label: 'Textarea', slug: 'components/textarea' },
            { label: 'Toast', slug: 'components/toast' },
            { label: 'Tooltip', slug: 'components/tooltip' },
            { label: 'TreeView', slug: 'components/treeview' },
          ],
        },
      ],
      components: {
        Hero: './src/components/Hero.astro',
        Head: './src/components/Head.astro',
        ThemeSelect: './src/components/ThemeToggle.astro',
      },
      customCss: ['./src/styles/custom.css', './src/styles/global.css'],
      pagination: true,
    }),
  ],
});
