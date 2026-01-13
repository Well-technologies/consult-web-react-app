import { ConsultUserDetails } from "@/api/user/user.types";
import { PatientDetails } from "../../api/patient/patient.types";
export declare enum UserStatus {
    Active = "Active",
    Inactive = "Inactive"
}
export type PatientDetailsProps = {
    isLoading: boolean;
    data: ConsultUserDetails | undefined;
    consultations: any | undefined;
};
export type PatientsListProps = {
    data?: PatientDetails[] | undefined;
    openAndCloseFilter: () => void;
    openFilter: boolean;
    isLoading?: boolean;
};
