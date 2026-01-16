import { BaseSyntheticEvent } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Schema } from "@/types";
import { ModalProps } from "@/ui/molecules/modal/Modal.types";
import { CreatePatientBody, PatientDetails, UserDetails } from "@/api/patient/patient.types";

export type AddPatientModalContainerProps = Pick<
  ModalProps,
  "onClose" | "open"
> & {
  refetch: () => void;
  data: PatientDetails | null;
  formType: FormType;
  myPatients?: UserDetails[]
};

export type AddPatientModalProps = Omit<AddPatientModalContainerProps, "refetch"> & {
  register: UseFormRegister<AddUserFormInputs>;
  control: Control<AddUserFormInputs, unknown>;
  errors: FieldErrors<AddUserFormInputs>;
  isLoading: boolean;
  watch: UseFormWatch<AddUserFormInputs>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  setValue: UseFormSetValue<AddUserFormInputs>;
  isMyPatient: boolean;
  isVerifyOtpDivEnabled: boolean;
  isValidForm: boolean;
  isRegisteredPatient: boolean | undefined;
};

export enum FormType {
  Edit = "Edit",
  Add = "Add",
  View = "View",
}

export type AddUserFormInputs = CreatePatientBody;

export type FormSchema = Schema<AddUserFormInputs>;
