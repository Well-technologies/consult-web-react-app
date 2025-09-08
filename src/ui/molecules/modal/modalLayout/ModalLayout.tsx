import clsx from "clsx";

import { ModalLayoutProps } from "./ModalLayout.types";

export const ModalLayout = ({
  onClose,
  children,
  open,
  isCloseOnOutsideClickDisabled,
  modalLayoutClassName,
}: ModalLayoutProps) => {
  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-[9999] grid h-screen w-screen place-items-center backdrop-blur-xs transition-opacity duration-300",
          !open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => !isCloseOnOutsideClickDisabled && onClose()}
      >
        <div
          className={clsx(
            "relative m-0 overflow-y-auto scrollbar-hide rounded-lg bg-white shadow-sm drop-shadow-lg",
            modalLayoutClassName
              ? modalLayoutClassName
              : "w-full h-screen lg:h-auto max-h-[100vh] lg:max-h-[90vh] lg:w-2/5 min-w-[40%] lg:max-w-[80%]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};
