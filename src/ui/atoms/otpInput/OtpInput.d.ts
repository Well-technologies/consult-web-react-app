import * as React from "react";
interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}
declare const OtpInput: React.ForwardRefExoticComponent<OtpInputProps & React.RefAttributes<HTMLInputElement>>;
export { OtpInput };
