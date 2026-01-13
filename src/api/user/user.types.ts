import { AxiosInstance } from "axios";

// import { FamilyMemberType } from "@/app/employeeDetails/addFamilyModal/AddFamilyModal.types";

import { CommonQueryOptions, CommonSuccessResponse } from "../index.types";
import { ConsultUserDetails } from "../consult/consult.types";
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

export type GetConsultUserDetailsProps = GetUserDetailsProps & {
  leadId: string;
};

export type GetUserDetailResponse = 
CommonSuccessResponse<
ConsultUserDetails
>;

export type GetProfileProps = {
  client: AxiosInstance;
  options?: CommonQueryOptions;
};

export enum ProfileKeyTypes {
  GetProfile = 'GetProfile',
  GetFamily = 'GetFamily',
  GetTransaction = 'GetTransaction',
  GetInvitees = 'GetInvitees',
  GetCoupons = 'GetCoupons',
  GetHealthConditions = 'GetHealthConditions',
  GetSummaryReports = 'GetSummaryReports',
}

export type GetProfileResponse = CommonSuccessResponse<Profile>;

export enum GenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type Profile = {
  address_id: null | number;
  bank_account_no: string;
  bank_branch: string;
  bank_name: string;
  comments: string;
  created_at: string;
  date_of_birth: string;
  email: string;
  formatted_id: string;
  full_name: string;
  gender: GenderType;
  healthcondition: any[];
  healthtopic: any[];
  id: string;       //lead id
  is_aia_downgraded: boolean;
  lead_owner_id: number;
  lead_type: string;
  leads_status: number;
  mobile_no: string;
  name: string;
  name_title: string | null;
  nic_no: string;
  offer_notification: null | string;
  organization_id: number;
  phone: null | string;
  preferred_language: null | string;
  product_code?: string | null;
  profile_picture_url: string;
  request_quote_notification: null | number;
  role: string;
  show_on_leadboard: number;
  show_to_doner: number;
  source: number;
  trial_used: string;
  updated_at: string;
  userDetail: string;
  store_id: string;
};

export enum ConsultUserKeyTypes {
  GetConsultUserDetails = 'GetConsultUserDetails',
  GetAppointmentCountByStatus = 'GetAppointmentCountByStatus',
}

export type ConsultUser = {
  availabilityStatus
: string,
averageRating
: 
number
createdAt
: 
Date
device_os
: 
string | null
dob
: 
Date 
doc_consultation_fee
: 
number | null
doc_speciality_icon
: 
string | null
doc_speciality_id
: 
string | null
doc_speciality_title
: 
string | null
doc_time_slot
: 
string | null
doctorQualification
: 
string | null
doctorRegistrationId
: 
string | null
doctorSignatureUrl
: 
string | null
doctorSpecialties
: 
string | null
doctorType
: 
string | null
doctor_preference
: 
string | null
doctor_prefix
: 
string | null
email
: 
string
gender
: 
string | null
healthData
: 
string | null
id
: 
string
isHealthDataPermissionAccepted
: 
boolean
isUserSync
: 
boolean
isWhatsAppEnabled
: 
boolean
language
: 
string | null
lead_id
: 
number
lead_pkg_id
: 
number
name
: 
string
onlineStatus
: 
"OFFLINE"
phoneNumber
: 
"94111555963"
profilePicture
: 
null
pushNotificationToken
: 
null
quality
: 
null
refreshToken
: 
null
registration_id
: 
null
roleId
: 
null
socket
: 
null
token
: 
null
totalConsultation
: 
0
totalRating
: 
0
totalRatingCount
: 
0
updatedAt
: 
"2026-01-12T05:23:04.460Z"
userId
: 
null
userType
: 
"PATIENT"
}