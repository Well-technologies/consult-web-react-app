import { UseMutationOptions, useMutation } from "@tanstack/react-query";


import { Errors } from "../index.types";
import { LoginSuccessResponse, VerifyOTPSuccessResponse, VerifyOTPProps } from "./authentication.types";

const login = ({ client, body }: VerifyOTPProps) =>
  client.post<VerifyOTPSuccessResponse>("/login", body).then(({ data }) => data);

export const useLogin = (
  options?:
    | UseMutationOptions<
        VerifyOTPSuccessResponse,
        Errors<unknown>,
        VerifyOTPProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: login });


const requestOtp = ({ client, body }: VerifyOTPProps) =>
  client.post<LoginSuccessResponse>("/customer/otp/send", body).then(({ data }) => data);

export const useRequestOtp = (
  options?:
    | UseMutationOptions<
        LoginSuccessResponse,
        Errors<unknown>,
        VerifyOTPProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: requestOtp });

const verifyOtp = ({ client, body }: VerifyOTPProps) =>
  client.post<VerifyOTPSuccessResponse>("/customer/otp/verify", body).then(({ data }) => data);

export const useVerifyOtp = (
  options?:
    | UseMutationOptions<
        VerifyOTPSuccessResponse,
        Errors<unknown>,
        VerifyOTPProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: verifyOtp });