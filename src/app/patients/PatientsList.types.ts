

import { PatientDetails } from "../../api/patient/patient.types";
import { FormType } from "./addPatientModal/AddPatientModal.types";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type PatientDetailsProps = {
  patients?: PatientDetails[];
};

export type PatientsListProps = {
  data?: PatientDetails[] | undefined;
  openAndCloseFilter: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  openFilter: boolean;
  isLoading?: boolean;
    openAddNewModal: (
    data: PatientDetails | null,
    formType: FormType
  ) => void;
};