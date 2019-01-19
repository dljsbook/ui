import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'dljsbookUI',
    globals: {
      vega: 'vega',
      '@tensorflow/tfjs-vis': 'tfvis',
      '@tensorflow/tfjs': 'tf',
    }
  },
  plugins: [
    typescript({
    }),
  ],
  external: [
    '@tensorflow/tfjs',
    '@tensorflow/tfjs-vis',
    'vega',
  ],
}
