import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@component': new URL('./src/components', import.meta.url).pathname,
      '@store': new URL('./src/store', import.meta.url).pathname,
      '@provider': new URL('./src/providers', import.meta.url).pathname,
      '@utils': new URL('./src/utils', import.meta.url).pathname,
      '@type': new URL('./src/types', import.meta.url).pathname,
      '@validation': new URL('./src/validation', import.meta.url).pathname,
      '@asset': new URL('./src/assets', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
