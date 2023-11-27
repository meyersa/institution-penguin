import React from "react";
import { slide as Menu } from 'react-burger-menu'

import styles from './header.module.css'

export default function Header() {
  var burgerStyles = {
    bmBurgerButton: {
      position: 'relative',
      width: '2.5em',
      height: '2em',
      right: '100%',
    },
    bmBurgerBars: {
      background: '#FEF9F3'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      display: 'none'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      width: '100%',
    },
    bmMenu: {
      padding: '0 1.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#FEF9F3'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmOverlay: {
      backgroundColor: 'rgb(10, 186, 250)',
      opacity: '0.95',
      width: '100%', 
      top: '0', 
      bottom: '0', 
      left: '0', 
      right: '0',
    }
  }

  return (
    <div className={styles.headerbar}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sedgwick+Ave+Display"></link>
      <div className={styles.leftheader}>
        <a href="/" className={styles.inside}>Institution Penguin</a>
      </div> 
      <div className={styles.rightheader}>
          <div className={styles.burgerWrapper}>
            <Menu styles={burgerStyles} right>
              <Link id="about" className={styles.menuitem} href="/about">About</Link>
              <Link id="leaderboard" className={styles.menuitem} href="/leaderboard">Leaderboard</Link>
              <Link id="login" className={styles.menuitem} href="/login">Login</Link>
              <a className={styles.menuitemsmall}>&copy; InstitutionPenguin.com 2023</a>
            </Menu>
          </div>
          <a className={styles.inside} href="/about">About</a>
          <a className={styles.inside} href="/leaderboard">Leaderboard</a>
          <a className={styles.inside} href="/login">Login</a>
      </div> 
    </div>
  );
};