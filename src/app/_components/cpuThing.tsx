"use client";
import { c } from "@/lib/utils";
import styles from "../page.module.scss";
import { useEffect, useState } from "react";
import { useMotion } from "@/context/motion";
const CpuThingIcon = ({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id={`svg${id}`}
    width="792.486"
    height="675.525"
    version="1.1"
    viewBox="0 0 209.679 178.733"
    className={className}
  >
    <title>cpu thing</title>
    <g
      id={`layer${id}`}
      fill="none"
      stroke="#d94a4a"
      strokeDasharray="none"
      strokeLinecap="square"
      paintOrder="markers fill stroke"
      transform="translate(20.45 -30.424)"
    >
      <rect
        id={`rect${id}`}
        width="43.953"
        height="43.953"
        x="83.024"
        y="126.524"
        strokeWidth="3.175"
        rx="4"
        ry="4"
      ></rect>
      <path
        id={`path2_${id}`}
        strokeWidth="3.175"
        d="M105 126.524V32.012"
      ></path>
      <path
        id={`path3_${id}`}
        strokeWidth="3.175"
        d="M115.853 126.524V67.327"
      ></path>
      <path
        id={`path4_${id}`}
        strokeWidth="3.175"
        d="M115.853 126.524V91.22"
        transform="matrix(-1 0 0 1 210 0)"
      ></path>
      <path
        id={`path5_${id}`}
        strokeWidth="2.612"
        d="M126.976 148.232h60.946"
      ></path>
      <path
        id={`path6_${id}`}
        strokeWidth="2.612"
        d="M126.976 159.62h38.173"
      ></path>
      <path
        id={`path7_${id}`}
        strokeWidth="3.141"
        d="M127.238 137.647h34.551"
      ></path>
      <path
        id={`path8_${id}`}
        strokeWidth="3.175"
        d="M94.147 170.488v22.755a1.59 1.59 135 0 1-1.587 1.587H70.423"
      ></path>
      <path
        id={`path6_${id}`}
        strokeWidth="3.175"
        d="M115.853 170.476v35.506a1.59 1.59 135 0 1-1.588 1.588H76.6"
        transform="translate(-10.853)"
      ></path>
      <path
        id={`path7_${id}`}
        strokeWidth="3.024"
        d="M115.853 170.34v28.2"
      ></path>
      <path
        id={`path8_${id}`}
        strokeWidth="3.175"
        d="M115.853 186.027h13.854"
      ></path>
      <path
        id={`path9_${id}`}
        strokeWidth="3.175"
        d="M83.024 148.5H-18.863"
      ></path>
      <path
        id={`path10_${id}`}
        className={styles.late}
        strokeWidth="3.175"
        d="M8.084 148.5v-17.744a1.59 1.59 45 0 0-1.587-1.588h-15.12"
      ></path>
      <path
        id={`path13_${id}`}
        strokeWidth="3.175"
        d="M83.024 137.647H21.34"
      ></path>
      <path
        id={`path14_${id}`}
        strokeWidth="3.175"
        d="M68.835 137.647V119.41"
      ></path>
      <path
        id={`path15_${id}`}
        strokeWidth="3.175"
        d="M83.024 159.353H40.65"
      ></path>
      <path
        id={`path16_${id}`}
        strokeWidth="3.175"
        d="M53.607 159.353v9.79a1.59 1.59 135 0 1-1.587 1.588h-7.05"
      ></path>
      <path
        className={styles.late}
        id={`path17_${id}`}
        strokeWidth="3.175"
        d="M105 62.246h-8.647a1.59 1.59 45 0 1-1.588-1.588V40.691"
      ></path>
    </g>
    <linearGradient id="cpu_thing_gradient">
      <stop offset="0%" stopColor="#d94a4a" stopOpacity="0" />
      <stop offset="20%" stopColor="#d94a4a" stopOpacity="1" />
      <stop offset="100%" stopColor="#d94a4a" stopOpacity="0" />
    </linearGradient>
  </svg>
);

export const CpuThing = () => {
  const [matches, setMatches] = useState(false);
  const { motion } = useMotion();
  useEffect(() => {
    const checkSize = () => {
      if (typeof window !== "undefined") {
        setMatches(window.matchMedia("(min-width: 600px)").matches);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);
  return !matches ? null : (
    <>
      {!motion ? null : (
        <div className={c(styles.cpu_thing, styles.top, styles.left)}>
          <CpuThingIcon className={styles.pulses} id="pulses_hero" />
        </div>
      )}
      <div className={c(styles.cpu_thing, styles.top, styles.left)}>
        <CpuThingIcon className={styles.background} id="background_hero" />
      </div>
    </>
  );
};

export default CpuThing;
