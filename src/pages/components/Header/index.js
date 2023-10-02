import React, { useEffect, useState } from "react";
import Link from 'next/link';

import styles from './header.module.css'

export default function Header() {
  return (
    <div className={styles.headerbar}>
      <div className={styles.leftheader}>
        <a href="/" className={styles.inside}>Institution Penguin</a>
      </div> 
      <div className={styles.rightheader}>
          <a className={styles.inside} href="#about">About</a>
          <a className={styles.inside} href="#leaderboard">Leaderboard</a>
      </div> 
  </div>
  );
};