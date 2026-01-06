import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { api, consultApi } from "@/api";

import { Errors } from "../index.types";
import { EmailLoginBody, PhoneLoginBody, LoginSuccessResponse } from "./authentication.types";

const login = (body: EmailLoginBody) =>
  consultApi.post<LoginSuccessResponse>("/login", body).then(({ data }) => data);

export const useLogin = (
  options?:
    | UseMutationOptions<
        LoginSuccessResponse,
        Errors<unknown>,
        EmailLoginBody,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: login });


const requestOtp = (body: PhoneLoginBody) =>
  api.post<LoginSuccessResponse>("/customer/otp/send", body).then(({ data }) => data);

export const useRequestOtp = (
  options?:
    | UseMutationOptions<
        LoginSuccessResponse,
        Errors<unknown>,
        PhoneLoginBody,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: requestOtp });