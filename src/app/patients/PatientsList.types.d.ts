import { PatientDetails } from "../../api/patient/patient.types";
export declare enum UserStatus {
    Active = "Active",
    Inactive = "Inactive"
}
export type PatientDetailsProps = {
    patients?: PatientDetails[];
};
export type PatientsListProps = {
    data?: PatientDetails[] | undefined;
    openAndCloseFilter: () => void;
    openFilter: boolean;
    isLoading?: boolean;
};
