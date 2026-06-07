import { defineConfig } from 'tsup';

export default defineConfig([
  // Vanilla TS entries (no React)
  {
    entry: {
      index: 'src/index.ts',
      'tokens/index': 'src/tokens/index.ts',
      'components/index': 'src/components/index.ts',
      'themes/index': 'src/themes/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
  },
  // React wrappers entry
  {
    entry: {
      'react/index': 'src/react/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    splitting: false,
    external: ['react', 'react-dom'],
    esbuildOptions(opts) {
      opts.jsx = 'automatic';
    },
  },
]);

