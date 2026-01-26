import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetPreviousLabOrdersProps, GetPreviousLabOrdersResponse, OrderKeyTypes, GetPreviousMedOrdersProps, GetPreviousMedOrdersResponse } from "./orders.types";

const getPreviousLabOrders = ({ client, params }: GetPreviousLabOrdersProps) =>
  client
    .get<GetPreviousLabOrdersResponse>('customer/get-lab-orders', { params })
    .then(({ data }) => data);

export const useGetPreviousLabOrders = ({
  client,
  params,
}: GetPreviousLabOrdersProps) =>
  useQuery({
    queryKey: [OrderKeyTypes.GetPreviousLabOrders, params.page],
    queryFn: () => getPreviousLabOrders({ client, params }),
    placeholderData: keepPreviousData,
  });

const getPreviousMedOrders = ({ client, params }: GetPreviousMedOrdersProps) =>
  client
    .get<GetPreviousMedOrdersResponse>('customer/get-app-orders', { params })
    .then(({ data }) => data);

export const useGetPreviousMedOrders = ({
  client,
  params,
}: GetPreviousMedOrdersProps) =>
  useQuery({
    queryKey: [OrderKeyTypes.GetPreviousMedOrders, params.page],
    queryFn: () => getPreviousMedOrders({ client, params }),
    placeholderData: keepPreviousData,
  });