import { useGetConsultations } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";

import { PastConsultationCard } from "./PastConsultationCard";
import { PastConsultationsListProps } from "./PastConsultations.types";

export const PastConsultationsList = ({
  patientId,
}: PastConsultationsListProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });
  const { data: pastConsultationsData, isLoading } = useGetConsultations({
    client: consultClient,
    params: { patient: patientId, page: 1, take: 1000 },
    options: { enabled: !!patientId },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pastConsultationsData?.payload?.length) {
    return (
      <div className="p-4 text-gray-500">No past consultations found.</div>
    );
  }

  return (
    <div className="space-y-4">
      {pastConsultationsData?.payload?.map((consultation) => (
        <PastConsultationCard
          key={consultation.id}
          consultation={consultation}
        />
      ))}
    </div>
  );
};
