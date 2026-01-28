import { PastConsultation } from '../../JoinConsultation.types';

export interface PastConsultationsListProps {
  consultations: PastConsultation[];
}

export interface PastConsultationCardProps {
  consultation: PastConsultation;
}
