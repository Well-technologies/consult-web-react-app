import { ServiceConfig } from "@/config/config.types";
import { UnknownAction } from "@reduxjs/toolkit";
import { QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { Dispatch } from "react";

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

export type ConsultSuccessResponse<T, D> = {
  success: boolean;
  message: string;
  payload: T;
  data: D;
  meta: ConsultSuccessResponseMeta | null;
};

export type ConsultSuccessResponseMeta = {
  page: number;
  take: number;
  total: number;
};



export type CommonErrorResponseData = {
  message: string;
};

export type CommonQueryOptions = { enabled?: boolean };

export type CommonPaginationParams = { page: number; page_size: number };

export enum ClientType {
  JSON = "JSON",
  FormData = "FormData",
}

export type UseQueryOptionsType<TData, T> = Omit<
  UseQueryOptions<unknown, unknown, TData, [T]>,
  "queryKey" | "queryFn"
>;

export enum ServiceConfigType {
  Core = 'Core',
  Consult = 'Consult',
}

export type CreateClientProps = {
  previousToken: string;
  dispatch: Dispatch<UnknownAction>;
  type: ClientType.JSON;
  serviceConfig: ServiceConfig;
  serviceConfigType: ServiceConfigType;
  queryClient: QueryClient;
};

export type GetClientConfigProps = Pick<
  CreateClientProps,
  'serviceConfig' | 'serviceConfigType' | 'previousToken' | 'type'
>;
