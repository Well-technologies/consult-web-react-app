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
  const [hoveredTab, setHoveredTab] = useState<boolean>(false);

  const tabs = [
    {
      label: t("joinConsultation.history.tabs.pastConsultations"),
      value: PatientHistoryTab.PastConsultations,
      component: <PastConsultationsList patientId={patientConsultId} />,
      tabValue: "C",
    },
    {
      label: t("joinConsultation.history.tabs.labOrders"),
      value: PatientHistoryTab.LabOrders,
      component: (
        <PastLabOrdersList patientId={patientId} doctorId={doctorId} />
      ),
      tabValue: "L",
    },
    {
      label: t("joinConsultation.history.tabs.medOrders"),
      value: PatientHistoryTab.MedOrders,
      component: (
        <PastMedOrdersList patientId={patientId} doctorId={doctorId} />
      ),
      tabValue: "M",
    },
    {
      label: t("joinConsultation.history.tabs.healthLogs"),
      value: PatientHistoryTab.HealthLogs,
      component: <HealthLogs patientId={patientId} doctorId={doctorId} />,
      tabValue: "H",
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
      tabValue: "V",
    },
    {
      label: t("joinConsultation.history.tabs.medicalHistory"),
      value: PatientHistoryTab.MedicalHistory,
      component: <MedicalHistory patientId={patientId} />,
      tabValue: "D",
    },
    {
      label: t("joinConsultation.history.tabs.surgicalHistory"),
      value: PatientHistoryTab.SurgicalHistory,
      component: <SurgicalHistory patientLeadId={patientId} />,
      tabValue: "S",
    },
    {
      label: t("joinConsultation.history.tabs.conditions"),
      value: PatientHistoryTab.Conditions,
      component: (
        <HealthConditionsAndTopics patientId={patientId} doctorId={doctorId} />
      ),
      tabValue: "T",
    },
  ];

  const activeTabComponent = tabs.find(
    (tab) => tab.value === activeTab
  )?.component;

  return (
    <div className="flex flex-col h-screen space-y-4 md:space-y-6">
      <h3 className="text-lg font-bold text-[#333] flex-shrink-0">
        {t("joinConsultation.history.title")}
      </h3>
      <div className={`flex-1 flex flex-row overflow-hidden gap-6`}>
        {/* Left Column - Tab Headers */}
        <div
          className={`flex-shrink-0 bg-gray-50 rounded-lg transition-all duration-200 ${hoveredTab ? "w-64" : "w-10"}`}
          onMouseEnter={() => setHoveredTab(true)}
          onMouseLeave={() => setHoveredTab(false)}
        >
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setHoveredTab(false);
                }}
                onMouseEnter={() => setHoveredTab(true)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {hoveredTab === true ? tab.label : tab.tabValue}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Tab Content */}
        <div className={`flex-1 ${hoveredTab ? "hidden" : ""}`}>
          <div className="h-full overflow-y-auto">{activeTabComponent}</div>
        </div>
      </div>
    </div>
  );
};
