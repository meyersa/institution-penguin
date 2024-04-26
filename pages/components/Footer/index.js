import React from "react";
import Link from 'next/link'

import styles from './footer.module.css'

export default function Header() {
  return (
    <div className={styles.footer}>
      <div className={styles.footertext}>
        <a>&copy; InstitutionPenguin.com {(new Date()).getFullYear()}</a>
        <a className={styles.mobile} style={{display: 'none'}}>|</a>
        <Link className={styles.link} href="/about">About</Link>
        <Link className={styles.link} href="/leaderboard">Leaderboard</Link>
        <Link className={styles.link} href="/login">Login</Link>
        <Link className={styles.link} href="/information">Info</Link>
        <Link className={styles.link} href="https://github.com/meyersa/institution-penguin">Github</Link>
        <a>Images provided by Dalle 3</a>
      </div>
    </div>
  );
};