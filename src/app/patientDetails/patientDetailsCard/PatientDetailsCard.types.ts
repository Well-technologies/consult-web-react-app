import { PatientDetailsProps } from "../PatientDetails.types";

export type PatientDetailsCardProps = Pick<
  PatientDetailsProps,
  | "data"
  | "isLoading"
  // | "onOpenUserModal"
  // | "onOpenFamilyModal"
  // | "claimFeatures"
>;
