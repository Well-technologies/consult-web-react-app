import { useState } from "react";
/* import { useTranslation } from "react-i18next"; */
import { ConsultationDetailsProps, ConsultationDetailsTab } from "./ConsultationDetails.types";
import { PatientDetailsCard } from "@/app/patientDetails/patientDetailsCard/PatientDetailsCard";
import { Tabs } from "@/ui/atoms/tabs/Tabs";
import { TabType } from "@/ui/atoms/tabs/Tabs.types";

export const ConsultationDetails = ({
  data,
  isLoading,
}: ConsultationDetailsProps) => {
  /* const { t } = useTranslation(); */
  const [activeTab, setActiveTab] = useState(ConsultationDetailsTab.Overview);

  // Use patient data from the consultation details for the card
  // The PatientDetailsCard expects 'data' prop which matches the structure of user details
  // We might need to map or ensure 'data.patient' fits 'PatientDetailsCardProps['data']'
  // Based on consult.types.ts, data.patient is ConsultUserDetails.
  // PatientDetailsCard uses PatientDetailsCardProps where data is likely ConsultUserDetails or similar.
  // Let's pass data.patient directly.

  const tabs: TabType<ConsultationDetailsTab>[] = [
    {
      value: ConsultationDetailsTab.Overview,
      label: "Overview", // TODO: Add translation key t("consultation.details.tab.overview")
      component: <div>Overview Content Placeholder</div>,
    },
    {
      value: ConsultationDetailsTab.Prescription,
      label: "Prescription", // TODO: Add translation key
      component: <div>Prescription Content Placeholder</div>,
    },
    {
      value: ConsultationDetailsTab.Notes,
      label: "Notes", // TODO: Add translation key
      component: <div>Notes Content Placeholder</div>,
    },
    {
      value: ConsultationDetailsTab.LabTest,
      label: "Lab Test",
      component: (
        <div className="flex flex-col gap-4">
          {data?.labTests?.length ? (
            data.labTests.map((test, index) => (
              <div key={index} className="p-4 border rounded-md shadow-sm bg-white">
                {test.note && (
                  <p className="mb-2">
                    <strong>Note:</strong> {test.note}
                  </p>
                )}
                {test.data && (
                  <div className="bg-gray-50 p-2 rounded text-xs overflow-auto">
                    <pre>{JSON.stringify(test.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              No Lab Tests found.
            </div>
          )}
        </div>
      ),
    },
    {
      value: ConsultationDetailsTab.Medications,
      label: "Medications",
      component: (
        <div className="flex flex-col gap-4">
          {data?.medications?.length ? (
            data.medications.map((med, index) => (
              <div key={index} className="p-4 border rounded-md shadow-sm bg-white">
                <p className="font-semibold text-lg text-primary">
                  {med.medicineName}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                  <p>
                    <span className="font-medium text-gray-600">Dosage:</span>{" "}
                    {med.dosage}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Frequency:</span>{" "}
                    {med.frequency}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Duration:</span>{" "}
                    {med.duration}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Timing:</span>{" "}
                    {med.timing}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Route:</span>{" "}
                    {med.route}
                  </p>
                </div>
                {med.notes && (
                  <p className="mt-2 text-sm text-gray-600 border-t pt-2">
                    <strong>Notes:</strong> {med.notes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              No Medications found.
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
            <div className="p-4 border rounded-md shadow-sm bg-white">
              {data?.diagnoses?.items && data.diagnoses.items.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-gray-700">Diagnoses:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.diagnoses.items.map((item) => (
                      <li key={item.id} className="text-gray-800">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data?.diagnoses?.note && (
                <div>
                  <h4 className="font-medium mb-1 text-gray-700">Note:</h4>
                  <p className="text-gray-600">{data.diagnoses.note}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              No Diagnosis found.
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
            <div className="p-4 border rounded-md shadow-sm bg-white">
              {data?.symptoms?.items && data.symptoms.items.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-gray-700">Symptoms:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.symptoms.items.map((item) => (
                      <li key={item.id} className="text-gray-800">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data?.symptoms?.note && (
                <div>
                  <h4 className="font-medium mb-1 text-gray-700">Note:</h4>
                  <p className="text-gray-600">{data.symptoms.note}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 text-center bg-gray-50 rounded-md">
              No Symptoms found.
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col p-2 gap-2 sm:gap-4">
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

      <Tabs activeTab={activeTab} setTab={setActiveTab} tabs={tabs} />
    </div>
  );
};
