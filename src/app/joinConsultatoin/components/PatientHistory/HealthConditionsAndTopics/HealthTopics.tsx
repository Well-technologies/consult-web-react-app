import { ServiceConfigType } from "@/api/index.types";
import { useGetPatientHealthTopics } from "@/api/patient/patient";
import { PatientHealthTopic } from "@/api/patient/patient.types";
import { useClient } from "@/hooks/useClient/useClient";

type HealthTopicsProps = {
  patientId: string;
  doctorId: number;
};

export const HealthTopics = ({ patientId, doctorId }: HealthTopicsProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientHealthTopics({
    client: consultClient,
    params: {
      patientId,
      doctorId,
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading Health Topics...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error Loading Health Topics</div>;
  }

  if (!data?.payload?.length) {
    return <div className="p-4 text-gray-500">No Health Topics Found</div>;
  }

  return (
    <div className="py-3">
      <h6 className="mb-3 text-sm font-medium text-gray-700">
        Health topics of interest
      </h6>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.payload.map((topic: PatientHealthTopic, index: number) => (
          <div
            key={index}
            className="bg-red-50 px-3 py-1.5 rounded-full border border-red-100"
          >
            <p className="text-sm font-bold font-medium text-[#e32933]">
              {topic.get_lead_by_health_topics.healthtopicname}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
