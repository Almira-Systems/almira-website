import { c } from "@/lib/utils";
import styles from "./button.module.scss";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}
const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={c(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
