import { Button } from "@/ui/atoms/button/Button";
import { RequestOtpProps } from "./RequestOtp.types";
import { useTranslation } from "react-i18next";

export const RequestOtp = ({mobileNo, handleSubmit, showOtpError, disabled}: RequestOtpProps) => {

    console.log('mobileNo', mobileNo)

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            {showOtpError && <p className="text-red-500">{t("user.form.request_otp.error")}</p>}
            <p>{t( showOtpError ? "user.form.retry_otp.note" : "user.form.request_otp.note", {'mobileNo': mobileNo?.length !== 9 ? "" : '+94' + mobileNo})}</p>
            <Button variant="primary" type="button" disabled={disabled} onClick={() => handleSubmit({mobile: '+94' + mobileNo})}> {t(showOtpError ? "user.form.retry_otp.button" : "user.form.request_otp.button")}</Button>
        </div>
    )
};