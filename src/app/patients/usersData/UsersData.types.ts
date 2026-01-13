import { GetPatientListResponse, PatientDetails } from "../../../api/patient/patient.types";
import { FormType } from "@/types";
import { UseFormReturn, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddUserFormInputs } from "../addPatientModal/AddPatientModal.types";
// import { UsersProps } from "../Users.types";

export type UsersProps = {
  register: UseFormReturn<AddUserFormInputs>["register"];
  control: UseFormReturn<AddUserFormInputs>["control"];
  data?: GetPatientListResponse["data"];
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<AddUserFormInputs>;
  openAndCloseFilter: () => void;
  openAddNewModal: (
    data: PatientDetails | null,
    formType: FormType
  ) => void;
  openFilter: boolean;
  isLoading?: boolean;
  onOpenEmployeeDeleteModal: (data: PatientDetails | null) => void;
};

export type UsersDataProps = Pick<
  UsersProps,
  // | "setValue"
  | "data"
  | "isLoading"
  | "openAddNewModal"
  // | "onOpenEmployeeDeleteModal"
>;
