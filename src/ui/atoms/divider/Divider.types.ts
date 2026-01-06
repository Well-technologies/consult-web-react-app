import { ReactNode } from "react";

export type DividerVariant = "simple" | "centered" | "end";

export interface DividerProps {
  variant?: DividerVariant;
  children?: ReactNode;
  className?: string;
}
