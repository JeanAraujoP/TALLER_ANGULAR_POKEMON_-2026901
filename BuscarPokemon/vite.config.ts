import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    middlewareMode: true,
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      port: 443,
    },
  },
});
