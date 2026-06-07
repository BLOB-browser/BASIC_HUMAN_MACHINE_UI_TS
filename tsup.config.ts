import { defineConfig } from 'tsup';

export default defineConfig([
  // Core: themes + tokens
  {
    entry: {
      index: 'src/index.ts',
      'tokens/index': 'src/tokens/index.ts',
      'themes/index': 'src/themes/index.ts',
      'tailwind-preset': 'src/tailwind-preset.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
  },
  // React + Radix layer
  {
    entry: {
      'react/index': 'src/react/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    splitting: false,
    external: [
      'react', 'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-popover',
      '@radix-ui/react-accordion',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-switch',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      'sonner',
    ],
    esbuildOptions(opts) {
      opts.jsx = 'automatic';
    },
  },
]);

