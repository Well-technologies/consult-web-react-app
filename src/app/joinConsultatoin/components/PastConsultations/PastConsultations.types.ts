import { ConsultationDetails } from '@/api/consult/consult.types';

export interface PastConsultationsListProps {
  consultations: ConsultationDetails[];
}

export interface PastConsultationCardProps {
  consultation: ConsultationDetails;
}
