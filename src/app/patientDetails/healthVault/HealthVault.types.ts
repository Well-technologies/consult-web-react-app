import { HealthVaultData } from "@/api/patient/patient.types";

export type HealthVaultProps = {
  healthData: HealthVaultData[];
  isLoading?: boolean;
  error?: any;
  pagination?: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  } | null;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export type HealthVaultContainerProps = {
  patientId?: number | null;
};
