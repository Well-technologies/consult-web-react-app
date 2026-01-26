import { Button } from "@/ui/atoms/button/Button";
import { RequestOtpProps } from "./RequestOtp.types";
import { useTranslation } from "react-i18next";
import { useClient } from "@/hooks/useClient/useClient";
import { useSelector } from "react-redux";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { toast } from "react-toastify";

export const RequestOtp = ({mobileNo, handleSubmit, showOtpError, disabled, mutateOnCreatePatient, isRegisteredPatient, formData, onAppointmentIdSet, trigger}: RequestOtpProps) => {

    console.log('mobileNo', mobileNo)

    const { t } = useTranslation();
    const client = useClient({});
    const { userDetail: {id: doctor_id} } = useSelector(
        (rootState) =>
          allReducerStates(rootState as StoreReducerStateTypes).user.profile
      );

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

                const {patient_id, ...rest} = formData;
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
                handleSubmit({mobile: '+94' + mobileNo});
            } catch (error) {
                console.error('Error creating patient:', error);
                toast.error(t("global.alert.common.error"));
            }
        } else {
            // For registered patients, just send OTP
            handleSubmit({mobile: '+94' + mobileNo});
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            {showOtpError && <p className="text-red-500">{t("user.form.request_otp.error")}</p>}
            <p>{t( showOtpError ? "user.form.retry_otp.note" : "user.form.request_otp.note", {'mobileNo': mobileNo?.length !== 9 ? "" : '+94' + mobileNo})}</p>
            <Button variant="primary" type="button" disabled={disabled} onClick={handleSendOtp}> {t(showOtpError ? "user.form.retry_otp.button" : "user.form.request_otp.button")}</Button>
        </div>
    )
};