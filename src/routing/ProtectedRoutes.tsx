// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// import { useGetUserDetails } from "@/api/user/user";
// import { ClaimReportContainer } from "@/app/claimReport/ClaimReportContainer";
// import { useClient } from "@/hooks/useClient/useClient";
// import { Sidebar } from "@/layout/sidebar/Sidebar";
// import { onUserDetailsFetch } from "@/store/userReducer/userReducer";
// import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
// import { setCustomUserId } from "@/utils/Clarity/clarity";

import { AppRoute } from "./AppRoute.enum";

export const ProtectedRoutes = () => {
  // const client = useClient();
  // const dispatch = useDispatch();

  // const { data: userDetails, isLoading: isFetchingUserDetails } =
  //   useGetUserDetails({ client });
  // useEffect(() => {
  //   if (userDetails?.data) {
  //     // dispatch(
  //     //   onUserDetailsFetch(getUserStateFromB2BDetails(userDetails.data))
  //     // );
  //     setCustomUserId(userDetails.data.user);
  //   }
  // }, [userDetails]);

  // if (isFetchingUserDetails) {
  //   return <LogoLoader />;
  // }
  return (
    <Routes>
      {/* <Route
        path={AppRoute.Dashboard}
        element={
          <>
            <Sidebar>
              <Dashboard />
            </Sidebar>
          </>
        }
      /> */}
      {/* <Route
        path={AppRoute.Login}
        element={
          <Sidebar>
            <ClaimReportContainer />
          </Sidebar>
        }
      /> */}
      
      <Route path="*" element={<Navigate to={AppRoute.Login} replace />} />
    </Routes>
  );
};
