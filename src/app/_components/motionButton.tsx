"use client";
import { Tooltip } from "@base-ui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMotion } from "@/context/motion";
import styles from "./styles.module.scss";

const MotionButton = () => {
  const { motion, setMotion } = useMotion();
  return (
    <Tooltip.Provider delay={700}>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={() => setMotion(!motion)}
          className={styles.motion_button}
        >
          {motion ? <EyeIcon /> : <EyeOffIcon />}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner className={styles.tooltip_positioner}>
            <Tooltip.Popup className={styles.tooltip_popup}>
              <Tooltip.Arrow className={styles.tooltip_arrow} />
              toggle animations
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MotionButton;
