import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Tabs } from "@/ui/atoms/tabs/Tabs";
import { TabType } from "@/ui/atoms/tabs/Tabs.types";

import { Consultations } from "../consultations/Consultations";
import { PatientDetailsProps, PatientDetailsTab } from "./PatientDetails.types";
import { HealthVaultContainer } from "./healthVault/HealthVaultContainer";
import { PatientDetailsCard } from "./patientDetailsCard/PatientDetailsCard";
import { PreviousLabOrdersContainer } from "./previousLabOrders/PreviousLabOrdersContainer";
import { PreviousMedOrdersContainer } from "./previousMedOrders/PreviousMedOrdersContainer";

// import { UsersData } from "./usersData/UsersData";

export const PatientDetails = ({
  data,
  consultations,
  medOrders,
  isLoading,
  ...props
}: PatientDetailsProps) => {
  const [activeTab, setActiveTab] = useState(PatientDetailsTab.Consultations);
  const { t } = useTranslation();

  const tabs: TabType<PatientDetailsTab>[] = [
    {
      value: PatientDetailsTab.Consultations,
      label: t("patient.details.tab.consultations"),
      component: (
        <Consultations
          data={consultations}
          meta={null}
          isLoading={isLoading}
          isConsultationsRoute={false}
          isPatientDetailsRoute={true}
          page={1}
          pageSize={10}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
        />
      ),
    },
    {
      value: PatientDetailsTab.HealthVault,
      label: t("patient.details.tab.health_vault"),
      component: <HealthVaultContainer patientId={data?.lead_id} />,
    },
    {
      value: PatientDetailsTab.LabOrders,
      label: t("patient.details.tab.lab_orders"),
      component: <PreviousLabOrdersContainer patientId={data?.lead_id} />,
    },
    {
      value: PatientDetailsTab.MedOrders,
      label: t("patient.details.tab.med_orders"),
      component: <PreviousMedOrdersContainer patientId={data?.lead_id} />,
    },
  ];

  return (
    <div className="flex flex-col p-2 gap-2 sm:gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <PatientDetailsCard
          data={data}
          isLoading={isLoading}
          {...props}
        />
      </div>

      <Tabs activeTab={activeTab} setTab={setActiveTab} tabs={tabs} />
    </div>
  );
};
