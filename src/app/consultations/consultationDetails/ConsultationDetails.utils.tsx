import { useTranslation } from "react-i18next";
import { Breadcrumb } from "@/ui/molecules/breadcrumbs/Breadcrumbs.types";
import { AppRoute } from "@/routing/AppRoute.enum";

export const getConsultationDetailsBreadCrumbOptions = (consultationId: number, patientId: number): Breadcrumb[] => {
  const { t } = useTranslation();

  const breadcrumbsList: Breadcrumb[] = [
    {
      name: t("consultation.table.title"),
      navigateTo: AppRoute.Consultations,
      isSeparator: false,
    },
    {
      name: t("consultation.details.title", { consultationId }),
      isSeparator: true,
    },
  ];

  if (patientId) {
    breadcrumbsList.splice(1, 0, {
      name: t("consultation.details.patient", { patientId }),
      navigateTo: AppRoute.PatientDetails.replace(":leadId", patientId.toString()),
      isSeparator: true,
    });
  }

  return breadcrumbsList;
};
