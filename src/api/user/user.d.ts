import { UseMutationOptions } from "@tanstack/react-query";
import { CommonErrorResponseData, Errors } from "../index.types";
import { GetLeadsResponse, GetLeadsProps, DeleteEmployeeProps, GetProfileProps, GetProfileResponse, GetConsultUserDetailsProps, ConsultUserDetails } from "./user.types";
export declare const useGetLeads: ({ client, params }: GetLeadsProps) => import("@tanstack/react-query").UseQueryResult<GetLeadsResponse, Error>;
export declare const useGetConsultUserDetails: ({ client, leadId }: GetConsultUserDetailsProps) => import("@tanstack/react-query").UseQueryResult<ConsultUserDetails, Error>;
export declare const useGetProfile: ({ client, options }: GetProfileProps) => import("@tanstack/react-query").UseQueryResult<GetProfileResponse, Error>;
export declare const useDeleteEmployee: (options?: UseMutationOptions<GetLeadsResponse, Errors<CommonErrorResponseData>, DeleteEmployeeProps, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<GetLeadsResponse, Errors<CommonErrorResponseData>, DeleteEmployeeProps, unknown>;
