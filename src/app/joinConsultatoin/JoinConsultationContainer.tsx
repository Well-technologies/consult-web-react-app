import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  useConfirmConsultation,
  useGetAllDiagnoses,
  useGetAllLabTests,
  useGetAllMedications,
  useGetAllSymptoms,
  useGetBookedConsultation,
  useGetConsultations,
} from "@/api/consult/consult";
import { useUpdateConsultationEndType } from "@/api/consult/consult";
import {
  AddMedicationProps,
  ClinicalCommonDataDetails,
  ConfirmConsultationBody,
  ConsultUserDetails,
  Medication,
} from "@/api/consult/consult.types";
import { CallEndedTypeId } from "@/api/consult/consult.types";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { calculateAge } from "@/utils/ageCalculator.utils";

import { JoinConsultation } from "./JoinConsultation";
import { PatientInfo } from "./JoinConsultation.types";
import { ConsultationEndTypeModal } from "./components/ConsultationEndTypeModal/ConsultationEndTypeModal";

export const JoinConsultationContainer = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { patientId } = useParams<{ patientId: string }>();
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });

  const {
    user: {
      profile: {
        userDetail: { id: doctorId },
      },
    },
  } = useSelector((rootState) =>
    allReducerStates(rootState as StoreReducerStateTypes)
  );

  const { data: consultationData, isLoading: isLoadingConsultationData } =
    useGetBookedConsultation({
      client: consultClient,
      params: {
        appointmentId: appointmentId!,
        patientId: patientId!,
        doctorId: doctorId!,
      },
      options: { enabled: !!appointmentId && !!patientId && !!doctorId },
    });

  // State for selections
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<
    ClinicalCommonDataDetails[]
  >([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<
    ClinicalCommonDataDetails[]
  >([]);
  const [selectedLabTests, setSelectedLabTests] = useState<
    ClinicalCommonDataDetails[]
  >([]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    age: "",
    appointmentId: "",
    patientId: "",
    avatar: "",
    patientConsultId: "",
  });

  // Search terms for suggestions
  const [diagnosisSearch, setDiagnosisSearch] = useState("");
  const [symptomSearch, setSymptomSearch] = useState("");
  const [labTestSearch, setLabTestSearch] = useState("");
  const [medicationSearch, setMedicationSearch] = useState("");

  // State for notes
  const [symptomNotes, setSymptomNotes] = useState("");
  const [diagnosesNotes, setDiagnosesNotes] = useState("");
  const [labTestNotes, setLabTestNotes] = useState("");
  const [medications, setMedications] = useState<AddMedicationProps[]>([]);
  const [showEndTypeModal, setShowEndTypeModal] = useState(false);

  // API hooks
  const { mutate: confirmConsultation, isPending: isConfirmingConsultation } =
    useConfirmConsultation();
  const { mutate: updateEndType, isPending: isUpdatingEndType } =
    useUpdateConsultationEndType();

  // Fetch suggestions
  const { data: diagnosesData, isLoading: isLoadingDiagnoses } =
    useGetAllDiagnoses({
      client: consultClient,
      params: { name: diagnosisSearch, take: 1000, page: 1 },
      options: { enabled: diagnosisSearch.length > 0 },
    });

  const { data: symptomsData, isLoading: isLoadingSymptoms } =
    useGetAllSymptoms({
      client: consultClient,
      params: { name: symptomSearch, take: 1000, page: 1 },
      options: { enabled: symptomSearch.length > 0 },
    });

  const { data: labTestsData, isLoading: isLoadingLabTests } =
    useGetAllLabTests({
      client: consultClient,
      params: { doctorId },
      options: { enabled: labTestSearch.length > 0 },
    });

  const { data: medicationsData, isLoading: isLoadingMedications } =
    useGetAllMedications({
      client: consultClient,
      params: { doctorId, title: medicationSearch },
      options: { enabled: medicationSearch.length > 0 },
    });

  //   const { data: pastConsultationsData } = useGetConsultations({
  //     client: consultClient,
  //     params: {
  //       patient: consultationData?.payload?.patient?.id,
  //       page: 1,
  //       take: 1000,
  //     },
  //     options: { enabled: !!consultationData?.payload?.patient?.id },
  //   });

  // console.log("selectedSymptoms", selectedSymptoms);

  useEffect(() => {
    console.log("consultationData", consultationData?.payload);
    if (!consultationData?.payload) return;
    const { patient, consultationId, doctor } = consultationData?.payload;
    const patientInfo: PatientInfo = {
      name: patient?.name,
      age: patient?.dob ? calculateAge(patient?.dob) : "",
      appointmentId: consultationId.toString() || "",
      patientId: patient.lead_id?.toString() || "",
      avatar: patient?.profilePicture || "",
      patientConsultId: patient?.id.toString() || "",
    };
    setPatientInfo(patientInfo);
  }, [isLoadingConsultationData]);

  const handleSave = () => {
    setShowEndTypeModal(true);
  };

  const handleEndTypeSelect = (typeId: CallEndedTypeId) => {
    if (!consultationData?.payload?.id) return;

    const updateBody = { callEndedTypeId: typeId };

    updateEndType({
      client: consultClient,
      consultationId: consultationData?.payload?.id,
      body: updateBody,
    });

    const prescriptionBody: ConfirmConsultationBody = {
      labTests: selectedLabTests.map((test) => ({
        data: test,
        note: labTestNotes,
      })),
      medications: (medications as Medication[]).map((med) => ({
        medicineId: med.medicineId,
        medicineName: med.medicineName,
        dosage: med.dosage,
        duration: med.duration,
        frequency: med.frequency,
        notes: med.notes,
        route: "",
        timing: med.timing,
        schedules: med.schedules,
      })),
      diagnoses: {
        items: selectedDiagnoses,
        note: diagnosesNotes,
      },
      symptoms: {
        items: selectedSymptoms,
        note: symptomNotes,
      },
      allergies: {
        items: [], // Not handled in UI yet
        note: "",
      },
      medPreFiles: [],
      package_id: consultationData.payload.patient.lead_pkg_id || 0,
      placeLabOrder: true,
      placeMedOrder: true,
    };

    console.log("prescriptionBody", prescriptionBody);

    confirmConsultation(
      {
        client: consultClient,
        consultationId: consultationData?.payload?.id,
        body: prescriptionBody,
      },
      {
        onSuccess: () => {
          setShowEndTypeModal(false);
          navigate(AppRoute.Consultations);
          // navigation or success alert could go here
        },
      }
    );
  };

  const handleAddMedication = () => {
    const newMedication: AddMedicationProps = {
      medicineId: Date.now().toString(),
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      schedules: [],
      timing: "",
      notes: "",
      route: "",
      isEditing: true,
      isNew: true,
    };
    setMedications([...medications, newMedication]);
  };

  console.log("consultation", consultationData?.payload.doctor);

  return (
    <>
      <JoinConsultation
        patientInfo={patientInfo}
        onSave={handleSave}
        onAddMedication={handleAddMedication}
        diagnoses={selectedDiagnoses}
        onDiagnosesChange={setSelectedDiagnoses}
        diagnosisSuggestions={diagnosesData?.payload || []}
        onDiagnosisSearch={setDiagnosisSearch}
        isLoadingDiagnoses={isLoadingDiagnoses}
        symptoms={selectedSymptoms}
        onSymptomsChange={setSelectedSymptoms}
        symptomSuggestions={symptomsData?.payload || []}
        onSymptomSearch={setSymptomSearch}
        isLoadingSymptoms={isLoadingSymptoms}
        symptomNotes={symptomNotes}
        onSymptomNotesChange={setSymptomNotes}
        diagnosesNotes={diagnosesNotes}
        onDiagnosesNotesChange={setDiagnosesNotes}
        labTests={selectedLabTests}
        onLabTestsChange={setSelectedLabTests}
        labTestSuggestions={
          labTestsData?.payload.map(
            (item) =>
              ({
                id: item.id.toString(),
                name: item.title,
                createdAt: item.created_at,
                updatedAt: item.updated_at,
              }) as ClinicalCommonDataDetails
          ) || []
        }
        onLabTestSearch={setLabTestSearch}
        isLoadingLabTests={isLoadingLabTests}
        labTestNotes={labTestNotes}
        onLabTestNotesChange={setLabTestNotes}
        medications={medications}
        onMedicationsChange={setMedications}
        medicationSuggestions={
          medicationsData?.payload.map(
            (item) =>
              ({
                id: item.id.toString(),
                name: item.medication_name,
                createdAt: item.created_at,
                updatedAt: item.updated_at,
              }) as ClinicalCommonDataDetails
          ) || []
        }
        onMedicationSearch={setMedicationSearch}
        isLoadingMedications={isLoadingMedications}
        doctorId={doctorId}
      />
      <ConsultationEndTypeModal
        isOpen={showEndTypeModal}
        onClose={() => setShowEndTypeModal(false)}
        onSelect={handleEndTypeSelect}
        isOnline={false} // This should be dynamic based on consultation data if available
        isLoading={isConfirmingConsultation || isUpdatingEndType}
      />
    </>
  );
};
