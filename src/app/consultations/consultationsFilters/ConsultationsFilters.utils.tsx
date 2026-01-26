import { TFunction } from "i18next";

export const getClaimStatusOptions = (t: TFunction) => [
  { label: t("claim.status.approved"), value: "approved" },
  { label: t("claim.status.submitted"), value: "submitted" },
  { label: t("claim.status.rejected"), value: "rejected" },
  { label: t("claim.status.completed"), value: "completed" },
];

export const getClaimOrderTypeOptions = (t: TFunction) => [
  { label: t("claim.orderType.pharma"), value: "pharma" },
  { label: t("claim.orderType.consult"), value: "consult" },
  { label: t("claim.orderType.lab"), value: "lab" },
];
