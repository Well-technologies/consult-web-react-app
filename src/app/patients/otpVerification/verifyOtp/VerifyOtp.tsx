import { Controller } from "react-hook-form";
import { OtpInput } from "@/ui/atoms/otpInput/OtpInput";
import { useTranslation } from "react-i18next";
import { VerifyOtpProps } from "./VerifyOtp.types";
import { Button } from "@/ui/atoms/button/Button";
import { Input } from "@/ui/atoms/input/input";

export const VerifyOtp = ({control, handleSubmit, watchOtp}: VerifyOtpProps) => {
    const {t} = useTranslation();
    const {otp, mobile} = watchOtp();
    
    return (
        <div className="flex flex-col items-center gap-4">
            
            <p>{t("user.form.verify_otp.note")}</p>
            
            <Controller
                    name={"otp"}
                    control={control}
                    render={({ field }) => (
                      <OtpInput value={field.value || ""}
      onChange={(value: string) => {
        field.onChange(value);
        if(value.length === 4){
            field.onBlur();
            handleSubmit({mobile, otp: value});
        }
        // setOtpValue(value);
      }}/>
    )}
      />
    <Button variant="primary" type="button" isDisabled={otp?.length !== 4} onClick={() => handleSubmit({mobile, otp})}> {t("user.form.verify_otp.button")}</Button>
        </div>
    )
};