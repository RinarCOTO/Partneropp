import { defineConfig } from 'astro/config';
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite';

// Get the repository name from package.json or environment variables
const REPO_NAME = 'Partneropp'; // Change this if your repo name is different

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  // GitHub Pages config
  site: `https://RinarCOTO.github.io`,
  base: `/${REPO_NAME}`,
  outDir: './dist',
  build: {
    assets: 'assets',
  },
});
