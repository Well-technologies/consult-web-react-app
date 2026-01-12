import { GetPatientListResponse, PatientDetails } from "../../../api/patient/patient.types";
import { FormType } from "@/types";
import { UseFormSetValue } from "react-hook-form";
// import { UsersProps } from "../Users.types";

export type UsersProps = {
  // register: UseFormReturn<UsersFormInputs>["register"];
  // control: UseFormReturn<UsersFormInputs>["control"];
  data?: GetPatientListResponse["data"];
  // setValue: UseFormSetValue<any>;
  // watch: UseFormWatch<UsersFormInputs>;
  // openAndCloseFilter: () => void;
  openAddNewModal: (
    data: PatientDetails | null,
    formType: FormType
  ) => void;
  // openFilter: boolean;
  isLoading?: boolean;
  onOpenEmployeeDeleteModal: (data: PatientDetails | null) => void;
};

export type UsersDataProps = Pick<
  UsersProps,
  // | "setValue"
  | "data"
  | "isLoading"
  // | "openAddNewModal"
  // | "onOpenEmployeeDeleteModal"
>;
