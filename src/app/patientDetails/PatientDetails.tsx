import { useTranslation } from "react-i18next";


import { PatientDetailsProps, PatientDetailsTab } from "./PatientDetails.types";
import { TabType } from "@/ui/atoms/tabs/Tabs.types";
import { Tabs } from "@/ui/atoms/tabs/Tabs";
import { useState } from "react";
import { PatientDetailsCard } from "./patientDetailsCard/PatientDetailsCard";
import { Consultations } from "../consultations/Consultations";
// import { UsersData } from "./usersData/UsersData";

export const PatientDetails = ({
  // openAddNewModal,
  data,
  consultations,
  // openFilter,
  isLoading,
  // openAndCloseFilter,
  ...props
}: PatientDetailsProps) => {
  
  const [activeTab, setActiveTab] = useState(PatientDetailsTab.Consultations);
  const { t } = useTranslation();


  const tabs: TabType<PatientDetailsTab>[] = [
    {
      value: PatientDetailsTab.Consultations,
      label: t("patient.details.tab.consultations"),
      component: (
        <Consultations data={consultations} isLoading={isLoading}  />
      ),
    },
    {
      value: PatientDetailsTab.HealthVault,
      label: t("patient.details.tab.health_vault"),
      component: <>Health Vault</>
      // <TransactionData {...transactionForm} {...props}
      //  />,
    },
  ];

  return (
    <div className="flex flex-col p-2 gap-2 sm:gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <PatientDetailsCard
          data={data}
          // claimFeatures={claimFeatures}
          // onOpenUserModal={onOpenUserModal}
          isLoading={isLoading}
          {...props}        />
        {/* <ClaimBalanceDetailsCard isLoading={isLoadingEmployeeData} {...props} /> */}
      </div>

      <Tabs activeTab={activeTab} setTab={setActiveTab} tabs={tabs} />
    </div>  );
};
