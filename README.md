* 安装pnpm
* 


```sh

``` 

### 安装typescript配置
- tsc, ts-loader, @babel/preset-typescript 有什么区别？


### 配置react环境
```sh
# 安装webpack
pnpm add webpack webpack-cli webpack-merge webpack-dev-server @babel/core @babel/preset-react @babel/preset-typescript babel-loader css-loader less style-loader less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin cross-env -D --filter @proj/react-x
pnpm add mini-css-extract-plugin -D --filter @proj/react-x
# 压缩，分治
pnpm i css-minimizer-webpack-plugin terser-webpack-plugin -D --filter @proj/react-x
```

### webpack rollup
```sh
pnpm i core-js -D --filter @proj/react-x
```

### 优化
- FMP
  - 根据需求
    - I/O角度： 让你的bundlesize最小
      - minimize, terser, gzip
        - gzip: compression-webpack-plugin
      - CDN
      - DNS
      - webp


### 构建组件库
- @headlessui/react组件库

gulp 好选择
rollup 分文件夹，一起构建


```sh
# 全局安装
pnpm i @headlessui/react -S -w
```


### 库
- react-app-rewire-inline-source-plugin



### dev log



