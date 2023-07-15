

const getPrefixCls = name => name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
const comp = (name) => {
  const compName = name.replace(/^\w/, (match) => match.toUpperCase())
  const prefixCls = getPrefixCls(name)

  return `
import React, { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);
const prefixCls = '${prefixCls}'

interface IProps {
  name: string;
}

const ${compName}:FC<IProps> = (props) => {

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div className={cx(${'`$'}{prefixCls}-wrap${'`'})}>hellp ${compName}</div>
  )
}

export default ${compName};
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

