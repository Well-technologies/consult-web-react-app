import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

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
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

export const ProtectedRoutes = () => {
  const client = useClient({serviceConfigType: ServiceConfigType.Core});
  const consultClient = useClient({serviceConfigType: ServiceConfigType.Consult});
  console.log("ProtectedRoutes rendered", client);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { profile: {userDetail : {id : leadId}} } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user
  );

  const { data: userDetails, isLoading: isFetchingUserDetails } =
    useGetProfile({ client });
    
    const { data: consultUserDetails} = useGetConsultUserByIdDetails({
      client: consultClient,
      leadId,
      options: {
        enabled: !!leadId && leadId !== 0
      }
    });
  
    useEffect(() => {
      console.log("userDetails?.data?.id", userDetails?.data?.id);
      if (consultUserDetails) {
        console.log("consultUserDetails", consultUserDetails);
        dispatch(
          onConsultUserDetailsFetch({ consultUserId: consultUserDetails.payload?.id })
        );
        navigate(AppRoute.Dashboard);
      }
    }, [consultUserDetails, userDetails?.data?.id]);

  useEffect(() => {
    console.log("userDetails", userDetails);
    if (userDetails?.data) {
      dispatch(
        onProfileFetch({ profile: userDetails.data })
      );
    }
  }, [userDetails]);

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
      
      <Route path="*" element={<Navigate to={AppRoute.Login} replace />} />
    </Routes>
  );
};
