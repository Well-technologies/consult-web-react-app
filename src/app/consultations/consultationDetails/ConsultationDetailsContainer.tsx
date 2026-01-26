import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClient } from "@/hooks/useClient/useClient";
import { ServiceConfigType } from "@/api/index.types";
import { useGetConsultationById } from "@/api/consult/consult";
import { ConsultationDetails } from "./ConsultationDetails";
import { Breadcrumbs } from "@/ui/molecules/breadcrumbs/Breadcrumbs";
import { getConsultationDetailsBreadCrumbOptions } from "./ConsultationDetails.utils";

export const ConsultationDetailsContainer = () => {
  const { consultationId } = useParams<{ consultationId: string }>();
  const consultClient = useClient({ serviceConfigType: ServiceConfigType.Consult });

  const {
    data: consultationData,
    isLoading,
    refetch,
  } = useGetConsultationById({
    client: consultClient,
    consultationId: consultationId!,
    options: {
        enabled: !!consultationId
    }
  });

  useEffect(() => {
    if (consultationId) {
      refetch();
    }
  }, [consultationId, refetch]);

  return (
    <>
      <Breadcrumbs breadcrumbs={getConsultationDetailsBreadCrumbOptions(consultationData?.payload?.consultationId!)} />
      <ConsultationDetails
        data={consultationData?.payload}
        isLoading={isLoading}
      />
    </>
  );
};
