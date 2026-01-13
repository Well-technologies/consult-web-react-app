import { AxiosInstance } from "axios";
import { CommonSuccessResponse } from "../index.types";
import { UserDetails } from "../patient/patient.types";

export type LoginSuccessResponse = CommonSuccessResponse<LoginResponseData>;

export enum UserType {
  Patient = 'patient',
  Doctor = 'doctor',
}

export type LoginResponseData = Pick<
  UserDetails,
  "id" | "name"
> & {
  token: string;
};

export type PhoneLoginBody = {
  mobile: string;
  otp?: string;
};

export type EmailLoginBody = {
  email: string;
  password: string;
};

export type VerifyOTPResponseData = {
  lead_id: string;
  leads_status: number;
  mobile: string;
  name: string;
  registration_credit: boolean;
  registration_credit_amount: number;
  token: string;
  user_type: UserType;
};

export type VerifyOTPProps = {
  client: AxiosInstance;
  body: VerifyOTPBody;
};

export type VerifyOTPBody = {
  otp: string;
  email?: string;
  mobile?: string;
};

export type VerifyOTPSuccessResponse =
  CommonSuccessResponse<VerifyOTPResponseData>;
