import { isNull } from "lodash";
import { useTranslation } from "react-i18next";

import { Lead } from "@/api/user/user.types";

export const getCSSAndStatusFromStatus = (status: Lead) => {
  const { t } = useTranslation();
  if (isNull(status?.claims_deleted_leads)) {
    return {
      css: "bg-green-200 text-green-600",
      statusName: t("user.activeStatus.active"),
    };
  } else {
    return {
      css: "bg-gray-200 text-gray-600",
      statusName: t("user.activeStatus.inactive"),
    };
  }
};
