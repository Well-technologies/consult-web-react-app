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

  if (!data?.payload?.surgicalHistories?.length) {
    return <div className="p-4 text-gray-500">No surgical history found</div>;
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Surgical History
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {data?.payload?.surgicalHistories?.map(
          (item: MedicalAndSurgicalHistoryItem, index: number) => (
            <div
              key={index}
              className="bg-red-50 px-3 py-1.5 rounded-full border border-red-100"
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
