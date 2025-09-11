import { defineConfig } from 'astro/config';
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite';

// Get the repository name from package.json or environment variables
const REPO_NAME = 'Partneropp'; // Change this if your repo name is different

export default defineConfig({
  integrations: [
    react({
      include: ['**/*.jsx', '**/*.tsx'],
      ssr: false, // Setting to false can help with some hook-related issues
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    // Add optimizeDeps to ensure React is properly bundled
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    // Ensure proper React build for production
    build: {
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
  // GitHub Pages config
  site: `https://RinarCOTO.github.io`,
  base: `/${REPO_NAME}`,
  outDir: './dist',
  build: {
    assets: 'assets',
  },
});
