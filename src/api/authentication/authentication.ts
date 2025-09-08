import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { api } from "@/api";

import { Errors } from "../index.types";
import { LoginBody, LoginSuccessResponse } from "./authentication.types";

const login = (body: LoginBody) =>
  api.post<LoginSuccessResponse>("/login", body).then(({ data }) => data);

export const useLogin = (
  options?:
    | UseMutationOptions<
        LoginSuccessResponse,
        Errors<unknown>,
        LoginBody,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: login });
