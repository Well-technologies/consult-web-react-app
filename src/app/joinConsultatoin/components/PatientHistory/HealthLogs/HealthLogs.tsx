import { ServiceConfigType } from "@/api/index.types";
import { useGetPatientHealthLogs } from "@/api/patient/patient";
import { useClient } from "@/hooks/useClient/useClient";

type HealthLogsProps = {
  patientId: string;
  doctorId: number;
};

export const HealthLogs = ({ patientId, doctorId }: HealthLogsProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientHealthLogs({
    client: consultClient,
    params: {
      patientId,
      doctorId,
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading health logs...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading health logs</div>;
  }

  if (!data?.payload?.length) {
    return <div className="p-4 text-gray-500">No health logs found</div>;
  }

  const formatMeasurement = (measurement: {
    unit: string | null;
    value: string | null;
  }) => {
    if (!measurement.value) return "N/A";
    return measurement.unit
      ? `${measurement.value} ${measurement.unit}`
      : measurement.value;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-3 space-y-3">
      {data?.payload?.map((log) => (
        <div
          key={log.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Health Log #{log.id}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">
                {formatDate(log.created_at)}
              </p>
            </div>
          </div>

          {/* Vital Signs Pills */}
          <div className="grid grid-cols-3 gap-2">
            {/* Blood Pressure */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                BP
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {log.data.body.systolic.value || "N/A"}/
                {log.data.body.diastolic.value || "N/A"}
              </p>
            </div>

            {/* Pulse */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                Pulse
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.pulse)}
              </p>
            </div>

            {/* SpO2 */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                SpO2
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.spo2)}
              </p>
            </div>

            {/* BMI */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                BMI
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {log.data.body.bmi.value || "N/A"}
              </p>
            </div>

            {/* Height */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                Height
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.height)}
              </p>
            </div>

            {/* Weight */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                Weight
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.weight)}
              </p>
            </div>

            {/* Blood Sugar */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                Sugar
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.blood_sugar)}
              </p>
            </div>

            {/* Hemoglobin */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                Hb
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.hb)}
              </p>
            </div>

            {/* Cholesterol */}
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                Cholest
              </p>
              <p className="text-xs font-semibold text-gray-900 text-center">
                {formatMeasurement(log.data.body.cholesterol)}
              </p>
            </div>
          </div>

          {/* Updated timestamp */}
          {log.updated_at !== log.created_at && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Updated: {formatDate(log.updated_at)}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
