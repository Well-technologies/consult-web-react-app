import { useGetPatientSurgicalHistory } from "@/api/consult/consult";
import { MedicalAndSurgicalHistoryItem } from "@/api/consult/consult.types";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";

type SurgicalHistoryProps = {
  patientLeadId: string;
};

export const SurgicalHistory = ({ patientLeadId }: SurgicalHistoryProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientSurgicalHistory({
    client: consultClient,
    patientLeadId: Number(patientLeadId),
  });

  if (isLoading) {
    return <div className="p-4">Loading surgical history...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading surgical history</div>
    );
  }

  if (!data?.payload.surgicalHistories?.length) {
    return <div className="p-4 text-gray-500">No surgical history found</div>;
  }

  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-2">
        {data.payload.surgicalHistories.map(
          (item: MedicalAndSurgicalHistoryItem, index: number) => (
            <div key={index} className="bg-gray-200 px-3 py-1 rounded-[10px]">
              <p className="text-base font-medium text-gray-900">{item.name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
