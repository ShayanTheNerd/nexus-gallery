import { defineConfig } from '@shayanthenerd/eslint-config';

export default defineConfig({
  autoDetectDeps: 'verbose',
  configs: {
    baseline: {
      baseline: 'newly',
    },
    html: true,
    node: {
      overrides: {
        rules: {
          'n/file-extension-in-import': 'off',
        },
      },
    },
  },
});
