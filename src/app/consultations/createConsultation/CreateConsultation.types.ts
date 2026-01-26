import { CommonOptions } from "@/api/index.types";

export type CreateConsultationProps = {
    isCreatingConsultation: boolean;
    setIsCreatingConsultation: (value: boolean) => void;
    myPatients: CommonOptions[];
    refetch: () => void;
    onSubmit?: (data: any) => void;
} 
// & Omit<AddPatientModalProps, "onSubmit" | "refetch" | "myPatients">