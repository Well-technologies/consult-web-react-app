// import { AppRoute } from "@/routing/AppRoute.enum";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLogin } from "@/api/authentication/authentication";
import { UserRoles } from "@/api/user/user.types";
import { AppRoute } from "@/routing/AppRoute.enum";
import { onLoginSuccess } from "@/store/authReducer/authReducer";

import { Login } from "./Login";
import { LoginFormInputs } from "./Login.types";
import { LoginSchema } from "./Login.utils";

export const LoginContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync: mutateOnLogin, isPending } = useLogin({
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: LoginSchema(t),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleOnSubmit = async (values: LoginFormInputs) => {
    await mutateOnLogin(values);
  };

  return (
    <Login
      register={register}
      onSubmit={handleSubmit(handleOnSubmit)}
      errors={errors}
      isPending={false}
    />
  );
};
