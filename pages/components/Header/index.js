import React, { useEffect, useState } from "react";
import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'
import { useSession } from "next-auth/react"
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

  const { data: session, status: status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  // Swap "Login" to "Logout" depending on session status
  useEffect(() => {
    if (status == "authenticated") {
      setLoggedIn(true);

    } 
  }, [status]);

  if (loggedIn) {
    return (
      <div className={styles.headerbar}>
        <div className={styles.leftheader}>
          <Link className={styles.inside} href="/">institution penguin</Link>
        </div> 
        <div className={styles.rightheader}>
            <div className={styles.burgerWrapper}>
              <Menu styles={burgerStyles} right>
                <Link id="about" className={styles.menuitem} href="/about">About</Link>
                <Link id="leaderboard" className={styles.menuitem} href="/leaderboard">Leaderboard</Link>
                <Link id="login" className={styles.menuitem} href="/login">Logout</Link>
                <a className={styles.menuitemsmall}>&copy; InstitutionPenguin.com {(new Date()).getFullYear()}</a>
              </Menu>
            </div>
            <Link className={styles.inside} href="/about">About</Link>
            <Link className={styles.inside} href="/leaderboard">Leaderboard</Link>
            <Link className={styles.inside} href="/login">Logout</Link>
        </div> 
      </div>
    );
  } else {
    return (
      <div className={styles.headerbar}>
        <div className={styles.leftheader}>
          <Link className={styles.inside} href="/">institution penguin</Link>
        </div> 
        <div className={styles.rightheader}>
            <div className={styles.burgerWrapper}>
              <Menu styles={burgerStyles} right>
                <Link id="about" className={styles.menuitem} href="/about">About</Link>
                <Link id="leaderboard" className={styles.menuitem} href="/leaderboard">Leaderboard</Link>
                <Link id="login" className={styles.menuitem} href="/login">Login</Link>
                <a className={styles.menuitemsmall}>&copy; InstitutionPenguin.com {(new Date()).getFullYear()}</a>
              </Menu>
            </div>
            <Link className={styles.inside} href="/about">About</Link>
            <Link className={styles.inside} href="/leaderboard">Leaderboard</Link>
            <Link className={styles.inside} href="/login">Login</Link>
        </div> 
      </div>
    );
  }

};