import { ServiceConfigType } from "@/api/index.types";
import { useGetPatientHealthVault } from "@/api/patient/patient";
import { useClient } from "@/hooks/useClient/useClient";

import { HealthVault } from "./HealthVault";
import { HealthVaultContainerProps } from "./HealthVault.types";

export const HealthVaultContainer = ({
  patientId,
}: HealthVaultContainerProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetPatientHealthVault({
    client: consultClient,
    params: {
      userId: patientId?.toString(),
    },
    options: {
      enabled: !!patientId,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading health vault data.</div>;
  }

  return <HealthVault healthData={data?.payload || []} />;
};
