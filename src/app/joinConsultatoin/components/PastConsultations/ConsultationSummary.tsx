import { useTranslation } from 'react-i18next';
import { ConsultationDetails } from '@/api/consult/consult.types';
import { MedicationCard } from '@/ui/molecules/medicationCard/MedicationCard';

export const ConsultationSummary = ({ consultation }: { consultation: ConsultationDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
      {/* Symptoms */}
      {consultation.symptoms && consultation.symptoms.items.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#333]">{t('joinConsultation.assessment.symptoms.label')}</h4>
          <div className="flex flex-wrap gap-2">
            {consultation.symptoms.items.map((item) => (
              <span key={item.id} className="bg-red-50 text-[#e32933] px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 flex items-center gap-2">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Diagnosis */}
      {consultation.diagnoses && consultation.diagnoses.items.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#333]">{t('joinConsultation.assessment.diagnosis.label')}</h4>
          <div className="flex flex-wrap gap-2">
            {consultation.diagnoses.items.map((item) => (
              <span key={item.id} className="bg-red-50 text-[#e32933] px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 flex items-center gap-2">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lab Tests */}
      {consultation.labTests && consultation.labTests.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#333]">{t('joinConsultation.assessment.labTest.label')}</h4>
          <div className="flex flex-wrap gap-2">
            {consultation.labTests.map((item) => (
              <span key={item.data.id} className="bg-red-50 text-[#e32933] px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 flex items-center gap-2">
                {item.data.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      {consultation.medications && consultation.medications.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#333]">{t('joinConsultation.assessment.medications.title')}</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {consultation.medications.map((med) => (
              <MedicationCard medicine={med} variant="simple" key={med.medicineId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
