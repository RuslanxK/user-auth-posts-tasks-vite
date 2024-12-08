import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Use Vitest's globals like `vi` without needing to import them
    environment: 'jsdom', // Simulate a browser environment for React components
    setupFiles: './src/tests/setup.ts', // Path to your setup file (optional)
  },
});
