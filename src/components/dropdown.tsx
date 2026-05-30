"use client";

import {
  cloneElement,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactElement,
} from "react";
import styles from "./dropdown.module.scss";
import { useMounted } from "@/lib/hooks";

interface DropdownOption {
  label: string;
  value: string;
  onClick?: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  triggerId: string;
  className?: string;
  id?: string;
  trigger?: ReactElement<ComponentProps<"button">>;
}

const Dropdown = ({
  options,
  triggerId,
  id,
  className,
  trigger,
}: DropdownProps) => {
  const dropdownId = useId();
  if (!id) id = dropdownId;
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const clonedTrigger = cloneElement(trigger!, {
    id: triggerId,
    onClick: () => {
      if ("onClick" in (trigger?.props as any)) {
        (trigger?.props as any).onClick();
      }
      setOpen(!open);
    },
    "aria-expanded": open,
    "aria-haspopup": true,
  });

  // useLayoutEffect(() => {
  //   const triggerElement = document.getElementById(
  //     triggerId,
  //   ) as HTMLButtonElement;
  //
  //   if (triggerElement && mounted && dropdownRef.current) {
  //     triggerElement.popoverTargetElement = dropdownRef.current;
  //     triggerElement.popoverTargetAction = "toggle";
  //   }
  // }, [trigger, mounted, dropdownRef.current]);

  return (
    <div className={styles.dropdown_container}>
      {clonedTrigger}
      {open ? (
        <ul
          popover="manual"
          ref={dropdownRef}
          className={`${styles.dropdown} ${className}`}
          id={id}
        >
          {options.map((opt) => (
            <li data-value={opt.value} key={opt.value} onClick={opt.onClick}>
              {opt.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
