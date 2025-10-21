// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://diego-dev.barreiro.dev',
  integrations: [
    icon(),
    sitemap({
      lastmod: new Date()
    })
  ],
  build: {
    inlineStylesheets: 'never'
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  }
});