### bundleless构建
- gulp
  - pipeline 的一个设计


### rollup插件安装
```sh

pnpm i rollup-plugin-auto-add rollup-plugin-typescript2 rollup-plugin-clear  -D  --filter @proj/react-components 

pnpm i @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-peer-deps-external @rollup/plugin-alias rollup-plugin-filesize rollup-plugin-postcss rollup-plugin-terser rollup-plugin-multi-input  -D  --filter @proj/react-components 

```
### 先构建cmd版本


### 组件库打包的方案有哪些？

一般情况下，我们需要“三证齐全”

#### umd
`<script src="xxxx.xxx.xxx.cdn.xxx.js"></script>`
  - 无treeshake
#### cjs
`const xxx = require('xxxx')`
#### esm 
`import { Button } from '@proj/c'`




### 为什么用rollup 而不是 webpack/ vite
- rollup更轻量，选中bundleless而不是bundle
  - 为何？
  - 