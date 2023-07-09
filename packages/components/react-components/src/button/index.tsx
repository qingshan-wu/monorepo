import React, { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const Button: FC<IProps> = (p) => {
  return <button>hello your {p.children}</button>
}

export default Button;