import { Navigate, Route, Routes } from "react-router-dom";

// import { ClaimReportContainer } from "@/app/claimReport/ClaimReportContainer";
import { Sidebar } from "@/layout/sidebar/Sidebar";
// import { setCustomUserId } from "@/utils/Clarity/clarity";

import { AppRoute } from "./AppRoute.enum";
import { Dashboard } from "@/app/dashboard/Dashboard";
import { PatientsListContainer } from "../app/patients/PatientsListContainer";
import { PatientDetailsContainer } from "@/app/patientDetails/PatientDetailsContainer";
import { ConsultationsContainer } from "@/app/consultations/ConsultationsContainer";
import { AppointmentsContainer } from "@/app/appointments/AppointmentsContainer";
import { ConsultationDetailsContainer } from "@/app/consultations/consultationDetails/ConsultationDetailsContainer";
import { JoinConsultationContainer } from "@/app/joinConsultatoin/JoinConsultationContainer";



export const ProtectedRoutes = () => {
  
  // if (isFetchingUserDetails) {
  //   return <LogoLoader />;
  // }
  return (
    <Routes>
        <Route
        path={AppRoute.Dashboard}
          element={
          <>
            <Sidebar>
              <Dashboard />
            </Sidebar>
          </>
          }
        />
      <Route
        path={AppRoute.Consultations}
        element={
          <Sidebar>
            <ConsultationsContainer />
          </Sidebar>
        }
      />
      <Route
        path={AppRoute.ConsultationDetails}
        element={
          <Sidebar>
            <ConsultationDetailsContainer />
          </Sidebar>
        }
      />
      <Route
        path={AppRoute.Appointments}
        element={
          <Sidebar>
            <AppointmentsContainer />
          </Sidebar>
        }
      />
      <Route
        path={AppRoute.Patients}
        element={
          <Sidebar>
            <PatientsListContainer/>
          </Sidebar>
        }
      />
      <Route
        path={AppRoute.PatientDetails}
        element={
          <Sidebar>
            <PatientDetailsContainer/>
          </Sidebar>
        }
      />
      <Route
        path={AppRoute.JoinConsultation}
        element={
            <JoinConsultationContainer />
        }
      />
      
      <Route path="/" element={<Navigate to={AppRoute.Dashboard} replace />} />
      <Route path="*" element={<Navigate to={AppRoute.Dashboard} replace />} />
    </Routes>
  );
};