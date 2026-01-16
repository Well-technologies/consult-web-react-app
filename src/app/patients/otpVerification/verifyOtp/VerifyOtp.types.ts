import { Control, UseFormReturn } from "react-hook-form";
import { PhoneLoginFormInputs } from "@/app/authentication/login/Login.types";
import { BaseSyntheticEvent } from "react";

export type VerifyOtpProps = {
    control: UseFormReturn<PhoneLoginFormInputs>['control'];
    watchOtp: UseFormReturn<PhoneLoginFormInputs>['watch'];
    handleSubmit: (data: PhoneLoginFormInputs) => void
}