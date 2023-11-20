import React from "react";

import styles from './footer.module.css'

export default function Header() {
  return (
    <div className={styles.footer}>
      <div className={styles.footertext}>
        <a className={styles.inside}>&copy; InstitutionPenguin.com 2023</a>
        <a className={styles.inside} href="/about">About</a>
        <a className={styles.inside} href="/leaderboard">Leaderboard</a>
        <a className={styles.inside} href="/login">Login</a>
      </div>
    </div>
  );
};