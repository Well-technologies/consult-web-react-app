

// import { ConsultUserDetails } from "@/api/user/user.types";
import { ConsultationDetails } from "@/api/consult/consult.types";
// import { UseFormReturn } from "react-hook-form";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum ConsultationsTab {
  Consultations = "Consultations",
  HealthVault = "Health Vault",
}

export type ConsultationsProps ={
  isLoading: boolean;
  data: ConsultationDetails[] | null | undefined;
  // consultations: any | undefined;
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

