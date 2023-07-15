### 简陋的复制粘贴cli

- 安装
```sh
npm i shabby-cv -g
```

- 在项目根目录创建一个.shabbyrc文件
```json
{
  "choices": [
    {
      "choice": "react-component-dir",
      "template": "./templates/reactComponent"
    },
    {
      "choice": "interface-definition",
      "template": "./templates/service"
    }
  ]
}
```
- 导出一组可以生成模板的函数，用于在路径中生成一组模板文件
```js
// ./templates/reactComponent.js
const getPrefixCls = name => name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
const comp = (name) => {
  const compName = name.replace(/^\w/, (match) => match.toUpperCase())
  const prefixCls = getPrefixCls(name)
  return `
import React from 'react';
const prefixCls = '${prefixCls}'

const ${compName} = () => {
  return <div className={${'`$'}{prefixCls}-wrap${'`'}}>${name}</div>
}

export default ${compName}
`
}
const compStyles = (name) => {
  return `
.${getPrefixCls(name) } {
  &-wrap {
    position: relative;
  }
}
`
}
module.exports = {
  "index.tsx": comp,
  "style.module.scss": compStyles
}
```

- 操作
```sh
shabby-cv
# 选择要cv的模板
# 输入要复制到的路径
# 完成
```