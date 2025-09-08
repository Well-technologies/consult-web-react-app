import clsx from "clsx";

import { CardViewActionsProps } from "./CardViewActions.types";

export const CardViewActions = ({ options }: CardViewActionsProps) => {
  return (
    <div className="flex flex-col gap-1 p-1 min-w-[100px]">
      {options.map(({ icon, text, onClick, className }) => (
        <button
          key={text}
          onClick={onClick}
          disabled={className === "opacity-20"}
          className={clsx(
            "flex p-1 rounded-full w-full gap-2 items-center hover:bg-secondary-50",
            className
          )}
        >
          {icon}
          <p className="text-secondary px-2 ">{text}</p>
        </button>
      ))}
    </div>
  );
};
