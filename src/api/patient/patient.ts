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
  GetPatientsResponse,
  CreatePatientProps,
  CreatePatientResponse,
  UpdatePatientProps,
  UpdatePatientResponse,
  GetPatientDetailsProps,
  GetPatientDetailsResponse,
  GetPatientListResponse,
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
    .post<CreatePatientResponse>("/organizationwiseleadscreate", body)
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

const updatePatient = ({ client, body, userId }: UpdatePatientProps) =>
  client
    .post<UpdatePatientResponse>(`/organizationwiseleadsedit/${userId}`, body)
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

