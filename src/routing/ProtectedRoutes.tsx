import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { data, Navigate, Route, Routes } from "react-router-dom";

import { useGetProfile, useGetUserDetails } from "@/api/user/user";
// import { ClaimReportContainer } from "@/app/claimReport/ClaimReportContainer";
import { useClient } from "@/hooks/useClient/useClient";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { onProfileFetch, onUserDetailsFetch } from "@/store/userReducer/userReducer";
import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
// import { setCustomUserId } from "@/utils/Clarity/clarity";

import { AppRoute } from "./AppRoute.enum";
import { ServiceConfigType } from "@/api/index.types";
import { Dashboard } from "@/app/dashboard/Dashboard";

export const ProtectedRoutes = () => {
  const client = useClient({serviceConfigType: ServiceConfigType.Core});
  console.log("ProtectedRoutes rendered", client);
  const dispatch = useDispatch();

  const { data: userDetails, isLoading: isFetchingUserDetails } =
    useGetProfile({ client });

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
            <Dashboard />
          </Sidebar>
        }
      />
      <Route
        path={AppRoute.Patients}
        element={
          <Sidebar>
            <Dashboard />
          </Sidebar>
        }
      />
      
      <Route path="*" element={<Navigate to={AppRoute.Login} replace />} />
    </Routes>
  );
};
