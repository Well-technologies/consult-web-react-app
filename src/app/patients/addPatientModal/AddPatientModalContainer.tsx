// import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useCreatePatient, useSearchPatients, useUpdatePatient } from "../../../api/patient/patient";
import { GenderType } from "@/api/user/user.types";
import { useClient } from "@/hooks/useClient/useClient";


import { AddPatientModal } from "./AddPatientModal";
import { FormType } from "@/types";
import { AddPatientModalContainerProps, AddUserFormInputs } from "./AddPatientModal.types";
import { AddUserSchema } from "./AddPatientModal.utils";
import { useSelector } from "react-redux";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

export const AddPatientModalContainer = ({
  onClose,
  refetch,
  formType,
  data,
  myPatients,
  setSearchText,
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
    formState: { errors, isValid },
  } = useForm<AddUserFormInputs>({
    resolver: AddUserSchema(t),
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
    },
  });
  
  console.log('isMyPatient', isMyPatient)

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
      refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
      });
      onClose();
      res.success ? toast.success(t("user.alert.create.success")) : toast.error(t("user.alert.create.failure"));
    },
    onError: ({ data }) => {
      toast.error(
        data.message.replace("Lead", "Employee") ||
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

  useEffect(() => {

    setIsMyPatient(false)
    setIsRegisteredPatient(!!searchedPatients?.data)
    if(!!searchedPatients?.data){
      const patient = searchedPatients?.data[0];

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
      });
      // setVerifyOtpDivEnabled(true)
      setIsRegisteredPatient(false)
      setIsMyPatient(false)
    }
  }, [searchedPatients?.data, searchedPatients?.success])


  const {
    isPending: isPendingCreatePatient,
  } = useUpdatePatient({
    onSuccess: (res) => {
      refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
      });
      onClose();
      res.success ? toast.success(t("user.alert.create.success")) : toast.error(t("user.alert.create.failure"));
    },
    onError: () => {
      toast.error(t("global.alert.common.error"));
    },
  });
  
  const {
    mutateAsync: mutateOnCreatePatient,
    isPending: isPendingUpdatePatient,
  } = useCreatePatient({
    onSuccess: (res) => {
      setSearchText?.("");
      refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
      });
      onClose();
      res.success ? toast.success(t("user.alert.create.success")) : toast.error(t("user.alert.create.failure"));;
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
      const data = {
          ...(!isRegisteredPatient ? restValues : values),
          doctor_id,
          consultation_mode_id: 4,
          mobile_no: `+94${values.mobile_no}`,
          // patient_id: patient_id
        }
        console.log('handleOnSubmit', data)
      await mutateOnCreatePatient({
        client,
        body: data,
      });
    }
    // if ((formType === FormType.Edit && searchedPatients) || (isRegisteredPatient && searchedPatients?.data)) {
    //   await mutateOnUpdatePatient({
    //     client,
    //     userId: isRegisteredPatient ? searchedPatients.data[0].id : data ? data.id : '',
    //     body: {
    //       ...values,
    //       mobile_no: `+94${values.mobile_no}`,
    //     },
    //   });
    // }
  };

  return (
    <AddPatientModal
      onClose={onClose}
      formType={formType}
      data={!!searchedPatients?.data && searchedPatients?.data[0] || data}
      control={control}
      isLoading={isPending || isPendingCreatePatient || isPendingUpdatePatient || isSearchingPatient}
      errors={errors}
      watch={watch}
      register={register}
      setValue={setValue}
      onSubmit={handleSubmit(handleOnSubmit)}
      isMyPatient={isMyPatient}
      isRegisteredPatient={isRegisteredPatient}
      isValidForm={isValid}
      trigger={data?.id ? trigger : undefined}
      // isVerifyOtpDivEnabled={!data?.isDisabled || isVerifyOtpDivEnabled}
      {...props}
    />
  );
};
