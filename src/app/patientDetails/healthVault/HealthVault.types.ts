import { HealthVaultData } from "@/api/patient/patient.types";

export type HealthVaultProps = {
  healthData: HealthVaultData[];
};

export type HealthVaultContainerProps = {
  patientId?: number | null;
};
