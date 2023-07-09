const pkg = require('../package.json')
const clear = require('rollup-plugin-clear');
const autoAdd = require('rollup-plugin-auto-add').default;
const ts = require('rollup-plugin-typescript2')
const path = require('path')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const nodeResolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const fileSize = require('rollup-plugin-filesize')
const postcss = require('rollup-plugin-postcss')
const {terser} = require('rollup-plugin-terser')
const alias = require('@rollup/plugin-alias')
const multiInput = require('rollup-plugin-multi-input').default

const banner = `/**
* @author: qingshan
* @license: ${pkg.license}
* @version: ${pkg.version}
*/`


module.exports = [
  // esm
  {
    input: 'src/**/*',
    external: Object.keys(pkg.peerDependencies || {}),
    output: [{
      banner,
      dir: 'dist/esm',
      format: 'esm',
      sourceMap: true,
      globals: {
        react: "React"
      }
    }],
    plugins: [
      // 每次构建都清除之前的构建
      clear({
        targets: ['dist/esm'],
      }),
      multiInput(),
      autoAdd({
        // match /root/my-project/src/*/index.tsx
        include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
      }),
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.umd.json')
      }),
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      fileSize(),
      postcss({
        minimize: true,
        sourceMap: false,
        extensions: ['.less', '.scss'],
        use: [['less']]
      }),
      alias({
        entries: {
          "@": path.resolve(__dirname, '../src'),
        }
      }),
    ],

  },
  // umd
  {
    input: 'src/index.tsx',
    // 不将下列的依赖打包进组件库产物
    external: Object.keys(pkg.peerDependencies || {}),
    output: [{
      banner,
      dir: 'dist/umd',
      format: 'umd',
      exports: 'named',
      name: 'react-components',
      globals: {
        react: 'React',
      }
    }],
    plugins: [
      // 每次构建都清除之前的构建
      clear({
        targets: ['dist/umd'],
      }),
      autoAdd({
        // match /root/my-project/src/*/index.tsx
        include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
      }),
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.umd.json')
      }),
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      fileSize(),
      postcss({
        minimize: true,
        sourceMap: false,
        extensions: ['.less', '.scss'],
        use: [['less']]
      }),
      alias({
        entries: {
          "@": path.resolve(__dirname, '../src'),
        }
      }),
      terser()
    ],
  }
]