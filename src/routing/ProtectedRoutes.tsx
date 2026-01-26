import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { useGetConsultUserByIdDetails, useGetProfile } from "@/api/user/user";
// import { ClaimReportContainer } from "@/app/claimReport/ClaimReportContainer";
import { useClient } from "@/hooks/useClient/useClient";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { onConsultUserDetailsFetch, onProfileFetch } from "@/store/userReducer/userReducer";
import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
// import { setCustomUserId } from "@/utils/Clarity/clarity";

import { AppRoute } from "./AppRoute.enum";
import { ServiceConfigType } from "@/api/index.types";
import { Dashboard } from "@/app/dashboard/Dashboard";
import { PatientsListContainer } from "../app/patients/PatientsListContainer";
import { PatientDetailsContainer } from "@/app/patientDetails/PatientDetailsContainer";
import { ConsultationsContainer } from "@/app/consultations/ConsultationsContainer";
import { AppointmentsContainer } from "@/app/appointments/AppointmentsContainer";
import { ConsultationDetailsContainer } from "@/app/consultations/consultationDetails/ConsultationDetailsContainer";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { createSelector } from "@reduxjs/toolkit";
import { JoinConsultationContainer } from "@/app/joinConsultatoin/JoinConsultationContainer";

const selectLeadId = createSelector(
  [(rootState: StoreReducerStateTypes) => 
    allReducerStates(rootState).user.userDetails.lead_id],
  (leadId) => leadId
);

export const ProtectedRoutes = () => {
  const client = useClient({ serviceConfigType: ServiceConfigType.Core });
  const consultClient = useClient({ serviceConfigType: ServiceConfigType.Consult });
  
  const dispatch = useDispatch();
  const leadId = useSelector(selectLeadId);



  const { data: userDetails, isLoading: isFetchingUserDetails, refetch: refetchUserDetails } =
    useGetProfile({ client, options: { enabled: false } });

  const { data: consultUserDetails, refetch } = useGetConsultUserByIdDetails({
    client: consultClient,
    leadId: userDetails?.data?.userDetail?.id,
    options: { enabled: !!userDetails?.data?.userDetail?.id }
  });

  useEffect(() => {
    if (consultUserDetails?.payload?.id) {
      dispatch(onConsultUserDetailsFetch({ 
        consultUserId: consultUserDetails.payload.id 
      }));
      // navigate(AppRoute.Dashboard);
    }
  }, [consultUserDetails]);

  useEffect(() => {
    if (leadId) {
      refetchUserDetails()
    }
  }, [leadId]);
  
  useEffect(() => {
    console.log(userDetails?.data);
    if (userDetails?.data?.userDetail?.id) {
      refetch();
    }
  }, [userDetails?.data?.userDetail?.id]);

  useEffect(() => {
    if (userDetails?.data) {
      dispatch(onProfileFetch({ profile: userDetails.data }));
    }
  }, [userDetails, dispatch]);

  if (isFetchingUserDetails) {
    return <LogoLoader />;
  }
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
      
      <Route path="*" element={<Navigate to={AppRoute.Login} replace />} />
    </Routes>
  );
};