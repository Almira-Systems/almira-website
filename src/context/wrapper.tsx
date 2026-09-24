"use client";
import { MotionWrapper } from "./motion";
import { ThemeWrapper } from "./theme";
export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeWrapper>
      <MotionWrapper>{children}</MotionWrapper>
    </ThemeWrapper>
  );
};
