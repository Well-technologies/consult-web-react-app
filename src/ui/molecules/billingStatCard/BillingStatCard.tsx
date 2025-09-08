import { BillingStatCardProps } from "./BillingStatCard.types";

export const BillingStatCard = ({ title, children }: BillingStatCardProps) => {
  return (
    <div className="flex flex-col bg-gray-50 rounded-lg p-4">
      <div className="text-gray-500 text-sm font-semibold">{title}</div>
      <div className="flex flex-col justify-between h-full">{children}</div>
    </div>
  );
};
