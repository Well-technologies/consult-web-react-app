import { Button } from "@/ui/atoms/button/Button";
import { RequestOtpProps } from "./RequestOtp.types";
import { useTranslation } from "react-i18next";

export const RequestOtp = ({setIsOtpRequested, mobileNo, handleSubmit}: RequestOtpProps) => {

    console.log('RequestOtp', mobileNo)
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <p>{t("user.form.request_otp.note", {'mobileNo': '+94' + mobileNo})}</p>
            <Button variant="primary" type="button" onClick={() => handleSubmit({mobile: '+94' + mobileNo})}> {t("user.form.request_otp.button")}</Button>
        </div>
    )
};