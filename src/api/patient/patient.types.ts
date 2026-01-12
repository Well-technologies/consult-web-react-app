import { AxiosInstance } from "axios";

// import { FamilyMemberType } from "@/app/PatientDetails/addFamilyModal/AddFamilyModal.types";

import {
  CommonPaginationParams,
  CommonSuccessResponse,
  PaginatedResponseData,
} from "../index.types";
// import { LeadTransactionsDetails } from "../transaction/transaction.types";
import { Lead } from "../user/user.types";

export enum PatientKeyTypes {
  PatientsList = "PatientsList",
  PatientDetails = "PatientDetails",
}

export type GetPatientsProps = {
  client: AxiosInstance;
  params: GetPatientsListParams;
};

export type GetPatientsListParams = CommonPaginationParams & {
  doctor_id: string;
};

export type GetPatientsResponse = CommonSuccessResponse<
  PaginatedResponseData<OrganizationUserDetails>
>;

export type OrganizationUserDetails = Lead;


export type GetPatientListResponse = CommonSuccessResponse<PatientDetails[]>;

export type CreatePatientProps = {
  client: AxiosInstance;
  body: CreatePatientBody;
};

export type CreatePatientBody = {
  name: string;
  mobile_no: string;
  email: string;
  gender: string;
  parent_org_id: number;
  full_name: string;
  bank_name: string;
  bank_branch: string;
  bank_account_no: string;
};

export type CreatePatientResponse = CommonSuccessResponse<UserDetails>;

export type UserDetails = Pick<
  Lead,
  | "id"
  | "name"
  | "mobile_no"
  | "email"
  | "comments"
  | "leads_status"
  | "channel"
  | "source"
  | "organization_id"
  | "updated_at"
  | "created_at"
>;

export type UpdatePatientProps = {
  client: AxiosInstance;
  userId: string;
  body: UpdatePatientBody;
};

export type UpdatePatientBody = CreatePatientBody;

export type UpdatePatientResponse = CommonSuccessResponse<UserDetails>;

export type GetPatientDetailsProps = Pick<GetPatientsProps, "client"> & {
  leadId: string;
};

export type GetPatientDetailsResponse = CommonSuccessResponse<PatientDetails>;

export type PatientDetails = Lead
export type PatientDetailsWalletData = {
  remainingCredit: number;
};

export type AddFamilyMemberProps = {
  client: AxiosInstance;
  body: AddFamilyMemberBody;
};

export type AddFamilyMemberBody = {
  lead_id: string;
  name: string;
  phone?: string;
  dob: string;
  // relation: FamilyMemberType;
};


