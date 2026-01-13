import { UseMutationOptions } from "@tanstack/react-query";
import { Errors } from "../index.types";
import { LoginSuccessResponse, VerifyOTPSuccessResponse, VerifyOTPProps } from "./authentication.types";
export declare const useLogin: (options?: UseMutationOptions<VerifyOTPSuccessResponse, Errors<unknown>, VerifyOTPProps, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<VerifyOTPSuccessResponse, Errors<unknown>, VerifyOTPProps, unknown>;
export declare const useRequestOtp: (options?: UseMutationOptions<LoginSuccessResponse, Errors<unknown>, VerifyOTPProps, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<LoginSuccessResponse, Errors<unknown>, VerifyOTPProps, unknown>;
export declare const useVerifyOtp: (options?: UseMutationOptions<VerifyOTPSuccessResponse, Errors<unknown>, VerifyOTPProps, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<VerifyOTPSuccessResponse, Errors<unknown>, VerifyOTPProps, unknown>;
