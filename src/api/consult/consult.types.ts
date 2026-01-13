import { AxiosInstance } from 'axios';


import {
  CommonQueryOptions,
  CommonSuccessResponse,
  ConsultSuccessResponse,
} from '../index.types';

export enum ConsultKeyTypes {
  GetAllAdvisers = 'GetAllAdvisers',
  GetAdviserDetails = 'GetAdviserDetails',
  GetAdviserShareableLink = 'GetAdviserShareableLink',
  GetAdviserScheduleDetails = 'GetAdviserScheduleDetails',
  GetConsultationCallLogs = 'GetConsultationCallLogs',
  GetConsultationMessages = 'GetConsultationMessages',
  GetConsultations = 'GetConsultations',
  GetAllHealthVaultByUserId = 'GetAllHealthVaultByUserId',
  GetMedicalHistoryItems = 'GetMedicalHistoryItems',
  GetPatientMedicalHistory = 'GetPatientMedicalHistory',
  GetSurgicalHistoryItems = 'GetSurgicalHistoryItems',
  GetPatientSurgicalHistory = 'GetPatientSurgicalHistory',
  GetAllAllergies = 'GetAllAllergies',
  GetPatientAllergiesHistory = 'GetPatientAllergiesHistory',
  GetAllSymptoms = 'GetAllSymptoms',
  GetAllDiagnoses = 'GetAllDiagnoses',
  GetMedicationDosages = 'GetMedicationDosages',
  GetMedicationFrequencies = 'GetMedicationFrequencies',
  GetAllConsultations = 'GetAllConsultations',
  GetAdviserEarningDetails = 'GetAdviserEarningDetails',
  GetAdviserEarningHistory = 'GetAdviserEarningHistory',
  GetReceiptByConsultationId = 'GetReceiptByConsultationId',
  GetConsultationById = 'GetConsultationById',
  GetHealthLogs = 'GetHealthLogs',
  GetConsultReview = 'GetConsultReview',
}

export type GetAllAdvisersProps = {
  client: AxiosInstance;
  params: GetAllAdvisersParams;
};

export type GetAllAdvisersParams = {
  search_text: string;
};

export type GetAllAdvisersResponse = CommonSuccessResponse<
  TalkLaterSpecialtyDetails[]
>;

export enum SpecialtyChargeType {
  Paid = 'paid',
  Free = 'free',
}

export type TalkLaterSpecialtyDetails = TalkLaterAdviserSpecialty & {
  doctor: TalkLaterAdviserDetails[];
};

export type TalkLaterAdviserPivot = {
  speciality_id: number;
  user_id: number;
};

export type TalkLaterAdviserSpecialtyData = TalkLaterAdviserPivot & {
  id: number;
  created_at: string;
  updated_at: string;
  speciality: TalkLaterAdviserSpecialty;
};

export type TalkLaterAdviserSpecialty = {
  id: number;
  title: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  speciality_icon: string;
  description: string;
  call_duration: string;
  consultation_fee: string;
  charge_type: SpecialtyChargeType;
  isCustom?: boolean; // This use for only frontend
};

export type TalkLaterAdviserDetails = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  mobile: string;
  role: number;
  is_active: number;
  api_token: string | null;
  refresh_token: string | null;
  is_token_active: number | null;
  profile_picture_url: string;
  stripe_id: string | null;
  card_brand: string | null;
  card_last_four: string | null;
  trial_ends_at: string | null;
  proof_urls: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city_id: string | null;
  state: string | null;
  country_id: number | null;
  postal_code: string | null;
  address_type: string;
  is_sales_rep: number | null;
  gender: string;
  xero_access_token: string | null;
  tenant_id: string | null;
  doctor_type: string | null;
  slug: string | null;
  xero_id: string | null;
  doctor_preference: AdviserPreferenceType;
  qualities: string | null;
  company_tag: string | null;
  country_code: string;
  district: string | null;
  pivot: TalkLaterAdviserPivot;
  doctor_speciality: TalkLaterAdviserSpecialtyData[];
  doctor_detail: TalkLaterAdviserOtherDetails;
};

export enum AdviserPreferenceType {
  Both = 'BOTH',
  TalkLater = 'TALK_LATER',
  Global = 'GLOBAL',
}
export type TalkLaterAdviserOtherDetails = {
  id: number;
  user_id: number;
  doctor_type: null;
  qualification: string;
  registration_id: string;
  created_at: string;
  updated_at: string;
  signature_url: string;
  consultation_fee: string;
  experience: string | null;
  biodata: string | null;
  language: string;
  quality: string | null;
  is_show_in_app: number;
  doctor_prefix: string;
  commission_rate: string | null;
  consultation_rate: string | null;
  lab_order_rate: string | null;
  medication_rate: string | null;
};

export type GetAdviserDetailsProps = {
  client: AxiosInstance;
  adviserId: number;
};

export type GetAdviserDetailsResponse =
  CommonSuccessResponse<AdviserUserDetails>;

export type AdviserUserDetails = {
  appointment_count: number;
  user: Pick<
    TalkLaterAdviserDetails,
    | 'id'
    | 'name'
    | 'email'
    | 'mobile'
    | 'gender'
    | 'role'
    | 'doctor_detail'
    | 'doctor_speciality'
    | 'api_token'
    | 'refresh_token'
    | 'profile_picture_url'
    | 'proof_urls'
    | 'address_line1'
    | 'address_line2'
    | 'city_id'
    | 'state'
    | 'country_id'
    | 'postal_code'
    | 'is_sales_rep'
    | 'doctor_type'
    | 'doctor_preference'
    | 'country_code'
    | 'district'
    | 'created_at'
    | 'updated_at'
  >;
};

export type GetAdviserShareableLinkProps = GetAdviserDetailsProps;

export type GetAdviserShareableLinkResponse = CommonSuccessResponse<string>;

export type GetAdviserScheduleDetailsProps = GetAdviserDetailsProps & {
  params: {
    speciality_id?: number;
    appointment_date?: string;
    is_flash_point: 0;
  };
};

export type GetAdviserScheduleDetailsResponse =
  CommonSuccessResponse<GetAdviserScheduleDetails>;

export type GetAdviserScheduleDetails = Pick<
  TalkLaterAdviserDetails,
  | 'id'
  | 'name'
  | 'email'
  | 'mobile'
  | 'gender'
  | 'role'
  | 'doctor_detail'
  | 'doctor_speciality'
  | 'api_token'
  | 'refresh_token'
  | 'profile_picture_url'
  | 'proof_urls'
  | 'address_line1'
  | 'address_line2'
  | 'city_id'
  | 'state'
  | 'country_id'
  | 'postal_code'
  | 'is_sales_rep'
  | 'doctor_type'
  | 'created_at'
  | 'updated_at'
> & {
  booked_timeslots: string[];
  disabled_dates: string[];
  booked_all_appointments: Record<string, string[]> | [];
  doctor_schedule: AdviserScheduleDetails;
  doctor_holidays: string[] | null;
  speciality: string;
  call_methods: AdviserCallMethod[];
  duration: string;
  consultation_charges: string;
  service_charges: string;
  total_charges: number;
  used_credit_points: number;
};

export type AdviserCallMethod = {
  id: number;
  method_type: CallMethod;
  created_at?: string;
  updated_at?: string;
};

export enum CallMethod {
  Audio = 'Audio',
  Video = 'Video',
}

export type AdviserScheduleDetails = {
  total_slots: number;
  available_slots: number;
  timeslots: AdviserScheduleTimeSlot[];
  week_days: AdviserScheduleWeekDay[];
};

export type AdviserScheduleTimeSlot = {
  slot_start_time: string;
  slot_end_time: string;
  is_disabled: boolean;
  is_booked: boolean;
};

export type AdviserScheduleWeekDay = {
  date: string;
  day: string;
  is_disabled: boolean;
  is_day_off: boolean;
};

export type PrebookAdviserTimeSlotProps = Pick<
  GetAdviserDetailsProps,
  'client'
> & {
  body: PrebookAdviserTimeSlotBody;
};

export type PrebookAdviserTimeSlotBody = {
  doctor_id: number;
  appointment_datetime: string;
  old_appointment_datetime?: string;
};

export type PrebookAdviserTimeSlotResponse =
  CommonSuccessResponse<PrebookAdviserTimeSlotResponseData>;

export type PrebookAdviserTimeSlotResponseData = {
  id: number;
  doctor_id: number;
  patient_id: string;
  appointment_date: string;
  updated_at: string;
  created_at: string;
};

export type CreateAdviceBookingProps = Pick<
  GetAdviserDetailsProps,
  'client'
> & {
  body: CreateAdviceBookingBody;
};

export type CreateAdviceBookingBody = {
  doctor_id: number;
  appointment_datetime: string;
  old_appointment_datetime?: string;
  patient_id: number;
  card_detail_id: number;
  duration: string;
  call_method: number;
  address_id: number;
  language: string;
  is_joined: 1;
  is_flash_point: 1 | 0;
  speciality_id: number;
  doctor_prefix: string;
  is_claimable: boolean;
  total_claim_credits: number;
  medical_assessment: string | null;
  package_id: number | null;
  is_chargble: 1 | 0;
};

export type CreateAdviceBookingResponse =
  CommonSuccessResponse<ConsultationDetails>;

export type DeviceInfo = {
  deviceType: string;
  osVersion: string;
};

export type CardDetails = {
  id: number;
  brand: string | null;
  card_no: string;
  country: string | null;
  is_used: 0 | 1;
  lead_id: string;
  card_token: string;
  created_at: string;
  updated_at: string;
  expiry_year: string;
  expiry_month: string;
};

export type ConsultUserDetails = {
  id: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  name: string;
  profilePicture: string | null;
  gender: string;
  dob: string | null;
  userType: string; // TODO: Need to create ENUM
  doctor_prefix: string;
  doctorType: string | null;
  doctorQualification: string;
  quality: string;
  doctorSpecialties: TalkLaterAdviserSpecialtyData[];
  doctorRegistrationId: string | null;
  registration_id: string;
  language: string;
  doctorSignatureUrl: string;
  email: string;
  onlineStatus: 'OFFLINE'; // TODO: Need to create ENUM
  socket: string | null;
  availabilityStatus: any;
  roleId: number;
  userId: number;
  token: string;
  pushNotificationToken: string | null;
  refreshToken: string;
  healthData: null; // TODO: Need to create type
  totalConsultation: number;
  averageRating: number;
  totalRating: number;
  totalRatingCount: number;
  isHealthDataPermissionAccepted: boolean;
  doctor_preference: string | null;
  device_os: string | null;
  lead_id: number | null;
  doc_speciality_id: number | null;
  doc_speciality_title: string | null;
  doc_speciality_icon: string | null;
  doc_time_slot: string | null;
  doc_consultation_fee: string | null;
  lead_pkg_id: number | null;
  isUserSync: boolean;
};

export enum CallEndedType {
  Dropped = 'Dropped',
  Consulted = 'Consulted',
  InCompleteConsult = 'In Complete Consult',
  Cancelled = 'Cancelled',
  Initiated = 'Initiated',
  Scheduled = 'Scheduled',
  Missed = 'Missed',
  Rescheduled = 'Rescheduled',
  Offline = 'Offline',
}

export enum CallEndedTypeId {
  Dropped = 1,
  Consulted = 2,
  InCompleteConsult = 3,
  Cancelled = 4,
  Initiated = 5,
  Scheduled = 6,
  Missed = 7,
  Rescheduled = 8,
  Offline = 9,
}

export type ConsultationDetails = {
  id: string;
  createdAt: string;
  updatedAt: string;
  consultationId: number;
  flashConsultationId: number | null;
  flashConsultationChargeId: string;
  repId: null;
  flashAppointmentId: number;
  isConsultationCharged: boolean;
  consultationStatus: string; //  TODO: Need to create ENUM
  callEndedType: CallEndedType;
  callEndedTypeId: CallEndedTypeId;
  consultationType: string | null; //  TODO: Need to create ENUM
  consultationModeId: 2; //  TODO: Need to create ENUM
  consultationMode: string; //  TODO: Need to create ENUM
  consultationSubMode: string; //  TODO: Need to create ENUM
  organizationId: number | null;
  organizationName: string | null;
  packageId: number;
  price: number;
  discount: number;
  flashCredit: number;
  is_flash_point: number;
  medOrderId: number | null;
  labOrderId: number | null;
  gender: string; //  TODO: Need to create ENUM
  age: string;
  callType: CallMethod;
  consultationFor: string;
  consultationForName: string;
  consultationForAge: string;
  consultationForGender: string; // TODO: Need to create ENUM
  isHealthDataRequested: boolean;
  isMedOrderPlaced: boolean;
  isLabOrderPlaced: boolean;
  unlistedMedications: null; // TODO: Need to create type
  medications: Medication[] | null;
  labTests: LabTestDetails[] | null;
  diagnoses: ClinicalCommonDetails | null;
  symptoms: ClinicalCommonDetails | null;
  allergies: ClinicalCommonDetails | null;
  medPreFiles: string[] | null;
  prescription: string | null;
  deviceInfo: DeviceInfo | null;
  cardDetails: CardDetails;
  addressId: number;
  cardId: number;
  requestQuote: null; // TODO: Need to create type
  requestedAt: string | null;
  startedAt: string | null;
  endedAt: string | null;
  appointmentDate: string;
  appointmentStatus: string; // TODO: Need to create ENUM
  appointmentType: string | null;
  totalConsultationTime: string | null;
  totalConsultationTimeInSecond: string | null;
  language: string;
  duration: string;
  is_join: boolean;
  isRequestedForCall: boolean;
  remainingSeconds: number;
  exceededSeconds: number;
  isExceeded: boolean;
  isConsultationOver: boolean;
  is_refund_requested: boolean;
  lead_pkg_id: number | null;
  merMustChecks: null; // TODO: Need to create type
  merPackageId: number | null;
  totalClaimCredits: number;
  isClaim: boolean;
  cancelReason: string | null;
  hasFailedPrescription: boolean;
  doctor: ConsultUserDetails | null;
  patient: ConsultUserDetails;
  medicalAssessment: null;
  appointmentDateString: string;
};

export type GetConslutUserDetailResponse = 
ConsultSuccessResponse<
ConsultUserDetails | null | undefined, null
>;

export type ClinicalCommonDetails = {
  items: ClinicalCommonDataDetails[];
  note: string;
};

export type LabTestDetails = {
  data: any;
  note: string;
};

export type Medication = {
  dosage: string;
  duration: string;
  frequency: string;
  medicineId: string;
  medicineName: string;
  notes: string;
  route: string;
  schedules: Schedule[];
  timing: string;
};

export type Schedule = {
  count: number;
  id: string;
  status: boolean;
  title: string;
};

export type GetConsultationCallLogsProps = Pick<
  GetAllAdvisersProps,
  'client'
> & {
  consultationId: string;
};

export type GetConsultationCallLogsResponse = ConsultSuccessResponse<
  ConsultationCallLogDetails[],
  null
>;

export type ConsultationCallLogDetails = {
  id: string;
  action: string;
  description: string | null;
  application: string;
  deviceInfo: DeviceInfo | null;
  dateAndTime: Date;
  user: ConsultationCallLogUserDetails;
  consultation: ConsultationCallLogConsultDetails | null;
  data: unknown;
};

export type ConsultationCallLogUserDetails = Pick<
  ConsultUserDetails,
  'id' | 'name' | 'email' | 'phoneNumber' | 'userType'
> & {
  adminUserId: number;
};

export type ConsultationCallLogConsultDetails = Pick<
  ConsultationDetails,
  'id' | 'consultationId' | 'flashConsultationId' | 'callType'
> & {
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
};

export type RemoveHealthVaultDataByIdProps = Pick<
  GetAdviserDetailsProps,
  'client'
> & {
  healthVaultId: string;
};

export type RemoveHealthVaultDataByIdResponse = CommonSuccessResponse<unknown>;

export type GetConsultationMessagesProps = Pick<
  GetAllAdvisersProps,
  'client'
> & {
  params: {
    consultation: string;
    take: 50; // Hardcoded in Old App (50)
  };
};


export type GetConsultationsProps = {
  client: AxiosInstance;
  params: GetConsultationsParams;
};

export type GetConsultationsParams = {
  patient?: string;
  doctor?: string;
  name?: string;
  page: number;
  take: number;
};

export type GetConsultationsResponse = ConsultSuccessResponse<
  ConsultationDetails[],
  null
>;

export type HealthVaultDetails = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string | null;
  fileUrl: string | null;
  fileType: string | null;
  mimeType: string | null;
  userId: number | null;
  familyMemberId: number | null;
  familyMemberDetails: any | null;
  customTags: string[] | null;
};

export type GetAllHealthVaultByUserIdProps = {
  client: AxiosInstance;
  params: GetAllHealthVaultByUserIdParams;
};

export type GetAllHealthVaultByUserIdParams = {
  userId: number;
  page: number;
  take: number;
};

export type GetAllHealthVaultByUserIdResponse = ConsultSuccessResponse<
  HealthVaultDetails[],
  null
>;

export type GetMedicalHistoryItemsProps = {
  client: AxiosInstance;
};

export type MedicalAndSurgicalHistoryItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  fhirCode: string;
};

export type GetMedicalHistoryItemsResponse = ConsultSuccessResponse<
  MedicalAndSurgicalHistoryItem[],
  null
>;

export type GetPatientMedicalHistoryProps = {
  client: AxiosInstance;
  patientLeadId: number;
};

export type PatientMedicalHistory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  medicalHistories: MedicalAndSurgicalHistoryItem[] | null;
  consultationFor: string | null;
  patientId: number;
  preference: string | null;
};

export type GetPatientMedicalHistoryResponse = ConsultSuccessResponse<
  PatientMedicalHistory,
  null
>;

export type CreatePatientMedicalHistoryProps = {
  client: AxiosInstance;
  body: Omit<PatientMedicalHistory, 'id' | 'createdAt' | 'updatedAt'>;
};

export type CreatePatientMedicalHistoryResponse = ConsultSuccessResponse<
  PatientMedicalHistory,
  null
>;

export type UpdatePatientMedicalHistoryProps =
  CreatePatientMedicalHistoryProps & {
    medicalHistoryId: string;
  };

export type UpdatePatientMedicalHistoryResponse = ConsultSuccessResponse<
  PatientMedicalHistory,
  null
>;

export type GetSurgicalHistoryItemsProps = {
  client: AxiosInstance;
};

export type GetSurgicalHistoryItemsResponse = ConsultSuccessResponse<
  MedicalAndSurgicalHistoryItem[],
  null
>;

export type GetPatientSurgicalHistoryProps = {
  client: AxiosInstance;
  patientLeadId: number;
};

export type PatientSurgicalHistory = Omit<
  PatientMedicalHistory,
  'medicalHistories'
> & {
  surgicalHistories: PatientMedicalHistory['medicalHistories'];
};

export type GetPatientSurgicalHistoryResponse = ConsultSuccessResponse<
  PatientSurgicalHistory,
  null
>;

export type CreatePatientSurgicalHistoryProps = {
  client: AxiosInstance;
  body: Omit<PatientSurgicalHistory, 'id' | 'createdAt' | 'updatedAt'>;
};

export type CreatePatientSurgicalHistoryResponse = ConsultSuccessResponse<
  PatientSurgicalHistory,
  null
>;

export type UpdatePatientSurgicalHistoryProps =
  CreatePatientSurgicalHistoryProps & {
    surgicalHistoryId: string;
  };

export type UpdatePatientSurgicalHistoryResponse = ConsultSuccessResponse<
  PatientSurgicalHistory,
  null
>;

export type GetAllAllergiesProps = {
  client: AxiosInstance;
};

export type Allergy = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type GetAllAllergiesResponse = ConsultSuccessResponse<Allergy[], null>;

export type GetPatientAllergiesHistoryProps = {
  client: AxiosInstance;
  patientId: string;
};

export type AllergiesHistory = {
  id: string;
  createdAt: string;
  allergy: Pick<Allergy, 'id' | 'name'>;
  reaction: string;
  allergenType: string;
  consultationFor: 'Customer';
  patient: Pick<ConsultUserDetails, 'id' | 'name'>;
};

export type GetPatientAllergiesHistoryResponse = ConsultSuccessResponse<
  AllergiesHistory[],
  null
>;

export type CreatePatientAllergenReactionHistoryProps = {
  client: AxiosInstance;
  body: CreatePatientAllergenReactionHistoryBody;
};

export type CreatePatientAllergenReactionHistoryBody = Pick<
  AllergiesHistory,
  'allergenType' | 'consultationFor' | 'reaction'
> & {
  allergies: string;
  consultation?: string;
  patient: string;
};

export type CreatePatientAllergenReactionHistoryResponse =
  ConsultSuccessResponse<AllergiesHistory, null>;

export type RemoveAllergenReactionHistoryByIdProps = {
  client: AxiosInstance;
  allergenReactionHistoryId: string;
};

export type RemoveAllergenReactionHistoryByIdResponse = ConsultSuccessResponse<
  unknown,
  null
>;

export type CreatePrescriptionProps = {
  client: AxiosInstance;
  consultationId: string;
  body: CreatePrescriptionBody;
};

export type CreatePrescriptionBody = {
  labTests: LabTestDetails[];
  medications: Medication[];
  diagnoses: ClinicalCommonDetails | Object;
  symptoms: ClinicalCommonDetails | Object;
  allergies: ClinicalCommonDetails | Object;
  medPreFiles: string[];
};

export type CreatePrescriptionResponse = ConsultSuccessResponse<
  CreatePrescriptionData,
  null
>;

export type CreatePrescriptionData = {
  prescription: string;
};

export type GetAllSymptomsProps = {
  client: AxiosInstance;
  params: GetAllSymptomsParams;
  options?: CommonQueryOptions;
};

export type GetAllSymptomsParams = {
  name?: string;
  take: number;
  page: number;
};

export type ClinicalCommonDataDetails = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllSymptomsResponse = ConsultSuccessResponse<
  ClinicalCommonDataDetails[],
  null
>;

export type GetAllDiagnosesProps = {
  client: AxiosInstance;
  params: GetAllSymptomsParams;
  options?: CommonQueryOptions;
};

export type GetAllDiagnosesResponse = ConsultSuccessResponse<
  ClinicalCommonDataDetails[],
  null
>;

export type GetMedicationDosagesProps = {
  client: AxiosInstance;
};

export type GetMedicationDosagesResponse = ConsultSuccessResponse<
  ClinicalCommonDataDetails[],
  null
>;

export type GetAllDosagesProps = {
  client: AxiosInstance;
};

export type GetAllDosagesResponse = ConsultSuccessResponse<
  ClinicalCommonDataDetails[],
  null
>;

export type GetMedicationFrequenciesProps = {
  client: AxiosInstance;
};

export type GetMedicationFrequenciesResponse = ConsultSuccessResponse<
  ClinicalCommonDataDetails[],
  null
>;

export type GetAllConsultationsProps = {
  client: AxiosInstance;
  params: GetFirstAdviceOrderListParams;
};

export type GetFirstAdviceOrderListParams = {
  doctor: string;
  page: number;
  take: number;
  appointmentType?: any;
  scheduleType: 'upcoming';
  orderBy: 'appointmentDate';
  orderType: 'DESC';
};

export type GetAllConsultationsResponse = ConsultSuccessResponse<
  ConsultationDetails[],
  null
>;

export type GetAdviserEarningDetailsProps = {
  client: AxiosInstance;
  params: GetAdviserEarningsParams;
};

export type GetAdviserEarningsParams = {
  doctor_id: number;
};

export type GetAdviserEarningDetailsResponse =
  CommonSuccessResponse<GetAdviserEarningsData>;

export type GetAdviserEarningsData = {
  cash_credit: number;
  cash_debit: number;
  cash_total: number;
  flash_point_credit: number;
  flash_point_debit: number;
  flash_point_total: number;
};

export type GetAdviserEarningHistoryProps = {
  client: AxiosInstance;
  adviserId: number;
};

export type GetAdviserEarningHistoryResponse = CommonSuccessResponse<
  AdviserEarningTransaction[]
>;

export type AdviserEarningTransaction = {
  id: number;
  credit: string | null;
  debit: string | null;
  user_id: string;
  order_id: number;
  earning_type: string;
  transaction_type: 'cash';
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type UpdateConsultationEndTypeProps = {
  client: AxiosInstance;
  consultationId: string;
  body: UpdateConsultationEndTypeBody;
};

export type UpdateConsultationEndTypeBody = {
  callEndedTypeId: CallEndedTypeId;
};

export type UpdateConsultationEndTypeResponse = ConsultSuccessResponse<
  ConsultationDetails,
  null
>;

export type ConfirmConsultationProps = {
  client: AxiosInstance;
  consultationId: string;
  body: ConfirmConsultationBody;
};

export type ConfirmConsultationBody = CreatePrescriptionBody & {
  placeMedOrder: boolean;
  placeLabOrder: boolean;
  package_id: number;
};
export type ConfirmConsultationResponse = ConsultSuccessResponse<
  ConsultationDetails,
  null
>;

export type GetReceiptByConsultationIdProps = {
  client: AxiosInstance;
  consultationId: number;
  options?: CommonQueryOptions;
};

export type GetReceiptByConsultationData = {
  pdf_url: string;
};

export type GetReceiptByConsultationIdResponse =
  CommonSuccessResponse<GetReceiptByConsultationData>;

export type GetConsultationByIdProps = {
  client: AxiosInstance;
  consultationId: string;
  options?: CommonQueryOptions;
};

export type GetConsultationByIdResponse = ConsultSuccessResponse<
  ConsultationDetails,
  null
>;

export type RescheduleAdviceBookingProps = {
  client: AxiosInstance;
  consultationId: number;
  body: RescheduleAdviceBookingBody;
  options?: CommonQueryOptions;
};

export type RescheduleAdviceBookingBody = {
  rescheduler_user_id: number;
  appointment_date: string;
  rescheduler_name: string;
};

export type RescheduleAdviceBookingResponse =
  CommonSuccessResponse<ConsultationDetails>;

export type CreateHealthDocumentProps = {
  client: AxiosInstance;
  body: FormData;
};

export type CreateHealthDocumentBody = {
  title: string;
  familyMemberId: number | null;
  customTags: string[];
  file: File;
};

export type CreateHealthDocumentResponse = ConsultSuccessResponse<
  HealthVaultDetails,
  null
>;

export type UpdateHealthDocumentProps = {
  client: AxiosInstance;
  documentId: string;
  body: UpdateHealthDocumentBody;
};

export type UpdateHealthDocumentBody = {
  title: string;
  familyMemberId: number | null;
  customTags: string[];
};

export type UpdateHealthDocumentResponse = ConsultSuccessResponse<
  HealthVaultDetails,
  null
>;

export type UploadToHealthVaultResponse = ConsultSuccessResponse<
  HealthVaultDetails,
  null
>;

export type AddHealthLogProps = {
  client: AxiosInstance;
  body: any;
};

export type AddHealthLogsResponse = ConsultSuccessResponse<
  AddHealthLogsResponseData,
  null
>;

export type AddHealthLogsResponseData = {
  user: ConsultUserDetails;
  consultation: any | null;
  relation: string;
  height: string | null;
  heightUnit: string;
  weight: string | null;
  weightUnit: string | null;
  bmi: string | null;
  pulse: string | null;
  spo2: string | null;
  systolic: string | null;
  diastolic: string | null;
  bloodSugar: string | null;
  cholesterol: string | null;
  hemoglobin: string | null;
  respiratoryRate: string | null;
  sleep: string | null;
  energyConsumed: string | null;
  water: string | null;
  bodyTemperature: string | null;
  bodyFat: string | null;
  type: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  isMigrated: boolean;
};

export type GetHealthLogsProps = {
  client: AxiosInstance;
  userId: string;
};

export type GetHealthLogsResponse = ConsultSuccessResponse<
  GetHealthLogsResponseData[],
  null
>;

export type GetHealthLogsResponseData = Omit<
  AddHealthLogsResponseData,
  | 'respiratoryRate'
  | 'sleep'
  | 'energyConsumed'
  | 'water'
  | 'bodyTemperature'
  | 'bodyFat'
  | 'isMigrated'
  | 'user'
  | 'consultation'
> & {
  user: ConsultationCallLogUserDetails;
  consultation: ConsultationCallLogConsultDetails | null;
};

export type UpdateHealthLogProps = {
  client: AxiosInstance;
  healthLogId: string;
  body: any;
};

export type CancelConsultationBookingProps = {
  client: AxiosInstance;
  flashAppointmentId: number;
  body: CancelConsultationBookingBody;
};

export type CancelConsultationBookingBody = {
  cancel_reason: string;
};

export type CancelConsultationBookingResponse = CommonSuccessResponse<unknown>;

export type GetConsultReviewProps = {
  client: AxiosInstance;
  consultationId: number;
  options?: CommonQueryOptions;
};

export type GetConsultReviewResponse =
  CommonSuccessResponse<ConsultReviewDetails>;

export type ConsultReviewDetails = {
  id: number;
  consultation_id: string;
  orderreview: ConsultOrderReview[];
};

export type ConsultOrderReview = {
  id: number;
  created_at: string;
  updated_at: string;
  skip_review: number;
};
