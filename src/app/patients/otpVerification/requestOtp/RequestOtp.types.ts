import { PhoneLoginFormInputs } from "@/app/authentication/login/Login.types";

export type RequestOtpProps = {
    setIsOtpRequested: (isOtpRequested: boolean) => void;
    mobileNo: string;
    handleSubmit: (data: PhoneLoginFormInputs) => void;
    showOtpError: boolean;
}