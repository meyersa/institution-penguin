import React from "react";

import styles from "./wrapper.module.css";

export default function Wrapper({ children, noCategories }) {
  return (
    <div className={styles.outside}>
      <h1 className={styles.h1}>Welcome to Institution Penguin!</h1>
    </div>
  );
}