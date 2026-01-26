import { AxiosInstance } from 'axios';

import { ConsultationDetails } from '../consult/consult.types';
import {
  CommonQueryOptions,
  CommonSuccessPaginatedResponse,
  CommonSuccessResponse,
  ConsultSuccessResponse,
} from '../index.types';

export type CreateMedicineOrderProps = {
  client: AxiosInstance;
  body: CreateMedicineOrderBody;
};

export type Medication = {
  id: number;
  quantity: number;
  margin_discount_percentage: string;
  item_type: number;
};

export type CreateMedicineOrderBody = {
  prescription_file?: string[];
  delivery_type: number;
  delivery_charge: number;
  order_status: MedicineOrderStatus;
//   paymentoption: PaymentMethod;
  address_id: number;
  order_note: string;
  prescription_text: string;
  request_quote_notification: '1' | '0';
  use_flash_point: '1' | '0';
  is_substitute_medicine: '1' | '0';
  card_detail_id: number | string;
  coupon_code: number | string;
  medications: Medication[] | [];
  package_delivery_discount: boolean;
  is_claimable: boolean;
  secondary_number: string;
  secondary_name: string;
  is_insureme: boolean;
  insureme_cus_id: number | string;
  package_id: number;
};

export type CreateMedicineOrderResponse =
  CommonSuccessResponse<CreateMedicineOrderResponseData>;

export type CreateMedicineOrderResponseDiscountData = {
  package_id: number;
  feature_value: unknown;
  noOfCallsTalkLater: boolean;
  talkLaterDoctorWise: boolean;
  created_at: string;
};

export type CreateMedicineOrderResponseData = {
  address_id: number;
  channel: string;
  created_at: string;
  credit_being_use: string;
  delivery_charge: number;
  delivery_type: number;
  discount_data: CreateMedicineOrderResponseDiscountData;
  district: unknown;
  id: number;
  is_active: number;
  is_added_other_products: number;
  is_claimable: boolean;
  is_flash_point: string;
  is_insureme: boolean;
  is_substitute_medicine: number;
  is_viewed_by_admin: number;
  lead_id: string;
  order_date: string;
  order_status: MedicineOrderStatus;
  order_status_label: string;
  order_sub_type: number;
  order_type: number;
  order_type_for_review: number;
  origin_package_id: number;
  package_delivery_discount: boolean;
//   paymentoption: PaymentMethod;
  prescription_note: string;
  prescription_text: string;
  request_quote_notification: string;
  secondary_name: string;
  secondary_number: string;
  source: number;
  status_label: string;
  submitted_start_time: string;
  updated_at: string;
};

export enum LabTestKeyType {
  GetLabTests = 'GetLabTests',
  GetLabPartners = 'GetLabPartners',
}

export enum ClinicalServiceType {
  HomeCare = 'homecare',
  Lab = 'lab',
}

export type getLabTestsProps = {
  client: AxiosInstance;
  params: GetLabTestsParams;
  options?: CommonQueryOptions;
};

export type GetLabTestsParams = {
  search_report?: string;
  is_featured?: number;
  report_type?: ClinicalServiceType;
};

export type GetLabTestsResponse =
  CommonSuccessResponse<GetLabTestsResponseData>;

export type ClinicalServiceDetails = {
  id: number;
  title: string;
  description: string | null;
  test_code: string;
  package_id: number | null;
  unit_price: string;
  is_active: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
  price: string;
  department_id: number;
  parent_test: string;
  short_name: string;
  display_name: string;
  method_name: string;
  specimen_name: string;
  container_name: string;
  min_process_time: string;
  emergency_process_time: string;
  reporting_days: string;
  tat: string;
  tags: string[];
  district: string;
  report_packages: string[];
  icon_url: string | null;
};

export type LabTest = ClinicalServiceDetails;

export type GetLabTestsResponseData = {
  current_page: number;
  data: LabTest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: number | null;
  to: number;
  total: number;
};

export type GetLabPartnersProps = {
  client: AxiosInstance;
  options?: CommonQueryOptions;
  params: GetLabPartnersParams;
};

export type GetLabPartnersParams = {
  is_homecare_enabled?: boolean;
};

export type GetLabPartnersResponse =
  CommonSuccessResponse<GetLabPartnersResponseData>;

export type LabPartner = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  mobile: string;
  role: number;
  is_active: number;
  api_token: string;
  refresh_token: string;
  is_token_active: number;
  profile_picture_url: string;
  stripe_id: number | null;
  card_brand: string | null;
  card_last_four: string | null;
  trial_ends_at: string | null;
  proof_urls: string[] | null;
  address_line1: string | null;
  address_line2: string | null;
  city_id: number | null;
  state: string | null;
  country_id: number;
  postal_code: string | null;
  address_type: string;
  is_sales_rep: number | null;
  gender: string;
  xero_access_token: string | null;
  tenant_id: string | null;
  doctor_type: string | null;
  slug: string | null;
  xero_id: string | null;
  doctor_preference: string | null;
  qualities: string | null;
  company_tag: string | null;
  country_code: string;
  district: string | null;
};

export type GetLabPartnersResponseData = {
  current_page: number;
  data: LabPartner[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type CreateLabOrderProps = {
  client: AxiosInstance;
  body: CreateClinicalOrderBody;
};

export type CreateClinicalOrderBody = {
  prescription_file?: string[];
  prescription_text: string;
  order_note: string;
  delivery_type: number;
  delivery_charge: number;
  order_status: LabOrderStatus;
//   paymentoption: PaymentMethod;
  address_id: number;
  request_quote_notification: '1' | '0';
  use_flash_point: '1' | '0';
  delivery_date: string;
  delivery_time: string;
  card_detail_id: number | string;
  selected_reports: LabTest[];
  lab_partner_id: number;
  lab_partner_name: string;
  is_claimable: boolean;
  package_id: number;
  type: ClinicalServiceType;
  preferred_caregiver_type?: ClinicalServiceCaregiverType;
};

export enum ClinicalServiceCaregiverType {
  Doctor = 'Doctor',
  Nurse = 'Nurse',
}

export type CreateLabOrderResponse =
  CommonSuccessResponse<CreateLabOrderResponseData>;

export type CreateLabOrderResponseDiscountData = {
  package_id: number;
  feature_value: unknown;
  noOfCallsTalkLater: boolean;
  talkLaterDoctorWise: boolean;
  created_at: string;
};

export type CreateLabOrderResponseOrderData = {
  id: number;
  order_id: number;
  report_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
  md_type: number;
  margin_discount_percentage: string;
  margin_discount_price: string;
  item_type: number;
  md_sub_type: number;
  is_claimable: unknown | null;
  report: LabTest;
};

export type CreateLabOrderResponseData = {
  id: number;
  lead_id: number;
  opharma_reference: string | null;
  prescription_file: string | string[] | null;
  prescription_file_url: string | string[] | null;
  order_date: string;
  delivery_type: number;
  delivery_charge: string;
  basket_value: string;
  total_cost: string;
  last_subscription_order: unknown | null;
  address_id: number;
  order_status: LabOrderStatus;
  is_active: number;
  created_at: string;
  updated_at: string;
  created_by: null;
  channel: string;
  source: number;
  organization_discount: string;
  organization_discount_cost: string;
//   paymentoption: PaymentMethod;
  paid_amount: number | null;
  short_url: string | null;
  order_note: string | null;
  mypharma_reference: string | null;
  cancel_reason: string | null;
  payment_due_date: string | null;
  addresslabel: string | null;
  order_status_label: string;
  source_label: string | null;
  tags: string | null;
  margin: string | null;
  margin_type: string | null;
  rider_id: number | null;
  prescription_text: string | null;
  prescription_note: string | null;
  credit_being_use: '0' | '1';
  is_flash_point: 0 | 1;
  is_viewed_by_admin: 0 | 1;
  used_credit_points: number | null;
  request_quote_notification: 0 | 1;
  delivery_date: string | null;
  delivery_time: string | null;
  show_instruction1: 0 | 1;
  show_instruction2: 0 | 1;
  card_detail_id: number | null;
  payment_status: string | null;
  stripe_charge_id: number | null;
  sales_user_id: number | null;
  consultation_id: number | null;
  xero_id: number | null;
  package_id: number | null;
  package_discount: unknown | null;
  package_discount_amount: string | null;
  selected_reports: LabTest[];
  prescription_lab_test: unknown | LabTest[] | [];
  order_sub_type: number;
  lab_partner_id: string;
  lab_partner_name: string;
  is_claimable: '0' | '1';
  claim_id: number | null;
  priority: number | null;
  priority_reference: string | null;
  is_mer: boolean;
  district: string | null;
  origin_package_id: number;
  discount_data: CreateLabOrderResponseDiscountData;
  is_complete: boolean;
  status_label: string;
  order_item: CreateLabOrderResponseOrderData[];
};

export enum OrderKeyTypes {
  GetAllMedicineOrders = 'GetAllMedicineOrders',
  GetAllLabOrders = 'GetAllLabOrders',
  GetFirstAdviceOrders = 'GetFirstAdviceOrders',
  GetMedicineOrderDetails = 'GetMedicineOrderDetails',
  GetLabOrderDetails = 'GetLabOrderDetails',
  GetLabTests = 'GetLabTests',
  GetLabPartners = 'GetLabPartners',
  GetOrderReceipt = 'GetOrderReceipt',
  GetSubscriptionReceipt = 'GetSubscriptionReceipt',
  GetLabReports = 'GetLabReports',
  GetPreviousLabOrders = 'GetPreviousLabOrders',
  GetPreviousMedOrders = 'GetPreviousMedOrders',
  GetCancelMedicineOrder = 'GetCancelMedicineOrder',
  GetPickedUpTrackLocation = 'GetPickedUpTrackLocation',
}

export type GetMedicineOrderListProps = {
  client: AxiosInstance;
  params: GetMedicineOrderListParams;
};

export type GetMedicineOrderListParams = {
  page: number;
  search: string;
};

export type GetMedicineOrderListResponse = CommonSuccessResponse<
  MedicineOrderDetails[]
>;

// export type OrderAddressDetails = Omit<
//   AddressDetails,
//   'lead_id' | 'customaddress' | 'address_city' | 'addresscountry' | 'is_active'
// >;

export type MedicineOrderDetails = {
//   address: OrderAddressDetails;
  basket_value: string;
  card_detail_id: string | null;
  catalogPackage: CatalogPackage;
  channel: string;
  claim: undefined; //TODO: Assuming no further structure given
  claim_id: number | null;
  claimable_value: string;
  coupon: Coupon[];
  coupon_discount_amount: number;
  coupon_id?: number;
  created_at: string;
  created_by: number | null;
  credit_being_use: string;
  delivery_charge: string;
//   delivery_detail: DeliveryDetail;
  delivery_from_date: string | null;
  delivery_to_date: string | null;
  delivery_type: number;
  discount_data: DiscountData;
  documents: undefined; //TODO: Assuming no further structure given
  grn_documents: undefined; //TODO: Assuming no further structure given
  id: number;
  insuremeDetails: any[];
  is_abusable: boolean;
  is_abusable_url: string | null;
  is_claimable: '0' | '1';
  is_courier_partner: number;
  is_substitute_medicine: number;
  lead: Lead;
  lead_id: number;
  margin: number | null;
  margin_type: string | null;
  not_get_medicine: boolean | null;
  orderItems?: MedOrderItem[];
  order_date: string;
  order_note: string | null;
  order_status: MedicineOrderStatus;
  order_status_label: string;
  order_sub_type: number;
  order_type: MedicineOrderStatus;
  orderreview: OrderReview[];
  organization_discount: number | null;
  organization_discount_cost: string;
  package_delivery_discount: boolean;
  package_discount?: number | null;
  package_discount_amount: string | null;
  package_id: number | null;
  packed_by: string | null;
  payment_status: string | null;
//   paymentoption: PaymentMethod;
  po_documents: undefined; //TODO: Assuming no further structure given
  po_number: string | null;
  prescription_details: PrescriptionItem[]; //TODO:  Double check if this is correct
  prescription_file: string | null;
  prescription_file_url: string | null;
  prescription_note: string;
  prescription_text: string;
  prescriptiondata: MedOrderPrescription[];
  request_quote_notification: number;
  rider_id: string | null;
  rider_name: Rider | null;
  secondary_name: string | null;
  secondary_number: string | null;
  source: number;
  source_label: string;
  stripe_charge_id: string | null;
  show_instruction1: number;
  show_instruction2: number;
  total_cost: string;
  tracking_id: string | null;
  tracking_note: string | null;
  tracking_url: string | null;
  updated_at: string;
  use_flash_point: number;
  used_credit_points: number | null;
  isFirstOrder?: boolean;
};

export type MedOrderPrescription = {
  id: number;
  order_id: number;
  prescription_url: string;
  created_at: string;
  updated_at: string;
  prescription_text: string;
};

export type CatalogPackage = {
  title: string;
  package_logo: string | null;
};

export type Coupon = {
  id: number;
  title: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// type DeliveryDetail = DeliveryMethod;

export type PrescriptionItem = {
  id: number;
  prescription_file: string;
  created_at: string;
  updated_at: string;
};

export type MedOrderItemMedication = {
  id: number;
  title: string;
  item_code: string;
  category_id: string;
  price: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  unit_price: string;
  add_commision: number;
  city: string | null;
  description: string | null;
  is_featured: number;
  country_id: number;
  is_flash_medicine: number;
  quantity: string;
  barcode: string | null;
  discounted_price: string | null;
  supplier_id: number | null;
  sort_order: string | null;
  is_available: number;
  generic_name: string;
  xero_id: string | null;
  xero_inventory_id: string | null;
  deliver_within: string;
  quantity_type: number;
  quantity_per_box: string;
  total_quantity: string;
  is_out_of_stock: boolean | null;
  slug: string;
  tags: string | null;
  mrp: string | null;
  country_code: string;
  predict_url: string | null;
  bulk_uploaded: boolean;
  xcoord: string;
  ycoord: string;
  total_allocated: string;
};

type DiscountData = {
  created_at: string;
  feature_value: string | null;
  noOfCallsTalkLater: boolean;
  package_id: number;
  talkLaterDoctorWise: boolean;
};

export type Lead = {
  email: string;
  id: string;
  mobile_no: string;
  name: string;
  phone: string | null;
};

export type Rider = {
  mobile: string;
  name: string;
  lead_id: string;
  profile_picture_url: string | null;
};

export type OrderReview = {
  order_id: number;
  review: null | number;
  otherfeedback: string | null;
//   type: PendingReviewType;
  sentiments: string[] | null;
};

export enum MedicineOrderStatus {
  Submitted = 1,
  Processing = 2,
  Dispatch = 3,
  Complete = 4,
  Cancelled = 5,
  Attempted = 6,
  Unreachable = 7,
  Pending = 8,
  QuoteSent = 9,
  contacted = 10,
  Pack = 11,
  Ready = 12,
  Draft = 13,
  WaitingForSupplier = 14,
  PartiallyDelivered = 16,
  OrderOnMove = 19,
}

export type GetLabOrderListProps = {
  client: AxiosInstance;
  params: GetLabOrderListParams;
};

export type GetLabOrderListParams = {
  page: number;
  report_name?: string;
};

export type GetLabOrderListResponse = CommonSuccessResponse<
  ClinicalOrderDetails[]
>;

export type GetPickedUpTrackLocationProps = {
  client: AxiosInstance;
  id: number;
  options?: CommonQueryOptions;
};

export type GetPickedUpTrackLocationResponse =
  CommonSuccessResponse<RiderLocationData>;

export type RiderLocationData = {
  address_latitiude: string; // Comes as string from backend
  address_longitude: string;
  latitude: number;
  longitude: number;
  profileimage: string;
  ridername: string;
};

export type LabOrderItem = {
  order_item_id: number;
  report_id: number;
  item_type: number;
  report_title: string;
  report_testcode: string;
  quantity: number;
  unit_price: string;
  md_type: number;
  md_sub_type: number;
  margin_discount_percentage: string;
  margin_discount_price: string;
  subtotal: string;
  report_urls: string[];
  claimable: null;
};

export type PreviousLabOrderItem = {
  id: number;
  order_id: number;
  report_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
  md_type: number;
  margin_discount_percentage: string;
  margin_discount_price: string;
  item_type: number;
  md_sub_type: number;
  is_claimable: string;
  lab_order_report: any[];
};

export type PreviousOrderSample = {
  id: number;
  order_id: number;
  institute: string;
  collector_name: string;
  patient_condition: string | null;
  sample_type: string | null;
  place_of_sample_collection: string | null;
  mode_of_transportation: string | null;
  created_at: string;
  updated_at: string;
  testing_purpose: string | null;
};

export type MedOrderItem = {
  id?: number;
  order_id?: number;
  medication_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  created_at?: string;
  updated_at?: string;
  md_type: number;
  nos?: number;
  medication_title: string;
  margin_discount_percentage: string;
  margin_discount_price: string | null;
  is_changed: number;
  md_sub_type: number;
  item_type: number;
  discount_used?: string | null;
  claimable: boolean;
  is_recommended_product?: boolean;
  partial_sent?: boolean;
  stock_updated?: boolean;
  description?: string;
  status?: string;
  is_printable?: boolean | null;
  medication?: MedOrderItemMedication;
  order_item_id: number;
  medication_itemcode: string;
};

export type ClinicalOrderDetails = {
//   address: OrderAddressDetails;
  basket_value: string;
  cancel_reason: string | null;
  card_detail_id: number | null;
  channel: string;
  created_at: string;
  created_by: number;
  claimable_value: string;
  delivery_charge: string;
  delivery_date: string;
//   delivery_detail: DeliveryDetail;
  delivery_time: string;
  delivery_type: number;
  discount_data: DiscountData;
  generic_report_urls: string[] | null;
  id: number;
  lab_partner_id: number;
  last_subscription_order: unknown;
//   leadCardDetail?: CardDetails | null;
  lead_id: number;
  margin: string;
  margin_type: number;
  mypharma_reference: string;
  opharma_reference: string;
  orderItems: LabOrderItem[];
  order_date: string;
  order_note: string;
  order_status: LabOrderStatus | HomeCareOrderStatus;
  order_status_label: string;
  order_sub_type: number;
  organization_discount: string;
  organization_discount_cost: string;
  package_discount: string | null;
  package_discount_amount: string | null;
  package_id: number | null;
  payment_due_date: string;
//   paymentoption: PaymentMethod;
  prescription_file: string | null;
  prescription_file_url: string | null;
  prescription_note: string;
  prescription_text: string;
  prescriptions: LabOrderPrescription[];
  request_quote_notification: number;
  rider_id: number;
  rider_name: string;
  sample_details: SampleDetails;
  short_url: string | null;
  source: number;
  source_label: string;
  secondary_name: string | null;
  secondary_number: string | null;
  show_instruction1: number;
  show_instruction2: number;
  tags: string | null;
  total_cost: string;
  updated_at: string;
  use_flash_point: number;
  used_credit_points: string;
  isFirstOrder?: boolean;
  lab_partner_name: string;
  selected_reports: LabTest[];
  //-------------------
  order_type: number;
  is_claimable: '0' | '1';
  type: ClinicalServiceType;
  preferred_caregiver_type?: ClinicalServiceCaregiverType;
  orderreview: OrderReview[];
};

export type LabOrderPrescription = {
  id: number;
  prescription_file: string;
};

export type SampleDetails = {
  collector_name: string;
  id: number;
  institute: string;
  mode_of_transportation: string | null;
  patient_condition: string | null;
  place_of_sample_collection: string | null;
  sample_type: string | null;
  testing_purpose: string | null;
};

export enum LabOrderStatus {
  SubmittedLab = 1,
  ReviewLab = 2,
  ConfirmedLab = 3,
  DispatchedLab = 4,
  SampleCollectedLab = 5,
  CompletedLab = 6,
  CancelledLab = 7,
  PendingPaymentLab = 8,
  AttemptedLab = 9,
  UnreachableLab = 10,
  QuoteSentLab = 11,
  NotDefinedLab = 13,
  CollectedLab = 14,
}

export enum HomeCareOrderStatus {
  SubmittedHomeCare = 1,
  ConfirmedHomeCare = 3,
  CompletedHomeCare = 6,
  CancelledHomeCare = 7,
}

export type GetFirstAdviceOrderListProps = {
  client: AxiosInstance;
  params: GetFirstAdviceOrderListParams;
};

export type GetFirstAdviceOrderListParams = {
  patient: string;
  page: number;
  take: number;
};

export type GetFirstAdviceOrderListResponse = ConsultSuccessResponse<
  ConsultationDetails[],
  null
>;

export enum AppointmentType {
  Booking = 'BOOKING',
  Physical = 'PHYSICAL',
}

export type GetOrderMedicineDetailsProps = {
  client: AxiosInstance;
  id: number;
  options?: CommonQueryOptions;
};

export type GetOrderMedicineDetailsResponse =
  CommonSuccessResponse<MedicineOrderDetails>;

export type GetCancelMedicineOrderProps = {
  client: AxiosInstance;
  id: number;
  body: CancelReasonParams;
  options?: CommonQueryOptions;
};

export type CancelReasonParams = {
  cancel_reason: string;
};

export type GetCancelMedicineOrderResponse = CommonSuccessResponse<{}>;

export type GetCancelLabOrderProps = {
  client: AxiosInstance;
  id: number;
  body: CancelReasonParams;
  options?: CommonQueryOptions;
};

export type GetCancelLabOrderResponse = CommonSuccessResponse<{}>;

export type GetLabOrderDetailsProps = {
  client: AxiosInstance;
  id: number;
  options?: CommonQueryOptions;
};

export type GetLabOrderDetailsResponse =
  CommonSuccessResponse<ClinicalOrderDetails>;

export type GetOrderReceiptProps = {
  client: AxiosInstance;
  id: number;
  orderReceptType: OrderReceptType;
  options?: CommonQueryOptions;
};

export enum OrderReceptType {
  Orders = 'orders',
  LabOrders = 'laborders',
}

export type GetOrderReceiptResponse = CommonSuccessResponse<ReceiptUrl>;

export type ReceiptUrl = {
  pdf_url: string;
};

export type GetSubscriptionReceiptProps = {
  client: AxiosInstance;
  orderId: number;
  deliveryId: number;
  options?: CommonQueryOptions;
};

export type GetSubscriptionReceiptResponse = CommonSuccessResponse<{}>;

export type GetLabReportsProps = {
  client: AxiosInstance;
  orderID: number;
  reportId: string;
};

export type GetLabReportsPropsResponse = CommonSuccessResponse<{
  pdf_url: string;
}>;

export type PreviousLabOrderDetails = Omit<
  ClinicalOrderDetails,
  | 'orderItems'
  | 'prescriptions'
  | 'sample_details'
  | 'rider_name'
  | 'use_flash_point'
  | 'delivery_detail'
  | 'generic_report_urls'
  | 'claimable_value'
  | 'order_type'
  | 'orderreview'
  | 'secondary_name'
  | 'secondary_number'
> & {
  order_items: PreviousLabOrderItem[];
  prescription_lab_test: any[]; // TODO: Change the type if this variable is used in PreviousLabOrder
  order_sample: PreviousOrderSample;
  is_flash_point: number;
  riderdetails: any[]; // TODO: Change the type if this variable is used in PreviousLabOrder
  addresslabel: string | null;
  status_label: string;
  is_active: number;
  lead: Lead; // TODO: More data exists
  type: any; // TODO: Change the type if this variable is used in PreviousLabOrder
  priority: any; // TODO: Change the type if this variable is usedin PreviousLabOrder
  priority_reference: any; // TODO: Change the type if this variable is used in PreviousLabOrder
  is_complete: boolean;
  preferred_caregiver_type: any; // TODO: Change the type if this variable is used in PreviousLabOrder
  origin_package_id: number | null;
  prescription: Omit<MedOrderPrescription, 'prescription_text'>[];
};

export type GetPreviousLabOrdersResponse =
  CommonSuccessPaginatedResponse<ClinicalOrderDetails>;

export type GetPreviousLabOrdersProps = {
  client: AxiosInstance;
  params: GetPreviousLabOrdersParams;
  options?: CommonQueryOptions;
};

export type GetPreviousLabOrdersParams = {
  lead_id: number | null | undefined;
  take: number;
  page: number;
};

export type GetPreviousMedOrdersResponse =
  CommonSuccessPaginatedResponse<MedicineOrderDetails>;

export type GetPreviousMedOrdersProps = {
  client: AxiosInstance;
  params: GetPreviousMedOrdersParams;
  options?: CommonQueryOptions;
};

export type GetPreviousMedOrdersParams = {
  lead_id: number | null | undefined;
  take: number;
  page: number;
};

export type GetOrderItemQuantityProps = {
  client: AxiosInstance;
  body: OrderItemQuantityBody;
  options?: CommonQueryOptions;
};

export type OrderItemQuantityBody = {
  order_id: number;
  coupon_code?: string;
  is_apply?: boolean;
  deleted_item_id?: number[];
  order_items: QuoteOrderItem[];
};

export type QuoteOrderItem = {
  id: number;
  quantity: number;
  item_type: number;
};

export type GetOrderItemQuantityResponse =
  CommonSuccessResponse<MedicineOrderDetails>;

export type GetOrderItemQuantityByCreditPointsProps = {
  client: AxiosInstance;
  body: OrderItemQuantityByCreditPointsBody;
  options?: CommonQueryOptions;
};

export type OrderItemQuantityByCreditPointsBody = {
  order_id: number;
  is_flash_point: string;
  deleted_item_id?: number[];
  order_items: QuoteOrderItem[];
};

export type GetOrderItemQuantityByCreditPointsResponse =
  CommonSuccessResponse<MedicineOrderDetails>;

export type ApproveQuoteProps = {
  client: AxiosInstance;
  id: number;
  body: ApprovedOrderData;
  options?: CommonQueryOptions;
};

export type ApproveQuoteMedication = Medication & {
  order_item_id: number;
};

export type ApprovedOrderData = {
  order_id: number;
  order_date: string;
  delivery_type: number;
  delivery_charge: number;
  address_id: number;
//   channel: ChannelSources;
  order_status: MedicineOrderStatus;
//   paymentoption: PaymentMethod;
  medications: ApproveQuoteMedication[];
  use_flash_point: string;
  deleted_item_id?: number[];
  card_detail_id: number | null;
  coupon_code?: string;
  purchase_id: number | null;
};

export type ApproveQuoteResponse = CommonSuccessResponse<{}>;

export type SkipOrderReviewProps = {
  client: AxiosInstance;
  body: SkipOrderReviewBody;
  options?: CommonQueryOptions;
};

export type SkipOrderReviewBody = {
  order_id: number;
  skip_review: string;
//   type: PendingReviewType;
};

export type SkipOrderReviewResponse = CommonSuccessResponse<{
  order_id: number;
  skip_review: string;
}>;

export type SubmitOrderReviewProps = {
  client: AxiosInstance;
  body: SubmitOrderReviewBody;
  options?: CommonQueryOptions;
};

export type SubmitOrderReviewBody = {
  order_id: number;
  review: string;
  otherfeedback: string | null;
//   type: PendingReviewType;
  sentiments: string[] | null;
};

export type SubmitOrderReviewResponse = CommonSuccessResponse<OrderReview>;

export type EditMedicineOrderProps = {
  client: AxiosInstance;
  orderId: number;
  body: EditMedicineOrderBody;
};

export type EditMedicineOrderBody = {
  prescription_file?: string[];
  order_note: string;
  prescription_text: string;
};
export type EditMedicineOrderResponse =
  CommonSuccessResponse<EditMedicineOrderResponseData>;

export type EditMedicineOrderResponseData = CreateMedicineOrderResponseData;

export type SkipMedicineOrderReviewProps = {
  client: AxiosInstance;
  body: SkipMedicineOrderReviewBody;
  options?: CommonQueryOptions;
};

export type SkipMedicineOrderReviewBody = {
  order_id: number;
  skip_review: string;
//   type: PendingReviewType;
};

export type SkipMedicineOrderReviewResponse = CommonSuccessResponse<{}>;

export type UpdateMedicineOrderPaymentProps = {
  client: AxiosInstance;
  orderId: number;
  body: UpdateMedicineOrderPaymentBody;
};

export type UpdateMedicineOrderPaymentBody = {
  card_detail_id: string | null;
//   paymentoption: PaymentMethod;
};

export type UpdateMedicineOrderPaymentResponse =
  CommonSuccessResponse<MedicineOrderDetails>;

export type SaveSecondaryContactProps = {
  client: AxiosInstance;
  orderId: number;
  body: SaveSecondaryContactBody;
};

export type SaveSecondaryContactBody = {
  secondary_name: string;
  secondary_number: string;
};

export type SaveSecondaryContactResponse =
  CommonSuccessResponse<MedicineOrderDetails>;
