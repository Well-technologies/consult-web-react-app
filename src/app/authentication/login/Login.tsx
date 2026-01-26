import clsx from "clsx";
import { useTranslation } from "react-i18next";

import FlashLogo from "@/assets/logo.png";
import { Version } from "@/ui/molecules/Version/Version";
import { FormInput } from "../../../ui/molecules/formInput/FormInput";

import { LoginProps, LoginTypes } from "./Login.types";
import { Button } from "@/ui/atoms/button/Button";
import { Divider } from "@/ui/atoms/divider/Divider";

export const Login = ({
  errorsEmail,
  onSubmitEmail,
  controlEmail,
  isPending,
  loginType,
  setLoginType,
}: LoginProps) => {
  const { t } = useTranslation();

  return (
    <section className="h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex flex-col items-center text-lg font-semibold text-gray-900 sm:flex-row sm:text-xl md:text-2xl dark:text-white"
        >
          <img className="mr-2 h-8" src={FlashLogo} alt="logo" />
          {t("application.name")}
        </a>
        <div className="w-full relative rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div
            className={clsx(
              "w-fill-available rounded-lg absolute bg-white h-full justify-center items-center",
              isPending ? "flex" : "hidden"
            )}
          >
            {/* <LogoLoader isMaxSize={false} isFullHeight isFullWidth /> */}
          </div>
          <div className={"space-y-4 p-6 sm:p-8 md:space-y-6"}>
            <h1 className="text-xl leading-tight font-bold tracking-tight mb-1 text-gray-900 md:text-2xl dark:text-white">
              {t("login.title")}
            </h1>
            <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("login.subtitle")}
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" hidden={loginType === LoginTypes.PHONE} onSubmit={onSubmitEmail}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  {t("login.form.email.label")}
                </label>
                <FormInput
                  control={controlEmail}
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t("login.form.email.placeholder")}
                  autoComplete="on"
                  error={!!errorsEmail?.email}
                  helperText={errorsEmail?.email?.message}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  {t("login.form.password.label")}
                </label>
                <FormInput
                  id="password"
                  control={controlEmail}
                  type="password"
                  name="password"
                  autoComplete="on"
                  placeholder={t("login.form.password.placeholder")}
                  error={!!errorsEmail?.password}
                  helperText={errorsEmail?.password?.message}
                  required
                />
              </div>
              <Divider className="mt-0" children={t("login.form.or")} />
              <Button
                type="button"
                onClick={() => setLoginType(LoginTypes.PHONE)}
                disabled={isPending}
                variant="outline"
                isFullWidth
              >
                {t("login.form.login_with_phone.button")}
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                variant="primary"
                isFullWidth
              >
                {t("login.form.submit")}
              </Button>
            </form>
          </div>
        </div>
        <Version className="text-center mt-1 absolute bottom-1 right-2 md:bottom-4 md:right-4" />
      </div>
    </section>
  );
};
