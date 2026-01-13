import { ReactNode } from "react";
export type ModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    children: ReactNode;
    isCloseIcon?: boolean;
    isCloseButton?: boolean;
    isLoading?: boolean;
    confirmButtonText?: string;
    isConfirmButtonHide?: boolean;
    cancelButtonText?: string;
    isCancelButtonHide?: boolean;
    isCloseOnOutsideClickDisabled?: boolean;
    title: ReactNode;
    modalLayoutClassName?: string;
    modalFooterClassName?: string;
    disabled?: boolean;
    headerClassNames?: HeaderClassNames;
    subtitle?: string;
};
export type HeaderClassNames = {
    container?: string;
    title?: string;
    subtitle?: string;
};
