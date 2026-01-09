import clsx from "clsx";

import { formatNumbersToCurrencyStrings } from "@/utils";

import { DashboardStatCardProps } from "./DashboardStatCard.types";

export const DashboardStatCard = ({
  name,
  count,
  isLoadingItem,
}: DashboardStatCardProps) => {
  return (
    <div
      className={clsx(
        "border-2 border-secondary-100 rounded-lg w-auto p-4 gap-2 flex flex-col",
        isLoadingItem
          ? "animate-pulse bg-secondary-50 dark:bg-secondary-700"
          : ""
      )}
    >
      <div className="text-secondary-600 text-md">{name}</div>
      <div className="flex justify-between items-end">
        <div className="text-secondary-600 font-bold text-2xl">
          {formatNumbersToCurrencyStrings(count)}
        </div>
        <div />
      </div>
    </div>
  );
};
