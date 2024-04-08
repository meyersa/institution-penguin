import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./header.module.css";

export default function Header() {
  const { data: session, status: status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuDisplayed, setDisplayed] = useState(false);

  // Handle default values
  let profPicture = session?.user.image ? session.user.image : "/images/default-avatar.png";
  let displayText = session?.displayName ? session.displayName : "Login";

  // Swap "Login" to "Logout" depending on session status
  useEffect(() => {
    if (status == "authenticated") {
      setLoggedIn(true);
    }
  }, [status]);

  // Push /login on desktop and open menu on mobile
  function handleButtonClick() {
    // Push to login on desktop
    if (window.innerWidth > 740) {
      window.location.href = "/login";
      return;
    }

    // Display menu
    if (!menuDisplayed) {
      document.getElementById("mobileMenu").style.transform = "translateY(calc(0% + 6em))";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      setDisplayed(true);
      return;
    }

    // Hide menu
    document.getElementById("mobileMenu").style.transform = "translateY(-100%)";
    document.body.style.height = "initial";
    document.body.style.overflow = "initial";
    setDisplayed(false);
    return;
  }

  function handleMobileRedirect(redirectPage) {
    if (window.location.pathname == redirectPage) {
      handleButtonClick();
      return;
    }

    document.body.style.height = "initial";
    document.body.style.overflow = "initial";
    window.location.href = redirectPage;
    setDisplayed(false);
    return;
  }

  return (
    <div className={styles.headerOutside} id="headerOutside">
      <div className={styles.headerbar}>
        <div className={styles.leftheader}>
          <Link className={styles.inside} href="/">
            institution penguin
          </Link>
        </div>
        <div className={styles.rightheader}>
          <Link className={styles.inside} href="/about">
            About
          </Link>
          <Link className={styles.inside} href="/leaderboard">
            Leaderboard
          </Link>
          <button id="profileButton" className={styles.profileButton} onClick={() => handleButtonClick()}>
            {loggedIn ? (
              <Image className={styles.headerImage} src={profPicture} height={50} width={50} alt="Profile picture" />
            ) : (
              <i className={["fa", "fa-bars", styles.FABars].join(" ")} />
            )}
            <a className={styles.headerText}>{displayText}</a>
          </button>
        </div>
      </div>
      <div id="mobileMenu" className={styles.mobileMenu}>
        <Image className={styles.mobilePenguin} src="/images/penguin-2.svg" alt="Penguin sliding in" width={"500"} height={"500"}/>
        <div className={styles.mobileTop}>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/about")}>
            About
          </button>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/leaderboard")}>
            Leaderboard
          </button>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/login")}>
            {loggedIn ? "Logout" : "Login"}
          </button>
          <button className={styles.menuexit} onClick={() => handleButtonClick()}>
            X
          </button>
        </div>
        <a className={styles.menuitemsmall}>&copy; InstitutionPenguin.com {new Date().getFullYear()}</a>
      </div>
    </div>
  );
}
