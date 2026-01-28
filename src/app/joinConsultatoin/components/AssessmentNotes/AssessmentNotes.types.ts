import { Prescription } from '../../JoinConsultation.types';
import { ClinicalCommonDataDetails } from '@/api/consult/consult.types';

export interface AssessmentNotesProps {
  onAddMedication?: () => void;
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
  onMedicationsChange: (medications: Prescription[]) => void;
}

