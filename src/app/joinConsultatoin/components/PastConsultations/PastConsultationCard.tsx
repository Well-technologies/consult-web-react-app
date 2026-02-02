import { PastConsultationCardProps } from './PastConsultations.types';
import { ConsultationSummary } from './ConsultationSummary';
import { convertISOToDateTime } from '@/utils/timeConvertor.utils';

export const PastConsultationCard = ({ consultation }: PastConsultationCardProps) => {
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-gray-50">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3 justify-between">
            <div>

            <h4 className="font-bold text-[#333] text-sm">{consultation.doctor?.doctor_prefix || 'Dr.'} {consultation.doctor?.name}</h4>
            <h4 className="font-bold text-[#333] text-sm">{consultation.doctor?.doc_speciality_title || 'Cardiologist'}</h4>
            </div>
            <div className='flex flex-col'>
            <h4 className="font-bold text-[#333] text-sm">{convertISOToDateTime(consultation.appointmentDate).split(' ')[0]}</h4>
            <h4 className="font-bold text-[#333] text-sm">{convertISOToDateTime(consultation.appointmentDate).split(' ')[1]}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      {/* <div className="p-4 md:p-5"> */}
        <ConsultationSummary consultation={consultation} />
      {/* </div> */}
    </div>
  );
};
