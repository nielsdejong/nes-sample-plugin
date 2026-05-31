import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    // Federation only applies to the production build (remoteEntry.js for the host).
    // In dev mode, the app runs standalone without MF — React works natively.
    ...(command === 'build'
      ? [
          federation({
            name: 'sample-plugin',
            filename: 'remoteEntry.js',
            exposes: {
              './plugin': './src/plugin.tsx',
            },
            shared: {
              react: { singleton: true, requiredVersion: '^19.0.0', import: false },
              'react-dom': { singleton: true, requiredVersion: '^19.0.0', import: false },
              'react-dom/client': { singleton: true, requiredVersion: '^19.0.0', import: false },
              'react/jsx-runtime': { singleton: true, requiredVersion: '^19.0.0', import: false },
            },
          }),
        ]
      : []),
  ],
  server: {
    port: 3002,
    strictPort: true,
    cors: true,
    hmr: {
      port: 3002,
    },
  },
  preview: {
    port: 3001,
    strictPort: true,
    cors: true,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
  },
}));
