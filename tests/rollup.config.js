import istanbul from 'rollup-plugin-istanbul';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  output: {
    file: 'build/test-bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  external: ['ava'],
  plugins: [babel({
    babelrc: false,
    presets: ['stage-3'],
    exclude: 'node_modules/**'
  }), multiEntry(), istanbul({
    exclude: ['tests/**/*-test.js']
  }), resolve(), commonjs()]
};
