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
          attrs: { property: 'og:type', content: 'website' }
        },
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: 'Aether UI Documentation' }
        },
        {
          tag: 'meta',
          attrs: { property: 'og:description', content: 'A headless, framework-agnostic Web Component library built on Lit' }
        }
      ],
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Aether UI logo',
      },
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/your-org/aetherui',
          icon: 'github'
        }
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
            { label: 'Button', link: '/components/button/' },
            { label: 'Accordion', link: '/components/accordion/' },
          ],
        },
      ],
      components: {
        PageTitle: './src/components/PageTitle.astro',
        Hero: './src/components/Hero.astro',
        InteractiveExample: './src/components/InteractiveExample.astro',
      },
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      pagination: true,
    }),
  ],
});
