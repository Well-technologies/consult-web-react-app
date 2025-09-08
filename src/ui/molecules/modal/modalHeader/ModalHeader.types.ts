import { ModalProps } from "../Modal.types";

export type ModalHeaderProps = Pick<
  ModalProps,
  | "onClose"
  | "title"
  | "isCloseIcon"
  | "isCloseButton"
  | "headerClassNames"
  | "subtitle"
>;
