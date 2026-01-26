import { CommonOptions } from "@/api/index.types";

export type CreateAppointmentProps = {
    isCreatingAppointment: boolean;
    setIsCreatingAppointment: (value: boolean) => void;
    myPatients?: CommonOptions[];
    refetch: () => void;
};

export type AppointmentFormInputs = {
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    is_custom_time: boolean;
};
