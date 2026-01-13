import { Control } from 'react-hook-form';
import { LoginTypes, PhoneLoginFormInputs } from "./Login.types";
import { BaseSyntheticEvent } from "react";
interface MobileLoginFormProps {
    onSubmit: (e: BaseSyntheticEvent) => Promise<void>;
    isPending: boolean;
    setLoginType: (type: LoginTypes) => void;
    control: Control<PhoneLoginFormInputs>;
    isOtpSent?: boolean;
    mobileNumber?: string;
    setIsOtpSent: (value: boolean) => void;
}
export declare const MobileLoginForm: ({ onSubmit, isPending, setLoginType, control, isOtpSent, mobileNumber, setIsOtpSent }: MobileLoginFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
