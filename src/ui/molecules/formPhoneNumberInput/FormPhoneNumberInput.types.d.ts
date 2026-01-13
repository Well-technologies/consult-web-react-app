import { ReactNode } from "react";
export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    boldLabel?: boolean;
    containerClassName?: string;
    error?: boolean;
    helperText?: string;
    label?: ReactNode;
    success?: boolean;
    name?: string;
};
