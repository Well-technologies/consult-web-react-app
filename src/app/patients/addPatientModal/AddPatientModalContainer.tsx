// import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useCreatePatient, useGetMyPatients, useSearchPatients } from "../../../api/patient/patient";
import { GenderType } from "@/api/user/user.types";
import { useClient } from "@/hooks/useClient/useClient";


import { AddPatientModal } from "./AddPatientModal";
import { FormType } from "@/types";
import { AddPatientModalContainerProps, AddUserFormInputs, AppointmentType } from "./AddPatientModal.types";
import { AddUserSchema } from "./AddPatientModal.utils";
import { useSelector } from "react-redux";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

export const AddPatientModalContainer = ({
  onClose,
  // refetch,
  formType,
  data,
  // myPatients,
  setSearchText,
  appointmentType,
  onConfirm,
  ...props
}: AddPatientModalContainerProps) => {
  const { t } = useTranslation();
  const client = useClient({});
  const { userDetail: {id: doctor_id} } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.profile
  );
  const [isMyPatient, setIsMyPatient] = useState<boolean>((!!data ? data.isDisabled : false) || false )
  const [isRegisteredPatient, setIsRegisteredPatient] = useState<boolean | undefined>(undefined)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    trigger,
    // appointmentType,
    formState: { errors, isValid },
  } = useForm<AddUserFormInputs>({
    resolver: AddUserSchema(t),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const {mobile_no: search_text_mobile} = watch();

  useEffect(() => {
    if (formType === FormType.Add && !!data) {
      
    setValue('name', data.name)
    setValue('dob', data.date_of_birth)
    setValue('email', data.email)
    setValue('gender', data.lead_detail?.gender ? GenderType[data.lead_detail?.gender] : '')
    setValue('mobile_no', data.mobile_no.replace("+94", ""))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType, data, isMyPatient]);

  const { isPending } = useCreatePatient({
    onSuccess: (res) => {
      console.log('res', res);
      // refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
      });
      onClose();
      // if(appointmentType === AppointmentType.Consultation){
      //   // navigate(AppRoute.JoinConsultation.replace(':appointmentId', res?.data?.appointment_id?.toString() || ''));
      // }
      onConfirm?.(appointmentType === AppointmentType.Consultation ? res?.data?.appointment_id : parseInt( res.data.id));
    },
    onError: ({ data }) => {
      toast.error(
        data.message ||
          t("global.alert.common.error")
      );
    },
  });

  const {
      data: searchedPatients,
      isLoading: isSearchingPatient,
      // error: searchedPatientsError
    } = useSearchPatients({
      client,
      params: {
        patient: search_text_mobile,
      },
      enabled: !!search_text_mobile && search_text_mobile?.length === 9 
    // && !!data
    });

      const {
        data: myPatientsData,
        refetch: refetchMyPatientsData,
      } = useGetMyPatients({
        client,
        params: {
          doctor_id,
          page: 1,
          page_size: 10,
        }
      });

      useEffect(() => {
        console.log('myPatientsData...')
        search_text_mobile?.length === 9 && refetchMyPatientsData();
      }, [search_text_mobile]);
  

  useEffect(() => {
    console.log('searchedPatients...')

    setIsMyPatient(false)
    const patient = searchedPatients?.data?.filter((patient) => !patient.name.includes('+94'))[0];
    setIsRegisteredPatient(!!patient)
    if(!!patient){
    setIsMyPatient(myPatientsData?.data?.map((patient) => patient?.id).includes(patient?.id) || false)

    setValue('name', patient.name)
    setValue('dob', patient.date_of_birth)
    setValue('email', patient.email)
    setValue('gender', patient.lead_detail?.gender ? GenderType[patient.lead_detail?.gender] : '')
    setValue('patient_id', patient.id)
    } else {
      console.log('not found')
      reset({
        name: "",
        gender: "",
        email: "",
        dob: "",
        patient_id: "",
      });
      // setVerifyOtpDivEnabled(true)
      setIsRegisteredPatient(false)
      setIsMyPatient(false)
    }

    console.log('isRegisteredPatient', isRegisteredPatient)
  }, [searchedPatients?.data, searchedPatients?.success])
  
  // Separate mutation for OTP flow - no side effects in onSuccess
  const {
    mutateAsync: mutateOnCreatePatientForOtp,
  } = useCreatePatient({
    onSuccess: (res) => {
      setValue('patient_id', res?.data?.id)
      console.log('useCreatePatient for OTP', res)
      // Don't close modal or navigate here - let OTP flow complete first
      if (res.success) {
        // toast.success(t("user.alert.create.success"));
      } else {
        toast.error(res.message || t("user.alert.create.failure"));
      }
    },
    onError: () => {
      toast.error(t("global.alert.common.error"));
    },
  });

  const {
    mutateAsync: mutateOnCreatePatient,
    isPending: isPendingCreatePatient,
  } = useCreatePatient({
    onSuccess: (res) => {
      console.log('useCreatePatient', res)
      setSearchText?.("");
      // refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
        patient_id: "",
      });
      onClose();
      onConfirm?.(res?.data?.appointment_id);
    },
    onError: () => {
      toast.error(t("global.alert.common.error"));
    },
  });

  const handleOnSubmit = async (values: AddUserFormInputs) => {
    console.log(values)
    if (formType === FormType.Add) {
      console.log(values)
      const {patient_id, ...restValues} = values
      
      // For registered patients or appointments with existing patients
      // if(isRegisteredPatient) {
        const data = {
            ...restValues,
            doctor_id,
            consultation_mode_id: 4,
            mobile_no: `+94${values.mobile_no}`,
          }
          const  registeredPatientData = {
            ...values,
            doctor_id,
            consultation_mode_id: 4,
            mobile_no: `+94${values.mobile_no}`,
          }
          console.log('handleOnSubmit', data)
        
        // Create appointment/consultation for registered patient
        if(appointmentType === AppointmentType.Consultation || (appointmentType === AppointmentType.Appointment && !isMyPatient)){
          console.log('handleOnSubmit consultation', appointmentType, isMyPatient)
          await mutateOnCreatePatient({
            client,
            body: isRegisteredPatient ? registeredPatientData : data,
          });
        } 
        if(appointmentType === AppointmentType.Appointment && isMyPatient) {
          console.log('handleOnSubmit appointment', appointmentType, isMyPatient)
          if(patient_id){
            onConfirm?.(parseInt(patient_id));
          }
        }
      // }
      // For non-registered patients, the flow is handled via OTP verification
      // Patient creation happens when "Send OTP" is clicked
      // Navigation happens when "Start Consultation" is clicked after OTP verification
    }
  };
  // console.log('======== isMyPatient', isMyPatient)

  return (
    <AddPatientModal
      onClose={onClose}
      formType={formType}
      data={!!searchedPatients?.data && searchedPatients?.data?.filter((patient) => !patient.name.includes('+94'))[0] || data}
      control={control}
      isLoading={isPending || isPendingCreatePatient || isSearchingPatient}
      errors={errors}
      watch={watch}
      register={register}
      setValue={setValue}
      onSubmit={handleSubmit(handleOnSubmit)}
      isMyPatient={isMyPatient}
      isRegisteredPatient={isRegisteredPatient}
      mutateOnCreatePatientForOtp={mutateOnCreatePatientForOtp}
      mutateOnCreatePatient={mutateOnCreatePatient}
      isValidForm={isValid}
      setIsRegisteredPatient={setIsRegisteredPatient}
      setIsMyPatient={setIsMyPatient}
      trigger={data?.id ? trigger : undefined}
      onConfirm={onConfirm}
      // isVerifyOtpDivEnabled={!data?.isDisabled || isVerifyOtpDivEnabled}
      {...props}
    />
  );
};
