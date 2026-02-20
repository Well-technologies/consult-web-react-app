import { useState } from "react";

import { ServiceConfigType } from "@/api/index.types";
import { useGetPatientHealthVault } from "@/api/patient/patient";
import { useClient } from "@/hooks/useClient/useClient";
import { DEFAULT_PAGE_SIZE } from "@/ui/atoms/pagination/Pagination.utils";

import { HealthVault } from "./HealthVault";
import { HealthVaultContainerProps } from "./HealthVault.types";

export const HealthVaultContainer = ({
  patientId,
}: HealthVaultContainerProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientHealthVault({
    client: consultClient,
    params: {
      userId: patientId?.toString(),
      page: page,
      take: pageSize,
    },
    options: {
      enabled: !!patientId,
    },
  });

  const healthData = data?.payload || [];
  const paginationData = data?.meta
    ? {
        currentPage: data.meta.page,
        lastPage: Math.ceil(data.meta.total / data.meta.take),
        perPage: data.meta.take,
        total: data.meta.total,
      }
    : null;

  return (
    <HealthVault
      healthData={healthData}
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
