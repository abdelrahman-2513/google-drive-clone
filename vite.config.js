import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 443,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Add the following section
  preview: {
    port: 4173,
    open: false,
    host: true,
    strictPort: true,
    fs: {
      strict: true,
    },
    server: {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  },
  // Add the following section
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Add the following option
    target: 'esnext',
    // Add the following option
    assetsInlineLimit: 0,
    // Add the following option
    chunkSizeWarningLimit: 1000,
  },
  // Add the following section
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 443,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // Add the following option
    fs: {
      strict: true,
    },
  },
});