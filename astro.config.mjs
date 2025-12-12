import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { imagetools } from 'vite-imagetools';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  integrations: [
    react()
  ],

  vite: {
    plugins: [imagetools()],
    build: {
      cssMinify: 'lightningcss'
    },
    ssr: {
      noExternal: ['@nanostores/react', 'nanostores']
    },
    // Fix Safari localhost issues
    server: {
      hmr: {
        // Use polling for HMR to fix Safari WebSocket issues
        protocol: 'ws',
        host: 'localhost',
      }
    }
  },

  // Dev server configuration
  server: {
    host: true, // Allow external connections
    port: 4321,
  },

  // Image optimization
  image: {
    domains: ['images.unsplash.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});
