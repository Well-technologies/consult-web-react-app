import { useTranslation } from "react-i18next";

import { ClaimsStatsDetails } from "@/api/claim/claim.types";

export const getStatsFromClaimStatsDetails = (
  data: ClaimsStatsDetails | null
) => {
  const { t } = useTranslation();

  if (!data) {
    return [];
  }

  return [
    {
      name: t("dashboard.stat.noOfClaims"),
      count: data.no_of_claims,
    },
    // {
    //   name: t("dashboard.stat.totalSubmittedClaims"),
    //   count: data.total_submitted_claims,
    // },
    // {
    //   name: t("dashboard.stat.totalReviewedClaims"),
    //   count: data.total_reviewed_claims,
    // },
    // {
    //   name: t("dashboard.stat.totalRejectedClaims"),
    //   count: data.total_rejected_claims,
    // },
    // {
    //   name: t("dashboard.stat.totalCompletedClaims"),
    //   count: data.total_completed_claims,
    // },
    // {
    //   name: t("dashboard.stat.totalMedicineClaims"),
    //   count: data.total_medicine_claims,
    // },
    // {
    //   name: t("dashboard.stat.totalConsultationClaims"),
    //   count: data.total_consultation_claims,
    // },
    // {
    //   name: t("dashboard.stat.totalLabClaims"),
    //   count: data.total_lab_claims,
    // },
    {
      name: t("dashboard.stat.totalLeads"),
      count: data.total_leads,
    },

    {
      name: t("dashboard.stat.totalClaimedValue"),
      count: data.total_claimed_value,
    },
    // {
    //   name: t("dashboard.stat.totalProcessedClaimsSum"),
    //   count: data.total_processed_claims_sum,
    // },
    // {
    //   name: t("dashboard.stat.totalRequestedValue"),
    //   count: data.total_requested_value,
    // },
    // {
    //   name: t("dashboard.stat.totalReviewedClaimsSum"),
    //   count: data.total_reviewed_claims_sum,
    // },
  ];
};
