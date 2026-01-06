import { BaseSyntheticEvent } from "react";
import { UseFormReturn, FormState } from "react-hook-form";

import { Schema } from "@/types";

export type EmailLoginFormInputs = {
  email: string;
  password: string;
};

export type PhoneLoginFormInputs = {
  mobile: string;
};

export type OTPFormInputs = {
  otp: string;
};

export type LoginProps = {
  controlEmail?: UseFormReturn<EmailLoginFormInputs>["control"];
  onSubmitEmail?: (e?: BaseSyntheticEvent) => Promise<void>;
  errorsEmail?: FormState<EmailLoginFormInputs>["errors"];
  isPending: boolean;
  setLoginType: (type: LoginTypes) => void;
  loginType?: LoginTypes;
};

export type MobileLoginProps = {
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  errorsEmail: FormState<EmailLoginFormInputs>["errors"];
  isPending: boolean;
  setLoginType: (type: LoginTypes) => void;
  loginType?: LoginTypes;
};

export enum LoginTypes {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
}

export type EmailLoginFormSchema = Schema<EmailLoginFormInputs>;
export type PhoneLoginFormSchema = Schema<PhoneLoginFormInputs>;
