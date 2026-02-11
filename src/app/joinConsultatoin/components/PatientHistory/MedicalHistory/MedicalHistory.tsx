import { useGetPatientMedicalHistory } from "@/api/consult/consult";
import { MedicalAndSurgicalHistoryItem } from "@/api/consult/consult.types";
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

  const medicalHistoryData = data?.payload?.medicalHistories;

  if (!medicalHistoryData) {
    return <div className="p-4 text-gray-500">No medical history found</div>;
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {medicalHistoryData.map(
          (item: MedicalAndSurgicalHistoryItem, index: number) => (
            <div
              key={index}
              className="bg-red-50 text-[#e32933] px-3 py-1.5 rounded-full border border-red-100"
            >
              <p className="text-sm font-bold font-medium text-[#e32933]">
                {item.name}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
