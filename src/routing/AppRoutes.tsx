import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginContainer } from "@/app/authentication/login/LoginContainer";
import { Signup } from "@/app/authentication/signup/Signup";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

import { AppRoute } from "./AppRoute.enum";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const AppRoutes = () => {
  const { isAuthorized } = useSelector(
    (rootState) => allReducerStates(rootState as StoreReducerStateTypes).auth
  );

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
