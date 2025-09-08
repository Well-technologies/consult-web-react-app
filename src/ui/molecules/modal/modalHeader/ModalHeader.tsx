import clsx from "clsx";

import CloseIcon from "@/assets/icons/close_icon.png";

import { ModalHeaderProps } from "./ModalHeader.types";

export const ModalHeader = ({
  onClose,
  title,
  isCloseIcon,
  headerClassNames,
  subtitle,
}: ModalHeaderProps) => {
  return (
    <>
      <div
        className={clsx(
          "flex justify-between items-center p-4",
          headerClassNames?.container
        )}
      >
        <div
          className={clsx(
            "flex shrink-0 text-lg font-medium text-slate-800",
            headerClassNames?.title
          )}
        >
          {title}
        </div>
        {isCloseIcon ? (
          <button
            className="cursor-pointer w-10 h-10 p-1.5 rounded-full hover:bg-secondary-50"
            onClick={onClose}
          >
            <img
              className="w-full h-full p-1 "
              src={CloseIcon}
              alt="closeIcon"
            />
          </button>
        ) : null}
      </div>
      {subtitle && (
        <div
          className={clsx(
            "text-gray-500 text-xs px-4 mb-4",
            headerClassNames?.subtitle
          )}
        >
          {subtitle}
        </div>
      )}
      <div className="border-t border-slate-200" />
    </>
  );
};
