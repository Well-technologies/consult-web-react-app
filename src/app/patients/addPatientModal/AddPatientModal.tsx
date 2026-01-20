import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import RightArrowIcon from "@/assets/icons/arrow_down_icon.png";
import CheckIcon from "@/assets/icons/check.png";
import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import { Input } from "@/ui/atoms/input/input";
import { FormInput } from "@/ui/molecules/formInput/FormInput";
import { FormSelect } from "@/ui/molecules/formSelect/FormSelect";
import { Modal } from "@/ui/molecules/modal/Modal";

import { AddPatientModalProps } from "./AddPatientModal.types";
import { getConfirmButtonText, getModalTitle, getIsConfirmButtonHide, getCancelButtonText, getIsDisabledFormItem, getUserGenderOptions } from "./AddPatientModal.utils";
import { DatePickerType } from "@/ui/atoms/datePicker/DatePicker.types";
import { FormDatePicker } from "@/ui/molecules/formDatePicker/FormDatePicker";
import { cn } from "@/lib/utils";
import { OtpVerificationContainer } from "../otpVerification/OtpVerificationContainer";


export const AddPatientModal = ({
  control,
  data,
  errors,
  formType,
  isLoading,
  isValidForm,
  onClose,
  onSubmit,
  open,
  watch,
  register,
  setValue,
  isMyPatient,
  isRegisteredPatient,
  // isVerifyOtpDivEnabled
}: AddPatientModalProps) => {
  const { t } = useTranslation();
  const {mobile_no} = watch();

  
  const [isVerifyOtp, setVerifyOtp] = useState(!isMyPatient);
  const [isOtpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    setOtpVerified(!!isRegisteredPatient && !!isMyPatient)
  }, [isRegisteredPatient, isMyPatient]);

  console.log('mobile_no', mobile_no)
  return (
    <Modal
      onClose={onClose}
      open={open}
      confirmButtonText={getConfirmButtonText(formType)}
      onConfirm={onSubmit}
      title={getModalTitle(formType, data)}
      isLoading={isLoading}
      isConfirmButtonHide={getIsConfirmButtonHide(formType)}
      cancelButtonText={getCancelButtonText(formType)}
      isCloseOnOutsideClickDisabled
      isCloseIcon
      disabled={!isOtpVerified || !isValidForm}
    >
      <form className="space-y-4 md:space-y-6" action="#">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <FormLabel label={t("user.form.mobile_no.label")} required />
              <div className="flex w-full gap-1">
                <Input
                  defaultValue={"+94"}
                  disabled
                  className="w-14"
                  id="countryCode"
                  type="text"
                  readOnly
                />
                <FormInput
                  register={register}
                  disabled={getIsDisabledFormItem(formType, "mobile_no")}
                  containerClassName="w-full"
                  id="name"
                  type="number"
                  max={9}
                  name="mobile_no"
                  placeholder={t("user.form.mobile_no.placeholder")}
                  error={!!errors?.mobile_no}
                  helperText={errors?.mobile_no?.message}
                  required
                  autoFocus={true}
                />
              </div>
            </div>
                        
            <FormInput
              register={register}
              label={t("user.form.name.label")}
              disabled={getIsDisabledFormItem(formType, "name") || !isOtpVerified}
              id="name"
              type="text"
              name="name"
              placeholder={t("user.form.name.placeholder")}
              error={!!errors?.name}
              helperText={errors?.name?.message}
              required
            />

            <FormInput
              register={register}
              id="patient_id"
              type="text"
              name="patient_id"
              hidden
              value={data?.id}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormDatePicker
              setValue={setValue}
              value={watch("dob") || ""}
              startedDateName="dob"
              endedDateName=""
              type={DatePickerType.SingleDate}
              register={register}
              label={t("user.form.dob.label")}
              id="dob"
              placeholder={t("user.form.dob.placeholder")}
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
              isHiddenActions
              required
              disabled={!isOtpVerified}
              pastOnly={true}
              />

            <FormSelect
              id="gender"
              name="gender"
              isDisabled={getIsDisabledFormItem(formType, "gender") || !isOtpVerified}
              label={t("user.form.gender.label")}
              control={control}
              placeholder={t("user.form.gender.placeholder")}
              isClearable
              options={getUserGenderOptions()}
              error={!!errors?.gender}
              helperText={errors?.gender?.message}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormInput
              register={register}
              label={t("user.form.email.label")}
              disabled={getIsDisabledFormItem(formType, "email") || !isOtpVerified}
              id="email"
              type="email"
              name="email"
              placeholder={t("user.form.email.placeholder")}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              // required
            />
          </div>
        </div>
        <div className="flex flex-col gap-0 ">
          <div
            className={cn("font-semibold relative cursor-pointer text-md bg-secondary-50 rounded-t-md p-2 px-4"
              // , (isMyPatient)  ? "pointer-events-none opacity-30" :  "pointer-events-auto"
            )
            }
            onClick={() => {
              setVerifyOtp(!isVerifyOtp);
            }}
          >
            {t("user.form.verify_otp.title")}
            <div className="absolute top-2 rounded-full right-2 p-2  bg-secondary-50 ">
              {isOtpVerified ? <img
                src={CheckIcon}
                className="w-4 aspect-square transition-all duration-300"
              /> : <img
                src={RightArrowIcon}
                className={clsx(
                  "w-3 aspect-square transition-all duration-300",
                  isVerifyOtp ? "rotate-180" : "rotate-0"
                )}
              /> }
            </div>
          </div>
          <div
            className={clsx(
              "flex border rounded-b-sm transition-all duration-500",
              !isOtpVerified 
                ? "max-h-[1000px] border border-t-0"
                : "max-h-0 border-0 overflow-hidden"
            )}
          >
            <div className={"py-4 justify-center items-center flex w-full"}>
                <OtpVerificationContainer mobileNo={mobile_no} isOtpVerified={isOtpVerified} setIsOtpVerified={setOtpVerified} />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
