"use client";
import { useTheme } from "@/context/theme";
import styles from "./styles.module.scss";
import { CloudIcon, MoonIcon, SunIcon } from "lucide-react";
import { Tooltip } from "@base-ui/react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Tooltip.Provider delay={700}>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={styles.theme_button}
        >
          {theme ? (
            theme === "light" ? (
              <MoonIcon />
            ) : (
              <SunIcon />
            )
          ) : (
            <CloudIcon />
          )}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner className={styles.tooltip_positioner}>
            <Tooltip.Popup className={styles.tooltip_popup}>
              <Tooltip.Arrow className={styles.tooltip_arrow} />
              toggle theme
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ThemeButton;
