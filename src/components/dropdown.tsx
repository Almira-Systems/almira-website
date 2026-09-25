"use client";

import { Menu } from "@base-ui/react/menu";
// import { useFloating, shift, autoUpdate } from "@floating-ui/react";
import { useId, type ComponentProps, type ReactElement } from "react";
import styles from "./dropdown.module.scss";
import { c } from "@/lib/utils";

interface DropdownOption {
  label: React.ReactNode;
  value: string;
  link?: boolean;
  href?: string;
  onClick?: () => void;
  wrap?: boolean;
  truncate?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  trigger: ReactElement<ComponentProps<"button">>;
  separators?: boolean;
  triggerId?: string;
  sticky?: boolean;
  className?: string;
  id?: string;
  positionMethod?: "absolute" | "fixed";
}

const Dropdown = ({
  options,
  id,
  className,
  trigger,
  positionMethod = "absolute",
  sticky = false,
}: DropdownProps) => {
  const dropdownId = useId();
  if (!id) id = dropdownId;

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger className={styles.trigger}>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className={styles.menu_positioner}
          sticky={sticky}
          positionMethod={positionMethod}
        >
          <Menu.Popup id={id} className={`${styles.menu_popup} ${className}`}>
            {options.map(({ truncate = false, wrap = true, ...opt }) => {
              const itemOnClick = () => {
                if (opt.onClick) {
                  opt.onClick();
                }
              };
              const Item = opt.link ? Menu.LinkItem : Menu.Item;
              const classes = [
                styles.menu_item,
                truncate ? styles.truncate : null,
                wrap ? styles.wrap : null,
              ];
              return (
                <Item
                  key={opt.value}
                  onClick={itemOnClick}
                  closeOnClick={false}
                  className={c(...classes)}
                  //@ts-ignore
                  href={(opt.href?.length ?? 0) > 0 ? opt.href : null}
                >
                  {opt.label}
                </Item>
              );
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};

export default Dropdown;
