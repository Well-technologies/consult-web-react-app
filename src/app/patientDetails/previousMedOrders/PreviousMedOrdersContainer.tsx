import { useState } from "react";
import { useDebounce } from "use-debounce";

import { ServiceConfigType } from "@/api/index.types";
import { useGetPreviousMedOrders } from "@/api/orders/orders";
import { useClient } from "@/hooks/useClient/useClient";

import { PreviousMedOrders } from "./PreviousMedOrders";
import { PreviousMedOrdersContainerProps } from "./PreviousMedOrders.types";

export const PreviousMedOrdersContainer = ({
  patientId,
}: PreviousMedOrdersContainerProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const client = useClient({ serviceConfigType: ServiceConfigType.Core });

  const {
    data: medOrders,
    isLoading,
    error,
  } = useGetPreviousMedOrders({
    client: client,
    params: {
      lead_id: patientId,
      page: page,
      take: pageSize,
      medication_name: debouncedSearchText,
    },
    options: {
      enabled: !!patientId,
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  const pagination = medOrders?.data
    ? {
        total: medOrders.data.total,
        currentPage: medOrders.data.current_page,
        lastPage: medOrders.data.last_page,
        perPage: medOrders.data.per_page,
      }
    : undefined;

  return (
    <PreviousMedOrders
      medOrders={medOrders?.data?.data || []}
      isLoading={isLoading}
      error={error}
      pagination={pagination}
      page={page}
      pageSize={pageSize}
      searchText={searchText}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      setSearch={setSearchText}
    />
  );
};
