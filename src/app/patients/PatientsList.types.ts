

import { PatientDetails, UserDetails } from "../../api/patient/patient.types";
import { FormType } from "./addPatientModal/AddPatientModal.types";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type PatientDetailsProps = {
  // data?: GetClaimsResponse["data"];
  // transactionsData?: GetLeadTransactionsResponse;
  patients?: PatientDetails[];
  // openAndCloseFilter: () => void;
  // openFilter: boolean;
  // isLoading?: boolean;
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

export type PatientsListProps = {
  // data?: GetClaimsResponse["data"];
  // transactionsData?: GetLeadTransactionsResponse;
  data?: PatientDetails[] | undefined;
  openAndCloseFilter: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  openFilter: boolean;
  isLoading?: boolean;
    openAddNewModal: (
    data: UserDetails | null,
    formType: FormType
  ) => void;
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

