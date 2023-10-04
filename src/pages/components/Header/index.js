import React from "react";
import Burger from "../Burger/index.js"

import styles from './header.module.css'

export default function Header() {
  return (
    <div className={styles.headerbar}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sedgwick+Ave+Display"></link>
      <div className={styles.leftheader}>
        <a href="/" className={styles.inside}>Institution Penguin</a>
      </div> 
      <div className={styles.rightheader}>
          <a className={styles.inside} href="/about">About</a>
          <a className={styles.inside} href="/leaderboard">Leaderboard</a>
          <a className={styles.inside} href="/login">Login</a>
          <Burger />
      </div> 
    </div>
  );
};