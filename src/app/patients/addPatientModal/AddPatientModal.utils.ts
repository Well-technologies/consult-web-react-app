import { joiResolver } from "@hookform/resolvers/joi";

import { TFunction } from "i18next";
import Joi from "joi";
// import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import { GenderType } from "@/api/user/user.types";
import { UserDetails } from "@/api/patient/patient.types";
import { FormType } from "@/types";
import { FormSchema } from "./AddPatientModal.types";


const schema = ({
  name,
  mobile_no,
  gender,
  dob
}: FormSchema) =>
  Joi.object<FormSchema>({
    name: Joi.string().required().messages(name),
    mobile_no: Joi.string()
      .length(9) // Ensures exactly 9 digits
      .pattern(/^\d+$/) // Ensures only numbers (0-9)
      .required()
      .messages(mobile_no),
    email: Joi.string()
      .email({ tlds: { allow: false } }),
      // .required()
      // .messages(email),
    gender: Joi.string().required().messages(gender),
    dob: Joi.string().required().messages(dob),
  });

export const AddUserSchema = (translate: TFunction<"translation", undefined>) =>
  joiResolver(
    schema({
      name: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
      email: {
        // "string.email": translate("global.errors.email"),
        // "string.empty": translate("global.errors.required"),
        // "any.required": translate("global.errors.required"),
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
      dob: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
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
  data: UserDetails | null
) => {
  const { t } = useTranslation();
  switch (formType) {
    case FormType.Edit:
      return t("patient.modal.edit.title", { userId: data?.id });
    case FormType.View:
      return t("patient.modal.view.title", { userId: data?.id });
    default:
      return t("patient.modal.add.title");
  }
};

export const getIsDisabledFormItem = (
  formType: FormType,
  name:
    | "name"
    | "mobile_no"
    | "email"
    | "gender"
    | "full_name"
) => {
  switch (formType) {
    case FormType.Edit:
      switch (name) {
        case "mobile_no":
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
  console.log(fields)
  // const ss = fields.filter((field) => !isEmpty(field));
  // return !!ss.length;
};
