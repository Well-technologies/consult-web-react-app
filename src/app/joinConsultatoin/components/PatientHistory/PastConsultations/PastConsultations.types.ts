import { ConsultationDetails } from "@/api/consult/consult.types";

export interface PastConsultationsListProps {
  patientId: string;
}

export interface PastConsultationCardProps {
  consultation: ConsultationDetails;
}
