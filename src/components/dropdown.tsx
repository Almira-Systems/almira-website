"use client";

import { Menu } from "@base-ui/react/menu";
import { useFloating, shift, autoUpdate } from "@floating-ui/react";
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

  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    middleware: [
      shift({
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger className={styles.trigger}>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className={styles.dropdown_container}
          sticky={sticky}
          positionMethod={positionMethod}
        >
          <div ref={refs.setReference} />
          <Menu.Popup
            id={id}
            ref={refs.setFloating}
            className={`${styles.dropdown} ${className}`}
            style={floatingStyles}
          >
            {options.map(({ truncate = false, wrap = true, ...opt }) => {
              const itemOnClick = () => {
                if (opt.onClick) {
                  opt.onClick();
                }
              };
              const Item = opt.link ? Menu.LinkItem : Menu.Item;
              const classes = [
                styles.dropdown_item,
                truncate ? styles.truncate : null,
                wrap ? styles.wrap : null,
              ];
              return (
                <Item
                  key={opt.value}
                  onClick={itemOnClick}
                  closeOnClick={false}
                  className={c(...classes)}
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
