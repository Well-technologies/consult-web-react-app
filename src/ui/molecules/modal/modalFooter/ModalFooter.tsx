import clsx from "clsx";

import { ModalFooterProps } from "./ModalFooter.types";

export const ModalFooter = ({
  onClose,
  onConfirm,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  isCancelButtonHide,
  isConfirmButtonHide,
  isLoading,
  modalFooterClassName,
  disabled,
}: ModalFooterProps) => {
  return (
    <div
      className={clsx(
        "flex shrink-0 flex-wrap items-center justify-end sticky sm:relative bottom-0 right-0 w-full sm:pt-0 gap-2 bg-white p-4",
        modalFooterClassName
      )}
    >
      {!isCancelButtonHide ? (
        <button
          className="rounded-md border-2 cursor-pointer border-gray-100 py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full sm:w-auto"
          type="button"
          disabled={isLoading}
          onClick={onClose}
        >
          {cancelButtonText}
        </button>
      ) : null}
      {!isConfirmButtonHide ? (
        <button
          onClick={onConfirm}
          disabled={isLoading || disabled}
          className="rounded-md bg-primary-600 py-2 px-4 border-2 cursor-pointer border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-700 focus:shadow-none active:bg-primary-700 hover:bg-primary-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full sm:w-auto"
          type="button"
        >
          {confirmButtonText}
        </button>
      ) : null}
    </div>
  );
};
