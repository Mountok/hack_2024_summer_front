import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";
import styles from "./loading.module.css"
const Loading = () => {
  return (
    <div className={styles.loading}>
        <AiOutlineLoading/>
    </div>
  )
}

export default Loading