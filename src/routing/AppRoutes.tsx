import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginContainer } from "@/app/authentication/login/LoginContainer";
import { Signup } from "@/app/authentication/signup/Signup";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

import { AppRoute } from "./AppRoute.enum";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { onConsultUserDetailsFetch, onProfileFetch } from "@/store/userReducer/userReducer";
import { ServiceConfigType } from "@/api/index.types";
import { useGetProfile, useGetConsultUserByIdDetails } from "@/api/user/user";
import { useClient } from "@/hooks/useClient/useClient";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";

const selectLeadId = createSelector(
  [(rootState: StoreReducerStateTypes) => 
    allReducerStates(rootState).user.userDetails.lead_id],
  (leadId) => leadId
);

export const AppRoutes = () => {
  const { isAuthorized } = useSelector(
    (rootState) => allReducerStates(rootState as StoreReducerStateTypes).auth
  );

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
      console.log("leadId", leadId);
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
  

  if (isAuthorized) {
    console.log("Authorized User");
    return <ProtectedRoutes />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Login} element={<LoginContainer />} />
      <Route path={AppRoute.SignUp} element={<Signup />} />
      <Route path="*" element={<Navigate to={AppRoute.Login} replace />} />
    </Routes>
  );
};
