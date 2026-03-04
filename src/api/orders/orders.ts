import { useQuery, keepPreviousData } from "@tanstack/react-query";

import {
  GetPreviousLabOrdersProps,
  GetPreviousLabOrdersResponse,
  OrderKeyTypes,
  GetPreviousMedOrdersProps,
  GetPreviousMedOrdersResponse,
  GetLabOrderHistoryProps,
  GetLabOrderHistoryResponse,
  GetMedOrderHistoryProps,
  GetMedOrderHistoryResponse,
} from "./orders.types";

const staleTime = 60 * 1000;

const getPreviousLabOrders = ({ client, params }: GetPreviousLabOrdersProps) =>
  client
    .get<GetPreviousLabOrdersResponse>("customer/get-lab-orders", { params })
    .then(({ data }) => data);

export const useGetPreviousLabOrders = ({
  client,
  params,
}: GetPreviousLabOrdersProps) =>
  useQuery({
    queryKey: [OrderKeyTypes.GetPreviousLabOrders, params],
    queryFn: () => getPreviousLabOrders({ client, params }),
    placeholderData: keepPreviousData,
    staleTime,
  });

const getPreviousMedOrders = ({ client, params }: GetPreviousMedOrdersProps) =>
  client
    .get<GetPreviousMedOrdersResponse>("customer/get-app-orders", { params })
    .then(({ data }) => data);

export const useGetPreviousMedOrders = ({
  client,
  params,
}: GetPreviousMedOrdersProps) =>
  useQuery({
    queryKey: [OrderKeyTypes.GetPreviousMedOrders, params],
    queryFn: () => getPreviousMedOrders({ client, params }),
    placeholderData: keepPreviousData,
    staleTime,
  });

const getLabOrderHistory = ({ client, params }: GetLabOrderHistoryProps) =>
  client
    .get<GetLabOrderHistoryResponse>("/orders/lab-orders", { params })
    .then(({ data }) => data);

export const useGetLabOrderHistory = ({
  client,
  params,
}: GetLabOrderHistoryProps) =>
  useQuery({
    queryKey: [OrderKeyTypes.GetLabOrderHistory],
    queryFn: () => getLabOrderHistory({ client, params }),
    placeholderData: keepPreviousData,
    staleTime,
  });

const getMedOrderHistory = ({ client, params }: GetMedOrderHistoryProps) =>
  client
    .get<GetMedOrderHistoryResponse>("/orders/med-orders", { params })
    .then(({ data }) => data);

export const useGetMedOrderHistory = ({
  client,
  params,
}: GetMedOrderHistoryProps) =>
  useQuery({
    queryKey: [OrderKeyTypes.GetMedOrderHistory],
    queryFn: () => getMedOrderHistory({ client, params }),
    placeholderData: keepPreviousData,
    staleTime,
  });
