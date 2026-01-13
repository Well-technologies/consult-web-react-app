import { GetPatientListResponse, PatientDetails } from "../../../api/patient/patient.types";
import { FormType } from "@/types";
export type UsersProps = {
    data?: GetPatientListResponse["data"];
    openAddNewModal: (data: PatientDetails | null, formType: FormType) => void;
    isLoading?: boolean;
    onOpenEmployeeDeleteModal: (data: PatientDetails | null) => void;
};
export type UsersDataProps = Pick<UsersProps, "data" | "isLoading">;
