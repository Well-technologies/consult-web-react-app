

// import { ConsultUserDetails } from "@/api/user/user.types";
import { ConsultUserDetails } from "@/api/consult/consult.types";
import { PatientDetails } from "../../api/patient/patient.types";
import { GetPreviousLabOrdersResponse, GetPreviousMedOrdersResponse } from "@/api/orders/orders.types";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum PatientDetailsTab {
  Consultations = "Consultations",
  HealthVault = "Health Vault",
  LabOrders = "Lab Orders",
  MedOrders = "Med Orders",
}

export type PatientDetailsProps ={
  isLoading: boolean;
  data: ConsultUserDetails | null | undefined;
  consultations: any | undefined;
  labOrders: GetPreviousLabOrdersResponse['data'] | undefined;
  medOrders: GetPreviousMedOrdersResponse['data'] | undefined;
}

export type PatientsListProps = {
  // data?: GetClaimsResponse["data"];
  // transactionsData?: GetLeadTransactionsResponse;
  data?: PatientDetails[] | undefined;
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

