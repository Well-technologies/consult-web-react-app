import {
  MedicineOrderDetails,
  ClinicalOrderDetails,
} from "@/api/orders/orders.types";

import { PatientDetailsTab } from "../PatientDetails.types";

export type OrderCardProps = {
  order:
    | {
        type: PatientDetailsTab.MedOrders;
        orderDetails: MedicineOrderDetails;
      }
    | {
        type: PatientDetailsTab.LabOrders;
        orderDetails: ClinicalOrderDetails;
      };
};
