

import { ConsultationDetails } from "@/api/consult/consult.types";
import { ConsultSuccessResponseMeta } from "@/api/index.types";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum ConsultationsTab {
  Consultations = "Consultations",
  HealthVault = "Health Vault",
}

export type ConsultationsProps = {
  isLoading: boolean;
  data: ConsultationDetails[] | null | undefined;
  meta: ConsultSuccessResponseMeta | null | undefined;
  isConsultationsRoute: boolean;
  isPatientDetailsRoute: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export type PatientsListProps = {
  data?: ConsultationDetails[] | undefined;
  openAndCloseFilter: () => void;
  openFilter: boolean;
  isLoading?: boolean;
};

