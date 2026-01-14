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
) => useMutation({ ...options, mutationFn: createPatient });4

const searchPatients = ({ client, params }: SearchPatientsProps) =>
  client
    .get<GetPatientListResponse>(`/third-party-patientSearch`, { params })
    .then(({ data }) => data);

export const useSearchPatients = ({ client, params, enabled }: SearchPatientsProps) =>
  useQuery({
    queryKey: [PatientKeyTypes.PatientSearch, { params }],
    queryFn: () => searchPatients({ client, params, enabled }),
    placeholderData: keepPreviousData,
    enabled
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

