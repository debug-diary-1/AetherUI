import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://aetherui.dev',
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
            { label: 'DataTable', link: '/components/datatable/' },
            { label: 'Dropdown', link: '/components/dropdown/' },
            { label: 'Modal', link: '/components/modal/' },
            { label: 'Radio', link: '/components/radio/' },
            { label: 'Tabs', link: '/components/tabs/' },
            { label: 'Toast', link: '/components/toast/' },
            { label: 'Tooltip', link: '/components/tooltip/' },
            { label: 'TreeView', link: '/components/treeview/' },
          ],
        },
      ],
      components: {
        Hero: './src/components/Hero.astro',
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
