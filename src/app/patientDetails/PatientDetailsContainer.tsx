import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";

import { useGetConsultations } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useGetPreviousMedOrders } from "@/api/orders/orders";
import { useGetConsultUserDetails } from "@/api/user/user";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";
import { LeadIdParamType } from "@/routing/AppRoutes.types";
import { Breadcrumbs } from "@/ui/molecules/breadcrumbs/Breadcrumbs";

import { PatientDetails } from "./PatientDetails";
import { getPatientDetailsBreadCrumbOptions } from "./PatientDetails.utils";

export const PatientDetailsContainer = () => {
  const client = useClient({ serviceConfigType: ServiceConfigType.Core });
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });
  // const { t } = useTranslation();

  const { leadId } = useParams<LeadIdParamType>();

  if (!leadId) return <Navigate to={AppRoute.Patients} replace />;

  const {
    data: consultPatient,
    isLoading: isLoadingConsultPatient,
    // refetch: refatchConsultPatient,
  } = useGetConsultUserDetails({
    client: consultClient,
    leadId,
  });

  const {
    data: consultations,
    isLoading: isLoadingConsultations,
    refetch: refatchConsultations,
  } = useGetConsultations({
    client: consultClient,
    params: {
      patient: consultPatient?.payload?.id || "",
      page: 1,
      take: 20,
    },
  });

  const { data: medOrders } = useGetPreviousMedOrders({
    client: client,
    params: {
      lead_id: consultPatient?.payload?.lead_id,
      page: 1,
      take: 20,
    },
    options: {
      enabled: !!consultPatient?.payload?.lead_id,
    },
  });

  useEffect(() => {
    console.log(consultPatient);
    refatchConsultations();
  }, [consultPatient?.payload?.id]);

  const navigationOptions = getPatientDetailsBreadCrumbOptions();

  return (
    <>
      <Breadcrumbs breadcrumbs={navigationOptions} />
      <PatientDetails
        data={consultPatient?.payload}
        isLoading={isLoadingConsultPatient || isLoadingConsultations}
        consultations={consultations?.payload}
        medOrders={medOrders?.data}
      />
    </>
  );
};
