import { Pagination } from "@/ui/atoms/pagination/Pagination";
import { NotFound } from "@/ui/molecules/notFound/NotFound";

import { PatientDetailsTab } from "../PatientDetails.types";
import { OrderCard } from "../orderCard/OrderCard";
import { PreviousMedOrdersProps } from "./PreviousMedOrders.types";

export const PreviousMedOrders = ({
  medOrders,
  isLoading,
  error,
  pagination,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PreviousMedOrdersProps) => {
  if (isLoading) {
    return <div className="p-4">Loading previous medication orders...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading previous medication orders
      </div>
    );
  }

  if (!medOrders || medOrders.length === 0) {
    return <NotFound text="No med orders found" />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Previous Medication Orders
        </h3>
        <span className="text-sm text-gray-600">
          {pagination?.total
            ? `Showing ${medOrders.length} of ${pagination.total} order${pagination.total !== 1 ? "s" : ""}`
            : `${medOrders.length} order${medOrders.length !== 1 ? "s" : ""} found`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {medOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={{ orderDetails: order, type: PatientDetailsTab.MedOrders }}
          />
        ))}
      </div>

      {pagination && (
        <>
          <div className="h-1 bg-gray-100 mt-4" />
          <div className="p-2">
            <Pagination
              count={pagination.lastPage}
              onChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              page={page}
              pageSize={pageSize}
            />
          </div>
        </>
      )}
    </div>
  );
};
