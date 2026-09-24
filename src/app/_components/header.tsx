"use client";
import { useEffect, useState } from "react";
import MotionButton from "./motionButton";
import styles from "./styles.module.scss";
import ThemeButton from "./themeButton";

const Header = () => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (!window) return;
      const mobile = window.matchMedia("(max-width: 600px)").matches;
      setMatches(mobile);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <header className={styles.header}>
      {!matches ? <MotionButton /> : null}
      <ThemeButton />
    </header>
  );
};

export default Header;
