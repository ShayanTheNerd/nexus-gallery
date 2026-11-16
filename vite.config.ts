import { devtools as vitePluginTanstackDevtools } from '@tanstack/devtools-vite';
import { tanstackRouter as vitePluginTanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import vitePluginReact from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('app', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    vitePluginTanstackDevtools(),
    vitePluginTanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: 'app/pages',
      generatedRouteTree: './app/routeTree.gen.ts',
    }),
    vitePluginReact(),
  ],
});
