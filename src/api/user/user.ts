import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { CommonErrorResponseData, Errors } from "../index.types";
import {
  GetLeadsResponse,
  GetLeadsProps,
  UserKeyTypes,
  GetUserDetailsProps,
  GetUserDetailResponse,
  DeleteEmployeeProps,
} from "./user.types";

const getLeads = ({ client, params }: GetLeadsProps) =>
  client
    .get<GetLeadsResponse>(`/searchLeads`, { params })
    .then(({ data }) => data);

export const useGetLeads = ({ client, params }: GetLeadsProps) =>
  useQuery({
    queryKey: [UserKeyTypes.GetLeads, { params }],
    queryFn: () => getLeads({ client, params }),
    placeholderData: keepPreviousData,
    enabled: params.search_subscriber.length > 0,
  });

const getUserDetails = ({ client }: GetUserDetailsProps) =>
  client.get<GetUserDetailResponse>(`/b2b/user`).then(({ data }) => data);

export const useGetUserDetails = ({ client }: GetUserDetailsProps) =>
  useQuery({
    queryKey: [UserKeyTypes.UserDetails],
    queryFn: () => getUserDetails({ client }),
    placeholderData: keepPreviousData,
  });

const deleteEmployee = ({ client, leadId }: DeleteEmployeeProps) =>
  client
    .delete<GetLeadsResponse>(`/deleteorganizationwiselead/${leadId}`)
    .then(({ data }) => data);

export const useDeleteEmployee = (
  options?:
    | UseMutationOptions<
        GetLeadsResponse,
        Errors<CommonErrorResponseData>,
        DeleteEmployeeProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: deleteEmployee });
