import React from "react";
import styles from './app.module.less';

type Props = {}

export default function App({}: Props) {
  return (
    <div>
      <div className="title" style={{
        color: process.env.PRIMARY,
      }}>App----</div>
      <div className={styles.hello}>hello csss module </div>
      <div className="text-blue-600 text-lg">hello tailwindcss</div>
    </div>
  )
}