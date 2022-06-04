import React, { useEffect } from 'react'
import styles from "./Landing.module.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component'



function Landing() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainbox}>
        <div className={styles.wel_text}>WELCOME TO</div>
        <div className={styles.event_tit1}>
          <h1 className={styles.a}>P</h1>
          <h1 className={styles.b}>E</h1>
          <h1 className={styles.g}>G</h1>
          <h1 className={styles.d}>A</h1>
          <h1 style={{ color: 'darkgoldenrod'}}className={styles.c}>$</h1>
          <h1 className={styles.e}>U</h1>
          <h1 className={styles.a}>S</h1>
        </div><br></br>
        <div className={styles.event_tit2}>
          <h1 className={styles.d}>B</h1>
          <h1 className={styles.e}>A</h1>
          <h1 className={styles.a}>N</h1>
          <h1 className={styles.g}>K</h1>
        </div>
      </div>
    </div>
  )
}

export default Landing