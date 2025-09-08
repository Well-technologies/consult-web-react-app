import { ModalProps } from "../Modal.types";

export type ModalLayoutProps = Pick<
  ModalProps,
  | "onClose"
  | "children"
  | "open"
  | "isCloseOnOutsideClickDisabled"
  | "modalLayoutClassName"
>;
