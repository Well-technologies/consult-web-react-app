// import { AppRoute } from "@/routing/AppRoute.enum";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLogin, useRequestOtp, useVerifyOtp } from "@/api/authentication/authentication";
import { AppRoute } from "@/routing/AppRoute.enum";
import { onLoginSuccess } from "@/store/authReducer/authReducer";

import { EmailLoginFormInputs, LoginTypes, PhoneLoginFormInputs } from "./Login.types";
import { EmailLoginSchema } from "./Login.utils";
import { useEffect, useState } from "react";
import { MobileLoginForm } from "./MobileLogin";
import { onUserDetailsFetch } from "@/store/userReducer/userReducer";
import { useClient } from "@/hooks/useClient/useClient";
import { VerifyOTPBody } from "@/api/authentication/authentication.types";

export const LoginContainer = () => {
  const client = useClient({})
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState<LoginTypes>(LoginTypes.PHONE);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");


  const { mutateAsync: mutateOnEmailLogin } = useLogin({
    onSuccess: ({ data, success, message }) => {

      if (success) {
        toast.success(message);
        dispatch(
          onLoginSuccess({
            token: data.token,
            isAuthorized: success,
          })
        );
        dispatch(
          onUserDetailsFetch({ userDetails: data })
        );
        navigate(AppRoute.Dashboard);
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      console.error("onError error", error);
      toast.error(t("login.alert.error"));
    },
  });

  const { mutateAsync: mutateOnPhoneLogin, isPending: isPhoneLoginPending, variables } = useRequestOtp({
    onSuccess: (res) => {
      console.log("res", res.data);
      setMobileNumber(variables?.body?.mobile || "");
      setIsOtpSent(true);
      reset({
        otp: "",
        mobile: variables?.body?.mobile || "",
      });
    },
    onError: (error) => {
      console.error("onError error", error);
      toast.error(t("login.alert.error"));
    },
  });

  const { mutateAsync: mutateOnVerifyOtp } = useVerifyOtp({
    onSuccess: async ({ data, success, message }) => {
      if (success) {
        toast.success(message);
        dispatch(
          onLoginSuccess({
            token: data.token,
            isAuthorized: success,
          }))
        dispatch(
          onUserDetailsFetch({ userDetails: data })
        );
        navigate(AppRoute.Dashboard)
        // await refetchConsultUserDetails();
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      console.error("onError error", error);
      toast.error(t("login.alert.error"));
    },
  });



  const {
    // reset
    // setValue: setValueWithPhone,
    // control: controlWithEmail,
    // handleSubmit: handleSubmitWithEmail,
    // formState: { errors: errorsWithEmail },
  } = useForm<EmailLoginFormInputs>({
    resolver: EmailLoginSchema(t),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    reset,
    control: controlWithPhone,
    handleSubmit: handleSubmitWithPhone,
    watch,
    // formState: { errors: errorsWithPhone },
  } = useForm<PhoneLoginFormInputs>({
    // resolver: PhoneLoginSchema(t),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleSubmit = async (values: EmailLoginFormInputs | PhoneLoginFormInputs) => {
    console.log("values", values, loginType);
    if (loginType === LoginTypes.EMAIL) {
      await mutateOnEmailLogin({ client, body: values as VerifyOTPBody });
    }
    if (loginType === LoginTypes.PHONE && !isOtpSent) {
      await mutateOnPhoneLogin({ client, body: values as VerifyOTPBody });
    }
    if (loginType === LoginTypes.PHONE && isOtpSent) {
      await mutateOnVerifyOtp({ client, body: values as VerifyOTPBody });
    }
  }

  const { otp } = watch();

  useEffect(() => {
    if (otp?.length === 4) {
      handleSubmit({
        mobile: mobileNumber,
        otp: otp
      });
    }
  }, [otp]);



  return (
    <>
      {loginType === LoginTypes.PHONE && (
        <MobileLoginForm
          control={controlWithPhone}
          onSubmit={handleSubmitWithPhone(handleSubmit)}
          isPending={isPhoneLoginPending}
          setLoginType={setLoginType}
          isOtpSent={isOtpSent}
          setIsOtpSent={setIsOtpSent}
          mobileNumber={mobileNumber}
        />
      )}
      {/* {loginType === LoginTypes.EMAIL && ( 
    <Login
      controlEmail={controlWithEmail}
      onSubmitEmail={handleSubmitWithEmail(handleSubmit)}
      errorsEmail={errorsWithEmail}
      isPending={isEmailLoginPending}
      setLoginType={setLoginType}
      loginType={loginType}
    />)
} */}
    </>
  );

}
