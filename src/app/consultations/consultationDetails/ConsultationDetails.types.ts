import { ConsultationDetails } from "@/api/consult/consult.types";

export enum ConsultationDetailsTab {
  Overview = "OVERVIEW",
  Prescription = "PRESCRIPTION",
  Notes = "NOTES",
  LabTest = "LAB_TEST",
  Medications = "MEDICATIONS",
  Diagnosis = "DIAGNOSIS",
  Symptoms = "SYMPTOMS",
}

export type ConsultationDetailsProps = {
  data?: ConsultationDetails | null;
  isLoading: boolean;
};
