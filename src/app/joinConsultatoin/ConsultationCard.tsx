import { useState } from 'react';
import { Card, CardContent } from '@/ui/atoms/card/card';
import { Button } from '@/ui/atoms/button/Button';
import { Tabs } from '@/ui/atoms/tabs/Tabs';
import { ConsultationCardProps, ConsultationType } from './JoinConsultation.types';
import clsx from 'clsx';


type TabValue = 'past-consultations' | 'assessment';

export const ConsultationCard = ({ type }: ConsultationCardProps) => {
  const [activeTab, setActiveTab] = useState<TabValue>('past-consultations');
  const [selectedPastVisit, setSelectedPastVisit] = useState<'past-visit' | null>(null);
  const [diagnosisExpanded, setDiagnosisExpanded] = useState(false);
  const [medicationsExpanded, setMedicationsExpanded] = useState(false);
  const [patientHistoryExpanded, setPatientHistoryExpanded] = useState(false);
  const [followUpExpanded, setFollowUpExpanded] = useState(false);

  const isOnline = type === ConsultationType.Online;

  const tabs = [
    {
      label: 'Past Consultations',
      value: 'past-consultations' as TabValue,
      component: (
        <div className="p-4 space-y-3">
          {/* Past Visits Dropdown */}
          <div className="space-y-2">
            <button
              onClick={() => setSelectedPastVisit(selectedPastVisit ? null : 'past-visit')}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">Past visits</span>
              <svg
                className={clsx('w-4 h-4 transition-transform', selectedPastVisit && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Recent Visits */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 p-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
              <span className="font-medium">Recent Visits</span>
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 p-2 border-l-2 border-primary-600 bg-primary-50">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
              <span className="font-medium">Last Visit: 20pm</span>
              <span className="ml-auto text-xs">Sep 20</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 p-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
              <span className="font-medium">Moderation: 30pm</span>
              <span className="ml-auto text-xs">Sep 20</span>
            </div>
          </div>

          {/* Medications */}
          <div className="space-y-2">
            <button
              onClick={() => setMedicationsExpanded(!medicationsExpanded)}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-sm font-medium text-primary-600">Medications</span>
              </div>
              <svg
                className={clsx('w-4 h-4 transition-transform', medicationsExpanded && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {medicationsExpanded && (
              <div className="pl-4 space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span>Lisinopril 10mg</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span>Metformin 500mg</span>
                </div>
              </div>
            )}
          </div>

          {/* Patient History */}
          <div className="space-y-2">
            <button
              onClick={() => setPatientHistoryExpanded(!patientHistoryExpanded)}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-primary-600">Patient History</span>
              </div>
              <svg
                className={clsx('w-4 h-4 transition-transform', patientHistoryExpanded && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {patientHistoryExpanded && (
              <div className="pl-4 space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  </svg>
                  <span>Diabetes Type 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  </svg>
                  <span>Hypertension</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  </svg>
                  <span>Allergies: Penicillin</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      label: 'Assessment & Notes',
      value: 'assessment' as TabValue,
      component: (
        <div className="p-4 space-y-3">
          {/* Diagnosis */}
          <div className="space-y-2">
            <button
              onClick={() => setDiagnosisExpanded(!diagnosisExpanded)}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">Diagnosis</span>
              <svg
                className={clsx('w-4 h-4 transition-transform', diagnosisExpanded && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {diagnosisExpanded && (
              <div className="pl-4 text-sm text-gray-600">
                <p>Diabetes Mellitus</p>
              </div>
            )}
          </div>

          {/* Symptoms */}
          <div className="space-y-2">
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Symptoms:</p>
              <p className="text-sm text-gray-600">
                {isOnline ? 'Fatigue, Increased Thirst' : 'Headache, Elevated BP'}
              </p>
            </div>
          </div>

          {/* Prescriptions */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">Prescriptions</p>
            <Button variant="primary" className="w-full">
              + Add Medication
            </Button>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">
                    {isOnline ? 'Metformin 1000 mg' : 'Amlodipine 5 mg'}
                  </span>
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">
                {isOnline ? '1 tablet twice daily' : '1 tablet daily'}
              </p>
            </div>
            <button className="text-primary-600 text-sm font-medium flex items-center gap-1">
              <span>+</span>
              <span>Add Diagnosis</span>
            </button>
          </div>

          {/* Follow-Up */}
          <div className="space-y-2">
            <button
              onClick={() => setFollowUpExpanded(!followUpExpanded)}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">Follow-Up:</span>
              <svg
                className={clsx('w-4 h-4 transition-transform', followUpExpanded && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Save Button */}
          <Button variant="primary" className="w-full">
            Save & Complete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      {/* <CardHeader className="bg-secondary-600 text-white p-4 rounded-t-lg"> */}
        {/* <div className="flex items-center justify-between"> */}
          {/* <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
                </svg>
                <span className="text-sm font-medium">Audio Call</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Doctor</span>
              </>
            )}
          </div> */}
          <div className="flex items-center gap-3">
            {/* <button className="hover:bg-secondary-700 p-1 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button className="hover:bg-secondary-700 p-1 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </button> */}
            {isOnline && (
              <>
                <button className="hover:bg-secondary-700 p-1 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  </svg>
                </button>
                <button className="hover:bg-secondary-700 p-1 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </button>
                <button className="hover:bg-secondary-700 p-1 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        {/* </div> */}
      {/* </CardHeader> */}

      {/* Video/Image Section */}
      {/* <div className="relative bg-gray-100 aspect-video"> */}
       

      {/* Tabs Section */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <Tabs tabs={tabs} activeTab={activeTab} setTab={setActiveTab} containerClassName="h-full flex flex-col border-0" />
      </CardContent>
    </Card>
  );
};
