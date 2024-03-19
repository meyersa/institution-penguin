import React from "react";
import Link from 'next/link'

import styles from './footer.module.css'

export default function Header() {
  return (
    <div className={styles.footer}>
      <div className={styles.footertext}>
        <a className={styles.inside}>&copy; InstitutionPenguin.com {(new Date()).getFullYear()}</a>
        <Link className={styles.inside} href="/about">About</Link>
        <Link className={styles.inside} href="/leaderboard">Leaderboard</Link>
        <Link className={styles.inside} href="/login">Login</Link>
        <a className={styles.inside}>Images provided by Dalle 3 and Freepik</a>
      </div>
    </div>
  );
};