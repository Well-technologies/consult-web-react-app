import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

export type FormTextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    boldLabel?: boolean;
    containerClassName?: string;
    error?: boolean;
    helperText?: string;
    label?: ReactNode;
    success?: boolean;
  };
