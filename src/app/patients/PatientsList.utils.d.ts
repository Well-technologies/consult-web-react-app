import { ClaimFeatures, LeadCataloguePackage } from "@/api/user/user.types";
import { Breadcrumb } from "@/ui/molecules/breadcrumbs/Breadcrumbs.types";
export declare const FamilyDeleteConfirmKey = "DELETE";
export declare const getPatientDetailsBreadCrumbOptions: () => Breadcrumb[];
export declare const getClaimFeatures: (packageIds: number[], leadCataloguePackages: LeadCataloguePackage[]) => ClaimFeatures | null;
