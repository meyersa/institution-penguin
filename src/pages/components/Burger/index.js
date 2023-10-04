import React from "react";

import styles from './burger.module.css'

export default function Burger() {
  return (
    <nav className={styles.mobile_menu}>
        <ul>
          <li><a>Menu</a>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
            </ul>
          </li>
        </ul>
      </nav>
  )
};