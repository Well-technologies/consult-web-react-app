import clsx from "clsx";
import { useEffect, useRef } from "react";

import { PopupMenuProps } from "./PopupMenu.types";

export const PopupMenu = ({
  children,
  componentClassName,
  containerClassName,
  open,
  onClose,
  component,
}: PopupMenuProps) => {
  const actionRef = useRef<HTMLDivElement>(null);
  const popupMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionRef?.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        if (
          popupMenuRef?.current &&
          !popupMenuRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={clsx("flex relative", containerClassName)} ref={actionRef}>
      {children}
      <div
        className={clsx(
          "absolute z-10 p-2 rounded-md shadow-md border bg-white border-secondary-100 dark:border-secondary-700 dark:bg-secondary-700",
          componentClassName,
          !open ? "hidden" : ""
        )}
        ref={popupMenuRef}
      >
        {component}
      </div>
    </div>
  );
};
