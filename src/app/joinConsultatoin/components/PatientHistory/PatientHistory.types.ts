export type PatientHistoryContainerProps = {
    patientId: string;
    doctorId: number;
}


export enum PatientHistoryTab {
  PastConsultations = 'pastConsultations',
  LabOrders = 'labOrders',
  MedOrders = 'medOrders',
  HealthLogs = 'healthLogs',
  HealthData = 'healthData',
  HealthVault = 'healthVault',
  MedicalHistory = 'medicalHistory',
  SurgicalHistory = 'surgicalHistory',
  Conditions = 'conditions',
}

