import { BaseSyntheticEvent } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { Schema } from "@/types";
import { ModalProps } from "@/ui/molecules/modal/Modal.types";
import { CreatePatientBody, CreatePatientProps, CreatePatientResponse, PatientDetails, UserDetails } from "@/api/patient/patient.types";
import { UsersFiltersProps } from "../usersFilters/UsersFilters.types";
import { MutateOptions } from "@tanstack/react-query";
import { Errors } from "@/api/index.types";

export enum AppointmentType {
  Appointment = 'appointment',
  Consultation = 'consultation',
}

export type AddPatientModalContainerProps = Pick<
  ModalProps,
  "onClose" | "open" | "cancelButtonText" | "confirmButtonText" 
> & {
  refetch: () => void;
  data: PatientDetails | null;
  formType: FormType;
  myPatients?: UserDetails[]
  onConfirm?: (value?: number) => void;
  appointmentType?: AppointmentType;
} & Partial<Pick<UsersFiltersProps, "setSearchText">>;

export type AddPatientModalProps = Omit<AddPatientModalContainerProps, "refetch"> & {
  register: UseFormRegister<AddUserFormInputs>;
  control: Control<AddUserFormInputs, unknown>;
  errors: FieldErrors<AddUserFormInputs>;
  isLoading: boolean;
  watch: UseFormWatch<AddUserFormInputs>;
  trigger: UseFormTrigger<AddUserFormInputs> | undefined;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  setValue: UseFormSetValue<AddUserFormInputs>;
  isMyPatient: boolean;
  // isVerifyOtpDivEnabled: boolean;
  isValidForm?: boolean;
  isRegisteredPatient: boolean | undefined;
  setIsRegisteredPatient: (value: boolean) => void;
  setIsMyPatient: (value: boolean) => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  mutateOnCreatePatient: (variables: CreatePatientProps, options?: MutateOptions<CreatePatientResponse, Errors<{
    message: string;
}>, CreatePatientProps, unknown> | undefined) => Promise<CreatePatientResponse>;
  mutateOnCreatePatientForOtp: (variables: CreatePatientProps, options?: MutateOptions<CreatePatientResponse, Errors<{
    message: string;
}>, CreatePatientProps, unknown> | undefined) => Promise<CreatePatientResponse>;
}

export enum FormType {
  Edit = "Edit",
  Add = "Add",
  View = "View",
}

export type AddUserFormInputs = CreatePatientBody;

export type FormSchema = Schema<AddUserFormInputs>;
