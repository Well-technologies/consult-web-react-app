import { PhoneLoginFormInputs } from "@/app/authentication/login/Login.types";
import { BaseSyntheticEvent } from "react";

export type RequestOtpProps = {
    setIsOtpRequested: (isOtpRequested: boolean) => void;
    mobileNo: string;
    handleSubmit: (data: PhoneLoginFormInputs) => void;
}