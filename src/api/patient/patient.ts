import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { Errors } from "../index.types";
import {
  PatientKeyTypes,
  GetPatientsProps,
  CreatePatientProps,
  CreatePatientResponse,
  UpdatePatientProps,
  UpdatePatientResponse,
  GetPatientDetailsProps,
  GetPatientDetailsResponse,
  GetPatientListResponse,
  SearchPatientsProps,
  GetPatientHealthLogsProps,
  GetPatientHealthLogsResponse,
  GetPatientHealthVaultProps,
  GetPatientHealthVaultResponse,
  GetPatientHealthConditionsProps,
  GetPatientHealthConditionsResponse,
  GetPatientHealthTopicsProps,
  GetPatientHealthTopicsResponse,
} from "./patient.types";

const getMyPatients = ({ client, params }: GetPatientsProps) =>
  client
    .get<GetPatientListResponse>(`/third-party-patientByDoctor`, { params })
    .then(({ data }) => data);

export const useGetMyPatients = ({ client, params }: GetPatientsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientsList, { params }],
    queryFn: () => getMyPatients({ client, params }),
    placeholderData: keepPreviousData,
  });

const createPatient = ({ client, body }: CreatePatientProps) =>
  client
    .post<CreatePatientResponse>("/third-party-register", body)
    .then(({ data }) => data);

export const useCreatePatient = (
  options?:
    | UseMutationOptions<
        CreatePatientResponse,
        Errors<{
          message: string;
        }>,
        CreatePatientProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: createPatient });
4;

const searchPatients = ({ client, params }: SearchPatientsProps) =>
  client
    .get<GetPatientListResponse>(`/third-party-patientSearch`, { params })
    .then(({ data }) => data);

export const useSearchPatients = ({
  client,
  params,
  enabled,
}: SearchPatientsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientSearch, { params }],
    queryFn: () => searchPatients({ client, params, enabled }),
    placeholderData: keepPreviousData,
    enabled,
  });

const updatePatient = ({ client, body, userId }: UpdatePatientProps) =>
  client
    .post<UpdatePatientResponse>(`/third-party-register/${userId}`, body)
    .then(({ data }) => data);

export const useUpdatePatient = (
  options?:
    | UseMutationOptions<
        UpdatePatientResponse,
        Errors<unknown>,
        UpdatePatientProps,
        unknown
      >
    | undefined
) => useMutation({ ...options, mutationFn: updatePatient });

const getPatientDetails = ({ client, leadId }: GetPatientDetailsProps) =>
  client
    .get<GetPatientDetailsResponse>(`/organizationwiseleads/${leadId}`)
    .then(({ data }) => data);

export const useGetPatientDetails = ({
  client,
  leadId,
}: GetPatientDetailsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientDetails, leadId],
    queryFn: () => getPatientDetails({ client, leadId }),
    placeholderData: keepPreviousData,
  });

const getPatientHealthLogs = ({ client, params }: GetPatientHealthLogsProps) =>
  client
    .get<GetPatientHealthLogsResponse>("/logs/health-logs", { params })
    .then(({ data }) => data);

export const useGetPatientHealthLogs = ({
  client,
  params,
}: GetPatientHealthLogsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientHealthLogs, { params }],
    queryFn: () => getPatientHealthLogs({ client, params }),
    placeholderData: keepPreviousData,
  });

export const getPatientHealthVault = ({
  client,
  params,
}: GetPatientHealthVaultProps) =>
  client
    .get<GetPatientHealthVaultResponse>("/health-vaults/", { params })
    .then(({ data }) => data);

export const useGetPatientHealthVault = ({
  client,
  params,
}: GetPatientHealthVaultProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientHealthVault, { params }],
    queryFn: () => getPatientHealthVault({ client, params }),
    placeholderData: keepPreviousData,
  });

export const getPatientHealthConditions = ({
  client,
  params,
}: GetPatientHealthConditionsProps) =>
  client
    .get<GetPatientHealthConditionsResponse>(
      "/health-condition/health-condition",
      { params }
    )
    .then(({ data }) => data);

export const useGetPatientHealthConditions = ({
  client,
  params,
}: GetPatientHealthConditionsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientHealthConditions, { params }],
    queryFn: () => getPatientHealthConditions({ client, params }),
    placeholderData: keepPreviousData,
  });

export const getPatientHealthTopics = ({
  client,
  params,
}: GetPatientHealthTopicsProps) =>
  client
    .get<GetPatientHealthTopicsResponse>("/health-topic/health-topic", {
      params,
    })
    .then(({ data }) => data);

export const useGetPatientHealthTopics = ({
  client,
  params,
}: GetPatientHealthTopicsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientHealthTopics, { params }],
    queryFn: () => getPatientHealthTopics({ client, params }),
    placeholderData: keepPreviousData,
  });
