import { Button } from "@/ui/atoms/button/Button";
import { RequestOtpProps } from "./RequestOtp.types";
import { useTranslation } from "react-i18next";

export const RequestOtp = ({mobileNo, handleSubmit, showOtpError}: RequestOtpProps) => {

    console.log('RequestOtp', mobileNo)
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            {showOtpError && <p className="text-red-500">{t("user.form.request_otp.error")}</p>}
            <p>{t( showOtpError ? "user.form.retry_otp.note" : "user.form.request_otp.note", {'mobileNo': mobileNo?.length !== 9 ? "" : mobileNo})}</p>
            <Button variant="primary" type="button" isDisabled={mobileNo?.length !== 9} onClick={() => handleSubmit({mobile: '+94' + mobileNo})}> {t(showOtpError ? "user.form.retry_otp.button" : "user.form.request_otp.button")}</Button>
        </div>
    )
};