import { FC } from 'react';
import { PastConsultationsListProps } from './PastConsultations.types';
import { PastConsultationCard } from './PastConsultationCard';

export const PastConsultationsList: FC<PastConsultationsListProps> = ({ consultations }) => {
  return (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <PastConsultationCard key={consultation.id} consultation={consultation} />
      ))}
    </div>
  );
};
