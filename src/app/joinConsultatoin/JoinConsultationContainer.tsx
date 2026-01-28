import { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { JoinConsultation } from "./JoinConsultation";
import { PatientInfo, PastConsultation, Prescription } from "./JoinConsultation.types";
import { useConfirmConsultation, useGetAllDiagnoses, useGetAllLabTests, useGetAllSymptoms, useGetBookedConsultation } from '@/api/consult/consult';
import { useClient } from '@/hooks/useClient/useClient';
import { ServiceConfigType } from '@/api/index.types';
import { ClinicalCommonDataDetails, ConfirmConsultationBody } from '@/api/consult/consult.types';
import { StoreReducerStateTypes } from '@/store/store.types';
import { allReducerStates } from '@/store/store.utils';
import { useSelector } from 'react-redux';
import { useUpdateConsultationEndType } from '@/api/consult/consult';
import { CallEndedTypeId } from '@/api/consult/consult.types';
import { ConsultationEndTypeModal } from './components/ConsultationEndTypeModal';
import { calculateAge } from '@/utils/ageCalculator.utils';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/routing/AppRoute.enum';

export const JoinConsultationContainer: FC = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const { patientId } = useParams<{ patientId: string }>();
    const consultClient = useClient({ serviceConfigType: ServiceConfigType.Consult });

    const { user: { profile: { userDetail: { id: doctorId } } } } = useSelector((rootState) =>
        allReducerStates(rootState as StoreReducerStateTypes)
    );

    const { data: consultationData, isLoading: isLoadingConsultationData } = useGetBookedConsultation({
        client: consultClient,
        params: { appointmentId: appointmentId!, patientId: patientId!, doctorId: doctorId! },
        options: { enabled: !!appointmentId && !!patientId && !!doctorId }
    });

    // State for selections
    const [selectedDiagnoses, setSelectedDiagnoses] = useState<ClinicalCommonDataDetails[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<ClinicalCommonDataDetails[]>([]);
    const [selectedLabTests, setSelectedLabTests] = useState<ClinicalCommonDataDetails[]>([]);
    const [patientInfo, setPatientInfo] = useState<PatientInfo>({
        name: "",
        age: "",
        appointmentId: "",
        patientId: "",
        date: ""
    });

    // Search terms for suggestions
    const [diagnosisSearch, setDiagnosisSearch] = useState('');
    const [symptomSearch, setSymptomSearch] = useState('');
    const [labTestSearch, setLabTestSearch] = useState('');

    // State for notes
    const [symptomNotes, setSymptomNotes] = useState('');
    const [diagnosesNotes, setDiagnosesNotes] = useState('');
    const [labTestNotes, setLabTestNotes] = useState('');
    const [medications, setMedications] = useState<Prescription[]>([]);
    const [showEndTypeModal, setShowEndTypeModal] = useState(false);

    // API hooks
    const { mutate: confirmConsultation, isPending: isConfirmingConsultation } = useConfirmConsultation();
    const { mutate: updateEndType, isPending: isUpdatingEndType } = useUpdateConsultationEndType();

    // Fetch suggestions
    const { data: diagnosesData, isLoading: isLoadingDiagnoses } = useGetAllDiagnoses({
        client: consultClient,
        params: { name: diagnosisSearch, take: 1000, page: 1 },
        options: { enabled: diagnosisSearch.length > 0 }
    });

    const { data: symptomsData, isLoading: isLoadingSymptoms } = useGetAllSymptoms({
        client: consultClient,
        params: { name: symptomSearch, take: 1000, page: 1 },
        options: { enabled: symptomSearch.length > 0 }
    });

    const { data: labTestsData, isLoading: isLoadingLabTests } = useGetAllLabTests({
        client: consultClient,
        params: { doctorId },
        options: { enabled: labTestSearch.length > 0 }
    });

    // console.log("selectedSymptoms", selectedSymptoms);


    useEffect(() => {
        console.log('consultationData', consultationData?.payload);
        if (!consultationData?.payload) return;
        const { patient, consultationId, } = consultationData?.payload;
        // Mock data based on the provided image
        const patientInfo: PatientInfo = {
            name: patient?.name,
            age: patient?.dob ? calculateAge(patient?.dob) : "",
            appointmentId: consultationId.toString() || "",
            patientId: patient.lead_id?.toString() || "",
            date: "Tuesday, January 27, 2026"
        };
        setPatientInfo(patientInfo);
    }, [isLoadingConsultationData]);

    // console.log("user", user);
    // console.log("userId", labTestsData, isLoadingLabTests);

    const pastConsultations: PastConsultation[] = [
        {
            id: "1",
            type: "History & Notes",
            date: "Jan 20, 2026",
            content: "Flu-like symptoms, Amoxicillin prescribed",
            hasCurrentRx: true
        },
        {
            id: "2",
            type: "Previous Medications",
            date: "Jan 20, 2026",
            content: "Amlodipine 5mg - 1 tab daily",
            hasCurrentRx: true
        },
        {
            id: "3",
            type: "Previous Medications",
            date: "Jan 20, 2026",
            content: "Amlodipine 5mg - 1 tab daily",
            hasCurrentRx: true
        }
    ];

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

        const prescriptionBody : ConfirmConsultationBody = {
            labTests: selectedLabTests.map(test => ({
                data: test,
                note: labTestNotes
            })),
            medications: medications.map(med => ({
                medicineId: med.id,
                medicineName: med.medicationName,
                dosage: med.dosage,
                duration: med.noOfDays,
                frequency: med.frequency,
                notes: med.notes,
                route: '',
                timing: med.timing,
                schedules: Object.entries(med.schedule).map(([key, count]) => ({
                    id: key,
                    title: key.charAt(0).toUpperCase() + key.slice(1),
                    count,
                    status: count > 0
                }))
            })),
            diagnoses: {
                items: selectedDiagnoses,
                note: diagnosesNotes
            },
            symptoms: {
                items: selectedSymptoms,
                note: symptomNotes
            },
            allergies: {
                items: [], // Not handled in UI yet
                note: ''
            },
            medPreFiles: [],
            package_id: consultationData.payload.patient.lead_pkg_id || 0,
            placeLabOrder: true,
            placeMedOrder: true,
        };

        console.log("prescriptionBody", prescriptionBody);

        confirmConsultation({
            client: consultClient,
            consultationId: consultationData?.payload?.id,
            body: prescriptionBody
        }, {
            onSuccess: () => {
                setShowEndTypeModal(false);
                navigate(AppRoute.Consultations);
                // navigation or success alert could go here
            }
        });
    };

    const handleAddMedication = () => {
        const newPrescription: Prescription = {
            id: Date.now().toString(),
            medicationName: '',
            dosage: '',
            dosageUnit: 'mg',
            frequency: '',
            noOfDays: '',
            schedule: {
                morning: 0,
                afternoon: 0,
                evening: 0,
                night: 0,
                ifNecessary: 0,
                everyOtherDay: 0
            },
            timing: '',
            notes: '',
            isEditing: true,
            isNew: true
        };
        setMedications([...medications, newPrescription]);
    };



    return (
        <>
            <JoinConsultation
                patientInfo={patientInfo}
                pastConsultations={pastConsultations}
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
                labTestSuggestions={labTestsData?.payload.map((item) => ({
                    id: item.id.toString(),
                    name: item.title,
                    createdAt: item.created_at,
                    updatedAt: item.updated_at,
                } as ClinicalCommonDataDetails)) || []}
                onLabTestSearch={setLabTestSearch}
                isLoadingLabTests={isLoadingLabTests}
                labTestNotes={labTestNotes}
                onLabTestNotesChange={setLabTestNotes}
                medications={medications}
                onMedicationsChange={setMedications}
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