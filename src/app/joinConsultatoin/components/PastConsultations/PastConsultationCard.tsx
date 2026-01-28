import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PastConsultationCardProps } from './PastConsultations.types';

export const PastConsultationCard: FC<PastConsultationCardProps> = ({ consultation }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 relative group transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h4 className="font-bold text-[#333] text-sm">{consultation.type}</h4>
        <span className="p-1.5 rounded-lg bg-gray-50 text-gray-400">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
        </span>
      </div>

      <div className="flex flex-col space-y-2 md:space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {consultation.date}
        </div>

        <div className="flex items-start gap-2">
           <svg className="w-4 h-4 mt-1 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
           </svg>
           <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
             {consultation.content}
           </p>
        </div>
      </div>

      {consultation.hasCurrentRx && (
        <div className="mt-3 md:mt-4 flex justify-end">
          <button className="flex items-center gap-1.5 text-[#e32933] text-xs font-bold hover:underline transition-all">
            <span className="w-5 h-5 rounded-full border-2 border-[#e32933] flex items-center justify-center text-[10px]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            {t('joinConsultation.pastConsultation.currentRx')}
          </button>
        </div>
      )}

      {consultation.type === 'History & Notes' && (
        <button className="mt-3 md:mt-4 text-xs font-bold text-gray-500 hover:text-[#333] transition-colors flex items-center gap-1">
          <span className="text-lg">+</span> {t('joinConsultation.pastConsultation.addDiagnosis')}
        </button>
      )}
    </div>
  );
};
