import { UseQueryOptions } from "@tanstack/react-query";

export type Errors<T> = Record<"data", Record<keyof T, string>>;

export type PaginatedResponseData<T> = {
  current_page: number;
  data: T[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

export type CommonSuccessResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type CommonErrorResponseData = {
  message: string;
};

export type CommonQueryOptions = { enabled?: boolean };

export type CommonPaginationParams = { page: number; page_size: number };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export enum ClientType {
  JSON = "JSON",
  FormData = "FormData",
}

export type UseQueryOptionsType<TData, T> = Omit<
  UseQueryOptions<unknown, unknown, TData, [T]>,
  "queryKey" | "queryFn"
>;
