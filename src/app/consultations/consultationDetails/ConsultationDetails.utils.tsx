import { useTranslation } from "react-i18next";
import { Breadcrumb } from "@/ui/molecules/breadcrumbs/Breadcrumbs.types";
import { AppRoute } from "@/routing/AppRoute.enum";

export const getConsultationDetailsBreadCrumbOptions = (consultationId: number): Breadcrumb[] => {
  const { t } = useTranslation();
  return [
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
};
