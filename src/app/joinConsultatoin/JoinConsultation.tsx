import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { JoinConsultationProps } from './JoinConsultation.types';
import { PatientHeader } from './components/PatientHeader';
import { PastConsultationsList } from './components/PastConsultations';
import { AssessmentNotes } from './components/AssessmentNotes';
import { Button } from '@/ui/atoms/button/Button';

export const JoinConsultation: FC<JoinConsultationProps> = ({
  patientInfo,
  pastConsultations,
  onSave,
  onAddMedication,
  diagnoses,
  onDiagnosesChange,
  diagnosisSuggestions,
  onDiagnosisSearch,
  isLoadingDiagnoses,
  symptoms,
  onSymptomsChange,
  symptomSuggestions,
  onSymptomSearch,
  isLoadingSymptoms,
  symptomNotes,
  onSymptomNotesChange,
  diagnosesNotes,
  onDiagnosesNotesChange,
  labTests,
  onLabTestsChange,
  labTestSuggestions,
  onLabTestSearch,
  isLoadingLabTests,
  labTestNotes,
  onLabTestNotesChange,
  medications,
  onMedicationsChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] p-4 md:p-5 lg:p-10 font-sans">
      {/* Patient Header */}
      <PatientHeader patientInfo={patientInfo} />

      <div className="mt-6 md:mt-8 grid grid-cols-3 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column - Past Consultations */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6">
          <h3 className="text-lg font-bold text-[#333]">{t('joinConsultation.history.title')}</h3>
          <PastConsultationsList consultations={pastConsultations} />
        </div>

        {/* Right Column - Assessment & Notes */}
        <div className="lg:col-span-8 col-span-2 bg-white rounded-xl p-5 md:p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl font-bold text-[#333]">{t('joinConsultation.assessment.title')}</h2>
              
            </div>

              <AssessmentNotes 
                onAddMedication={onAddMedication} 
                diagnoses={diagnoses}
                onDiagnosesChange={onDiagnosesChange}
                diagnosisSuggestions={diagnosisSuggestions}
                onDiagnosisSearch={onDiagnosisSearch}
                isLoadingDiagnoses={isLoadingDiagnoses}
                symptoms={symptoms}
                onSymptomsChange={onSymptomsChange}
                symptomSuggestions={symptomSuggestions}
                onSymptomSearch={onSymptomSearch}
                isLoadingSymptoms={isLoadingSymptoms}
                symptomNotes={symptomNotes}
                onSymptomNotesChange={onSymptomNotesChange}
                diagnosesNotes={diagnosesNotes}
                onDiagnosesNotesChange={onDiagnosesNotesChange}
                labTests={labTests}
                onLabTestsChange={onLabTestsChange}
                labTestSuggestions={labTestSuggestions}
                onLabTestSearch={onLabTestSearch}
                isLoadingLabTests={isLoadingLabTests}
                labTestNotes={labTestNotes}
                onLabTestNotesChange={onLabTestNotesChange}
                medications={medications}
                onMedicationsChange={onMedicationsChange}
              />


            <div className="mt-auto pt-6 md:pt-8 flex justify-end">
              <Button
                onClick={onSave}
                variant="primary"
                className="bg-[#e32933] hover:bg-[#c2242b] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold shadow-md transition-all active:scale-95"
              >
                {t('joinConsultation.button.save')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

