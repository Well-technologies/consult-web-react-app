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

export const AddPatientModalContainer = ({
  onClose,
  refetch,
  formType,
  data,
  myPatients,
  ...props
}: AddPatientModalContainerProps) => {
  const { t } = useTranslation();
  const client = useClient({});
  const [isMyPatient, setIsMyPatient] = useState<boolean>(false)
  const [isRegisteredPatient, setIsRegisteredPatient] = useState<boolean | undefined>(undefined)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    // trigger,
    formState: { errors, isValid },
  } = useForm<AddUserFormInputs>({
    resolver: AddUserSchema(t),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const {mobile_no: search_text} = watch();

  console.log('search_text', search_text)

  // useEffect(() => {
  //   const isFieldsAreNotEmpty = getFieldsAreNotEmpty([
  //     name,
  //   ]);
  //   // if (!isFieldsAreNotEmpty) {
  //   //   trigger([
  //   //     "name",
  //   //   ]);
  //   // }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   name,
  // ]);

  useEffect(() => {
    if (formType !== FormType.Add && data) {
      reset({
        name: data.name || "",
        gender: (GenderType.Male).toLowerCase(),
        email: data.email,
        mobile_no: data.mobile_no.replace("+94", ""),
        // dob: dat
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType, data]);

  const { isPending } = useCreatePatient({
    onSuccess: () => {
      refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
      });
      onClose();
      toast.success(t("user.alert.create.success"));
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
      // isLoading: isSearchingPatient,
      error: searchedPatientsError
    } = useSearchPatients({
      client,
      params: {
        patient: search_text,
      },
      enabled: !!search_text && search_text.length === 9
    });

  useEffect(() => {

    setIsMyPatient(false)
    setIsRegisteredPatient(!!searchedPatients?.data)
    if(!!searchedPatients?.data){
      const patient = searchedPatients?.data[0];

    setValue('name', patient.name)
    setValue('dob', patient.date_of_birth)
    setValue('email', patient.email)
    setValue('gender', "")
}   
  }, [searchedPatients?.data])

  useEffect(() => {
if(search_text?.length !== 9) {
  console.log(searchedPatientsError)
    setIsRegisteredPatient(undefined)

  setValue('name', "")
    setValue('dob', "")
    setValue('email', "")
}

  }, [search_text])


  const {
    // mutateAsync: mutateOnUpdateEmployee,
    isPending: isPendingUpdateEmployee,
  } = useUpdatePatient({
    onSuccess: () => {
      refetch();
      reset({
        name: "",
        gender: "",
        email: "",
        mobile_no: "",
        dob: "",
      });
      onClose();
      toast.success(t("user.alert.update.success"));
    },
    onError: () => {
      toast.error(t("global.alert.common.error"));
    },
  });

  const handleOnSubmit = async (values: AddUserFormInputs) => {
    console.log('values', values)
    if (formType === FormType.Add) {
      // await mutateOnCreateEmployee({
      //   client,
      //   body: {
      //     // ...omit(values, ["reEnterBankAccountNo", "hasBankDetails"]),
      //     mobile_no: `+94${values.mobile_no}`,
      //   },
      // });
    }
    if (formType === FormType.Edit && data) {
      // await mutateOnUpdateEmployee({
      //   client,
      //   userId: data.id,
      //   body: {
      //     // ...omit(values, ["reEnterBankAccountNo", "hasBankDetails"]),
      //     mobile_no: `+94${values.mobile_no}`,
      //   },
      // });
    }
  };

  return (
    <AddPatientModal
      onClose={onClose}
      formType={formType}
      data={!!searchedPatients?.data && searchedPatients?.data[0] || data}
      control={control}
      isLoading={isPending || isPendingUpdateEmployee}
      errors={errors}
      watch={watch}
      register={register}
      setValue={setValue}
      onSubmit={handleSubmit(handleOnSubmit)}
      isMyPatient={isMyPatient}
      isRegisteredPatient={isRegisteredPatient}
      isValidForm={isValid}
      {...props}
    />
  );
};
