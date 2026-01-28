import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientHeaderProps } from './PatientHeader.types';

export const PatientHeader: FC<PatientHeaderProps> = ({ patientInfo }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Profile Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" 
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
          <p>{t('joinConsultation.patientHeader.appointmentId')} <span className="text-gray-800">{patientInfo.appointmentId}</span></p>
          <p>{t('joinConsultation.patientHeader.patientId')} <span className="text-gray-800">{patientInfo.patientId}</span></p>
        </div>
      </div>

      {/* Date and Actions */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-sm text-gray-400 font-medium">{patientInfo.date}</p>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors text-[#e32933]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
