import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PastConsultationsList } from '../PastConsultations/PastConsultationsList';
// import { PastConsultation } from '../../JoinConsultation.types';
import { Tabs } from '@/ui/atoms/tabs/Tabs';
import { ConsultationDetails } from '@/api/consult/consult.types';

const LabOrders = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.labOrders')} Content</div>;
const MedOrders = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.medOrders')} Content</div>;
const HealthLogs = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.healthLogs')} Content</div>;
const HealthData = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.healthData')} Content</div>;
const HealthVault = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.healthVault')} Content</div>;
const MedicalHistoryTab = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.medicalHistory')} Content</div>;
const SurgicalHistoryTab = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.surgicalHistory')} Content</div>;
const HealthConditions = () => <div className="p-4">{useTranslation().t('joinConsultation.history.tabs.conditions')} Content</div>;

interface PatientHistoryProps {
  consultations: ConsultationDetails[];
}

enum PatientHistoryTab {
  PastConsultations = 'pastConsultations',
  LabOrders = 'labOrders',
  MedOrders = 'medOrders',
  HealthLogs = 'healthLogs',
  HealthData = 'healthData',
  HealthVault = 'healthVault',
  MedicalHistory = 'medicalHistory',
  SurgicalHistory = 'surgicalHistory',
  Conditions = 'conditions',
}

export const PatientHistory = ({ consultations }: PatientHistoryProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PatientHistoryTab>(PatientHistoryTab.PastConsultations);

  const tabs = [
    {
      label: t('joinConsultation.history.tabs.pastConsultations'),
      value: PatientHistoryTab.PastConsultations,
      component: <PastConsultationsList consultations={consultations} />,
    },
    {
      label: t('joinConsultation.history.tabs.labOrders'),
      value: PatientHistoryTab.LabOrders,
      component: <LabOrders />,
    },
    {
      label: t('joinConsultation.history.tabs.medOrders'),
      value: PatientHistoryTab.MedOrders,
      component: <MedOrders />,
    },
    {
      label: t('joinConsultation.history.tabs.healthLogs'),
      value: PatientHistoryTab.HealthLogs,
      component: <HealthLogs />,
    },
    {
      label: t('joinConsultation.history.tabs.healthData'),
      value: PatientHistoryTab.HealthData,
      component: <HealthData />,
    },
    {
      label: t('joinConsultation.history.tabs.healthVault'),
      value: PatientHistoryTab.HealthVault,
      component: <HealthVault />,
    },
    {
      label: t('joinConsultation.history.tabs.medicalHistory'),
      value: PatientHistoryTab.MedicalHistory,
      component: <MedicalHistoryTab />,
    },
    {
      label: t('joinConsultation.history.tabs.surgicalHistory'),
      value: PatientHistoryTab.SurgicalHistory,
      component: <SurgicalHistoryTab />,
    },
    {
      label: t('joinConsultation.history.tabs.conditions'),
      value: PatientHistoryTab.Conditions,
      component: <HealthConditions />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg font-bold text-[#333]">{t('joinConsultation.history.title')}</h3>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setTab={(value) => setActiveTab(value as PatientHistoryTab)}
        containerClassName="border-none"
        variant="chips"
      />
    </div>
  );
};
