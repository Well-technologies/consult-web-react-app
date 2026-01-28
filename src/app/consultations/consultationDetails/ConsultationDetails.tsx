import { useState } from "react";
/* import { useTranslation } from "react-i18next"; */
import { ConsultationDetailsProps, ConsultationDetailsTab } from "./ConsultationDetails.types";
import { PatientDetailsCard } from "@/app/patientDetails/patientDetailsCard/PatientDetailsCard";
import { Tabs } from "@/ui/atoms/tabs/Tabs";
import { TabType } from "@/ui/atoms/tabs/Tabs.types";
import { useTranslation } from "react-i18next";
import { NotFound } from "@/ui/molecules/notFound/NotFound";
import { PrescriptionViewer } from "./PrescriptionViewer";
import { MedicationCard } from "@/ui/molecules/medicationCard";

export const ConsultationDetails = ({
  data,
  isLoading,
}: ConsultationDetailsProps) => {
  const { t } = useTranslation(); 
  const [activeTab, setActiveTab] = useState(ConsultationDetailsTab.Overview);

  // Use patient data from the consultation details for the card
  // The PatientDetailsCard expects 'data' prop which matches the structure of user details
  // We might need to map or ensure 'data.patient' fits 'PatientDetailsCardProps['data']'
  // Based on consult.types.ts, data.patient is ConsultUserDetails.
  // PatientDetailsCard uses PatientDetailsCardProps where data is likely ConsultUserDetails or similar.
  // Let's pass data.patient directly.

  /* Counts calculation */
  const labTestCount = data?.labTests?.length ?? 0;
  const medicationCount = data?.medications?.length ?? 0;
  
  // Actually, diagnosis usually refers to the list of diagnoses. Notes are extra. I will count items.
  const diagnosisItemCount = data?.diagnoses?.items?.length ?? 0;
  
  // Symptoms count
  const symptomItemCount = data?.symptoms?.items?.length ?? 0;

  const tabs: TabType<ConsultationDetailsTab>[] = [
    {
      value: ConsultationDetailsTab.Overview,
      label: "Overview", // TODO: Add translation key t("consultation.details.tab.overview")
      component: (
        <div className="w-fill-available h-[50vh] flex flex-col justify-center items-center gap-4 p-4">

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-4">
          <div 
            onClick={() => setActiveTab(ConsultationDetailsTab.LabTest)}
            className="p-4 border rounded-md shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-700">Lab Tests</h3>
            <span className="text-2xl font-bold text-primary">{labTestCount}</span>
          </div>
          <div 
            onClick={() => setActiveTab(ConsultationDetailsTab.Medications)}
            className="p-4 border rounded-md shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-700">Medications</h3>
            <span className="text-2xl font-bold text-primary">{medicationCount}</span>
          </div>
          <div 
            onClick={() => setActiveTab(ConsultationDetailsTab.Diagnosis)}
            className="p-4 border rounded-md shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-700">Diagnosis</h3>
            <span className="text-2xl font-bold text-primary">{diagnosisItemCount}</span>
          </div>
          <div 
            onClick={() => setActiveTab(ConsultationDetailsTab.Symptoms)}
            className="p-4 border rounded-md shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-700">Symptoms</h3>
            <span className="text-2xl font-bold text-primary">{symptomItemCount}</span>
          </div>
        </div>
        </div>
      ),
    },
    {
      value: ConsultationDetailsTab.Prescription,
      label: "Prescription", // TODO: Add translation key
      component: (
        <PrescriptionViewer url={data?.prescription} />
      ),
    },
    // {
    //   value: ConsultationDetailsTab.Notes,
    //   label: "Notes", // TODO: Add translation key
    //   component: <div>Notes Content Placeholder</div>,
    // },
    {
      value: ConsultationDetailsTab.LabTest,
      label: "Lab Test",
      component: (
        <div className="flex flex-col gap-4">
          {data?.labTests?.length ? (
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-4">
            {data.labTests.map((test, index) => (
              <div key={index} className="p-4 border text-sm rounded-md shadow-sm bg-white">
                {test.data.title}
              </div>
            ))}
          </div>
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              <NotFound text={t("global.text.notFound", { text: "Lab Tests" })} />
            </div>
          )}
        </div>
      ),
    },
    {
      value: ConsultationDetailsTab.Medications,
      label: "Medications",
      component: (
        <div>
          {data?.medications?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-4">
              {data.medications.map((med, index) => (
                <MedicationCard
                  key={index}
                  variant="simple"
                  name={med.medicineName}
                  dosage={med.dosage}
                  frequency={med.frequency}
                  timing={med.timing}
                  notes={med.notes}
                  schedules={med.schedules.map(s => ({ label: s.title, count: s.count }))}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              <NotFound text={t("global.text.notFound", { text: "Medications" })} />
            </div>
          )}
        </div>
      ),
    },
    {
      value: ConsultationDetailsTab.Diagnosis,
      label: "Diagnosis",
      component: (
        <div className="flex flex-col gap-4">
          {(data?.diagnoses?.items?.length ?? 0) > 0 || data?.diagnoses?.note ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-4">
          {data?.diagnoses?.items?.length && (  
            data.diagnoses.items.map((diagnosis, index) => (
              <div key={index} className="p-4 border text-sm rounded-md shadow-sm bg-white">
                {diagnosis.name}
              </div>
            ))
          )}
            {data?.diagnoses?.note && (
              <div>
                <h4 className="font-medium mb-1 text-gray-700">{t("consultation.details.notes")}</h4>
                <p className="text-gray-600">{data.diagnoses.note}</p>
              </div>
            )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              <NotFound text={t("global.text.notFound", { text: "Diagnosis" })} />
            </div>
          )}
        </div>
      ),
    },
    {
      value: ConsultationDetailsTab.Symptoms,
      label: "Symptoms",
      component: (
        <div className="flex flex-col gap-4">
          {(data?.symptoms?.items?.length ?? 0) > 0 || data?.symptoms?.note ? (
            <>
              {data?.symptoms?.items && data.symptoms.items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-4">
                    {data.symptoms.items.map((item) => (
                      <div key={item.id} className="p-4 border text-sm rounded-md shadow-sm bg-white">
                        {item.name}
                      </div>
                    ))}
                </div>
              )}
              {data?.symptoms?.note && (
                <div>
                  <h4 className="font-medium mb-1 text-gray-700">{t("consultation.details.notes")}</h4>
                  <p className="text-gray-600">{data.symptoms.note}</p>
                </div>
              )}
              </>
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              <NotFound text={t("global.text.notFound", { text: "Symptoms" })} />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col p-2 gap-2 sm:gap-4 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {/* Reuse PatientDetailsCard. 
            Note: We need to verify if data.patient matches what PatientDetailsCard expects.
            PatientDetailsCard expects 'data' prop.
        */}
        <PatientDetailsCard
          data={data?.patient}
          isLoading={isLoading}
        />
      </div>

      <Tabs 
        activeTab={activeTab} 
        setTab={setActiveTab} 
        tabs={tabs} 
        containerClassName="flex-1 overflow-hidden flex flex-col border-2 border-gray-100 rounded-lg"
      />
    </div>
  );
};
