import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useClient } from "@/hooks/useClient/useClient";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { Button } from "@/ui/atoms/button/Button";
import { OtpInput } from "@/ui/atoms/otpInput/OtpInput";

import { OtpFlowProps } from "./VerifyOtp.types";

export const VerifyOtp = ({
  control,
  watchOtp,
  mobileNo,
  showOtpError,
  onClearError,
  disabled,
  mutateOnCreatePatient,
  isRegisteredPatient,
  formData,
  onAppointmentIdSet,
  trigger,
  onRequestOtp,
  onVerifyOtp,
}: OtpFlowProps) => {
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { t } = useTranslation();
  const client = useClient({});
  const {
    userDetail: { id: doctor_id },
  } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.profile
  );

  const { otp } = watchOtp();

  // Timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startTimer = () => {
    setTimer(30);
    setCanResend(false);
  };

  const handleSendOtp = async () => {
    // For non-registered patients, validate form and create patient first
    if (!isRegisteredPatient) {
      try {
        // Validate the form first using trigger if available
        if (trigger) {
          const isValid = await trigger();
          if (!isValid) {
            toast.error(t("global.alert.common.error"));
            return;
          }
        }

        const { patient_id, ...rest } = formData;
        const data = {
          ...rest,
          doctor_id,
          consultation_mode_id: 4,
          mobile_no: `+94${formData.mobile_no}`,
        };

        const response = await mutateOnCreatePatient({
          client,
          body: data,
        });

        // Store appointment_id from response
        if (response?.data?.appointment_id) {
          onAppointmentIdSet?.(response.data.appointment_id);
        }

        // After successful patient creation, send OTP
        onRequestOtp({ mobile: "+94" + mobileNo });
        setIsOtpRequested(true);
        startTimer();
      } catch (error) {
        console.error("Error creating patient:", error);
        toast.error(t("global.alert.common.error"));
      }
    } else {
      // For registered patients, just send OTP
      onRequestOtp({ mobile: "+94" + mobileNo });
      setIsOtpRequested(true);
      startTimer();
    }
  };

  const handleResendOtp = () => {
    onRequestOtp({ mobile: "+94" + mobileNo });
    startTimer();
  };

  const handleVerifyOtp = (otpValue: string) => {
    onVerifyOtp({ mobile: "+94" + mobileNo, otp: otpValue });
  };

  if (isOtpRequested) {
    // OTP Verification Screen
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
                  handleVerifyOtp(value);
                }
              }}
            />
          )}
        />

        {/* Timer and Resend Section */}
        <div className="flex flex-col items-center gap-2">
          {timer > 0 && (
            <p className="text-sm text-gray-600">
              {`Resend ${
                Math.floor(timer / 60)
                  .toString()
                  .padStart(2, "0") +
                ":" +
                (timer % 60).toString().padStart(2, "0")
              }`}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          {canResend && (
            <Button variant="secondary" type="button" onClick={handleResendOtp}>
              Resend
            </Button>
          )}
          <Button
            variant="primary"
            type="button"
            disabled={otp?.length !== 4}
            onClick={() => otp && handleVerifyOtp(otp)}
          >
            {t("user.form.verify_otp.button")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {showOtpError && (
        <p className="text-red-500">{t("user.form.request_otp.error")}</p>
      )}
      <p>
        {t(
          showOtpError
            ? "user.form.retry_otp.note"
            : "user.form.request_otp.note",
          { mobileNo: mobileNo?.length !== 9 ? "" : "+94" + mobileNo }
        )}
      </p>
      <Button
        variant="primary"
        type="button"
        disabled={disabled}
        onClick={handleSendOtp}
      >
        {t(
          showOtpError
            ? "user.form.retry_otp.button"
            : "user.form.request_otp.button"
        )}
      </Button>
    </div>
  );
};
