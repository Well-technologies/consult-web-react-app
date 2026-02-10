import { ServiceConfigType } from "@/api/index.types";
import { useGetLabOrderHistory } from "@/api/orders/orders";
import { useClient } from "@/hooks/useClient/useClient";

type LabOrdersProps = {
  patientId: string;
  doctorId: number;
};

export const PastLabOrdersList = ({ patientId, doctorId }: LabOrdersProps) => {
  const client = useClient({ serviceConfigType: ServiceConfigType.Consult });

  const { data, isLoading, error } = useGetLabOrderHistory({
    client,
    params: {
      patientId,
      doctorId,
    },
  });

  console.log("useGetLabOrderHistory data: ", data);

  if (isLoading) {
    return <div className="p-4">Loading lab orders...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading lab orders</div>;
  }

  if (!data?.payload?.length) {
    return <div className="p-4 text-gray-500">No lab orders found</div>;
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Past Lab Orders
          </h3>
          <span className="text-sm text-gray-600">
            {data.payload.length} order{data.payload.length !== 1 ? "s" : ""}{" "}
            found
          </span>
        </div>
        {data.payload?.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Order #{order.id}
              </span>
              {/* <span
                className={`text-xs px-2 py-1 rounded-full ${
                  order.order_status_label === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.order_status_label}
              </span> */}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {new Date(order.order_date).toLocaleDateString()} • {order.type}
            </div>
            <div className="flex flex-wrap gap-2">
              {order.orderItems?.map((item, index) => (
                <span
                  key={index}
                  className="bg-red-50 text-[#e32933] px-3 py-1.5 rounded-full text-xs font-bold border border-red-100"
                >
                  {item.report_title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
