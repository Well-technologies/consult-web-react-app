import { ClinicalOrderDetails } from "@/api/orders/orders.types";

export type PreviousLabOrdersContainerProps = {
  patientId?: number | null;
};

export type PreviousLabOrdersProps = {
  labOrders: ClinicalOrderDetails[];
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
