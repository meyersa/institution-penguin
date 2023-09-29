import React from "react";

import styles from "./layout.module.css";
import Header from "../Header/index.js";

export default function Layout({ children, noCategories }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}