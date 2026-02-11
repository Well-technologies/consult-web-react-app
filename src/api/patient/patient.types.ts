import { AxiosInstance } from "axios";

// import { FamilyMemberType } from "@/app/PatientDetails/addFamilyModal/AddFamilyModal.types";

import {
  CommonPaginationParams,
  CommonSuccessResponse,
  ConsultSuccessResponse,
  PaginatedResponseData,
} from "../index.types";
// import { LeadTransactionsDetails } from "../transaction/transaction.types";
import { Lead, LeadDetails } from "../user/user.types";

export enum PatientKeyTypes {
  PatientsList = "PatientsList",
  PatientDetails = "PatientDetails",
  PatientSearch = "PatientSearch",
  PatientHealthLogs = "PatientHealthLogs",
  PatientHealthVault = "PatientHealthVault",
  PatientHealthConditions = "PatientHealthConditions",
  PatientHealthTopics = "PatientHealthTopics",
}

export type GetPatientsProps = {
  client: AxiosInstance;
  params: GetPatientsListParams;
};

export type SearchPatientsProps = {
  client: AxiosInstance;
  params: SearchPatientParamsProps;
  enabled: boolean;
};

export type GetPatientsListParams = CommonPaginationParams & {
  doctor_id: number;
};

export type SearchPatientParamsProps = {
  patient: string;
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
  email?: string | null;
  gender: string;
  dob: string;
  consultation_mode_id?: number;
  doctor_id?: number;
  patient_id?: string;
};

export type CreatePatientResponse = CommonSuccessResponse<UserDetails>;

export type UserDetails = Pick<
  Lead,
  "id" | "name" | "mobile_no" | "email" | "date_of_birth"
> & {
  appointment_id?: number;
};

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

export type PatientDetails = Lead & {
  isDisabled?: boolean;
  lead_detail?: LeadDetails;
};
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

export type GetPatientHealthLogsParams = {
  patientId: string;
  doctorId: number;
};

export type GetPatientHealthLogsProps = {
  client: AxiosInstance;
  params: GetPatientHealthLogsParams;
};

export type GetPatientHealthLogsResponse = ConsultSuccessResponse<
  HealthLogData[],
  null
>;

export type HealthMeasurement = {
  unit: string | null;
  value: string | null;
};

export type BMIMeasurement = {
  value: string | null;
};

export type HealthLogBody = {
  hb: HealthMeasurement;
  bmi: BMIMeasurement;
  spo2: HealthMeasurement;
  pulse: HealthMeasurement;
  height: HealthMeasurement;
  weight: HealthMeasurement;
  systolic: HealthMeasurement;
  diastolic: HealthMeasurement;
  blood_sugar: HealthMeasurement;
  cholesterol: HealthMeasurement;
};

export type HealthLogData = {
  id: number;
  success: boolean;
  lead_id: number;
  data: {
    body: HealthLogBody;
  };
  created_at: string;
  updated_at: string;
};

export type GetPatientHealthVaultProps = {
  client: AxiosInstance;
  params: GetHealthLogsParams;
};

export type GetHealthLogsParams = {
  userId: string;
};

export type GetPatientHealthVaultResponse = ConsultSuccessResponse<
  HealthVaultData[],
  null
>;

export type HealthVaultData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  fileUrl: string;
  fileType: string;
  mimeType: string;
  userId: number;
  familyMemberId: number | null;
  customTags: string[];
  familyMemberDetails: any | null;
};

export type GetPatientHealthConditionsProps = {
  client: AxiosInstance;
  params: {
    patientId: string;
    doctorId: number;
  };
};

export type GetPatientHealthConditionsResponse = ConsultSuccessResponse<
  PatientHealthCondition[],
  null
>;

export type HealthConditionDetails = {
  id: number;
  healthconditionname: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  show_in_app: number;
};

export type PatientHealthCondition = {
  id: number;
  healthcondition_id: number;
  lead_id: number;
  created_at: string;
  updated_at: string;
  get_lead_by_health_coditions: HealthConditionDetails;
};

export type HealthTopicDetails = {
  id: number;
  healthtopicname: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  show_in_app: number;
};

export type PatientHealthTopic = {
  id: number;
  healthtopic_id: number;
  lead_id: number;
  created_at: string;
  updated_at: string;
  get_lead_by_health_topics: HealthTopicDetails;
};

export type GetPatientHealthTopicsProps = {
  client: AxiosInstance;
  params: {
    patientId: string;
    doctorId: number;
  };
};

export type GetPatientHealthTopicsResponse = ConsultSuccessResponse<
  PatientHealthTopic[],
  null
>;
