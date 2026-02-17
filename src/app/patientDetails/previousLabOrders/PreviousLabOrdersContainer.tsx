import { useState } from "react";

import { ServiceConfigType } from "@/api/index.types";
import { useGetPreviousLabOrders } from "@/api/orders/orders";
import { useClient } from "@/hooks/useClient/useClient";
import { DEFAULT_PAGE_SIZE } from "@/ui/atoms/pagination/Pagination.utils";

import { PreviousLabOrders } from "./PreviousLabOrders";
import { PreviousLabOrdersContainerProps } from "./PreviousLabOrders.types";

export const PreviousLabOrdersContainer = ({
  patientId,
}: PreviousLabOrdersContainerProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when page size changes
  };

  const client = useClient({ serviceConfigType: ServiceConfigType.Core });
  const {
    data: labOrdersResponse,
    isLoading,
    error,
  } = useGetPreviousLabOrders({
    client: client,
    params: {
      lead_id: patientId,
      page: page,
      take: pageSize,
    },
    options: {
      enabled: !!patientId,
    },
  });

  const labOrders = labOrdersResponse?.data?.data || [];
  const paginationData = labOrdersResponse?.data
    ? {
        currentPage: labOrdersResponse.data.current_page,
        lastPage: labOrdersResponse.data.last_page,
        perPage: parseInt(labOrdersResponse.data.per_page),
        total: labOrdersResponse.data.total,
      }
    : null;

  return (
    <PreviousLabOrders
      labOrders={labOrders}
      isLoading={isLoading}
      error={error}
      pagination={paginationData}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};
