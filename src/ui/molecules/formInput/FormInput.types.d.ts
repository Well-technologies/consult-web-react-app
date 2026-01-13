import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    register?: UseFormRegister<any>;
    boldLabel?: boolean;
    containerClassName?: string;
    error?: boolean;
    helperText?: string;
    label?: ReactNode;
    success?: boolean;
};
