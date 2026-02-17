import { PatientDetailsTab } from "../PatientDetails.types";
import { OrderCardProps } from "./OrderCard.types";

export const OrderCard = ({ order }: OrderCardProps) => {
  const isMedOrder = order.type === PatientDetailsTab.MedOrders;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col justify-between">
          <div className="text-sm font-medium text-gray-600">
            Order #{order.orderDetails.id}
          </div>
          <div className="text-xs text-gray-500">
            <span>
              {new Date(order.orderDetails.order_date).toLocaleDateString()}
            </span>
          </div>
        </div>

        {isMedOrder ? (
          <div className="grid auto-cols-max grid-flow-col gap-1">
            {order.orderDetails.prescriptiondata &&
              order.orderDetails.prescriptiondata.length > 0 &&
              order.orderDetails.prescriptiondata.map((prescription, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded border overflow-hidden"
                >
                  <img
                    src={prescription?.prescription_url}
                    alt="Prescription"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid auto-cols-max grid-flow-col gap-1">
            {order.orderDetails.prescription &&
              order.orderDetails.prescription.length > 0 &&
              order.orderDetails.prescription.map((prescription, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded border overflow-hidden"
                >
                  <img
                    src={prescription.prescription_url}
                    alt="Prescription"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {isMedOrder &&
        order.orderDetails.orderitem &&
        order.orderDetails.orderitem?.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-700 mb-2">
              Medications ({order.orderDetails.orderitem.length}):
            </div>
            <div className="flex flex-wrap gap-1">
              {order.orderDetails.orderitem.map((item, index) => (
                <span
                  key={index}
                  className="bg-red-50 text-[#e32933] px-2 py-1 rounded-full text-xs font-medium border border-red-100"
                >
                  {`${item?.medication?.title} x ${item.quantity}`}
                </span>
              ))}
              {order.orderDetails.prescription_text && (
                <span className="bg-red-50 text-[#e32933] px-2 py-1 rounded-full text-xs font-medium border border-red-100">
                  {`${order.orderDetails.prescription_text}`}
                </span>
              )}
            </div>
          </div>
        )}

      {!isMedOrder &&
        order.orderDetails.selected_reports &&
        order.orderDetails.selected_reports.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-700 mb-2">
              Tests ({order.orderDetails.selected_reports.length}):
            </div>
            <div className="flex flex-wrap gap-1">
              {order.orderDetails.selected_reports.map((item, index) => (
                <span
                  key={index}
                  className="bg-red-50 text-[#e32933] px-2 py-1 rounded-full text-xs font-medium border border-red-100"
                >
                  {item.title}
                </span>
              ))}
              {order.orderDetails.prescription_text && (
                <span className="bg-red-50 text-[#e32933] px-2 py-1 rounded-full text-xs font-medium border border-red-100">
                  {`${order.orderDetails.prescription_text}`}
                </span>
              )}
            </div>
          </div>
        )}

      {order.orderDetails.prescription_note && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 text-ellipsis">
            Note: {order.orderDetails.prescription_note}
          </span>
        </div>
      )}

      {/* {!isMedOrder && order.lab_partner_id && (
        <div className="mt-3 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Lab Partner: {order.lab_partner_name}
          </span>
        </div>
      )} */}
    </div>
  );
};
