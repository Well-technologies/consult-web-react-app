import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type TooltipProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: ReactNode;
  text: string;
};
