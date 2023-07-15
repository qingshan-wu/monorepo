import React from "react";
import styles from './app.module.less';
import {Button} from '@proj/react-components'

type Props = {}

export default function App({}: Props) {
  console.log('hello: this is a app')
  return (
    <div>
      <div className="title">App----</div>
      <div className={styles.hello}>hello csss module </div>
      <div className="text-blue-600 text-lg">hello tailwindcss</div>
      <Button>点击试试</Button>
    </div>
  )
}