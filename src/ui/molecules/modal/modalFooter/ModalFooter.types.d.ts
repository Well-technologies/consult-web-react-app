import { ModalProps } from "../Modal.types";
export type ModalFooterProps = Pick<ModalProps, "onClose" | "onConfirm" | "confirmButtonText" | "cancelButtonText" | "isCancelButtonHide" | "isConfirmButtonHide" | "isLoading" | "modalFooterClassName" | "disabled">;
