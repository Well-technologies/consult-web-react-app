import { PhoneLoginFormInputs } from "@/app/authentication/login/Login.types";
import { OtpVerificationProps } from "../OtpVerification.types";

export type RequestOtpProps = {
    setIsOtpRequested: (isOtpRequested: boolean) => void;
    handleSubmit: (data: PhoneLoginFormInputs) => void;
    showOtpError: boolean;
} & Pick<OtpVerificationProps, 'disabled' | 'mobileNo'>