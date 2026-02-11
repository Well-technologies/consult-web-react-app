import { useState } from "react";
import { useTranslation } from "react-i18next";

// import { PastConsultation } from '../../JoinConsultation.types';
import { Tabs } from "@/ui/atoms/tabs/Tabs";

import { HealthConditionsAndTopics } from "./HealthConditionsAndTopics/HealthConditionsAndTopics";
import { HealthLogs } from "./HealthLogs/HealthLogs";
import { HealthVault } from "./HealthVault/HealthVault";
import { MedicalHistory } from "./MedicalHistory/MedicalHistory";
import { PastConsultationsList } from "./PastConsultations/PastConsultationsList";
import { PastLabOrdersList } from "./PastLabOrders/PastLabOrdersList";
import { PastMedOrdersList } from "./PastMedOrders/PastMedOrderList";
import { PatientHistoryProps, PatientHistoryTab } from "./PatientHistory.types";
import { SurgicalHistory } from "./SurgicalHistory/SurgicalHistory";

// const HealthData = () => (
//   <div className="p-4">
//     {useTranslation().t("joinConsultation.history.tabs.healthData")} Content
//   </div>
// );

export const PatientHistory = ({
  patientId,
  doctorId,
  patientConsultId,
}: PatientHistoryProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PatientHistoryTab>(
    PatientHistoryTab.PastConsultations
  );

  const tabs = [
    {
      label: t("joinConsultation.history.tabs.pastConsultations"),
      value: PatientHistoryTab.PastConsultations,
      component: <PastConsultationsList patientId={patientConsultId} />,
    },
    {
      label: t("joinConsultation.history.tabs.labOrders"),
      value: PatientHistoryTab.LabOrders,
      component: (
        <PastLabOrdersList patientId={patientId} doctorId={doctorId} />
      ),
    },
    {
      label: t("joinConsultation.history.tabs.medOrders"),
      value: PatientHistoryTab.MedOrders,
      component: (
        <PastMedOrdersList patientId={patientId} doctorId={doctorId} />
      ),
    },
    {
      label: t("joinConsultation.history.tabs.healthLogs"),
      value: PatientHistoryTab.HealthLogs,
      component: <HealthLogs patientId={patientId} doctorId={doctorId} />,
    },
    // {
    //   label: t("joinConsultation.history.tabs.healthData"),
    //   value: PatientHistoryTab.HealthData,
    //   component: <HealthData />,
    // },
    {
      label: t("joinConsultation.history.tabs.healthVault"),
      value: PatientHistoryTab.HealthVault,
      component: <HealthVault patientId={patientId} />,
    },
    {
      label: t("joinConsultation.history.tabs.medicalHistory"),
      value: PatientHistoryTab.MedicalHistory,
      component: <MedicalHistory patientId={patientId} />,
    },
    {
      label: t("joinConsultation.history.tabs.surgicalHistory"),
      value: PatientHistoryTab.SurgicalHistory,
      component: <SurgicalHistory patientLeadId={patientId} />,
    },
    {
      label: t("joinConsultation.history.tabs.conditions"),
      value: PatientHistoryTab.Conditions,
      component: (
        <HealthConditionsAndTopics patientId={patientId} doctorId={doctorId} />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-screen space-y-4 md:space-y-6">
      <h3 className="text-lg font-bold text-[#333] flex-shrink-0">
        {t("joinConsultation.history.title")}
      </h3>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setTab={(value) => setActiveTab(value as PatientHistoryTab)}
          containerClassName="border-none flex-1 flex flex-col overflow-hidden"
          variant="chips"
        />
      </div>
    </div>
  );
};
