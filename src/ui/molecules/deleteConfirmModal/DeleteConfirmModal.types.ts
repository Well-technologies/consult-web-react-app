import { ModalProps } from "../modal/Modal.types";

export type DeleteConfirmModalProps = Pick<
  ModalProps,
  "onClose" | "open" | "isLoading" | "onConfirm" | "title"
> & {
  confirmKey: string;
  description: string;
};
