import { ServiceConfigType } from "@/api/index.types";
import { useGetMedOrderHistory } from "@/api/orders/orders";
import { MedicineOrderDetails } from "@/api/orders/orders.types";
import { useClient } from "@/hooks/useClient/useClient";

type PastMedOrderProps = {
  patientId: string;
  doctorId: number;
};

const MedOrderCard = ({ order }: { order: MedicineOrderDetails }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Order #{order.id}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-2">
        {new Date(order.order_date).toLocaleDateString()}
      </div>

      {/* Medication Items */}
      {order.orderItems && order.orderItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {order.orderItems.map((item, index) => (
            <span
              key={item.id || index}
              className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-100"
            >
              {item.medication_title} (Qty: {item.quantity})
            </span>
          ))}
        </div>
      )}

      {/* Prescription Note */}
      {order.prescription_text && (
        <div className="border-t pt-2 mt-2">
          <p className="text-xs text-gray-600 italic">
            <strong>Prescription:</strong> {order.prescription_text}
          </p>
        </div>
      )}
    </div>
  );
};

export const PastMedOrdersList = ({
  patientId,
  doctorId,
}: PastMedOrderProps) => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const { data, isLoading, error } = useGetMedOrderHistory({
    client: consultClient,
    params: {
      patientId,
      doctorId,
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-gray-600">Loading medication orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-500 font-medium">
          Error loading medication orders
        </div>
        <p className="text-sm text-gray-600 mt-1">Please try again later</p>
      </div>
    );
  }

  if (!data?.payload?.length) {
    return (
      <div className="text-center">
        <div className="text-gray-500 font-medium">
          No medication orders found
        </div>
        <p className="text-sm text-gray-600 mt-1">
          This patient has no previous medication orders
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Past Medication Orders
          </h3>
          <span className="text-sm text-gray-600">
            {data.payload.length} order{data.payload.length !== 1 ? "s" : ""}{" "}
            found
          </span>
        </div>

        {data.payload.map((order) => (
          <MedOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
