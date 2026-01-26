import { CommonOptions } from "@/api/index.types";
import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  boldLabel?: boolean;
  containerClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: ReactNode;
  success?: boolean;
  options?: CommonOptions[]
};
