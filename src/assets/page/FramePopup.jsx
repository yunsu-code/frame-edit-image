import React from 'react'
import styles from "./EditPage.module.scss";


const FramePopup = ({children, open}) => {
  return (
    <div className={`${styles.FramePopup} ${open && styles.open}`}>
      {children}
      <button type='button'>download</button>
      <button type='button'>close</button>
    </div>
  )
}

export default FramePopup