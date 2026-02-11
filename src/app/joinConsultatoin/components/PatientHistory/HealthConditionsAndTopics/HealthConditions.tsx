import { ServiceConfigType } from "@/api/index.types";
import { useGetPatientHealthConditions } from "@/api/patient/patient";
import { PatientHealthCondition } from "@/api/patient/patient.types";
import { useClient } from "@/hooks/useClient/useClient";

type HealthConditionsProps = {
  patientId: string;
  doctorId: number;
};

export const HealthConditions = ({
  patientId,
  doctorId,
}: HealthConditionsProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientHealthConditions({
    client: consultClient,
    params: {
      patientId,
      doctorId,
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading health conditions...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading health conditions</div>
    );
  }

  if (!data?.payload?.length) {
    return <div className="p-4 text-gray-500">No health conditions found</div>;
  }

  return (
    <div className="p-3">
      <h6 className="mb-3 text-sm font-medium text-gray-700">
        • Health conditions of the patient
      </h6>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.payload.map(
          (condition: PatientHealthCondition, index: number) => (
            <div key={index} className="bg-gray-200 px-3 py-1 rounded-[10px]">
              <p className="text-sm font-medium text-gray-900">
                {condition.get_lead_by_health_coditions.healthconditionname}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
