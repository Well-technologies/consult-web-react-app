import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import RightArrowIcon from "@/assets/icons/arrow_down_icon.png";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import { Input } from "@/ui/atoms/input/input";
import { FormInput } from "@/ui/molecules/formInput/FormInput";
import { FormSelect } from "@/ui/molecules/formSelect/FormSelect";
import { Modal } from "@/ui/molecules/modal/Modal";

import { getBankOptions } from "../../../lib/bankDetails/banks";
import { getBankBranchOptions } from "../../../lib/bankDetails/branches";
import { AddUserModalProps } from "./AddUserModal.types";
import {
  getCancelButtonText,
  getConfirmButtonText,
  getIsConfirmButtonHide,
  getIsDisabledFormItem,
  getModalTitle,
  getUserGenderOptions,
} from "./AddUserModal.utils";

export const AddUserModal = ({
  control,
  data,
  errors,
  formType,
  isLoading,
  onClose,
  onSubmit,
  open,
  watch,
  register,
  setValue,
}: AddUserModalProps) => {
  const { t } = useTranslation();

  const [isOpenBankDetails, setOpenBankDetails] = useState(true);

  const {  } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.userDetails
  );

  // const companies = [parent, ...subCompanies];

  // const subCompanyOptions: Option[] = companies.map((item) => ({
  //   label: item.companyName,
  //   value: item.id,
  // }));

  const { bank_name, bank_account_no } = watch();

  const bankOptions = getBankOptions();
  const bankBranchOptions = getBankBranchOptions(bank_name);

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
    >
      <form className="space-y-4 md:space-y-6" action="#">
        <div className="flex flex-col gap-4">
          {/* <FormSelect
            id="parentOrgId"
            name="parent_org_id"
            isDisabled={getIsDisabledFormItem(formType, "parent_org_id")}
            label={t("user.form.parentOrgId.label")}
            control={control}
            placeholder={t("user.form.parentOrgId.placeholder")}
            isClearable
            // options={subCompanyOptions}
            error={!!errors?.parent_org_id}
            helperText={errors?.parent_org_id?.message}
            required
          /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              register={register}
              label={t("user.form.name.label")}
              disabled={getIsDisabledFormItem(formType, "name")}
              id="name"
              type="text"
              name="name"
              placeholder={t("user.form.name.placeholder")}
              error={!!errors?.name}
              helperText={errors?.name?.message}
              required
            />
            <FormSelect
              id="gender"
              name="gender"
              isDisabled={getIsDisabledFormItem(formType, "gender")}
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
                />
              </div>
            </div>

            <FormInput
              register={register}
              label={t("user.form.email.label")}
              disabled={getIsDisabledFormItem(formType, "email")}
              id="email"
              type="email"
              name="email"
              placeholder={t("user.form.email.placeholder")}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-0 ">
          <div
            className="font-semibold relative cursor-pointer text-md bg-secondary-50 rounded-t-md p-2 px-4"
            onClick={() => {
              setOpenBankDetails(!isOpenBankDetails);
            }}
          >
            {t("user.form.bankDetails.title")}
            <div className="absolute top-2 rounded-full right-2 p-2  bg-secondary-50 ">
              <img
                src={RightArrowIcon}
                className={clsx(
                  "w-3 aspect-square transition-all duration-300",
                  isOpenBankDetails ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
          </div>
          <div
            className={clsx(
              "flex flex-col border rounded-b-sm transition-all duration-500",
              isOpenBankDetails
                ? "max-h-[1000px] border border-t-0"
                : "max-h-0 border-0 overflow-hidden"
            )}
          >
            <div className={"flex flex-col gap-4 px-4 py-4"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <FormSelect
                  id="bankName"
                  name="bank_name"
                  isDisabled={getIsDisabledFormItem(formType, "bank_name")}
                  onSelect={(option, prevValue) => {
                    if (!option || isArray(option)) return;
                    if (option?.value === prevValue) return;
                    setValue("bank_branch", "");
                  }}
                  label={t("user.form.bankName.label")}
                  control={control}
                  placeholder={t("user.form.bankName.placeholder")}
                  isClearable
                  options={bankOptions}
                  error={!!errors?.bank_name}
                  helperText={errors?.bank_name?.message}
                  isSearchable
                  required
                /> */}
                <FormSelect
                  id="bankBranch"
                  name="bank_branch"
                  isDisabled={
                    getIsDisabledFormItem(formType, "bank_branch") ||
                    !bankBranchOptions.length
                  }
                  label={t("user.form.bankBranch.label")}
                  control={control}
                  placeholder={t("user.form.bankBranch.placeholder")}
                  isClearable
                  options={bankBranchOptions}
                  error={!!errors?.bank_branch}
                  helperText={errors?.bank_branch?.message}
                  isSearchable
                  required
                />
              </div>
              <FormInput
                register={register}
                label={t("user.form.fullName.label")}
                disabled={getIsDisabledFormItem(formType, "full_name")}
                id="fullName"
                type="text"
                name="full_name"
                placeholder={t("user.form.fullName.placeholder")}
                error={!!errors?.full_name}
                helperText={errors?.full_name?.message}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  register={register}
                  label={t("user.form.bankAccountNo.label")}
                  disabled={getIsDisabledFormItem(formType, "bank_account_no")}
                  id="bankAccountNo"
                  type="number"
                  name="bank_account_no"
                  placeholder={t("user.form.bankAccountNo.placeholder")}
                  error={!!errors?.bank_account_no}
                  helperText={errors?.bank_account_no?.message}
                  required
                />
                <FormInput
                  register={register}
                  label={t("user.form.reEnterBankAccountNo.label")}
                  disabled={
                    getIsDisabledFormItem(formType, "reEnterBankAccountNo") ||
                    bank_account_no === data?.lead_detail?.bank_account_no
                  }
                  id="reEnterBankAccountNo"
                  type="number"
                  name="reEnterBankAccountNo"
                  placeholder={t("user.form.reEnterBankAccountNo.placeholder")}
                  error={!!errors?.reEnterBankAccountNo}
                  helperText={errors?.reEnterBankAccountNo?.message}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
