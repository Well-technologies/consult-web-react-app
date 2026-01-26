import { AddPatientModalContainer } from "@/app/patients/addPatientModal/AddPatientModalContainer";
import { AppointmentType, FormType } from "@/app/patients/addPatientModal/AddPatientModal.types";
import { CreateConsultationProps } from "./CreateConsultation.types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/routing/AppRoute.enum";

export const CreateConsultation = (
    {
        isCreatingConsultation,
        setIsCreatingConsultation,
        refetch,
    }: CreateConsultationProps
    
) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const startConsultation = (appointmentId?: number | string) => {
        // setIsCreatingConsultation(true);
        console.log('startConsultation', appointmentId);
        navigate(AppRoute.JoinConsultation.replace(':appointmentId', appointmentId?.toString() || '').replace(':patientId', ''));
    }

    return (
        <div className="m-10">
            <AddPatientModalContainer
                open={isCreatingConsultation}
                onClose={() => setIsCreatingConsultation(false)}
                formType={FormType.Add}
                // refetch={refetch}
                appointmentType={AppointmentType.Consultation}
                data={null}
                refetch={refetch}
                cancelButtonText="Cancel"
                confirmButtonText={t("consultation.form.button")}
                onConfirm={startConsultation}
            />
            {/* <AddPatientModalContainer open={isCreatingConsultation} onClose={() => setIsCreatingConsultation(false)} formType={FormType.Add} refetch={refetch} data={null}   /> */}
        </div>
    );
};