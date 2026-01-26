import { useState } from "react";
import { VerifyOtp } from "./verifyOtp/VerifyOtp";
import { RequestOtp } from "./requestOtp/RequestOtp";
import { useForm } from "react-hook-form";
import { PhoneLoginFormInputs } from "@/app/authentication/login/Login.types";
import { useRequestOtp, useVerifyOtp } from "@/api/authentication/authentication";
import { t } from "i18next";
import { toast } from "react-toastify";
import { useClient } from "@/hooks/useClient/useClient";
import { VerifyOTPBody } from "@/api/authentication/authentication.types";
import { OtpVerificationProps } from "./OtpVerification.types";

export const OtpVerificationContainer = ({mobileNo, disabled, isOtpVerified, setIsOtpVerified, mutateOnCreatePatient, isRegisteredPatient, setIsRegisteredPatient, formData, onAppointmentIdSet, trigger, setIsMyPatient}: OtpVerificationProps) => {
    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const [showOtpError, setShowOtpError] = useState(false);
    const client = useClient({});

    // const [mobileNumber, setMobileNumber] = useState(mobileNo);

      const {
        control: controlWithPhone,
        watch: watchOtp,
        setValue,
        reset,
        // formState: { errors: errorsWithPhone, isValid: isValidOtp },
      } = useForm<PhoneLoginFormInputs>({
        // resolver: PhoneLoginSchema(t),
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: {
          otp: ""
        }
      }); 

    const handleRequestOtp = (data: PhoneLoginFormInputs) => {
        console.log("handleRequestOtp", data, controlWithPhone._formValues);
        mutateOnPhoneLogin({ client, body: data as VerifyOTPBody });
        setIsOtpRequested(true);
    }
    const handleVerifyOtp = (data: PhoneLoginFormInputs) => {
        console.log("handleVerifyOtp", {...data, mobile: '+94' + mobileNo}, controlWithPhone._formValues);
        mutateOnVerifyOtp({ client, body: {...data, mobile: '+94' + mobileNo} as VerifyOTPBody });
        setIsOtpRequested(false);
    }

    const { mutateAsync: mutateOnPhoneLogin } = useRequestOtp({
        onSuccess: () => {
            reset({
                otp: ""
            });
            setValue('otp', '')
        //   setMobileNumber(variables?.body?.mobile || "");
          setIsOtpRequested(true);
          setShowOtpError(false);
        },
        onError: (error) => {
          console.error("onError error", error);
          toast.error(t("login.alert.error"));
        },
      });
    
      const { mutateAsync: mutateOnVerifyOtp } = useVerifyOtp({
        onSuccess: ({ success, message }) => {
          if (success) {
            
            setIsOtpVerified(true);
            setIsRegisteredPatient(true);
            setIsMyPatient(true);
            reset({
                otp: ""
            });
            setValue('otp', '')
            toast.success(message);
          } else {
            setShowOtpError(true);
            toast.error(message);
          }
        },
        onError: (error) => {
            setValue('otp', '')
            reset({
                otp: ""
            });

          console.error("onError error", error);
          toast.error(t("login.alert.error"));
        },
      });

    console.log('====mobileNo', mobileNo)
    return (
        isOtpVerified ? <div>{t("user.form.verify_otp.success")}</div>
        : isOtpRequested ? <VerifyOtp control={controlWithPhone} watchOtp={watchOtp} handleSubmit={handleVerifyOtp}/>
        : <RequestOtp 
            setIsOtpRequested={setIsOtpRequested} 
            mobileNo={mobileNo} 
            handleSubmit={handleRequestOtp} 
            showOtpError={showOtpError} 
            disabled={disabled}
            mutateOnCreatePatient={mutateOnCreatePatient}
            isRegisteredPatient={isRegisteredPatient}
            formData={formData}
            onAppointmentIdSet={onAppointmentIdSet}
            trigger={trigger}
          />
    )
}               