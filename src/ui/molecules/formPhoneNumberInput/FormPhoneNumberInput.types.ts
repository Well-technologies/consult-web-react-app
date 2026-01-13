import { ReactNode } from "react";

export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boldLabel?: boolean;
  containerClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: ReactNode;
  success?: boolean;
  name?: string;
};
