import { UseMutationOptions } from "@tanstack/react-query";
import { Errors } from "../index.types";
import { GetPatientsProps, CreatePatientProps, CreatePatientResponse, UpdatePatientProps, UpdatePatientResponse, GetPatientDetailsProps, GetPatientDetailsResponse, GetPatientListResponse } from "./patient.types";
export declare const useGetMyPatients: ({ client, params }: GetPatientsProps) => import("@tanstack/react-query").UseQueryResult<GetPatientListResponse, Error>;
export declare const useCreatePatient: (options?: UseMutationOptions<CreatePatientResponse, Errors<{
    message: string;
}>, CreatePatientProps, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<CreatePatientResponse, Errors<{
    message: string;
}>, CreatePatientProps, unknown>;
export declare const useUpdatePatient: (options?: UseMutationOptions<UpdatePatientResponse, Errors<unknown>, UpdatePatientProps, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<UpdatePatientResponse, Errors<unknown>, UpdatePatientProps, unknown>;
export declare const useGetPatientDetails: ({ client, leadId, }: GetPatientDetailsProps) => import("@tanstack/react-query").UseQueryResult<GetPatientDetailsResponse, Error>;
