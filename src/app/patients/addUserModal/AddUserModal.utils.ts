import { joiResolver } from "@hookform/resolvers/joi";

import { TFunction } from "i18next";
import Joi from "joi";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import { OrganizationUserDetails } from "@/api/employee/employee.types";
import { GenderType } from "@/api/user/user.types";

import { FormSchema, FormType } from "./AddUserModal.types";

const schema = ({
  name,
  email,
  mobile_no,
  gender,
  parent_org_id,
  full_name,
  bank_name,
  bank_account_no,
  bank_branch,
  reEnterBankAccountNo,
}: FormSchema) =>
  Joi.object<FormSchema>({
    parent_org_id: Joi.number().required().messages(parent_org_id),
    name: Joi.string().required().messages(name),
    mobile_no: Joi.string()
      .length(9) // Ensures exactly 9 digits
      .pattern(/^\d+$/) // Ensures only numbers (0-9)
      .required()
      .messages(mobile_no),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages(email),
    gender: Joi.string().required().messages(gender),
    full_name: Joi.string()
      .when("hasBankDetails", {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(""),
      })
      .messages(full_name), // account name
    bank_name: Joi.string()
      .when("hasBankDetails", {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(""),
      })
      .messages(bank_name),
    bank_branch: Joi.string()
      .when("hasBankDetails", {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(""),
      })
      .messages(bank_branch),
    bank_account_no: Joi.string()
      .when("hasBankDetails", {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(""),
      })
      .messages(bank_account_no),
    reEnterBankAccountNo: Joi.string()
      .when("bank_account_no", {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref("bank_account_no")),
        otherwise: Joi.string().optional().allow(""),
      })
      .messages(reEnterBankAccountNo),
    hasBankDetails: Joi.boolean().required(),
  });

export const AddUserSchema = (translate: TFunction<"translation", undefined>) =>
  joiResolver(
    schema({
      parent_org_id: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
        "number.base": translate("global.errors.required"),
      },
      name: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      email: {
        "string.email": translate("global.errors.email"),
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      mobile_no: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
        "string.length": translate("global.errors.length", { length: 9 }),
        "string.pattern.base": translate("global.errors.onlyNumbers"),
      },
      gender: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      full_name: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      bank_name: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      bank_branch: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      bank_account_no: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      reEnterBankAccountNo: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
        "any.only": translate("user.form.errors.reEnterBankAccountNo.match"),
      },
      hasBankDetails: {},
    })
  );

export const getConfirmButtonText = (formType: FormType) => {
  const { t } = useTranslation();
  switch (formType) {
    case FormType.Add:
      return t("claim.modal.add.submit");
    case FormType.Edit:
      return t("claim.modal.edit.submit");
    default:
      return "";
  }
};

export const getIsConfirmButtonHide = (formType: FormType) => {
  switch (formType) {
    case FormType.View:
      return true;
    default:
      return false;
  }
};

export const getCancelButtonText = (formType: FormType) => {
  const { t } = useTranslation();
  switch (formType) {
    case FormType.View:
      return t("claim.modal.view.cancel");
    default:
      return t("claim.modal.default.cancel");
  }
};

export const getModalTitle = (
  formType: FormType,
  data: OrganizationUserDetails | null
) => {
  const { t } = useTranslation();
  switch (formType) {
    case FormType.Edit:
      return t("user.modal.edit.title", { userId: data?.id });
    case FormType.View:
      return t("user.modal.view.title", { userId: data?.id });
    default:
      return t("user.modal.add.title");
  }
};

export const getIsDisabledFormItem = (
  formType: FormType,
  name:
    | "name"
    | "mobile_no"
    | "email"
    | "gender"
    | "parent_org_id"
    | "full_name"
    | "bank_name"
    | "bank_branch"
    | "bank_account_no"
    | "reEnterBankAccountNo"
) => {
  switch (formType) {
    case FormType.Edit:
      switch (name) {
        case "mobile_no":
          return true;
        case "parent_org_id":
          return true;
        default:
          return false;
      }
    case FormType.View:
      return true;

    default:
      return false;
  }
};

export const getUserGenderOptions = () => {
  const { t } = useTranslation();
  return [
    { label: t("user.gender.male"), value: GenderType.Male },
    { label: t("user.gender.female"), value: GenderType.Female },
    { label: t("user.gender.other"), value: GenderType.Other },
  ];
};

export const getFieldsAreNotEmpty = (fields: string[]) => {
  const ss = fields.filter((field) => !isEmpty(field));
  return !!ss.length;
};
