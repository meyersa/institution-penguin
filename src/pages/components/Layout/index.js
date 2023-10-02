import React from "react";

import styles from "./layout.module.css";

export default function Layout({ children, noCategories }) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  );
}