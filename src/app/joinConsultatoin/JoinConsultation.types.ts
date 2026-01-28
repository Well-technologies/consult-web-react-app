import { ClinicalCommonDataDetails } from '@/api/consult/consult.types';

export enum ConsultationType {
  InPerson = 'in-person',
  Online = 'online',
}

export type ConsultationCardProps = {
  type: ConsultationType;
  appointmentId: string;
};

export interface PatientInfo {
  name: string;
  age: string;
  appointmentId: string;
  patientId: string;
  date: string;
}

export interface PastConsultation {
  id: string;
  type: 'History & Notes' | 'Previous Medications';
  date: string;
  content: string;
  hasCurrentRx?: boolean;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  dosageUnit: string;
  frequency: string;
  noOfDays: string;
  schedule: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
    ifNecessary: number;
    everyOtherDay: number;
  };
  timing: string;
  notes: string;
  isEditing?: boolean;
  isNew?: boolean;
}

export interface JoinConsultationProps {
  patientInfo: PatientInfo;
  pastConsultations: PastConsultation[];
  onSave: () => void;
  onAddMedication: () => void;
  diagnoses: ClinicalCommonDataDetails[];
  onDiagnosesChange: (items: ClinicalCommonDataDetails[]) => void;
  diagnosisSuggestions: ClinicalCommonDataDetails[];
  onDiagnosisSearch: (query: string) => void;
  isLoadingDiagnoses: boolean;
  symptoms: ClinicalCommonDataDetails[];
  onSymptomsChange: (items: ClinicalCommonDataDetails[]) => void;
  symptomSuggestions: ClinicalCommonDataDetails[];
  onSymptomSearch: (query: string) => void;
  isLoadingSymptoms: boolean;
  symptomNotes: string;
  onSymptomNotesChange: (notes: string) => void;
  diagnosesNotes: string;
  onDiagnosesNotesChange: (notes: string) => void;
  labTests: ClinicalCommonDataDetails[];
  onLabTestsChange: (items: ClinicalCommonDataDetails[]) => void;
  labTestSuggestions: ClinicalCommonDataDetails[];
  onLabTestSearch: (query: string) => void;
  isLoadingLabTests: boolean;
  labTestNotes: string;
  onLabTestNotesChange: (notes: string) => void;
  medications: Prescription[];
  onMedicationsChange: (prescriptions: Prescription[]) => void;
}

