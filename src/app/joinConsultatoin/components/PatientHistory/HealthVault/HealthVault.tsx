import { ServiceConfigType } from "@/api/index.types";
import { useGetPatientHealthVault } from "@/api/patient/patient";
import { useClient } from "@/hooks/useClient/useClient";

type HealthVaultProps = {
  patientId: string;
};

export const HealthVault = ({ patientId }: HealthVaultProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientHealthVault({
    client: consultClient,
    params: {
      userId: patientId,
    },
  });
  if (isLoading) {
    return <div className="p-4">Loading health vault...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading health vault</div>;
  }

  const healthVaultData = data?.payload || [];

  if (healthVaultData.length === 0) {
    return (
      <div className="p-4 text-gray-500">No health vault documents found</div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Vault</h3>
      </div>
      {healthVaultData.length !== 0 && (
        <div className="grid grid-cols-2 gap-2">
          {healthVaultData.map((document) => (
            <div key={document.id} className="flex justify-center border">
              <div className="card">
                <div className="h-20">
                  <img
                    className="h-full w-full object-cover"
                    src={document.fileUrl}
                    alt={document.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.png"; // Fallback image
                    }}
                  />
                </div>
                <h1 className="text-sm font-medium truncate">
                  {document.title}
                </h1>
                <h2 className="text-xs text-gray-600">
                  {new Date(document.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
