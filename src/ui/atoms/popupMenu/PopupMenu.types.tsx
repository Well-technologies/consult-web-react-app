import { ReactNode } from "react";

export type PopupMenuProps = {
  children: ReactNode;
  component: ReactNode;
  containerClassName?: string;
  componentClassName: string;
  open: boolean;
  onClose: () => void;
};
