import { defineConfig } from 'tsup'

export default defineConfig([
  {
    format: ['cjs'],
    minify: true,
    dts: true,
    entry: ['src/index.cts'],
  },
  {
    format: ['esm'],
    clean: true,
    minify: true,
    entry: ['src/index.ts'],
  }
])