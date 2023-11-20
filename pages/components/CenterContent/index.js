import React from "react";

import styles from './centercontent.module.css'

export default function CenterContent({ children }) {
  return (
    <div className={styles.CenterBox}>
      {children}
    </div>
  );
};