// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://lagsync.com',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
    format: 'directory'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});