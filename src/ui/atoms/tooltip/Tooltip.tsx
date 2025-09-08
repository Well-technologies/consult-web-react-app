import clsx from "clsx";

import { TooltipProps } from "./Tooltip.types";

export const Tooltip = ({
  children,
  text,
  className,
  ...props
}: TooltipProps) => {
  return (
    <div
      {...props}
      className={clsx(
        "relative group w-min",
        text ? "cursor-pointer" : "cursor-auto",
        className
      )}
    >
      {children}
      {text ? (
        <div className="absolute w-max left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-secondary text-white text-xs rounded py-1 px-2 z-10">
          {text}
        </div>
      ) : null}
    </div>
  );
};
