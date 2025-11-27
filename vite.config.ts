import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  base: './', // Ensures assets are loaded correctly on GitHub Pages sub-paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});