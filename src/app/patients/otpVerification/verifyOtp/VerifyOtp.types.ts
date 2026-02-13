import { UseFormReturn } from "react-hook-form";

import { PhoneLoginFormInputs } from "@/app/authentication/login/Login.types";

import { OtpVerificationProps } from "../OtpVerification.types";

export type OtpFlowProps = {
  control: UseFormReturn<PhoneLoginFormInputs>["control"];
  watchOtp: UseFormReturn<PhoneLoginFormInputs>["watch"];
  showOtpError?: boolean;
  onClearError?: () => void;
  onRequestOtp: (data: PhoneLoginFormInputs) => void;
  onVerifyOtp: (data: PhoneLoginFormInputs) => void;
} & Pick<
  OtpVerificationProps,
  | "disabled"
  | "mobileNo"
  | "mutateOnCreatePatient"
  | "isRegisteredPatient"
  | "formData"
  | "onAppointmentIdSet"
  | "trigger"
>;
