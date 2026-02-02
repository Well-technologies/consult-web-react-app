import { useTranslation } from 'react-i18next';
import { PatientHeaderProps } from './PatientHeader.types';

export const PatientHeader = ({ patientInfo }: PatientHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Profile Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
          <img 
            src={"https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"} 
            alt="Patient" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Patient Basic Info */}
        <div>
          <h2 className="text-lg font-bold text-[#333] leading-tight">{patientInfo.name}</h2>
          <p className="text-sm text-gray-400 font-medium">
            {t('joinConsultation.patientHeader.age', { age: patientInfo.age })}
          </p>
        </div>

        {/* IDs */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-x-4 md:gap-x-6 gap-y-1 ml-3 md:ml-4 text-xs text-gray-500 font-medium border-l pl-4 md:pl-6">
          <p>{t('joinConsultation.patientHeader.consultationId')} <span className="text-gray-800">{patientInfo.appointmentId}</span></p>
          <p>{t('joinConsultation.patientHeader.patientId')} <span className="text-gray-800">{patientInfo.patientId}</span></p>
        </div>
      </div>
    </div>
  );
};
