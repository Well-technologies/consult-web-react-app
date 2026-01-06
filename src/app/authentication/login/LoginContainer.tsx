// import { AppRoute } from "@/routing/AppRoute.enum";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLogin, useRequestOtp } from "@/api/authentication/authentication";
import { UserRoles } from "@/api/user/user.types";
import { AppRoute } from "@/routing/AppRoute.enum";
import { onLoginSuccess } from "@/store/authReducer/authReducer";

import { Login } from "./Login";
import { EmailLoginFormInputs, LoginTypes, PhoneLoginFormInputs } from "./Login.types";
import { EmailLoginSchema, PhoneLoginSchema } from "./Login.utils";
import { useState } from "react";
import { MobileLoginForm } from "./MobileLogin";

export const LoginContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState<LoginTypes>(LoginTypes.EMAIL);

  const { mutateAsync: mutateOnEmailLogin, isPending: isEmailLoginPending } = useLogin({
    onSuccess: ({ data: { role, token, refresh_token } }) => {
      if (role !== UserRoles.Reviewer) {
        window.open(process.env.REACT_APP_ADMIN_URL, "_self");
        return;
      }
      dispatch(
        onLoginSuccess({
          tokens: {
            accessToken: token,
            refreshToken: refresh_token,
          },
          isAuthorized: true,
        })
      );
      toast.success(t("login.alert.success"));
      navigate(AppRoute.Claim);
    },
    onError: (error) => {
      console.error("onError error", error);
      toast.error(t("login.alert.error"));
    },
  });

  const { mutateAsync: mutateOnPhoneLogin, isPending: isPhoneLoginPending } = useRequestOtp({
    onSuccess: ({ data: { role, token, refresh_token } }) => {
      if (role !== UserRoles.Reviewer) {
        window.open(process.env.REACT_APP_ADMIN_URL, "_self");
        return;
      }
      dispatch(
        onLoginSuccess({
          tokens: {
            accessToken: token,
            refreshToken: refresh_token,
          },
          isAuthorized: true,
        })
      );
      toast.success(t("login.alert.success"));
      navigate(AppRoute.Claim);
    },
    onError: (error) => {
      console.error("onError error", error);
      toast.error(t("login.alert.error"));
    },
  });

  const {
    control: controlWithEmail,
    handleSubmit: handleSubmitWithEmail,
    formState: { errors: errorsWithEmail },
  } = useForm<EmailLoginFormInputs>({
    resolver: EmailLoginSchema(t),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    control: controlWithPhone,
    handleSubmit: handleSubmitWithPhone,
    formState: { errors: errorsWithPhone },
  } = useForm<PhoneLoginFormInputs>({
    resolver: PhoneLoginSchema(t),
    mode: "onBlur",
    reValidateMode: "onChange",
  });


  const handleSubmit = async (values: EmailLoginFormInputs | PhoneLoginFormInputs) => {

    console.log("values", values, loginType);
    if (loginType === LoginTypes.EMAIL) {
      await mutateOnEmailLogin(values as EmailLoginFormInputs);
    } 
    if (loginType === LoginTypes.PHONE) {   
      await mutateOnPhoneLogin(values as PhoneLoginFormInputs);
    }
  
  }


  return (
    <>
    {loginType === LoginTypes.PHONE && (
      <MobileLoginForm
        control={controlWithPhone}
        onSubmit={handleSubmitWithPhone(handleSubmit)}
        isPending={isPhoneLoginPending}
        t={t}
        setLoginType={setLoginType}
      />
    )}
    {loginType === LoginTypes.EMAIL && ( 

    <Login
      controlEmail={controlWithEmail}
      onSubmitEmail={handleSubmitWithEmail(handleSubmit)}
      errorsEmail={errorsWithEmail}
      isPending={isEmailLoginPending}
      setLoginType={setLoginType}
      loginType={loginType}
    />)
}
</>
  );

}
