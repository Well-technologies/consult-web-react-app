import clsx from "clsx";
import { useTranslation } from "react-i18next";

import {
  ClaimFeatures,
  FeatureCategoryId,
  LeadCataloguePackage,
} from "@/api/user/user.types";
import { AppRoute } from "@/routing/AppRoute.enum";
import { Breadcrumb } from "@/ui/molecules/breadcrumbs/Breadcrumbs.types";

export const FamilyDeleteConfirmKey = "DELETE";

export const getPatientDetailsBreadCrumbOptions = (): Breadcrumb[] => {
  const { t } = useTranslation();
  return [
    {
      name: t("patient.title"),
      navigateTo: AppRoute.Patients,
      isSeparator: false,
      icon: (
        <svg
          className={clsx(
            "w-3.5 aspect-square shrink-0 default:text-secondary transition duration-75 me-2"
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
      ),
    },
    {
      name: t("patient.details.title"),
      isSeparator: true,
    },
  ];
};

export const getClaimFeatures = (
  packageIds: number[],
  leadCataloguePackages: LeadCataloguePackage[]
): ClaimFeatures | null => {
  const activeCataloguePackage = leadCataloguePackages.filter((item) =>
    packageIds.includes(item.package_id)
  );
  if (!activeCataloguePackage.length) return null;
  const cataloguePackage = activeCataloguePackage[0];
  if (!cataloguePackage?.package_end_date) return null;
  const claimPackage = cataloguePackage.lead_catalogue_package_feature.find(
    (item) => item.category_id === FeatureCategoryId.Claim
  );

  if (!claimPackage || !claimPackage?.feature_value) return null;

  const claimPackageFeatureValues: ClaimFeatures[] = JSON.parse(
    claimPackage.feature_value
  );

  if (!claimPackageFeatureValues.length) return null;

  return claimPackageFeatureValues[0];
};
