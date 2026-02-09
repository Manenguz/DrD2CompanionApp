import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths so the app works in subfolders like /repo-name/
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure the service worker and manifest are copied correctly
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 3000,
  }
});