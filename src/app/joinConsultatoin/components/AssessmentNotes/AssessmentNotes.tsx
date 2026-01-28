import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Prescription } from '../../JoinConsultation.types';
import { MedicationCard } from '@/ui/molecules/medicationCard';
import { AssessmentNotesProps } from './AssessmentNotes.types';
import { ClinicalItemSelector } from './ClinicalItemSelector';

export const AssessmentNotes: FC<AssessmentNotesProps> = ({ 
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
  const [snapshots, setSnapshots] = useState<Record<string, Prescription>>({});

  const updatePrescription = (id: string, field: keyof Prescription, value: any) => {
    onMedicationsChange(
      medications.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const updateSchedule = (id: string, key: keyof Prescription['schedule'], delta: number) => {
    onMedicationsChange(
      medications.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            schedule: {
              ...p.schedule,
              [key]: Math.max(0, p.schedule[key] + delta)
            }
          };
        }
        return p;
      })
    );
  };

  const removePrescription = (id: string) => {
    onMedicationsChange(medications.filter((p) => p.id !== id));
  };

  const resetPrescription = (id: string) => {
    onMedicationsChange(
      medications.map((p) =>
        p.id === id
          ? {
              ...p,
              medicationName: '',
              dosage: '',
              dosageUnit: '',
              frequency: '',
              noOfDays: '',
              schedule: {
                morning: 0,
                afternoon: 0,
                evening: 0,
                night: 0,
                ifNecessary: 0,
                everyOtherDay: 0,
              },
              timing: '',
              notes: '',
            }
          : p
      )
    );
  };

  const handleAddSubmit = (id: string) => {
    onMedicationsChange(
      medications.map((p) => (p.id === id ? { ...p, isEditing: false, isNew: false } : p))
    );
    setSnapshots((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleStartEdit = (p: Prescription) => {
    setSnapshots((prev) => ({ ...prev, [p.id]: { ...p } }));
    updatePrescription(p.id, 'isEditing', true);
  };

  const handleCancel = (id: string) => {
    const snapshot = snapshots[id];
    if (snapshot) {
      onMedicationsChange(
        medications.map((m) => (m.id === id ? { ...snapshot, isEditing: false } : m))
      );
      setSnapshots((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      onMedicationsChange(
        medications.map((p) => (p.id === id ? { ...p, isEditing: false } : p))
      );
    }
  };

  const renderMedicationCard = (p: Prescription) => {
    const schedules = [
      { key: 'morning', label: t('joinConsultation.assessment.medications.morning') },
      { key: 'afternoon', label: t('joinConsultation.assessment.medications.afternoon') },
      { key: 'evening', label: t('joinConsultation.assessment.medications.evening') },
      { key: 'night', label: t('joinConsultation.assessment.medications.night') },
      { key: 'ifNecessary', label: t('joinConsultation.assessment.medications.ifNecessary') },
      { key: 'everyOtherDay', label: t('joinConsultation.assessment.medications.everyOtherDay') },
    ];

    return (
      <MedicationCard
        key={p.id}
        name={p.medicationName}
        dosage={`${p.dosage} ${p.dosage ? p.dosageUnit : ''}`}
        frequency={p.frequency}
        timing={p.timing}
        notes={p.notes}
        duration={p.noOfDays}
        schedules={schedules.map(s => ({
          label: s.label,
          count: p.schedule[s.key as keyof Prescription['schedule']]
        }))}
        onEdit={() => handleStartEdit(p)}
        onDelete={() => removePrescription(p.id)}
      />
    );
  };

  const renderMedicationForm = (p: Prescription) => {
    return (
      <div key={p.id}
       className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white p-5 md:p-6 lg:p-8 space-y-5 md:space-y-6 relative"
       >
        <button 
          onClick={() => removePrescription(p.id)}
          className="absolute top-5 right-5 text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full z-10"
          title="Close Form"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Medication Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.medicationName')}</label>
            <input
              type="text"
              autoFocus={true}
              value={p.medicationName}
              onChange={(e) => updatePrescription(p.id, 'medicationName', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-[#e32933] outline-none transition-all"
              placeholder={t('joinConsultation.assessment.medications.medicationName')}
            />
          </div>

          {/* Dosage */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.dosage')}</label>
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl focus-within:ring-1 focus-within:ring-[#e32933] focus-within:border-[#e32933] transition-all overflow-hidden group">
              <input
                type="text"
                value={p.dosage}
                onChange={(e) => updatePrescription(p.id, 'dosage', e.target.value)}
                className="flex-1 px-4 py-2 bg-transparent outline-none text-sm placeholder:text-gray-300 min-w-0"
                placeholder="0"
              />
              <div className="w-px h-6 bg-gray-200 shrink-0"></div>
              <div className="relative shrink-0">
                <select
                  value={p.dosageUnit}
                  onChange={(e) => updatePrescription(p.id, 'dosageUnit', e.target.value)}
                  className="pl-3 pr-8 py-2 bg-transparent outline-none text-sm cursor-pointer appearance-none text-gray-600 font-medium hover:text-[#e32933] transition-colors"
                >
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="tab">tab</option>
                  <option value="cap">cap</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#e32933] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.frequency')}</label>
            <input
              type="text"
              value={p.frequency}
              onChange={(e) => updatePrescription(p.id, 'frequency', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-[#e32933] outline-none transition-all"
              placeholder="e.g. Twice daily"
            />
          </div>

          {/* No of Days */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.noOfDays')}</label>
            <input
              type="text"
              value={p.noOfDays}
              onChange={(e) => updatePrescription(p.id, 'noOfDays', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-[#e32933] outline-none transition-all"
              placeholder="0"
            />
          </div>
        </div>

        {/* Schedule and Timing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 pt-4 md:pt-6 border-t border-gray-50">
          {/* Schedule Table */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.schedule')}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
              {[
                { key: 'morning', label: t('joinConsultation.assessment.medications.morning') },
                { key: 'afternoon', label: t('joinConsultation.assessment.medications.afternoon') },
                { key: 'evening', label: t('joinConsultation.assessment.medications.evening') },
                { key: 'night', label: t('joinConsultation.assessment.medications.night') },
                { key: 'ifNecessary', label: t('joinConsultation.assessment.medications.ifNecessary') },
                { key: 'everyOtherDay', label: t('joinConsultation.assessment.medications.everyOtherDay') },
              ].map((item) => (
                <div key={item.key} className="flex flex-col items-center gap-2 min-w-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase text-center w-full truncate px-1" title={item.label}>
                    {item.label}
                  </span>
                  <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1 w-full max-w-[110px] justify-between">
                    <button 
                      onClick={() => updateSchedule(p.id, item.key as keyof Prescription['schedule'], -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors shrink-0"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                    </button>
                    <span className="flex-1 text-center text-xs font-bold text-gray-700">{p.schedule[item.key as keyof typeof p.schedule]}</span>
                    <button 
                      onClick={() => updateSchedule(p.id, item.key as keyof Prescription['schedule'], 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors shrink-0"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timing & Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.timing')}</label>
              <div className="flex flex-wrap gap-2">
                {[
                  t('joinConsultation.assessment.medications.beforeMeals'),
                  t('joinConsultation.assessment.medications.afterMeals'),
                  t('joinConsultation.assessment.medications.withMeals'),
                  t('joinConsultation.assessment.medications.daily'),
                  t('joinConsultation.assessment.medications.immediately'),
                ].map((tLabel) => (
                  <button
                    key={tLabel}
                    onClick={() => updatePrescription(p.id, 'timing', tLabel)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      p.timing === tLabel 
                        ? 'bg-[#e32933] text-white border-[#e32933] shadow-md shadow-red-100' 
                        : 'bg-white text-gray-500 border-gray-100 hover:border-[#e32933] hover:text-[#e32933]'
                    }`}
                  >
                    {tLabel}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('joinConsultation.assessment.medications.notes')}</label>
              <textarea
                value={p.notes}
                onChange={(e) => updatePrescription(p.id, 'notes', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-[#e32933] outline-none transition-all resize-none min-h-[60px]"
                placeholder={t('joinConsultation.assessment.medications.notes') + '...'}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 md:gap-3 pt-3 md:pt-4 border-t border-gray-50">
          <button 
            onClick={() => p.isNew ? resetPrescription(p.id) : handleCancel(p.id)}
            className="px-6 py-2 border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            {p.isNew ? t('global.button.reset') : t('global.modal.cancel')}
          </button>
          <button 
            onClick={() => handleAddSubmit(p.id)}
            className="px-8 py-2 bg-[#e32933] text-white rounded-xl text-sm font-bold hover:bg-[#c2242b] shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            {t('global.button.add')}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Symptoms Section */}
      <ClinicalItemSelector
        label={t('joinConsultation.assessment.symptoms.label')}
        selectedItems={symptoms}
        onItemsChange={onSymptomsChange}
        suggestions={symptomSuggestions}
        onSearch={onSymptomSearch}
        isLoading={isLoadingSymptoms}
        placeholder={t('joinConsultation.assessment.symptoms.placeholder')}
        notes={symptomNotes}
        onNotesChange={onSymptomNotesChange}
      />

      {/* Diagnosis Section */}
      <ClinicalItemSelector
        label={t('joinConsultation.assessment.diagnosis.label')}
        selectedItems={diagnoses}
        onItemsChange={onDiagnosesChange}
        suggestions={diagnosisSuggestions}
        onSearch={onDiagnosisSearch}
        isLoading={isLoadingDiagnoses}
        placeholder={t('joinConsultation.assessment.diagnosis.placeholder')}
        notes={diagnosesNotes}
        onNotesChange={onDiagnosesNotesChange}
      />

      {/* Lab Test Section */}
      <ClinicalItemSelector
        label={t('joinConsultation.assessment.labTest.label')}
        selectedItems={labTests}
        onItemsChange={onLabTestsChange}
        suggestions={labTestSuggestions}
        onSearch={onLabTestSearch}
        isLoading={isLoadingLabTests}
        placeholder={t('joinConsultation.assessment.labTest.placeholder')}
        notes={labTestNotes}
        onNotesChange={onLabTestNotesChange}
      />



      {/* Medications Section */}

      <section className="space-y-3 md:space-y-4">
        <h4 className="text-base font-bold text-[#333]">{t('joinConsultation.assessment.medications.title')}</h4>
        
        <>
          {/* List for saved medications (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {medications.filter((p : any) => !p.isEditing).map(renderMedicationCard)}
            
            {/* Add New Medication Card */}
            {!medications.some((p : any) => p.isEditing) && (
              <div 
                onClick={onAddMedication}
                className="border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-[#e32933] hover:bg-red-50 transition-all min-h-[200px] group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#e32933] flex items-center justify-center text-[#e32933] text-2xl font-bold group-hover:scale-110 transition-transform">
                  +
                </div>
              </div>
            )}
          </div>

          {/* List for medications being edited (Full width) */}
          {medications.filter((med : any) => med.isEditing).map(renderMedicationForm)}
        </>
      </section>
    </div>
  );
};
