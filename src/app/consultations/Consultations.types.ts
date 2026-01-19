

// import { ConsultUserDetails } from "@/api/user/user.types";
import { ConsultationDetails } from "@/api/consult/consult.types";
import { ConsultSuccessResponseMeta } from "@/api/index.types";
// import { UseFormReturn } from "react-hook-form";

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
  // data?: GetClaimsResponse["data"];
  // transactionsData?: GetLeadTransactionsResponse;
  data?: ConsultationDetails[] | undefined;
  openAndCloseFilter: () => void;
  openFilter: boolean;
  isLoading?: boolean;
  // isLoadingEmployeeData?: boolean;
  // claimForm: UseFormReturn<ClaimFormInputs, any, GetClaimParams>;
  // transactionForm: UseFormReturn<
  //   CommonPaginationParams,
  //   any,
  //   CommonPaginationParams
  // >;
  // onOpenClaimModal: (data: ClaimDetails | null, formType: FormType) => void;
  // onOpenTopUpModal: (data: EmployeeDetails | null) => void;
  // onOpenUserModal: (
  //   data: OrganizationUserDetails | null,
  //   formType: FormType
  // ) => void;
  // onOpenFamilyModal: (data: LeadFamily | null, formType: FormType) => void;
  // onOpenFamilyDeleteModal: (data: LeadFamily | null) => void;
  // claimFeatures: ClaimFeatures | null;
};

// export type PatientProps = {
//   register: UseFormReturn<UsersFormInputs>["register"];
//   control: UseFormReturn<UsersFormInputs>["control"];
//   data?: GetEmployeesResponse["data"];
//   setValue: UseFormSetValue<UsersFormInputs>;
//   watch: UseFormWatch<UsersFormInputs>;
//   openAndCloseFilter: () => void;
//   openAddNewModal: (
//     data: OrganizationUserDetails | null,
//     formType: FormType
//   ) => void;
//   openFilter: boolean;
//   isLoading?: boolean;
//   onOpenEmployeeDeleteModal: (data: OrganizationUserDetails | null) => void;
// };

