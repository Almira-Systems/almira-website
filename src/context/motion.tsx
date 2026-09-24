"use client";

import { createContext, useContext, useState } from "react";

type MotionType = Boolean;

interface MotionContextType {
  motion?: MotionType;
  setMotion: (motion: MotionType) => void;
}

const MotionContext = createContext<MotionContextType>({
  motion: false,
  setMotion: () => {},
});

export const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  const [motion, setMotion] = useState<MotionType>(true);
  return (
    <MotionContext.Provider value={{ motion, setMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
