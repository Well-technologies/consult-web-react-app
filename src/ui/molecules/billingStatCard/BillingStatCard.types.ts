import { ReactNode } from "react";

export type BillingStatCardProps = {
  key: BillingStatCardKey;
  title: string;
  children: ReactNode;
};

export enum BillingStatCardKey {
  NumberOfEmployees = "NumberOfEmployees",
  UpcomingInvoice = "UpcomingInvoice",
  ApprovedClaims = "ApprovedClaims",
  ApprovedClaimAmount = "ApprovedClaimAmount",
}
