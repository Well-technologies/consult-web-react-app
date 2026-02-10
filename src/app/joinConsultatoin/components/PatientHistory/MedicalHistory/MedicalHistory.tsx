import { useGetPatientMedicalHistory } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";

type MedicalHistoryProps = {
  patientId: string;
};

export const MedicalHistory = ({ patientId }: MedicalHistoryProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientMedicalHistory({
    client: consultClient,
    patientLeadId: Number(patientId),
  });

  if (isLoading) {
    return <div className="p-4">Loading medical history...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading medical history</div>
    );
  }

  const medicalHistoryData = data?.payload;

  if (!medicalHistoryData) {
    return <div className="p-4 text-gray-500">No medical history found</div>;
  }

  return <></>;
};
