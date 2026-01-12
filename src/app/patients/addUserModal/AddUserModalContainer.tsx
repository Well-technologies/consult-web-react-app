import { omit } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useCreateEmployee, useUpdateEmployee } from "../../../api/patient/patient";
import { GenderType } from "@/api/user/user.types";
import { useClient } from "@/hooks/useClient/useClient";

import { AddUserModal } from "./AddUserModal";
import {
  AddUserFormInputs,
  AddUserModalContainerProps,
  FormType,
} from "./AddUserModal.types";
import { AddUserSchema, getFieldsAreNotEmpty } from "./AddUserModal.utils";

export const AddUserModalContainer = ({
  onClose,
  refetch,
  formType,
  data,
  ...props
}: AddUserModalContainerProps) => {
  const { t } = useTranslation();
  const client = useClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    resolver: AddUserSchema(t),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      full_name: "",
      bank_name: "",
      bank_branch: "",
      bank_account_no: "",
      hasBankDetails: true,
    },
  });
  register("hasBankDetails");

  const {
    bank_account_no,
    full_name,
    bank_name,
    bank_branch,
    reEnterBankAccountNo,
  } = watch();

  useEffect(() => {
    const isFieldsAreNotEmpty = getFieldsAreNotEmpty([
      bank_account_no,
      full_name,
      bank_name,
      bank_branch,
      reEnterBankAccountNo,
    ]);
    setValue("hasBankDetails", isFieldsAreNotEmpty);
    if (!isFieldsAreNotEmpty) {
      trigger([
        "bank_account_no",
        "full_name",
        "bank_name",
        "bank_branch",
        "reEnterBankAccountNo",
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bank_account_no,
    full_name,
    bank_name,
    bank_branch,
    reEnterBankAccountNo,
  ]);

  useEffect(() => {
    if (formType !== FormType.Add && data) {
      reset({
        full_name: data.lead_detail?.full_name || "",
        bank_name: data.lead_detail?.bank_name || "",
        bank_branch: data.lead_detail?.bank_branch || "",
        bank_account_no: data.lead_detail?.bank_account_no || "",
        reEnterBankAccountNo: data.lead_detail?.bank_account_no || "",
        gender: (data.lead_detail?.gender || GenderType.Male).toLowerCase(),
        email: data.email,
        mobile_no: data.mobile_no.replace("+94", ""),
        name: data.name,
        parent_org_id: data.organization_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType, data]);

  const { mutateAsync: mutateOnCreateEmployee, isPending } = useCreateEmployee({
    onSuccess: () => {
      refetch();
      reset({
        full_name: "",
        bank_name: "",
        bank_branch: "",
        bank_account_no: "",
        reEnterBankAccountNo: "",
        gender: "",
        email: "",
        mobile_no: "",
        name: "",
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
    mutateAsync: mutateOnUpdateEmployee,
    isPending: isPendingUpdateEmployee,
  } = useUpdateEmployee({
    onSuccess: () => {
      refetch();
      reset({
        full_name: "",
        bank_name: "",
        bank_branch: "",
        bank_account_no: "",
        reEnterBankAccountNo: "",
        gender: "",
        email: "",
        mobile_no: "",
        name: "",
      });
      onClose();
      toast.success(t("user.alert.update.success"));
    },
    onError: () => {
      toast.error(t("global.alert.common.error"));
    },
  });

  const handleOnSubmit = async (values: AddUserFormInputs) => {
    if (formType === FormType.Add) {
      await mutateOnCreateEmployee({
        client,
        body: {
          ...omit(values, ["reEnterBankAccountNo", "hasBankDetails"]),
          mobile_no: `+94${values.mobile_no}`,
        },
      });
    }
    if (formType === FormType.Edit && data) {
      await mutateOnUpdateEmployee({
        client,
        userId: data.id,
        body: {
          ...omit(values, ["reEnterBankAccountNo", "hasBankDetails"]),
          mobile_no: `+94${values.mobile_no}`,
        },
      });
    }
  };

  return (
    <AddUserModal
      onClose={onClose}
      formType={formType}
      data={data}
      control={control}
      isLoading={isPending || isPendingUpdateEmployee}
      errors={errors}
      watch={watch}
      register={register}
      setValue={setValue}
      onSubmit={handleSubmit(handleOnSubmit)}
      {...props}
    />
  );
};
