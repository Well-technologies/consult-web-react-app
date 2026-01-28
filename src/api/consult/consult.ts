import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

import { Errors } from '../index.types';
import {
  ConsultKeyTypes,
  CreateAdviceBookingProps,
  CreateAdviceBookingResponse,
  GetAdviserDetailsProps,
  GetAdviserDetailsResponse,
  GetAdviserScheduleDetailsProps,
  GetAdviserScheduleDetailsResponse,
  GetAdviserShareableLinkProps,
  GetAdviserShareableLinkResponse,
  GetAllAdvisersProps,
  GetAllAdvisersResponse,
  GetConsultationCallLogsProps,
  GetConsultationCallLogsResponse,
  GetConsultationsProps,
  GetConsultationsResponse,
  GetAllHealthVaultByUserIdProps,
  GetAllHealthVaultByUserIdResponse,
  PrebookAdviserTimeSlotProps,
  PrebookAdviserTimeSlotResponse,
  RemoveHealthVaultDataByIdProps,
  RemoveHealthVaultDataByIdResponse,
  GetMedicalHistoryItemsProps,
  GetMedicalHistoryItemsResponse,
  GetPatientMedicalHistoryProps,
  GetPatientMedicalHistoryResponse,
  CreatePatientMedicalHistoryProps,
  CreatePatientMedicalHistoryResponse,
  UpdatePatientMedicalHistoryProps,
  UpdatePatientMedicalHistoryResponse,
  GetSurgicalHistoryItemsProps,
  GetSurgicalHistoryItemsResponse,
  GetPatientSurgicalHistoryProps,
  GetPatientSurgicalHistoryResponse,
  CreatePatientSurgicalHistoryProps,
  CreatePatientSurgicalHistoryResponse,
  UpdatePatientSurgicalHistoryProps,
  UpdatePatientSurgicalHistoryResponse,
  GetAllAllergiesProps,
  GetAllAllergiesResponse,
  GetPatientAllergiesHistoryProps,
  GetPatientAllergiesHistoryResponse,
  CreatePatientAllergenReactionHistoryProps,
  CreatePatientAllergenReactionHistoryResponse,
  RemoveAllergenReactionHistoryByIdProps,
  RemoveAllergenReactionHistoryByIdResponse,
  CreatePrescriptionProps,
  CreatePrescriptionResponse,
  GetAllSymptomsProps,
  GetAllSymptomsResponse,
  GetAllDiagnosesProps,
  GetAllDiagnosesResponse,
  GetMedicationDosagesProps,
  GetMedicationDosagesResponse,
  GetMedicationFrequenciesProps,
  GetMedicationFrequenciesResponse,
  GetAllConsultationsProps,
  GetAllConsultationsResponse,
  GetAdviserEarningHistoryProps,
  GetAdviserEarningHistoryResponse,
  GetAdviserEarningDetailsResponse,
  GetAdviserEarningDetailsProps,
  UpdateConsultationEndTypeProps,
  UpdateConsultationEndTypeResponse,
  ConfirmConsultationProps,
  ConfirmConsultationResponse,
  GetReceiptByConsultationIdProps,
  GetReceiptByConsultationIdResponse,
  GetConsultationByIdProps,
  GetConsultationByIdResponse,
  RescheduleAdviceBookingProps,
  RescheduleAdviceBookingResponse,
  UpdateHealthDocumentProps,
  UpdateHealthDocumentResponse,
  AddHealthLogProps,
  AddHealthLogsResponse,
  GetHealthLogsResponse,
  GetHealthLogsProps,
  UpdateHealthLogProps,
  CancelConsultationBookingProps,
  CancelConsultationBookingResponse,
  CreateHealthDocumentProps,
  CreateHealthDocumentResponse,
  GetConsultReviewProps,
  GetConsultReviewResponse,
  GetPatientsSummaryProps,
  GetPatientsSummaryResponse,
  GetAllLabTestsProps,
  GetAllLabTestsResponse,
  GetBookedConsultationProps,
  GetBookedConsultationResponse,
} from './consult.types';

const getAllAdvisers = ({ client, params }: GetAllAdvisersProps) =>
  client
    .get<GetAllAdvisersResponse>('customer/firstadvice/speciality', {
      params,
    })
    .then(({ data }) => data);

export const useGetAllAdvisers = ({ client, params }: GetAllAdvisersProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllAdvisers],
    queryFn: () => getAllAdvisers({ client, params }),
    placeholderData: keepPreviousData,
    staleTime: 100000,
  });

const getAdviserDetails = ({ client, adviserId }: GetAdviserDetailsProps) =>
  client
    .get<GetAdviserDetailsResponse>(`customer/doctor/${adviserId}`)
    .then(({ data }) => data);

export const useGetAdviserDetails = ({
  client,
  adviserId,
}: GetAdviserDetailsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAdviserDetails, adviserId],
    queryFn: () => getAdviserDetails({ client, adviserId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    enabled: !!adviserId,
  });

const getAdviserShareableLink = ({
  client,
  adviserId,
}: GetAdviserShareableLinkProps) =>
  client
    .get<GetAdviserShareableLinkResponse>(
      `customer/doctor/permelink/${adviserId}`
    )
    .then(({ data }) => data);

export const useGetAdviserShareableLink = ({
  client,
  adviserId,
}: GetAdviserShareableLinkProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAdviserShareableLink, adviserId],
    queryFn: () => getAdviserShareableLink({ client, adviserId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    enabled: !!adviserId,
  });

const getAdviserScheduleDetails = ({
  client,
  adviserId,
  params,
}: GetAdviserScheduleDetailsProps) =>
  client
    .get<GetAdviserScheduleDetailsResponse>(
      `customer/firstadvice/speciality/doctor/${adviserId}/schedule`,
      {
        params,
      }
    )
    .then(({ data }) => data);

export const useGetAdviserScheduleDetails = ({
  client,
  adviserId,
  params,
}: GetAdviserScheduleDetailsProps) =>
  useQuery({
    queryKey: [
      ConsultKeyTypes.GetAdviserScheduleDetails,
      { ...params, adviserId },
    ],
    queryFn: () => getAdviserScheduleDetails({ client, adviserId, params }),
    placeholderData: keepPreviousData,
    // enabled: !!adviserId && !!params.speciality_id,
  });

const getBookedConsultation = ({
  client,
  params,
}: GetBookedConsultationProps) =>
  client
    .get<GetBookedConsultationResponse>(`consultations/booked-consultation`, {
      params,
    })
    .then(({ data }) => data);

export const useGetBookedConsultation = ({
  client,
  params,
}: GetBookedConsultationProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetBookedConsultation, params],
    queryFn: () => getBookedConsultation({ client, params }),
    enabled: !!params?.appointmentId && !!params?.patientId && !!params?.doctorId,
  });

const prebookAdviserTimeSlot = ({
  client,
  body,
}: PrebookAdviserTimeSlotProps) =>
  client
    .post<PrebookAdviserTimeSlotResponse>(
      `customer/firstadvice/speciality/doctor/${body.doctor_id}/prebook`,
      body
    )
    .then(({ data }) => data);

export const usePrebookAdviserTimeSlot = (
  options?:
    | UseMutationOptions<
        PrebookAdviserTimeSlotResponse,
        Errors<unknown>,
        PrebookAdviserTimeSlotProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: prebookAdviserTimeSlot });

const createAdviceBooking = ({ client, body }: CreateAdviceBookingProps) =>
  client
    .post<CreateAdviceBookingResponse>(
      'customer/firstadvice/appointments/create',
      body
    )
    .then(({ data }) => data);

export const useCreateAdviceBooking = (
  options?:
    | UseMutationOptions<
        CreateAdviceBookingResponse,
        Errors<unknown>,
        CreateAdviceBookingProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: createAdviceBooking });

const getConsultationCallLogs = ({
  client,
  consultationId,
}: GetConsultationCallLogsProps) =>
  client
    .get<GetConsultationCallLogsResponse>(
      `/consultation-activity-log/${consultationId}`
    )
    .then(({ data }) => data);

export const useGetConsultationCallLogs = ({
  client,
  consultationId,
}: GetConsultationCallLogsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetConsultationCallLogs, { consultationId }],
    queryFn: () => getConsultationCallLogs({ client, consultationId }),
    placeholderData: keepPreviousData,
  });

const removeHealthVaultDataById = ({
  client,
  healthVaultId,
}: RemoveHealthVaultDataByIdProps) =>
  client
    .delete<RemoveHealthVaultDataByIdResponse>(`health-vaults/${healthVaultId}`)
    .then(({ data }) => data);

export const useRemoveHealthVaultDataById = (
  options?:
    | UseMutationOptions<
        RemoveHealthVaultDataByIdResponse,
        Errors<unknown>,
        RemoveHealthVaultDataByIdProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: removeHealthVaultDataById });


const getConsultations = ({ client, params }: GetConsultationsProps) =>
  client
    .get<GetConsultationsResponse>('/consultations/web', {
      params,
    })
    .then(({ data }) => data);

export const useGetConsultations = ({
  client,
  params,
}: GetConsultationsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetConsultations, params],
    queryFn: () => getConsultations({ client, params }),
    placeholderData: keepPreviousData,
  });

const getAllHealthVaultByUserId = ({
  client,
  params,
}: GetAllHealthVaultByUserIdProps) =>
  client
    .get<GetAllHealthVaultByUserIdResponse>('/health-vaults', {
      params,
    })
    .then(({ data }) => data);

export const useGetAllHealthVaultByUserId = ({
  client,
  params,
}: GetAllHealthVaultByUserIdProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllHealthVaultByUserId, params],
    queryFn: () => getAllHealthVaultByUserId({ client, params }),
    placeholderData: keepPreviousData,
  });

const getMedicalHistoryItems = ({ client }: GetMedicalHistoryItemsProps) =>
  client
    .get<GetMedicalHistoryItemsResponse>('/medical-history')
    .then(({ data }) => data);

export const useGetMedicalHistoryItems = ({
  client,
}: GetMedicalHistoryItemsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetMedicalHistoryItems],
    queryFn: () => getMedicalHistoryItems({ client }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getPatientMedicalHistory = ({
  client,
  patientLeadId,
}: GetPatientMedicalHistoryProps) =>
  client
    .get<GetPatientMedicalHistoryResponse>(
      `/past-medical-history/${patientLeadId}`
    )
    .then(({ data }) => data);

export const useGetPatientMedicalHistory = ({
  client,
  patientLeadId,
}: GetPatientMedicalHistoryProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetPatientMedicalHistory],
    queryFn: () => getPatientMedicalHistory({ client, patientLeadId }),
    placeholderData: keepPreviousData,
  });

const createPatientMedicalHistory = ({
  client,
  body,
}: CreatePatientMedicalHistoryProps) =>
  client
    .post<CreatePatientMedicalHistoryResponse>('past-medical-history', body)
    .then(({ data }) => data);

export const useCreatePatientMedicalHistory = (
  options?:
    | UseMutationOptions<
        CreatePatientMedicalHistoryResponse,
        Errors<unknown>,
        CreatePatientMedicalHistoryProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: createPatientMedicalHistory });

const updatePatientMedicalHistory = ({
  client,
  medicalHistoryId,
  body,
}: UpdatePatientMedicalHistoryProps) =>
  client
    .put<UpdatePatientMedicalHistoryResponse>(
      `past-medical-history/${medicalHistoryId}`,
      body
    )
    .then(({ data }) => data);

export const useUpdatePatientMedicalHistory = (
  options?:
    | UseMutationOptions<
        UpdatePatientMedicalHistoryResponse,
        Errors<unknown>,
        UpdatePatientMedicalHistoryProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: updatePatientMedicalHistory });

const getSurgicalHistoryItems = ({ client }: GetSurgicalHistoryItemsProps) =>
  client
    .get<GetSurgicalHistoryItemsResponse>('/surgical-history')
    .then(({ data }) => data);

export const useGetSurgicalHistoryItems = ({
  client,
}: GetSurgicalHistoryItemsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetSurgicalHistoryItems],
    queryFn: () => getSurgicalHistoryItems({ client }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getPatientSurgicalHistory = ({
  client,
  patientLeadId,
}: GetPatientSurgicalHistoryProps) =>
  client
    .get<GetPatientSurgicalHistoryResponse>(
      `/past-surgical-history/${patientLeadId}`
    )
    .then(({ data }) => data);

export const useGetPatientSurgicalHistory = ({
  client,
  patientLeadId,
}: GetPatientSurgicalHistoryProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetPatientSurgicalHistory],
    queryFn: () => getPatientSurgicalHistory({ client, patientLeadId }),
    placeholderData: keepPreviousData,
  });

const createPatientSurgicalHistory = ({
  client,
  body,
}: CreatePatientSurgicalHistoryProps) =>
  client
    .post<CreatePatientSurgicalHistoryResponse>('past-surgical-history', body)
    .then(({ data }) => data);

export const useCreatePatientSurgicalHistory = (
  options?:
    | UseMutationOptions<
        CreatePatientSurgicalHistoryResponse,
        Errors<unknown>,
        CreatePatientSurgicalHistoryProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: createPatientSurgicalHistory });

const updatePatientSurgicalHistory = ({
  client,
  surgicalHistoryId,
  body,
}: UpdatePatientSurgicalHistoryProps) =>
  client
    .put<UpdatePatientSurgicalHistoryResponse>(
      `past-surgical-history/${surgicalHistoryId}`,
      body
    )
    .then(({ data }) => data);

export const useUpdatePatientSurgicalHistory = (
  options?:
    | UseMutationOptions<
        UpdatePatientSurgicalHistoryResponse,
        Errors<unknown>,
        UpdatePatientSurgicalHistoryProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: updatePatientSurgicalHistory });

const getAllAllergies = ({ client }: GetAllAllergiesProps) =>
  client.get<GetAllAllergiesResponse>('/allergies').then(({ data }) => data);

export const useGetAllAllergies = ({ client }: GetAllAllergiesProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllAllergies],
    queryFn: () => getAllAllergies({ client }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getPatientAllergiesHistory = ({
  client,
  patientId,
}: GetPatientAllergiesHistoryProps) =>
  client
    .get<GetPatientAllergiesHistoryResponse>(`/allergenreaction/${patientId}`)
    .then(({ data }) => data);

export const useGetPatientAllergiesHistory = ({
  client,
  patientId,
}: GetPatientAllergiesHistoryProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetPatientAllergiesHistory],
    queryFn: () => getPatientAllergiesHistory({ client, patientId }),
    placeholderData: keepPreviousData,
  });

const createPatientAllergenReactionHistory = ({
  client,
  body,
}: CreatePatientAllergenReactionHistoryProps) =>
  client
    .post<CreatePatientAllergenReactionHistoryResponse>(
      'allergenreaction',
      body
    )
    .then(({ data }) => data);

export const useCreatePatientAllergenReactionHistory = (
  options?:
    | UseMutationOptions<
        CreatePatientAllergenReactionHistoryResponse,
        Errors<unknown>,
        CreatePatientAllergenReactionHistoryProps,
        unknown
      >
    | undefined
) =>
  useMutation({ ...options, mutationFn: createPatientAllergenReactionHistory });

const removeAllergenReactionHistoryById = ({
  client,
  allergenReactionHistoryId,
}: RemoveAllergenReactionHistoryByIdProps) =>
  client
    .delete<RemoveAllergenReactionHistoryByIdResponse>(
      `allergenreaction/${allergenReactionHistoryId}`
    )
    .then(({ data }) => data);

export const useRemoveAllergenReactionHistoryById = (
  options?:
    | UseMutationOptions<
        RemoveAllergenReactionHistoryByIdResponse,
        Errors<unknown>,
        RemoveAllergenReactionHistoryByIdProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: removeAllergenReactionHistoryById });

const createPrescription = ({
  client,
  body,
  consultationId,
}: CreatePrescriptionProps) =>
  client
    .put<CreatePrescriptionResponse>(
      `consultations/create-prescription/${consultationId}`,
      body
    )
    .then(({ data }) => data);

export const useCreatePrescription = (
  options?:
    | UseMutationOptions<
        CreatePrescriptionResponse,
        Errors<unknown>,
        CreatePrescriptionProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: createPrescription });

const getAllSymptoms = ({ client, params }: GetAllSymptomsProps) =>
  client
    .get<GetAllSymptomsResponse>('/symptoms', { params })
    .then(({ data }) => {
      console.log('getAllSymptoms params:', params);
      console.log('getAllSymptoms data:', data);
      return data;
    });

export const useGetAllSymptoms = ({
  client,
  params,
  options,
}: GetAllSymptomsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllSymptoms, params],
    queryFn: () => getAllSymptoms({ client, params }),
    placeholderData: keepPreviousData,
    ...options,
  });

const getAllDiagnoses = ({ client, params }: GetAllDiagnosesProps) =>
  client
    .get<GetAllDiagnosesResponse>('/diagnoses', { params })
    .then(({ data }) => data);

export const useGetAllDiagnoses = ({
  client,
  params,
  options,
}: GetAllDiagnosesProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllDiagnoses, params],
    queryFn: () => getAllDiagnoses({ client, params }),
    placeholderData: keepPreviousData,
    ...options,
  });

const getAllLabTests = ({ client, params }: GetAllLabTestsProps) =>
  client
    .get<GetAllLabTestsResponse>('/commons/labs', { params })
    .then(({ data }) => data);

export const useGetAllLabTests = ({
  client,
  params,
  options,
}: GetAllLabTestsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllLabTests, params],
    queryFn: () => getAllLabTests({ client, params }),
    placeholderData: keepPreviousData,
    ...options,
  });

const getMedicationDosages = ({ client }: GetMedicationDosagesProps) =>
  client.get<GetMedicationDosagesResponse>('/dosages').then(({ data }) => data);

export const useGetMedicationDosages = ({
  client,
}: GetMedicationDosagesProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetMedicationDosages],
    queryFn: () => getMedicationDosages({ client }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getMedicationFrequencies = ({ client }: GetMedicationFrequenciesProps) =>
  client
    .get<GetMedicationFrequenciesResponse>('/medication-frequencies')
    .then(({ data }) => data);

export const useGetMedicationFrequencies = ({
  client,
}: GetMedicationFrequenciesProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetMedicationFrequencies],
    queryFn: () => getMedicationFrequencies({ client }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getAllConsultations = ({ client, params }: GetAllConsultationsProps) =>
  client
    .get<GetAllConsultationsResponse>('appointments/filters', { params })
    .then(({ data }) => data);

export const useGetAllConsultations = ({
  client,
  params,
}: GetAllConsultationsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAllConsultations, params],
    queryFn: () => getAllConsultations({ client, params }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getAdviserEarningDetails = ({
  client,
  params,
}: GetAdviserEarningDetailsProps) =>
  client
    .get<GetAdviserEarningDetailsResponse>('customer/docEarnings', { params })
    .then(({ data }) => data);

export const useGetAdviserEarningDetails = ({
  client,
  params,
}: GetAdviserEarningDetailsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAdviserEarningDetails, params],
    queryFn: () => getAdviserEarningDetails({ client, params }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const getAdviserEarningHistory = ({
  client,
  adviserId,
}: GetAdviserEarningHistoryProps) =>
  client
    .get<GetAdviserEarningHistoryResponse>(`customer/docEarnings/${adviserId}`)
    .then(({ data }) => data);

export const useGetAdviserEarningHistory = ({
  client,
  adviserId,
}: GetAdviserEarningHistoryProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetAdviserEarningHistory, adviserId],
    queryFn: () => getAdviserEarningHistory({ client, adviserId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

const updateConsultationEndType = ({
  client,
  body,
  consultationId,
}: UpdateConsultationEndTypeProps) =>
  client
    .put<UpdateConsultationEndTypeResponse>(
      `consultations/update-call-ended-type/${consultationId}`,
      body
    )
    .then(({ data }) => data);

export const useUpdateConsultationEndType = (
  options?:
    | UseMutationOptions<
        UpdateConsultationEndTypeResponse,
        Errors<unknown>,
        UpdateConsultationEndTypeProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: updateConsultationEndType });

const confirmConsultation = ({
  client,
  body,
  consultationId,
}: ConfirmConsultationProps) =>
  client
    .put<ConfirmConsultationResponse>(
      `consultations/confirm-order/${consultationId}`,
      body
    )
    .then(({ data }) => data);

export const useConfirmConsultation = (
  options?:
    | UseMutationOptions<
        ConfirmConsultationResponse,
        Errors<unknown>,
        ConfirmConsultationProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: confirmConsultation });

const getReceiptByConsultationId = ({
  client,
  consultationId,
}: GetReceiptByConsultationIdProps) =>
  client
    .get<GetReceiptByConsultationIdResponse>(
      `consultations/pdf/${consultationId}/${consultationId}`
    )
    .then(({ data }) => data);

export const useGetReceiptByConsultationId = ({
  client,
  consultationId,
  options,
}: GetReceiptByConsultationIdProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetReceiptByConsultationId, consultationId],
    queryFn: () => getReceiptByConsultationId({ client, consultationId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    ...options,
  });

const getConsultationById = ({
  client,
  consultationId,
}: GetConsultationByIdProps) =>
  client
    .get<GetConsultationByIdResponse>(`consultations/${consultationId}`)
    .then(({ data }) => data);

export const useGetConsultationById = ({
  client,
  consultationId,
  options,
}: GetConsultationByIdProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetConsultationById, consultationId],
    queryFn: () => getConsultationById({ client, consultationId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    ...options,
  });

const getPatientsSummary = ({
  client,
  doctorId,
}: GetPatientsSummaryProps) =>
  client
    .get<GetPatientsSummaryResponse>(`consultations/patients-summary/${doctorId}`)
    .then(({ data }) => data);

export const useGetPatientsSummary = ({
  client,
  doctorId,
  options,
}: GetPatientsSummaryProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetPatientsSummary, doctorId],
    queryFn: () => getPatientsSummary({ client, doctorId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    ...options,
  });

const rescheduleAdviceBooking = ({
  client,
  body,
  consultationId,
}: RescheduleAdviceBookingProps) =>
  client
    .put<RescheduleAdviceBookingResponse>(
      `customer/appointment/${consultationId}/reschedule`,
      body
    )
    .then(({ data }) => data);

export const useRescheduleAdviceBooking = (
  options?:
    | UseMutationOptions<
        RescheduleAdviceBookingResponse,
        Errors<unknown>,
        RescheduleAdviceBookingProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: rescheduleAdviceBooking });

const createHealthDocument = ({ client, body }: CreateHealthDocumentProps) =>
  client
    .post<CreateHealthDocumentResponse>('/health-vaults', body)
    .then(({ data }) => data);

export const useCreateHealthDocument = (
  options?:
    | UseMutationOptions<
        CreateHealthDocumentResponse,
        Errors<unknown>,
        CreateHealthDocumentProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: createHealthDocument });

const updateHealthDocument = ({
  client,
  documentId,
  body,
}: UpdateHealthDocumentProps) =>
  client
    .put<UpdateHealthDocumentResponse>(`/health-vaults/${documentId}`, body)
    .then(({ data }) => data);

export const useUpdateHealthDocument = (
  options?:
    | UseMutationOptions<
        UpdateHealthDocumentResponse,
        Errors<unknown>,
        UpdateHealthDocumentProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: updateHealthDocument });

const addHealthLog = ({ client, body }: AddHealthLogProps) =>
  client.post('health-log/create', body).then(({ data }) => data);

export const useAddHealthLog = (
  options?: UseMutationOptions<
    AddHealthLogsResponse,
    Errors<unknown>,
    AddHealthLogProps,
    unknown
  >
) => useMutation({ ...options, mutationFn: addHealthLog });

const getHealthLogs = ({ client, userId }: GetHealthLogsProps) =>
  client
    .get<GetHealthLogsResponse>(`health-log/user/${userId}`)
    .then(({ data }) => data);

export const useGetHealthLogs = ({ client, userId }: GetHealthLogsProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetHealthLogs],
    queryFn: () => getHealthLogs({ client, userId }),
  });

const updateHealthLog = ({ client, healthLogId, body }: UpdateHealthLogProps) =>
  client.patch(`health-log/${healthLogId}`, body).then(({ data }) => data);

export const useUpdateHealthLog = (
  options?: UseMutationOptions<
    AddHealthLogsResponse,
    Errors<unknown>,
    AddHealthLogProps,
    unknown
  >
) => useMutation({ ...options, mutationFn: updateHealthLog });

const cancelConsultationBooking = ({
  client,
  flashAppointmentId,
  body,
}: CancelConsultationBookingProps) =>
  client
    .put(`customer/firstadvice/appointments/${flashAppointmentId}/cancel`, body)
    .then(({ data }) => data);

export const useCancelConsultationBooking = (
  options?: UseMutationOptions<
    CancelConsultationBookingResponse,
    Errors<unknown>,
    AddHealthLogProps,
    unknown
  >
) => useMutation({ ...options, mutationFn: cancelConsultationBooking });

const getConsultReview = ({ client, consultationId }: GetConsultReviewProps) =>
  client
    .get<GetConsultReviewResponse>(`customer/consult/review/${consultationId}`)
    .then(({ data }) => data);

export const useGetConsultReview = ({
  client,
  consultationId,
  options,
}: GetConsultReviewProps) =>
  useQuery({
    queryKey: [ConsultKeyTypes.GetConsultReview, consultationId],
    queryFn: () => getConsultReview({ client, consultationId }),
    placeholderData: keepPreviousData,
    // staleTime: Infinity,
    ...options,
  });
