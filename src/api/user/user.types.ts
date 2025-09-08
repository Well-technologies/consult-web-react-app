import { AxiosInstance } from "axios";

// import { FamilyMemberType } from "@/app/employeeDetails/addFamilyModal/AddFamilyModal.types";

import { CommonSuccessResponse } from "../index.types";
// import { B2BDetails } from "../organization/organization.types";

export enum UserKeyTypes {
  GetLeads = "GetLeads",
  UserDetails = "UserDetails",
}

export enum UserRoles {
  SuperAdmin = 1,
  Admin = 2,
  User = 3,
  ThirdParty = 4,
  Rider = 5,
  LabPartner = 6,
  LabRider = 7,
  Supplier = 8,
  Doctor = 9,
  CourierPartner = 10,
  Pharmacist = 11,
  Partner = 12,
  Procurement = 13,
  Insurance = 14,
  InsuranceRef = 15,
  Reviewer = 16,
  StoreManager = 17,
}

export type GetLeadsProps = {
  client: AxiosInstance;
  params: GetLeadsParams;
};

export type GetLeadsParams = {
  status: "3";
  search_subscriber: string;
  records_per_page: "100";
};

export type DeleteEmployeeProps = {
  client: AxiosInstance;
  leadId: number;
};

export type GetLeadsResponse = CommonSuccessResponse<Lead[]>;

export enum LeadActiveStatus {
  Active = 1,
  Inactive = 0,
}

export type Lead = {
  id: string;
  name: string;
  email: string;
  mobile_no: string;
  address_id: number | null;
  user_subscription_id: number | null;
  leads_status: number;
  lead_owner_id: number;
  comments: string;
  is_active: LeadActiveStatus;
  created_at: string;
  updated_at: string;
  source: number;
  phone: string | null;
  organization_id: number;
  channel: string;
  password: string | null;
  date_of_birth: string;
  referral_code: string | null;
  earn_points: string;
  preferred_language: string | null;
  request_quote_notification: number;
  offer_notification: string | null;
  stripe_id: number | null;
  profile_picture_url: string | null;
  show_on_leadboard: number;
  profile_id: number | null;
  xero_id: number | null;
  device_os: string | null;
  os_version: string | null;
  show_to_doner: number | null;
  report_created: number | null;
  report_created_month: string | null;
  is_doner: number | null;
  is_b2b: number | null;
  role: string | null;
  lead_type: string | null;
  product_code: string | null;
  country_code: string | null;
  trial_used: boolean;
  aia_downgraded_lead: boolean;
  package_logs: string | null;
  is_private: number | null;
  ch17_card_number: number | null;
  lead_detail?: LeadDetails;
  lead_catalogue_package?: LeadCataloguePackage[];
  lead_family?: LeadFamily[];
  claims_deleted_leads?: DeletedLeadDetails;
};

export type DeletedLeadDetails = {
  id: number;
  org_id: number;
  lead_id: number;
  created_at: string;
  updated_at: string;
};

export type LeadFamily = {
  id: number;
  lead_id: number;
  name: string;
  // relation: FamilyMemberType;
  phone: string;
  dob: string;
  is_active: true;
  created_at: string;
  updated_at: string;
  customer_id: number | null;
  policy_holder_id: number | null;
};

export type LeadCataloguePackage = {
  id: number;
  lead_id: number;
  package_id: number;
  package_start_date: string;
  package_end_date: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  is_aia: string;
  is_direct_assigned: boolean;
  catalogue_package: unknown; // Need to add types
  lead_catalogue_package_feature: LeadCataloguePackageFeature[];
};

export enum FeatureCategoryId {
  NoOfCalls = 1,
  RayaFlatDiscount = 2,
  LabDiscount = 3,
  MBEPrice = 4,
  Delivery = 5,
  MedicineDiscount = 6,
  NoOfInsuranceOrder = 7,
  NoOfCallsTalkLater = 8,
  PartnerAndCouponManagement = 9,
  NoOfTalkGlobalCalls = 10,
  NoOfTalkLaterCalls = 11,
  Group = 12,
  Claim = 13,
  TalkLaterDoctorWise = 14,
}

export type LeadCataloguePackageFeature = {
  id: number;
  lead_catalogue_package_id: number;
  catalogue_package_feature_id: number;
  category_id: FeatureCategoryId;
  feature_title: string;
  feature_value: string | null; // Parsed
  is_active: number;
  created_at: string;
  updated_at: string;
  original_feature_value: string | null; // Parsed
  insurance_id: number | null;
  data: any | null;
  is_aia: boolean | null;
  is_flash_credit_usable: boolean | null;
};

export type ClaimFeatures = {
  value: string;
  medicine: boolean;
  lab: boolean;
  raya: boolean;
  talkNow: boolean;
  talkLater: boolean;
  talkGlobal: boolean;
  talkFamily: boolean;
  talkFamilyMother: boolean;
  talkFamilyFather: boolean;
  talkFamilyBrother: boolean;
  talkFamilySister: boolean;
  talkFamilySpouse: boolean;
  talkFamilyChild: boolean;
  creditType: number;
};

export enum GenderType {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type LeadDetails = {
  id: number;
  lead_id: number;
  gender: GenderType;
  age: string;
  passport_no: string;
  body_tem: string;
  occupation: string;
  moh_area: string;
  patient_contact_no: string;
  patient_email_id: string;
  emergency_contact_name: string;
  emergency_contact_no: string;
  symptoms: string;
  epidemiological_evidence: string;
  created_at: Date;
  updated_at: Date;
  patient_name: string;
  bank_account_no: string | null;
  full_name: string | null;
  bank_name: string | null;
  bank_branch: string | null;
};

export type GetUserDetailsProps = {
  client: AxiosInstance;
};

export type GetEmployeeDetailsProps = GetUserDetailsProps & {
  leadId: string;
};

export type GetUserDetailResponse = any;
// CommonSuccessResponse<
// // B2BDetails
// >;

export type B2BUserDetails = {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  mobile: string;
  role: UserRoles;
  is_active: 1 | 0;
  api_token: string;
  refresh_token: string;
  is_token_active: 1 | 0;
  profile_picture_url: string | null;
  stripe_id: string | null;
  card_brand: string | null;
  card_last_four: string | null;
  trial_ends_at: string | null;
  proof_urls: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city_id: string | null;
  state: string | null;
  country_id: string | null;
  postal_code: string | null;
  address_type: string; // Should be Enum
  is_sales_rep: string | null;
  gender: string; // Should be Enum
  xero_access_token: string | null;
  tenant_id: string | null;
  doctor_type: string | null; // Should be Enum
  slug: string | null;
  xero_id: string | null;
  doctor_preference: string | null;
  qualities: string | null;
  company_tag: string;
  country_code: string; // Should be Enum
  district: string | null;
};
