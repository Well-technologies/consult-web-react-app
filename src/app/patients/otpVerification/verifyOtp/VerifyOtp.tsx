import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/atoms/button/Button";
import { OtpInput } from "@/ui/atoms/otpInput/OtpInput";

import { VerifyOtpProps } from "./VerifyOtp.types";

export const VerifyOtp = ({
  control,
  handleSubmit,
  watchOtp,
  showOtpError,
  onClearError,
}: VerifyOtpProps) => {
  const { t } = useTranslation();
  const { otp, mobile } = watchOtp();

  return (
    <div className="flex flex-col items-center gap-4">
      <p>{t("user.form.verify_otp.note")}</p>

      {showOtpError && (
        <p className="text-red-500">{t("user.form.verify_otp.error")}</p>
      )}

      <Controller
        name={"otp"}
        control={control}
        render={({ field }) => (
          <OtpInput
            value={field.value || ""}
            onChange={(value: string) => {
              // Clear error when user starts typing
              if (showOtpError && onClearError) {
                onClearError();
              }
              field.onChange(value);
              if (value.length === 4) {
                field.onBlur();
                handleSubmit({ mobile, otp: value });
              }
              // setOtpValue(value);
            }}
          />
        )}
      />
      <Button
        variant="primary"
        type="button"
        disabled={otp?.length !== 4}
        onClick={() => handleSubmit({ mobile, otp })}
      >
        {" "}
        {t("user.form.verify_otp.button")}
      </Button>
    </div>
  );
};
