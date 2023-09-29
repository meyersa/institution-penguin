import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">Institution Penguin</Link>
        <Link href="/leaderboard"></Link>
      </div>
    </nav>     
  )
}