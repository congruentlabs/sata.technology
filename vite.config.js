import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react({
      // Allow JSX inside .js files (legacy CRA convention used throughout this repo)
      include: /\.(js|jsx)$/,
    }),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      views: path.resolve(__dirname, 'src/views'),
      lib: path.resolve(__dirname, 'src/lib'),
      svg: path.resolve(__dirname, 'src/svg'),
      scss: path.resolve(__dirname, 'src/scss'),
      theme: path.resolve(__dirname, 'src/theme'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
