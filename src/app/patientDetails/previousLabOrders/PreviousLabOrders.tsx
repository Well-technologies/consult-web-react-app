import Input from "@/ui/atoms/input/input";
import { Pagination } from "@/ui/atoms/pagination/Pagination";
import { NotFound } from "@/ui/molecules/notFound/NotFound";

import { PatientDetailsTab } from "../PatientDetails.types";
import { OrderCard } from "../orderCard/OrderCard";
import { PreviousLabOrdersProps } from "./PreviousLabOrders.types";

export const PreviousLabOrders = ({
  labOrders,
  isLoading,
  error,
  pagination,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PreviousLabOrdersProps) => {
  console.log("labOrders:", labOrders);
  if (isLoading) {
    return <div className="p-4">Loading previous lab orders...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading previous lab orders</div>
    );
  }

  if (!labOrders || labOrders.length === 0) {
    return <NotFound text="No lab orders found" />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Previous Lab Orders
        </h3>
        <Input
          className="w-80"
          placeholder="Search previous lab orders using tests"
          search
        />
        <span className="text-sm text-gray-600">
          {pagination?.total
            ? `Showing ${labOrders.length} of ${pagination.total} order${pagination.total !== 1 ? "s" : ""}`
            : `${labOrders.length} order${labOrders.length !== 1 ? "s" : ""} found`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={{ orderDetails: order, type: PatientDetailsTab.LabOrders }}
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
