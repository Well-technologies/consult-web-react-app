import { FormPhoneNumberInput } from "@/ui/molecules/formPhoneNumberInput/FormPhoneNumberInput";
import clsx from "clsx";

import FlashLogo from "@/assets/logo.png";
import { Control, Controller } from 'react-hook-form';
import { LoginTypes, PhoneLoginFormInputs } from "./Login.types";
import { Button } from "@/ui/atoms/button/Button";
import { Divider } from "@/ui/atoms/divider/Divider";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { t } from "i18next";
import { Version } from "@/ui/molecules/Version/Version";
import { OtpInput } from "@/ui/atoms/otpInput/OtpInput";

interface MobileLoginFormProps {
    onSubmit: (e: BaseSyntheticEvent) => Promise<void>;
    isPending: boolean;
    setLoginType: (type: LoginTypes) => void;
    control: Control<PhoneLoginFormInputs>;
    isOtpSent?: boolean;
    mobileNumber?: string;
    setIsOtpSent: (value: boolean) => void;
}

export const MobileLoginForm = ({ onSubmit,  isPending, setLoginType , control, isOtpSent, mobileNumber, setIsOtpSent}: MobileLoginFormProps) => {

    const [timer, setTimer] = useState<string | null>(null);

    useEffect(() => {
        let countdown: NodeJS.Timeout;
        let timeLeft = 30;

        if (isOtpSent) {
            countdown = setInterval(() => {
                timeLeft -= 1;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                setTimer(`0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    setTimer(null);
                }
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [isOtpSent]);



return (
    <>
    {isOtpSent && <section className="h-screen bg-gray-50 dark:bg-gray-900">
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
            </div>
            <div className={"space-y-4 p-6 sm:p-8 md:space-y-6"}>
                <h1 className="text-xl leading-tight font-bold tracking-tight mb-1 text-gray-900 md:text-2xl dark:text-white">
                {t("login.form.verify_login.title")}
                </h1>
                <div className="text-sm leading-tight tracking-tight text-gray-900 md:text-sm dark:text-white">
                {t("login.form.verify_login.description", { mobileNo: mobileNumber })}
                </div>
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
            <div hidden={true}>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {t("login.form.phone.label")}
            </label>
            <FormPhoneNumberInput
            name="mobile"
            autoFocus={true}
            control={control}
            disabled={isPending}
            value={mobileNumber}
            />
        </div>
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {t("login.form.phone.label")}
            </label>
            <Controller
                    name={"otp"}
                    control={control}
                    render={({ field }) => (
                      <OtpInput value={field.value || ""}
      onChange={(value: string) => {
        field.onChange(value);
        // setOtpValue(value);
      }}/>
    )}
      />
        </div>
        <div>
            <div className="flex justify-between items-end">
              <div className={!!timer ? "text-gray-900 dark:text-white" : "text-red-500"}>
                <div className="text-sm leading-tight tracking-tight text-gray-900 md:text-sm dark:text-white">
                  {t("login.form.verify_login.no_otp")}
                  <br />
                  <div >
                    {!!timer ? t("login.form.verify_login.no_otp_timer", { timer }) : t("login.form.verify_login.no_otp_action")}
                  </div>
                </div>
              </div>
              <div className={"text-red-500 md:text-sm cursor-pointer"} onClick={() => {setLoginType(LoginTypes.PHONE); setIsOtpSent(false)}}>
                {t("login.form.verify_login.change_number")}
              </div>
            </div>
        </div>
        <Button
            type="submit"
            isDisabled={isPending}
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
    </section>}

    {!isOtpSent && <section className="h-screen bg-gray-50 dark:bg-gray-900">
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
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {t("login.form.phone.label")}
            </label>
            <FormPhoneNumberInput
            name="mobile"
            control={control}
            disabled={isPending}
            />
        </div>
        {/* <Divider className="mt-0" children={t("login.form.or")} />
        <Button
            type="button"
            onClick={() => setLoginType(LoginTypes.EMAIL)}
            isDisabled={isPending}
            variant="outline"
            isFullWidth
        >
            {t("login.form.login_with_email.button")}
        </Button> */}
        <Button
            type="submit"
            isDisabled={isPending}
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
}
    </>
);
};