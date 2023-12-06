import React from "react";

import styles from "./wrapper.module.css";

export default function Wrapper({ children, noCategories }) {
  return (
    <div className={styles.outside}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.0.0-rc/browser/pixi.min.js"></script>
      <script src="/game/script.js"></script>

    </div>
  );
}