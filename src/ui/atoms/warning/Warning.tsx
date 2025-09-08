import clsx from "clsx";

import CautionIcon from "@/assets/icons/caution_icon.svg";

import { WarningProps } from "./Warning.types";

export const Warning = ({
  warningText,
  bgColor,
  textColor,
  warningIconColor,
  actionButtonText,
  actionButtonFunction,
}: WarningProps) => {
  return (
    <div
      className={clsx(
        "flex rounded-lg py-2 px-3 items-center w-full mt-4",
        bgColor || "bg-yellow-200"
      )}
    >
      <div className="flex-shrink-0 pe-2">
        <img
          src={CautionIcon}
          className={clsx("h-4 aspect-square", warningIconColor || "")}
          alt="caution_icon"
        />
      </div>
      <div
        className={clsx("text-xs text-red-500", textColor || "text-yellow-600")}
      >
        {warningText}
        {!!actionButtonText ? (
          <button
            className="text-xs text-yellow-600 underline cursor-pointer font-semibold"
            onClick={actionButtonFunction}
          >
            {actionButtonText}
          </button>
        ) : null}
      </div>
    </div>
  );
};
