import { MedicineOrderDetails } from "@/api/orders/orders.types";

export type PreviousMedOrdersContainerProps = {
  patientId?: number | null;
};

export type PreviousMedOrdersProps = {
  medOrders?: MedicineOrderDetails[];
  isLoading: boolean;
  error: any;
  pagination?: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: string;
  };
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};
