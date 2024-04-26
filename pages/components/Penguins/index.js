import React, { useEffect, useState } from "react";
import styles from "./penguins.module.css";

export default function Penguins() {
  const [position, setPosition] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEdge = Math.floor(Math.random() * 4); // 0 for top, 1 for right, 2 for bottom, 3 for left
      let newPosition = { ...position };

      switch (randomEdge) {
        case 0: // Top edge
          newPosition = { top: "6em", right: "initial", bottom: "initial", left: "initial" };
          break;
        case 1: // Right edge
          newPosition = { top: "initial", right: "0", bottom: "initial", left: "initial" };
          break;
        case 2: // Bottom edge
          newPosition = { top: "initial", right: "initial", bottom: "0", left: "initial" };
          break;
        case 3: // Left edge
          newPosition = { top: "initial", right: "initial", bottom: "initial", left: "0" };
          break;
        default:
          break;
      }

      setPosition(newPosition);
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return <div className={styles.penguin} style={position} />;
}
